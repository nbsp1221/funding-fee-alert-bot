FROM node:18
WORKDIR /app
COPY . .
RUN yarn install
CMD ["yarn", "start"]
