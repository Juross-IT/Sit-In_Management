const leaderboardBody = document.getElementById("leaderboardBody");
const users = JSON.parse(localStorage.getItem("users")) || [];
const pointsData = JSON.parse(localStorage.getItem("points")) || [];

// Merge users and points
const leaderboardData = users
  .filter(u => u.role === "user") // Only students
  .map(user => {
    const pointEntry = pointsData.find(p => p.id === user.username);
    const points = pointEntry ? pointEntry.points : 0;
    const sessions = Math.floor(points / 3);
    return {
      idNo: user.idNo,
      name: `${user.lastName}, ${user.firstName}`,
      course: user.course,
      points,
      sessions
    };
  })
  .sort((a, b) => b.points - a.points);

// Render leaderboard
leaderboardBody.innerHTML = leaderboardData.map((u, index) => `
  <tr>
    <td>${index + 1}</td>
    <td>${u.idNo}</td>
    <td>${u.name}</td>
    <td>${u.course}</td>
    <td>${u.points}</td>
    <td>${u.sessions}</td>
  </tr>
`).join("");
