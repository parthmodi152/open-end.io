FROM node:17.9.1

WORKDIR /usr/src/app

COPY . /usr/src/app/.

RUN npm install
RUN npm run compile

EXPOSE 3030

CMD ["node", "--max-old-space-size=7500", "lib/index.js"]
