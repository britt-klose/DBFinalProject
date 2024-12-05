
function deleteRegistrationByLname() {
    var lname = document.getElementById('lname').value;
    fetch('http://localhost:8081/deleteRegistrationByLname', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ lname: lname })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        // Optionally refresh the page or clear the input
        document.getElementById('lname').value = ''; // Clear input after delete
    })
    .catch(error => console.error('Error deleting the registration:', error));
}
