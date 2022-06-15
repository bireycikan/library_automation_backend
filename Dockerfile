FROM node:16.15.0-alpine3.14

# RUN addgroup library && adduser -S -G library library_admin
# USER library_admin

# RUN mkdir -p /home/app
WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

EXPOSE 8080

CMD npm run build && npm run server-start