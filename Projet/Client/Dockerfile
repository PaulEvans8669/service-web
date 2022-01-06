# stage 1
FROM node:16.13.0-alpine AS client-build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build


# stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=client-build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
