#!/bin/bash
source docker/.env
echo $COMPOSE_PROJECT_NAME

cd docker
docker-compose stop
docker-compose ps
cd ../


echo -e "--------------------------"
echo -e "Docker zatrzymany"
echo -e "--------------------------"
echo ""

