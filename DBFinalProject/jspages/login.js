document.getElementById('signup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Form submission detected");

    const customer_id = document.getElementById('customer_id').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const phone = document.getElementById('phone').value;
    const birthdate = document.getElementById('birthdate').value;

    console.log("Form data:", {customer_id, username, email, password, phone, birthdate });

    const response = await fetch('http://localhost:8081/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
    });
    
    const result = await response.json();
    console.log("Server response:", result);
    if (result.success) {
        alert('You are now logged in! Close this window and start ordering!');
    } else {
        alert('Error signing in: ' + result.message);
    }
});