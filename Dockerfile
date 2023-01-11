FROM node:16-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g cross-env
ENV NODE_ENV production
COPY . .
EXPOSE 3065
CMD ["npm", "start"]