document.addEventListener("DOMContentLoaded", () => {
    const logTableBody = document.getElementById("logTableBody");
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
  
    if (reservations.length === 0) {
      logTableBody.innerHTML = "<tr><td colspan='7'>No reservation logs found.</td></tr>";
      return;
    }
  
    reservations.forEach(res => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${res.id}</td>
        <td>${res.name}</td>
        <td>${res.lab}</td>
        <td>${res.purpose}</td>
        <td>${res.date}</td>
        <td>${res.time}</td>
        <td>${res.status}</td>
      `;
      logTableBody.appendChild(row);
    });
  });
  