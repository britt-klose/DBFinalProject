const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});

const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'mydatabase'
});

connection.connect(err => {
    if (err) {
        return console.error('error: ' + err.message);
    }

    console.log('Connected to the MySQL server.');
});

document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Blocking the default submission behaviour of forms
    var pizzaType = document.getElementById('pizzaType').value;

    fetch('submitOrder', { // calling api
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ pizzaType: pizzaType })
    })
    .then(response => response.json())
    .then(data => alert('Order placed successfully!'))
    .catch(error => alert('Order failed to place.'));
});
