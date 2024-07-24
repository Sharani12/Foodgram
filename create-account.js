document.getElementById('create-account-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        alert('Account created successfully');
        window.location.href = 'login.html'; // Redirect to login page
      } else {
        const errorText = await response.text();
        alert('Error: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  });
  