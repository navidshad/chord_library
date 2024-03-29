FROM node:14.21.1-alpine

# Install Tools
#

RUN apk add g++ make py3-pip
RUN apk add zip
RUN apk add --upgrade mongodb-tools
RUN npm install pm2 -g

# Build app
#

COPY ["/server/package.json", "/server/package-lock.json", "/server/yarn.lock", "./server/"]
COPY ["/website/package.json", "/website/package-lock.json", "/website/yarn.lock", "./website/"]

WORKDIR /server
RUN npm install

WORKDIR /website
RUN npm install

WORKDIR /server
COPY /server/backup_tools ./backup_tools/
COPY /server/src ./src
COPY /server/app-docker.js ./

WORKDIR /
COPY website ./website
COPY .nuxt ./.nuxt

VOLUME "/server/uploads"
VOLUME "/server/backups"

EXPOSE 8080

COPY ecosystem.config.js ./
CMD ["pm2-runtime", "ecosystem.config.js"]