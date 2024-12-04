// document.addEventListener('DOMContentLoaded', function() {
//     const menuContainer = document.getElementById('menu-container');

//     // Fetch menu data from the PHP endpoint (menu.php)
//     //<img src="${item.image}" alt="${item.name}">
//     // need to rename images as their actual name. 
//     fetch('/menu.php')
//         .then(response => response.json())
//         .then(menuItems => {
//             menuItems.forEach(item => {
//                 const itemElement = document.createElement('div');
//                 itemElement.classList.add('menu-item');
//                 itemElement.innerHTML = `
//                     <a href="item.php?id=${item.id}">
                        
//                         <h3>${item.name}</h3>
//                         <p>${item.description}</p>
//                         <p>$${item.price}</p>
//                     </a>
//                 `;
//                 menuContainer.appendChild(itemElement);
//             });
//         })
//         .catch(error => {
//             console.error('Error fetching menu items:', error);
//         });
// });
document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:8081/items')
    .then(response => response.json())
    .then(data => displayItems(data))
    .catch(error => console.error('Error fetching items:', error));
});

function displayItems(items) {
    const container = document.getElementById('itemsContainer');
    items.forEach(item => {
        const itemHTML = `
            <div class="col mb-5">
                <div class="card h-100">
                    <img class="card-img-top" src="${item.url}" alt="${item.name}" />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder" title="${item.description}  ${item.calories} Calories">${item.name}</h5>
                            ${item.price}
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent"></div>
                </div>
            </div>`;
        container.innerHTML += itemHTML;
    });
}
