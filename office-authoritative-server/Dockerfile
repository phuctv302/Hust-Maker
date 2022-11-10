

FROM node:19-alpine3.15

WORKDIR /office-authoritative-server
COPY . .


RUN npm install
EXPOSE 8000

CMD ["node", "app.js"]
