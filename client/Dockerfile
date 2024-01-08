FROM node:16-alpine
WORKDIR /client
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5001
CMD ["npm", "start"]