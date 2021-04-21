# file-listing


## Building image
docker build . -t file-listing

## List images
docker images

## Run the image
docker run -p 49160:8080 -d file-listing

## Get container ID
docker ps

## Print app output
docker logs <container id>

## Enter the container
docker exec -it <container id> /bin/bash

## Test
http://localhost:49160/