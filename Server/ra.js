const express=require('express');
const mysql=require('mysql');
const fs=require('fs');
const app=express();
var bodyParser=require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: true});



var con=mysql.createConnection(
  {
    host:"localhost",
    user:"root",
    password:"",
    database:"feedback"
  }
)

app.get('/delete', (req, res) => {
  fs.readFile('delete.html', 'utf8', (err, data) => {
    if (err) throw err;
    res.send(data);
  });
});

app.post('/thank',urlencodedParser,(req,res)=>
{
  var reply='';
  var comment_id=req.body.p;
 
  var sql='DELETE FROM comments WHERE comment_id = ?';



  con.connect(function(err){
      if(err)throw err;
      console.log("Connected");
  });
  con.query(sql,[comment_id],function(err,result){
      if(err)throw err;
      res.write("rec deleted");
  });
  res.write("record deleted");
  res.end();

}).listen(9000);