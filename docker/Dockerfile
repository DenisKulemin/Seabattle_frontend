FROM node:19.6

WORKDIR /home/app

ENV PATH /home/app/node_modules/.bin:$PATH

COPY package.json package-lock.json ./
RUN npm install --silent && npm install react-script --silent

COPY . .

EXPOSE 8081

CMD [ "npm", "run", "running" ]