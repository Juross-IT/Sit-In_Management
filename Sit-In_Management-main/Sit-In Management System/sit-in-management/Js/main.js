function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }
  
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
  }
  
  function checkAccess(roleRequired) {
    const user = getCurrentUser();
    if (!user || user.role !== roleRequired) {
      alert("Access denied!");
      window.location.href = "index.html";
    }
  }
  