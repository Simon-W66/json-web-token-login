//import pkg from "pg"
//const {Pool} = pkg;
const Pool = require("pg").Pool


const pool = new Pool({
    user: 'postgres',
    password: 'meno', //change to your password
    host:'localhost',
    port: 5432,
    database: 'jwt_tutorial'
})
module.exports = pool; 