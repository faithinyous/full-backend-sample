FROM node:16

WORKDIR /dist
COPY package*.json ./
COPY yarn.lock ./

COPY . .

ENV PORT=5001

RUN yarn

RUN yarn build

#for now only

CMD [ "yarn", "start" ]
