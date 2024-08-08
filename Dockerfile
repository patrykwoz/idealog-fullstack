FROM node:20.15.1

WORKDIR /frontend

COPY frontend/package*.json ./

RUN npm install

COPY frontend .

COPY frontend/.env.local ./

RUN npm run build

CMD ["npm", "run", "start"]