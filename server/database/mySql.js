const mySql = require('mysql2');

const connection = mySql.createConnection({
    host: "localhost",
    user: "root",
    database: "dutyfree",
    password: "root"
}).promise();

// const connection = mySql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD
// }).promise();

module.exports = connection;