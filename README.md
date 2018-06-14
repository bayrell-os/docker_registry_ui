# Docker registry with Web Interface


Pull image:
```
docker pull bayrell/docker_registry_ui
```


Create volume:
```
docker volume create repo_data
```


Start container:
```
docker run -d -it --restart=unless-stopped -v repo_data:/var/lib/registry  -p 80:80 --name registry bayrell/docker_registry_ui
```


Open in browser url http://localhost/ and enter to Docker Registry Web Interface.



## Run docker registry on static IP


Create volume and network:
```
docker volume create repo_data
docker network create -d bridge --subnet=172.20.0.0/16 dockernet -o "com.docker.network.bridge.name"="dockernet"
```


Run repository:
```
docker run -d -it --ip=172.20.10.25 --network="dockernet" --restart=unless-stopped -v repo_data:/var/lib/registry  --name registry bayrell/docker_registry_ui
```


Open in browser url http://172.20.10.25/ and enter to Docker Registry Web Interface.
