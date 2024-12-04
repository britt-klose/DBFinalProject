document.addEventListener('DOMContentLoaded', function() {
    const menuContainer = document.getElementById('menu-container');

    // Fetch menu data from the PHP endpoint (menu.php)
    //<img src="${item.image}" alt="${item.name}">
    // need to rename images as their actual name. 
    fetch('/menu.php')
        .then(response => response.json())
        .then(menuItems => {
            menuItems.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('menu-item');
                itemElement.innerHTML = `
                    <a href="item.php?id=${item.id}">
                        
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p>$${item.price}</p>
                    </a>
                `;
                menuContainer.appendChild(itemElement);
            });
        })
        .catch(error => {
            console.error('Error fetching menu items:', error);
        });
});