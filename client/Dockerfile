FROM node:14 as build-stage
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build

#Ngix

FROM nginx:1.19.2
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]