function displayReservations() {
    const reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    const tableBody = document.querySelector("#adminReservationTable tbody");
    const filter = document.getElementById("filterStatus").value;
    tableBody.innerHTML = '';
  
    reservations.forEach((res, index) => {
      if (filter !== "all" && res.status !== filter) return;
  
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${res.id}</td>
        <td>${res.name}</td>
        <td>${res.purpose}</td>
        <td>${res.lab}</td>
        <td>${res.date}</td>
        <td>${res.time}</td>
        <td>${res.status}</td>
        <td>
          ${res.status === 'Pending Approval' ? `
            <button onclick="updateStatus(${index}, 'Approved')">Approve</button>
            <button onclick="updateStatus(${index}, 'Rejected')">Reject</button>
          ` : '—'}
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function addPoints(id, name, amount) {
    let pointsList = JSON.parse(localStorage.getItem("points")) || [];
  
    const existing = pointsList.find(p => p.id === id);
    if (existing) {
      existing.points += amount;
    } else {
      pointsList.push({ id, name, points: amount });
    }
  
    localStorage.setItem("points", JSON.stringify(pointsList));
    displayLeaderboard();
  }
  
  function rewardStudent() {
    const id = document.getElementById("rewardID").value.trim();
    const name = document.getElementById("rewardName").value.trim();
    const amount = parseInt(document.getElementById("rewardAmount").value);
  
    if (!id || !name || isNaN(amount) || amount <= 0) {
      alert("Please fill all fields with valid values.");
      return;
    }
  
    addPoints(id, name, amount);
    alert(`Added ${amount} point(s) to ${name}.`);
  }
  
  function displayLeaderboard() {
    const pointsList = JSON.parse(localStorage.getItem("points")) || [];
    const tableBody = document.querySelector("#leaderboardTable tbody");
    tableBody.innerHTML = '';
  
    pointsList.sort((a, b) => b.points - a.points); // highest first
  
    pointsList.forEach(p => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${p.id}</td>
        <td>${p.name}</td>
        <td>${p.points}</td>
        <td>${Math.floor(p.points / 3)}</td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function renderComputers() {
    const selectedLab = document.getElementById("labSelect").value;
    const grid = document.getElementById("computerGrid");
    grid.innerHTML = "";
  
    if (!selectedLab) return;
  
    let data = JSON.parse(localStorage.getItem("computerStatus")) || {};
    if (!data[selectedLab]) {
      data[selectedLab] = {};
      for (let i = 1; i <= 50; i++) {
        data[selectedLab][`PC ${i}`] = "Available";
      }
      localStorage.setItem("computerStatus", JSON.stringify(data));
    }
  
    const labPCs = data[selectedLab];
  
    const table = document.createElement("table");
    table.innerHTML = `
      <thead><tr><th>PC</th><th>Status</th><th>Action</th></tr></thead>
      <tbody></tbody>
    `;
  
    const tbody = table.querySelector("tbody");
  
    Object.entries(labPCs).forEach(([pc, status]) => {
      const row = document.createElement("tr");
  
      row.innerHTML = `
        <td>${pc}</td>
        <td>${status}</td>
        <td>
          <select onchange="updatePCStatus('${selectedLab}', '${pc}', this.value)">
            <option value="Available" ${status === "Available" ? "selected" : ""}>Available</option>
            <option value="Used" ${status === "Used" ? "selected" : ""}>Used</option>
          </select>
        </td>
      `;
  
      tbody.appendChild(row);
    });
  
    grid.appendChild(table);
  }
  
  function updatePCStatus(lab, pc, newStatus) {
    const data = JSON.parse(localStorage.getItem("computerStatus")) || {};
    if (!data[lab]) return;
  
    data[lab][pc] = newStatus;
    localStorage.setItem("computerStatus", JSON.stringify(data));
  }
  