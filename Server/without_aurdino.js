const readline = require('readline');
const mysql = require('mysql');

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

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

    // Ask for CO2 data
    console.log('Prompting for CO2 value and date...');
    rl.question('Enter CO2 value: ', function(co2Value) {
        console.log('CO2 value entered:', co2Value);
        rl.question('Enter date (YYYY-MM-DD): ', function(date) {
            console.log('Date entered:', date);
            // Insert CO2 data into MySQL database
            const sql = 'INSERT INTO va (date, value) VALUES (?, ?)';
            con.query(sql, [date, co2Value], function(err, result) {
                if (err) {
                    console.error('Error inserting CO2 data:', err.message);
                } else {
                    console.log('CO2 data inserted successfully');
                }
                // Close MySQL connection and readline interface
                con.end();
                rl.close();
            });
        });
    });
});
