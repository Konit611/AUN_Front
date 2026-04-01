FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npx next build --webpack

EXPOSE 3000

CMD ["npm", "start"]
