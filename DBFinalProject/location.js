function searchLocations() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const locations = document.querySelectorAll('.location');

    locations.forEach(location => {
        const city = location.getAttribute('data-city').toLowerCase();
        if (city.includes(query)) {
            location.style.display = ''; // Show matching locations
        } else {
            location.style.display = 'none'; // Hide non-matching locations
        }
    });
}