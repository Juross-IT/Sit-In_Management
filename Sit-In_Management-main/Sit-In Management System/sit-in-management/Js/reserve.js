document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const idField = document.getElementById("idNo");
    const nameField = document.getElementById("studentName");
    const remainingSessionsField = document.getElementById("remainingSessions");
  
    if (currentUser) {
      idField.value = currentUser.idNo;
      nameField.value = `${currentUser.firstName} ${currentUser.middleName} ${currentUser.lastName}`;
  
      // Fetch points and calculate remaining sessions
      const pointsList = JSON.parse(localStorage.getItem("points")) || [];
      const userPoints = pointsList.find(p => p.id === currentUser.username);
      const totalPoints = userPoints ? userPoints.points : 0;
      const sessions = Math.floor(totalPoints / 3);
      remainingSessionsField.value = sessions;
    }
  
    document.getElementById("reserveForm").addEventListener("submit", (e) => {
      e.preventDefault();
  
      const newReservation = {
        id: currentUser.username,
        name: nameField.value,
        purpose: document.getElementById("purpose").value,
        lab: document.getElementById("lab").value,
        date: document.getElementById("date").value,
        time: document.getElementById("timeIn").value,
        status: "Pending"
      };
  
      const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
      reservations.push(newReservation);
      localStorage.setItem("reservations", JSON.stringify(reservations));
  
      alert("Reservation submitted for approval!");
      document.getElementById("reserveForm").reset();
      idField.value = currentUser.idNo;
      nameField.value = `${currentUser.firstName} ${currentUser.middleName} ${currentUser.lastName}`;
      remainingSessionsField.value = sessions;
    });
  });
  