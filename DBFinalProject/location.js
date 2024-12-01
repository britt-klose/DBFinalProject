// search.js
function searchLocations() {
    var input = document.getElementById('searchInput').value;
    fetch(`http://localhost:5000/search?query=${encodeURIComponent(input)}`)
        .then(response => response.json())
        .then(data => {
            var resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = ''; 
            data.forEach(item => {
                var article = document.createElement('article');
                article.className = 'location';
                article.innerHTML = `
                    <img src="/img/locationimgs/${item.image}.jpg" alt="Java Cafe Interior: ${item.town_city}" width="200" height="150">
                    <h2>Java Cafe - ${item.branch}</h2>
                    <p>${item.address}</p>
                `;
                resultsDiv.appendChild(article);
            });
        })
        .catch(error => console.error('搜索出错:', error));
}
