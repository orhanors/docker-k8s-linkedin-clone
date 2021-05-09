# Two phase build process
# In first phase, we'll generate a static production build
# To reach out this static files, we'll use nginx server.
# When we go to port 3000, it'll serve the static build file 

FROM node:15-alpine as builder
# python for preventing node-sass errors
RUN apk update && apk add python2 make g++ 
WORKDIR /app

COPY ./package*.json ./

RUN npm i 

COPY . .

RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html