FROM node:14
# RUN apk --no-cache add inotify-tools
# RUN apk update && apk add inotify-tools
# RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 5000

CMD ["npm","run","dev"]
# CMD ["nodemon","server.js"]