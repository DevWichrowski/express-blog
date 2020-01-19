FROM node:13

WORKDIR /backend

COPY ./backend/.env /backend/
COPY ./backend/package*.json /backend/

RUN npm install

COPY . .

EXPOSE 3000

CMD["npm", "start"]

