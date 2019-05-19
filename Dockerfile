FROM node:latest

WORKDIR /app

COPY ./src /app/src
COPY .babelrc /app
COPY package.json /app

RUN npm install

RUN npm run heroku-postbuild

# uncomment the line(s) below to supply your environment variable(s)
# ENV APP_SECRET=your_app_secret
# ENV PORT=your_port
# SENDGRID_API_KEY=your_sendgrid_api_key

CMD ["npm", "start"]

EXPOSE 3000
