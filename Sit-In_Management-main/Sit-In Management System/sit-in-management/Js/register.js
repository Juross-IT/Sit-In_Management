document.getElementById("registerForm").addEventListener("submit", function(e) {
    e.preventDefault();
  
    const idNo = document.getElementById("idNo").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const firstName = document.getElementById("firstName").value.trim();
    const middleName = document.getElementById("middleName").value.trim();
    const course = document.getElementById("course").value.trim();
    const yearLevel = document.getElementById("yearLevel").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = idNo; // Username is IDNO
    const password = document.getElementById("password").value.trim();
  
    if (idNo && lastName && firstName && middleName && course && yearLevel && email && username && password) {
      let users = JSON.parse(localStorage.getItem("users")) || [];
      
      // Check if username already exists
      if (users.some(user => user.username === username)) {
        alert("Username already exists. Please choose a different username.");
        return;
      }
  
      // Create new user object
      const newUser = {
        idNo,
        lastName,
        firstName,
        middleName,
        course,
        yearLevel,
        email,
        username,
        password,
        role: "user" // default role
      };
  
      // Add user to localStorage
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
  
      alert("Registration successful! You can now log in.");
      window.location.href = "login.html"; // Redirect to login page
    } else {
      alert("Please fill in all fields.");
    }
  });
  