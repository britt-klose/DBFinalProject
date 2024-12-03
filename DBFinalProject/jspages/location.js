// function searchLocations() {
//     const query = document.getElementById('searchInput').value.toLowerCase();
//     const locations = document.querySelectorAll('.location');

//     locations.forEach(location => {
//         const city = location.getAttribute('data-city').toLowerCase();
//         if (city.includes(query)) {
//             location.style.display = ''; // Show matching locations
//         } else {
//             location.style.display = 'none'; // Hide non-matching locations
//         }
//     });
// }

function searchLocations() {
    console.log("Search function triggered"); // 确认函数触发
    const query = document.getElementById('searchInput').value.toLowerCase();
    console.log("Searching for:", query); // 输出查询内容

    fetch(`http://localhost:8081/search?city=${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const locationContainer = document.querySelector('.locations');
            locationContainer.innerHTML = ''; // 清空现有内容
            console.log("Data received:", data); // 输出接收到的数据
            data.forEach(location => {
                const locationElement = document.createElement('article');
                locationElement.className = 'location';
                locationElement.innerHTML = `
                    <img src="${location.image_url}" alt="Java Cafe Interior: ${location.town_city}" width="200" height="150">
                    <h2>Java Cafe - ${location.town_city}</h2>
                    <p>${location.location_address}, ${location.state}, ${location.zipcode}</p>
                `;
                locationContainer.appendChild(locationElement);
            }); 
        })
        .catch(error => {
            console.error('Error fetching locations:', error);
        });
}
