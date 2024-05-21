var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "co2"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var table1 = "CREATE TABLE va (date DATE PRIMARY KEY, value VARCHAR(50))";
    
    
    con.query(table1, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});
