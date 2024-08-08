FROM node:20.15.1

WORKDIR /frontend

COPY ./package*.json ./

RUN npm install

COPY . .

COPY ./.env.local ./

RUN npm run build

CMD ["npm", "run", "start"]