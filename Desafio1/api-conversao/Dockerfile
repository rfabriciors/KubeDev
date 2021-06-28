FROM node:lts-alpine3.13
WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8060
CMD ["node", "index.js"]