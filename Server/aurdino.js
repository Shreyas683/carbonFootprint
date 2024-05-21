const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());

// MySQL database connection
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "co2" // Specify the database name
});

// Connect to MySQL database
con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL database:', err.message);
        return;
    }
    console.log('Connected to MySQL database');
});

// HTTP POST endpoint to receive CO2 data from Arduino
app.post('/co2data', (req, res) => {
    try {
        const co2Value = req.body.co2Value;
        const date = req.body.date;

        // Insert CO2 data into MySQL database
        const sql = 'INSERT INTO co2_data (date, value) VALUES (?, ?)';
        con.query(sql, [date, co2Value], function(err, result) {
            if (err) {
                console.error('Error inserting CO2 data:', err.message);
                res.status(500).send('Error inserting CO2 data');
                return;
            }
            console.log('CO2 data inserted successfully');
            res.status(201).send('CO2 data inserted successfully');
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing request');
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
