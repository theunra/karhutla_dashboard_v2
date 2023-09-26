# Development
FROM node:20
COPY ./backend/package.json ./app/package.json
WORKDIR /app
RUN npm install
COPY ./backend /app
CMD ["node", "index.js"]