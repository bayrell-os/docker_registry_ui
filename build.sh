#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`

RETVAL=0
VERSION=2.7.1
SUBVERSION=1
TAG=`date '+%Y%m%d_%H%M%S'`

case "$1" in

	test)
		docker build ./ -t bayrell/docker_registry_ui:$VERSION-$SUBVERSION-$TAG --file stages/Dockerfile
	;;
	
	amd64)
		docker build ./ -t bayrell/docker_registry_ui:$VERSION-$SUBVERSION-amd64 \
			--file stages/Dockerfile --build-arg ARCH=-amd64
	;;
	
	arm64v8)
		docker build ./ -t bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm64v8 \
			--file stages/Dockerfile --build-arg ARCH=-arm64v8
	;;
	
	arm32v7)
		docker build ./ -t bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm32v7 \
			--file stages/Dockerfile --build-arg ARCH=-arm32v7
	;;
	
	manifest)
		rm -rf ~/.docker/manifests/docker.io_bayrell_docker_registry_ui-*
		
		docker push bayrell/docker_registry_ui:$VERSION-$SUBVERSION-amd64
		docker push bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm64v8
		docker push bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm32v7
		
		docker manifest create bayrell/docker_registry_ui:$VERSION-$SUBVERSION \
			--amend bayrell/docker_registry_ui:$VERSION-$SUBVERSION-amd64 \
			--amend bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm64v8 \
			--amend bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm32v7
		docker manifest push bayrell/docker_registry_ui:$VERSION-$SUBVERSION
		
		docker manifest create bayrell/docker_registry_ui:$VERSION \
			--amend bayrell/docker_registry_ui:$VERSION-$SUBVERSION-amd64 \
			--amend bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm64v8 \
			--amend bayrell/docker_registry_ui:$VERSION-$SUBVERSION-arm32v7
		docker manifest push bayrell/docker_registry_ui:$VERSION
	;;
	
	all)
		$0 amd64
		$0 arm64v8
		$0 arm32v7
		$0 manifest
	;;
	
	stage0)
		docker build ./ -t bayrell/docker_registry_ui:stage0 --file stages/Dockerfile0
		cd ..
		;;
	
	stage1)
		docker build ./ -t bayrell/docker_registry_ui:stage1 --file stages/Dockerfile1
		cd ..
	;;
	
	*)
		echo "Usage: $0 {amd64|arm64v8|arm32v7|manifest|all|test}"
		RETVAL=1

esac

exit $RETVAL 