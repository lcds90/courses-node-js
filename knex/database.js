const KNEX = require("knex")({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'node_projeto_knex'
    }
})

module.exports = KNEX