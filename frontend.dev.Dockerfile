# Development
FROM node:20
COPY ./frontend/package.json ./app/package.json
WORKDIR /app
RUN npm install
COPY ./frontend /app
CMD ["node", "index.js"]