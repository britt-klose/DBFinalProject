const {createPool} = require('mysql');

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'java_cafe'
});

pool.query(`select* from items`,(err,res)=>{
    return console.log(res)
})