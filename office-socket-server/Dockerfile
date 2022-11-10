
FROM node:19-alpine3.15

WORKDIR /office-socket-server
COPY . .


RUN npm install
EXPOSE 8080

CMD ["node", "app.js"]