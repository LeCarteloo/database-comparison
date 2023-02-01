#!/bin/bash
echo zespolowe

cd docker
docker-compose stop
docker-compose ps
cd ../


echo -e "--------------------------"
echo -e "Docker zatrzymany"
echo -e "--------------------------"
echo ""

