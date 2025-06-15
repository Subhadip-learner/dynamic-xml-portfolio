document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const emailInput = document.getElementById('email').value.trim();
  const passwordInput = document.getElementById('password').value.trim();
  const errorMsg = document.getElementById('errorMsg');
  errorMsg.textContent = '';

  fetch('../data/users.xml')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load user data');
      }
      return response.text();
    })
    .then(str => {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(str, "application/xml");
      const users = xmlDoc.getElementsByTagName('user');
      let authenticated = false;

      for (let i = 0; i < users.length; i++) {
        const email = users[i].getElementsByTagName('email')[0].textContent;
        const password = users[i].getElementsByTagName('password')[0].textContent;
        if (email === emailInput && password === passwordInput) {
          authenticated = true;
          break;
        }
      }

      if (authenticated) {
        alert('Login successful! Redirecting to dashboard...');
        window.location.href = '../SetMyProfile/dashboard.html?email=' + encodeURIComponent(emailInput);
      } else {
        errorMsg.textContent = 'Invalid email or password.';
      }
    })
    .catch(error => {
      errorMsg.textContent = 'Error loading user data.';
      console.error(error);
    });
});
