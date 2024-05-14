var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "feedback"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
   /* var table1 = "INSERT INTO users (user_id,username,email) VALUES ?";
    var values=[[1, 'qwert','qwert@gmail.com'],
    [2,'asdfg', 'asdfg@gmail.com'],
    [3,'zxcvb','zxcvb@gmail.com']];*/

    var table1 = "INSERT INTO users (user_id, username, email) VALUES ?";
var values = [
  [1, 'qwert', 'qwert@gmail.com'],
  [2, 'asdfg', 'asdfg@gmail.com'],
  [3, 'zxcvb', 'zxcvb@gmail.com']
];

    
    var table2="INSERT INTO posts (post_id, title,content,created_at,user_id) VALUES ?";
    var values1=[
        [100, 'brooklyn_bridge', 'brookly bridge is a bridge which is a bridge which is loacted in brroklyn new york and it is very famous','new_york',1],
    [200, 'buckingham_palace', 'buckingham palace is a palce situated in buckingham where the queen/king of england resides as now they have lost htere power but still they live in a palce ','london',2],
    [300, 'tower_of_pisa', 'leaning tower of pisa is loacted in pisa and it is leaning beacuse of some engineering defect','pisa',3]
];
    

    var table3="INSERT INTO comments (comment_id,comment_text,user_id,post_id) VALUES ?";
    var values2=[
        [10,'no,it was good one but still there are many scopes of improvements',1,100],
    [20,'it wasnt that bad but the langege needs to be polished',2,200],
    [30,'impecabele',3,300]
];
    
    con.query(table1,[values],
    function (err, result){
        if (err) throw err;
        console.log("Values Inserted into 1");
    });

    con.query(table2,[values1],
    function (err, result){
        if (err) throw err;
        console.log("Values Inserted into 2");
    });

    con.query(table3,[values2],
        function (err, result){
            if (err) throw err;
            console.log("Values Inserted into 3");
        });
});