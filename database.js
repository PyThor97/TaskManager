const mysql = require("mysql2");
const params = require("./gen_params");

let pool = mysql.createPool({
    host: params.HOST,
    user: params.USER,
    password: params.PASSWORD,
    database: params.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    idleTimeout: 60000,
});

module.exports = { pool };
