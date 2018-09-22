FROM node:8.11.4

COPY . /app

WORKDIR /app

RUN npm install
RUN npm run build
EXPOSE 8000

CMD ["npm", "run", "start"]
