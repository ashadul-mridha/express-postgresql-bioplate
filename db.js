const Poll = require('pg').Pool;

const poll = new Poll({
    user: "postgres",
    password: '12345678',
    database: 'todo',
    host: 'localhost',
    port: 5432
});

module.exports = poll;