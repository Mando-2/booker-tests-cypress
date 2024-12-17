FROM cypress/included:latest

RUN mkdir /booker-tests-cypress

WORKDIR /booker-tests-cypress

COPY ./package.json .
COPY ./cypress.config.ts .
COPY ./cypress ./cypress

RUN npm install

ENTRYPOINT ["npx","cypress","run"]
