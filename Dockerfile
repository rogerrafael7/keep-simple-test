FROM node:20-alpine

WORKDIR /app

COPY . /app
RUN cp .env.example .env
RUN npm install -g pnpm
RUN pnpm install

RUN pnpm run build

CMD ["pnpm", "run", "start"]