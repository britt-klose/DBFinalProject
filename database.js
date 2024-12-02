// Import required modules
const express = require('express'); // Express framework for handling HTTP requests
const mysql = require('mysql2'); // MySQL2 client for Node.js
const cors = require('cors'); // For web security
//const {authMiddleware} = require('.auth.js');
port=8081;
// // Create an instance of express
const app = express();
app.use(express.json());
app.use(express.static('public'));
app.use(cors()); // Enable CORS for the frontend React app

// // Create a connection to the MySQL database
const db = mysql.createConnection({
host: "34.69.58.203", // Database host
user: "root",      // Database username
password: "123456", // Database password
database: "cafe" // Name of the database
});

// // Define a route for the root URL '/'
app.get('/', (req, res) => {
//     // Respond with a JSON message
return res.json("From backend side");
});
// Define a route to fetch locations based on town or city name 
// Define a route to fetch locations based on town or city name
app.get('/search', (req, res) => {
    const cityTerm = req.query.city || ''; // Get the city search term from query parameters
    const sql = `SELECT location_address, town_city, state, zipcode, image_url FROM locations WHERE town_city LIKE ?`; // SQL query to search locations by city
    db.query(sql, [`%${cityTerm}%`], (err, results) => { // Use a parameterized query to prevent SQL injection
        if (err) {
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        return res.json(results); // Return the query results as JSON
    });
});

// // Define a route to fetch all items or search items by name
// app.get('/items', (req, res) => {
//     const searchTerm = req.query.search || ''; // Get the search term from query parameters
//     const sql = `SELECT * FROM items WHERE name LIKE ?`; // SQL query to search items by name
//     db.query(sql, [`%${searchTerm}%`], (err, data) => { // Use a parameterized query to prevent SQL injection
//         if (err) return res.json(err); // If there's an error, return the error
//         return res.json(data); // Otherwise, return the data as JSON
//     });
// });


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// const { createPool } = require('mysql2');

// const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'java_cafe'
// });

// pool.query(`SELECT * FROM items`, (err, res) => {
//     if (err) {
//         return console.error('Error executing query:', err);
//     }
//     console.log('Query testing:', res);

// });