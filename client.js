document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Create a FormData object to capture the form data
    const formData = new FormData(this);

    // Send the data to the server
    fetch('/register', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Registration failed');
        }
    })
    .then(data => {
        alert(data); // Show success message
        // Optionally, reset the form
        this.reset();
    })
    .catch(error => {
        alert(error.message);
    });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Create an object to hold the login data
    const loginData = {
        email: this.querySelector('input[type="email"]').value,
        password: this.querySelector('input[type="password"]').value
    };

    // Send the login data to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error('Login failed');
        }
    })
    .then(data => {
        alert(data); // Show success message
        // Optionally, redirect to another page or reset the form
        this.reset();
    })
    .catch(error => {
        alert(error.message);
    });
});