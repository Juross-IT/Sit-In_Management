function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorEl = document.getElementById("error");
  
    const users = [
      { username: "admin", password: "admin123", role: "admin" },
      { username: "student", password: "student123", role: "user" }
    ];
  
    const found = users.find(u => u.username === username && u.password === password);
  
    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      if (found.role === "admin") {
        window.location.href = "admin.html";
      } else {
        window.location.href = "user.html";
      }
    } else {
      errorEl.textContent = "Invalid credentials!";
    }
  }
  