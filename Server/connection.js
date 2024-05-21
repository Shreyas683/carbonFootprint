var mysql=require('mysql');


var con= mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"co2"
});

module.exports=con;