FROM node:9.2
WORKDIR  /app
COPY package.json /app
RUN npm install
COPY . /app
CMD node index.js
EXPOSE 5555
