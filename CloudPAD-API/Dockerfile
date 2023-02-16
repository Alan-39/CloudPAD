FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=development

COPY . .

RUN npm run build

FROM node:18-alpine As production

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

# Start the server using the production build
CMD [ "node", "dist/main.js" ]
