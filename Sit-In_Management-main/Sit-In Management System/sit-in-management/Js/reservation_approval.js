document.addEventListener("DOMContentLoaded", () => {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const tableBody = document.getElementById("reservationTableBody");
  
    const pendingReservations = reservations.filter(res => res.status === "Pending");
  
    if (pendingReservations.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='7'>No pending reservations.</td></tr>";
      return;
    }
  
    pendingReservations.forEach((res, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${res.id}</td>
        <td>${res.name}</td>
        <td>${res.purpose}</td>
        <td>${res.lab}</td>
        <td>${res.date}</td>
        <td>${res.time}</td>
        <td>
          <button onclick="handleApproval(${index}, 'Approved')">Approve</button>
          <button onclick="handleApproval(${index}, 'Rejected')">Reject</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  
    window.handleApproval = function(index, status) {
      const reservationIndex = reservations.findIndex(res => res.status === "Pending");
      if (reservationIndex !== -1) {
        reservations[reservationIndex].status = status;
        localStorage.setItem("reservations", JSON.stringify(reservations));
        alert(`Reservation ${status}`);
        window.location.reload();
      }
    };
  });
  