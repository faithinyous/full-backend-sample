FROM postgres:latest

RUN apt-get update
RUN apt-get install -y iputils-ping htop

COPY ./setup-master.sh /docker-entrypoint-initdb.d/setup-master.sh

RUN chmod 0666 /docker-entrypoint-initdb.d/setup-master.sh