// Import required modules
const express = require('express'); // Express framework for handling HTTP requests in node.js.
const bodyParser = require('body-parser');  // body-parser that parses request bodies in JSON formats
const mysql = require('mysql2'); // MySQL2 client for Node.js is for connect with database provide database interaction
const cors = require('cors'); // For web security Used to maintain or relax cross-domain access restrictions.
const { v4: uuidv4 } = require('uuid');// Universally Unique Identifier Generate unique identifiers

port=8081;
// // Create an instance of express
const app = express();
//app.use(bodyParser.urlencoded({ extended: true }));  // Parsing Form Data
//app.use(bodyParser.json());  // Parsing JSON data
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

// Attempt to establish a connection to the MySQL database.
db.connect(function(err) {
    if (err)
        throw err;
    console.log("Connected to MySQL");
});

// // Define a route for the root URL '/'
// This callback function handles GET requests to the root URL.
// 'req' is the request object, containing all the information about the request made to the server.
// 'res' is the response object, used to send back the desired HTTP response to the client.
app.get('/', (req, res) => {
    // Respond with a JSON message
    return res.json("From backend side");// Send a response in JSON format.
    });

    // Define a route to fetch locations based on city name
    app.get('/search', (req, res) => {
         // The route handles GET requests to the "/search" endpoint.
        const cityTerm = req.query.city || ''; // Get the city search term from query parameters
        const sql = `SELECT location_address, town_city, state, zipcode, image_url FROM locations WHERE town_city LIKE ?`; // SQL query to search locations by city
        // The '?' is a placeholder for a parameter value that will be provided in the execution of this query.
        db.query(sql, [`%${cityTerm}%`], (err, results) => { // Use a parameterized query to prevent SQL injection
            if (err) {
                // If an error occurs during the database query, log the error and return a 500 Internal Server Error response.
                console.error('Failed to execute query:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            // Return the query results as JSON
            return res.json(results); // Sends the results of the query back to the client as JSON.
        });
    });

    ////event registration

    // Define an endpoint to handle POST requests to '/register'
    // It is designed to handle the form submissions for event registration.
    app.post('/register', (req, res) => {
        //put necessary fields of table to the request body
        const { fname, lname, location, event_name } = req.body;
        //// insert the registration data into the 'event_registration' table
        const sql = `INSERT INTO event_registration (fname, lname, location, event_name) VALUES (?, ?, ?, ?)`;
    
        db.query(sql, [fname, lname, location, event_name], (err, results) => {
            if (err) {
                console.error('Failed to insert data:', err);
                res.status(500).send('Error saving registration');
                return;
            }
            // If no error occurs, send a success message to the client.
            res.send('Registration successful. Thank you for registering!');
        });
    });

    // dont delete this one 
// this is fot delete event registration

app.post('/deleteRegistrationByLname', (req, res) => {
    const { lname } = req.body;
    db.query('DELETE FROM event_registration WHERE lname = ?', [lname], (err, result) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting registration', error: err.message });
        } else {
            res.json({ message: 'Registration deleted successfully', affectedRows: result.affectedRows });
        }
    });
});


// Sign-up route
app.post('/signup', (req, res) => {
    const {customer_id, username, email, password, birthdate, phone } = req.body;

    //const customer_id = uuidv4();
    const sql = 'INSERT INTO customers (customer_id, username, email, password, birthdate, phone) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [customer_id, username, email, password, birthdate, phone], (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).json({ success: false, message: 'Database error.' });
        }
            res.json({ success: true, message: 'User signed up successfully!' });
        
        
    });
});


// dont delete this please
///////this is for update password
///////design to update passwords based on a client's email.
//Define a route that handles POST requests to update account password
app.post('/account_info', (req, res) => {
    //Expect the client to provide the 'email' and 'password' 
    //fields in the body of the POST request.
    const { email, password } = req.body;
    const sql = `UPDATE customers SET password = ? where email = ?`;
    db.query(sql, [password, email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Email not found' });
        }
        res.json({ message: 'Updated Successfully!' });
    });
});

//
    // Define a route to fetch locations based on city name
    //app.

// Define a route to fetch locations based on city name
    app.post('/loginAccount', (req, res) => {
        console.log(req.body);
        const { email, password } = req.body;
        // The route handles GET requests to the "/search" endpoint.
    const sql = `SELECT email, password FROM customers WHERE email = ? AND password = ?`; // SQL query to search users by password
    // The '?' is a placeholder for a parameter value that will be provided in the execution of this query.
    db.query(sql, [email,password], (err, results) => { // Use a parameterized query to prevent SQL injection
        if (err) {
            // If an error occurs during the database query, log the error and return a 500 Internal Server Error response.
            console.error('Failed to execute query:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        if(results.length>0){
            res.json({ message:'logged in successfully! welcome to Java_cafe!' });

        }else{
            res.status(401).json({ message:'logged in successfully! welcome to Java_cafe!' });
        }
        // Return the query results as JSON
        // Sends the results of the query back to the client as JSON.
    });
    });

//Port
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

