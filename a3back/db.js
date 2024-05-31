require('dotenv').config();

const dbpw = process.env.DBPASSWORD;

module.exports = {
    client: "mysql2",
    connection: {
        host: "localhost",
        database: "petcare",
        user: "root",
        password: `${dbpw}`,
    },
};