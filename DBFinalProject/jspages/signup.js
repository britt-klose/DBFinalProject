document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Form submission detected");

    const customer_id = document.getElementById('customer_id').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const birthdate = document.getElementById('birthdate').value;

    console.log("Form data:", {email, password});

    const response = await fetch('http://localhost:8081/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({customer_id, username, email, password, phone, birthdate }),
    });
    
    const result = await response.json();
    console.log("Server response:", result);
    if (result.success) {
        alert('You have signed up successfully! Close this pop up box and login to start enjoying!');
    } else {
        alert('Error signing up: ' + result.message);
    }
});

