FROM node:13

WORKDIR /backend

COPY ./backend/.env /backend/
COPY ./backend/package*.json /backend/

RUN npm install

COPY . .

