/*
This function successfully gets the last name from the input field, sends a POST 
request to remove the registration based on the last name, and processes the response
*/

function deleteRegistrationByLname() {
    var lname = document.getElementById('delete-lname').value;
    fetch('http://localhost:8081/deleteRegistrationByLname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lname: lname })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        alert(data.message);
        document.getElementById('delete-lname').value = ''; // Clear input after delete
    })
    .catch(error => console.error('Error deleting the registration:', error));
}

