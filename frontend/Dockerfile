# Stage 1: Build Angular App
FROM node:alpine AS build

WORKDIR /app

COPY ./googleForm /app

RUN npm install
RUN npm run build --prod

# Stage 2: Serve Angular with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/googleForm /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
