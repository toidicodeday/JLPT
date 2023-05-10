FROM node:16-alpine as build-stage
WORKDIR /usr/app

COPY ./package*.json ./
COPY ./yarn.lock ./

RUN yarn install
COPY . .
RUN NODE_OPTIONS=--max_old_space_size=4096 yarn build

FROM nginx:1.21.6-alpine
COPY --from=build-stage /usr/app/dist /var/www
COPY --from=build-stage /usr/app/OneSignalSDKWorker.js /var/www

COPY nginx/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

CMD ["nginx","-g","daemon off;"]