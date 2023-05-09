FROM node:18.14.2-alpine

WORKDIR /app

COPY package.json .

RUN npm install --no-optional && npm cache clean --force

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]