FROM node:20


WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV PORT=${BACKEND_PORT}
EXPOSE ${PORT}

CMD ["npm", "run", "dev"] 