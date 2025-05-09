document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
  
    if (username && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
  
      // Find the user matching username and password
      const user = users.find(u => u.username === username && u.password === password);
  
      if (user) {
        // Login successful, save user session
        localStorage.setItem("currentUser", JSON.stringify(user));
  
        if (user.role === "admin") {
          // Redirect to Admin Dashboard
          window.location.href = "admin_dashboard.html";
        } else {
          // Redirect to User Dashboard
          window.location.href = "user_dashboard.html";
        }
      } else {
        alert("Invalid username or password.");
      }
    } else {
      alert("Please enter both username and password.");
    }
  });
  