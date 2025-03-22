# Stage 1: Build Angular App
FROM node:alpine AS build

WORKDIR /app

COPY ./googleForm /app

RUN npm install
RUN npm run build --configuration=production

# Stage 2: Serve Angular with Nginx
FROM nginx:alpine

COPY --from=build /app/dist/google-form /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200

ENTRYPOINT ["nginx", "-g", "daemon off;"]