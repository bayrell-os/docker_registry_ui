#!/bin/bash

SCRIPT=$(readlink -f $0)
SCRIPT_PATH=`dirname $SCRIPT`
BASE_PATH=`dirname $SCRIPT_PATH`

RETVAL=0

case "$1" in

  pre)
	cd app
	npm install
	cd ..
	;;

  docker)
	docker build ./ -t bayrell/docker_registry_ui --file docker/Dockerfile
	cd ..
	;;
  
  docker0)
	docker build ./ -t bayrell/docker_registry_ui:stage0 --file docker/Dockerfile0
	cd ..
	;;
	
  docker1)
	docker build ./ -t bayrell/docker_registry_ui:stage1 --file docker/Dockerfile1
	cd ..
	;;
  
  all)
	$SCRIPT pre
	$SCRIPT docker
	;;
  
  *)
    echo "Usage: $0 {pre|docker|all}"
    RETVAL=1

esac

exit $RETVAL 
