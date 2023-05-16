docker-compose up --build
docker exec back-1
npx sequelize db:create
npx sequelize db:migrate
npx sequelize db:seed:all
npm run start-dev