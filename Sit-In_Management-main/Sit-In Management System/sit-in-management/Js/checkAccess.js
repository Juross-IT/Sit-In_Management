function checkAccess(role) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
    if (!currentUser) {
      // Redirect to login page if no user is logged in
      window.location.href = "login.html";
    } else if (currentUser.role !== role) {
      // Redirect to login page if the role doesn't match
      window.location.href = "login.html";
    }
  }
  