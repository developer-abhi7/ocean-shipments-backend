# ocean-shipments-backend

https://stackabuse.com/adding-a-postgresql-database-to-a-node-js-app-on-heroku/

$ npm install --save sequelize

$ npm install --save pg pg-hstore

$ npm install --save sequelize-cli

$ npx sequelize-cli init

$ npx sequelize-cli model:generate --name Url --attributes url:string,shortUrl:string

$ npx sequelize-cli db:migrate

$ npx sequelize-cli db:migrate:status