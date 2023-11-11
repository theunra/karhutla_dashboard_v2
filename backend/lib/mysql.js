const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    process.env.MYSQL_DB_NAME ? process.env.MYSQL_DB_NAME : 'vews_db',
    process.env.MYSQL_ROOT_USERNAME ? process.env.MYSQL_ROOT_USERNAME : 'root', //TESTING//////////////////
    process.env.MYSQL_ROOT_PASSWORD ? process.env.MYSQL_ROOT_PASSWORD : 'admin',
    {
        host: 'mysql-db',
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(() => {
    console.log(`Connected to mysql db`);
}).catch((err) => {
    console.error(err);
});

module.exports= sequelize;