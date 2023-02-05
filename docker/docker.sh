#!/bin/bash
echo zespolowe


cd docker
docker-compose pull
docker-compose up -d


echo -e "--------------------------"
echo -e "Serwer MySQL jest dostępny pod adresem: localhost:3307"
echo -e "--------------------------"
echo ""
echo -e "--------------------------"
echo -e "Serwer PostgresSQL jest dostępny pod adresem: localhost:5432"
echo -e "--------------------------"
echo ""
echo -e "--------------------------"
echo -e "Serwer ClickHouse jest dostępny pod adresem: localhost:8123"
echo -e "--------------------------"
echo ""
echo -e "--------------------------"
echo -e "Serwer MongoDB jest dostępny pod adresem: localhost:8081"
echo -e "--------------------------"
echo ""
echo -e "--------------------------"
echo -e "Serwer Redis jest dostępny pod adresem: localhost:6379"
echo -e "--------------------------"
echo ""