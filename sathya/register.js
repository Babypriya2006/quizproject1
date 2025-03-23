document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent default form submission

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let pssw = document.getElementById("pssw").value.trim();
    let confirmPassword = document.getElementById("confirmPassword").value.trim();
    let message = document.getElementById("message");

    // Validate username
    if (username.length < 3) {
        message.textContent = "Username must be at least 3 characters long.";
        return;
    }

    // Validate email format
    let emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
        message.textContent = "Please enter a valid email address.";
        return;
    }

    // Validate password length
    if (pssw.length < 6) {
        message.textContent = "Password must be at least 6 characters long.";
        return;
    }

    // Check if passwords match
    if (pssw !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    // Prepare form data
    let formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("pssw", pssw);

    // Send data to register.php using Fetch API
    fetch("register.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.text()) // Get response as text
    .then(data => {
        message.style.color = "green";
        message.textContent = data; // Display server response
        if (data.includes("Registration successful")) {
            setTimeout(() => {
                window.location.href = "login.html"; // Redirect after 2 seconds
            }, 2000);
        }
    })
    .catch(error => {
        message.style.color = "red";
        message.textContent = "Error: " + error;
    });
    fetch("http://localhost/htdocs/sathya/register.php", {
        method: "POST",
        body: formData
    })
});