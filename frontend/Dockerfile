# Start
FROM node:20.15.1-alpine as builder

FROM builder as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


# # Stage
FROM builder as production

WORKDIR /app

RUN npm install -g serve

COPY --from=development /app/dist /app/build

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]

# FROM nginx:alpine as production

# COPY --from=builder /app/dist /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/nginx.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]
