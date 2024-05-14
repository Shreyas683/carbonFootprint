const mysql = require('mysql');

var con=require("./connection");

con.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }

  console.log('Connected to the database!');

  // Add a new column 'ratings' to the 'posts' table
  const addColumnQuery = `
    ALTER TABLE posts
    ADD COLUMN ratings INT(1) DEFAULT 0;
  `;

  con.query(addColumnQuery, (err, result) => {
    if (err) {
      console.error('Error adding a new column:', err);
    } else {
      console.log('New column added successfully!');
    }

   
  });
});
