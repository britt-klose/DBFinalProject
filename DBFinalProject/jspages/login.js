document.querySelector("form[name='mydbform']").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await fetch("http://localhost:8081/loginAccount", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message); // Display success message
            //window.location.href = ""; // Redirect to a welcome page
        } else {
            alert(result.error); // Display error message
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An unexpected error occurred.");
    }
});