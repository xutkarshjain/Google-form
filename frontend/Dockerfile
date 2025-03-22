FROM node:alpine

WORKDIR /app

COPY ./googleForm /app

RUN npm install -g @angular/cli

RUN npm install

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]