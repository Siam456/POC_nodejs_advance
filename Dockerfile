FROM node:15
WORKDIR /app
COPY package.json .

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
        then npm i; \
        else npm i --production; \
        fi
COPY . ./
EXPOSE 3030
CMD ["npm", "run", "dev"]
