const Sequelize = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:admin@postgres:5432/saveforest_db') 

sequelize.authenticate().then(() => {
    console.log(`Connected to postgres db`);
}).catch((err) => {
    console.error(err);
});

module.exports= sequelize;