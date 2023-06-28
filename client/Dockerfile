FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci -qy

COPY . .

EXPOSE 3030

CMD [ "npm", "start" ]

