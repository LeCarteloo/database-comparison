#!/bin/bash
source docker/.env
echo $COMPOSE_PROJECT_NAME

cd docker
docker-compose pull
docker-compose up -d


echo -e "--------------------------"
echo -e "Serwer MySQL jes dostępny pod adresem: localhost:3307"
echo -e "--------------------------"
echo ""

