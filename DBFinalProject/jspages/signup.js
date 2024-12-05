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

    const response = await fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({customer_id, username, email, password, phone, birthdate }),
    });
    // Log the response text before trying to parse it
    const text = await response.text();
    console.log('Raw response text:', text);

    const result = await response.json();
    console.log("Server response:", result);
    if (result.success) {
        alert('User signed up successfully!');
    } else {
        alert('Error signing up: ' + result.message);
    }
});

