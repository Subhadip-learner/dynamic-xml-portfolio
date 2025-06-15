document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("signup-form");
  const messageDiv = document.getElementById("message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    messageDiv.textContent = "";
    messageDiv.className = "";

    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form["confirm-password"].value;

    if (!username || username.length < 3) {
      showMessage("Username must be at least 3 characters.", "error");
      return;
    }
    if (!validateEmail(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }
    if (!password || password.length < 6) {
      showMessage("Password must be at least 6 characters.", "error");
      return;
    }
    if (password !== confirmPassword) {
      showMessage("Passwords do not match.", "error");
      return;
    }

   
    const data = new URLSearchParams();
    data.append("username", username);
    data.append("email", email);
    data.append("password", password);

    
    fetch("signup_submit.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: data.toString(),
    })
      .then((response) => {
        if (response.redirected) {
          window.location.href = response.url;
          return;
        }
        return response.json();
      })
      .then((result) => {
        if (result && !result.success) {
          showMessage(result.message || "Signup failed. Please try again.", "error");
        } else if (result && result.success) {
          alert("Your account has been created");
          window.location.href = "../login/login.html";
        }
      })
      .catch(() => {
        showMessage("An error occurred. Please try again later.", "error");
      });
  });

  function showMessage(msg, type) {
    messageDiv.textContent = msg;
    messageDiv.className = type;
  }

  function validateEmail(email) {
    const re = /^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$/;
    return re.test(email);
  }
});
