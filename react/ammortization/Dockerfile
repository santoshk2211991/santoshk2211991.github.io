FROM node:alpine
ENV NODE_VERSION 14.16.1

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
CMD ["npm", "run", "start"]
EXPOSE 3000