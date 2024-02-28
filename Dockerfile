FROM node:18.17.1

WORKDIR /usr/app

COPY package*.json ./

COPY . .

EXPOSE 8000

COPY ./docker-entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]