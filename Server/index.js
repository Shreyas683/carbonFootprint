const { error } = require('console');
var mysql=require('mysql')
var con=require("./connection");

con.connect(function(err) {
    if (err) {
        console.error('Error connecting to the database:');
        return;
    }
    con.query("SELECT * FROM va ",function(err,result){
        if(err){
            console.error("error");
            return;

        }
        console.log(result);
    });
  
   
});
