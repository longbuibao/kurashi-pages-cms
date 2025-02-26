FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --only=production

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start"]
