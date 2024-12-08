
function searchLocations() {
    //// Logs that the search function has been triggered.
    console.log("Search function triggered"); 
    // // Retrieves the value from the input field with the id 'searchInput',
    /// converts it to lowercase, and stores it in the variable 'query'.
    const query = document.getElementById('searchInput').value.toLowerCase();
    // Logs the search query to the console for debugging purposes.
    console.log("Searching for:", query);
//GET request is typically used to retrieve data from a server. 
// it's used to fetch location data based on a city name.
//http://localhost:8081 is the base URL
///search is the path on the server that handles search requests.
//?city=${query} is a query string that contains data to be sent to the server. 
    fetch(`http://localhost:8081/search?city=${query}`)
        .then(response => {
            //// Checks if the response from the server is not successful
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            //If the response is successful
            //parses the JSON body of the response to convert it into a JavaScript object.
            return response.json();
        })
        //This code executes a given function once for each element in the data array by traversing it. 
        //Each element represents information about a location.
        .then(data => {
            //document.querySelector('.locations') is a Document Object Model (DOM) method 
            //used to select the first element in the document that matches a specified selector. 
            const locationContainer = document.querySelector('.locations');
            locationContainer.innerHTML = ''; // Empty existing content
            console.log("Data received:", data); // Output received data
            data.forEach(location => {
                const locationElement = document.createElement('article');//HTML element
                locationElement.className = 'location';//for styling purposes.
                //Sets the internal HTML of the ‘locationElement’, including the image, the title with the name and city of the cafe,
                // and the paragraph with the address.
                locationElement.innerHTML = `
                    <img src="${location.image_url}" alt="Java Cafe Interior: ${location.town_city}" width="200" height="150">
                    <h2>Java Cafe - ${location.town_city}</h2>
                    <p>${location.location_address}, ${location.state}, ${location.zipcode}</p>
                `;
                //Add the created ‘locationElement’ to the ‘locationContainer’ to make it part of the DOM
                locationContainer.appendChild(locationElement);
                //Use the appendChild() method to insert the 
                //new element as the last child of the locationContainer.
                //element is visible on the web page
            }); 
        })
        .catch(error => {
            console.error('Error fetching locations:', error);
        });
}
