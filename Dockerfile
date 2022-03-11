FROM node:16
WORKDIR /opt/app/loomi_challenge
COPY ./package.json .
COPY ./prisma ./prisma
RUN npm install
