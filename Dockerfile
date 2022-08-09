FROM mhart/alpine-node:14.17.3

WORKDIR /app
COPY package.json .
RUN npm install 
COPY . .

CMD ["npm", "start"]        