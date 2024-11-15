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
