FROM node:20

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm ci -qy

COPY . .

EXPOSE 8484
CMD ["npm", "start"]

#CMD [ "server.js" ]


