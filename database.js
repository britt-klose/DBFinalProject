const { createPool } = require('mysql2');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '1959832',
    database: 'java_cafe'
});

pool.query(`SELECT * FROM items`, (err, res) => {
    if (err) {
        return console.error('Error executing query:', err);
    }
    console.log('Query testing:', res);
  
});
 