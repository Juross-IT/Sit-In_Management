const labSelect = document.getElementById("labSelect");
const computerList = document.getElementById("computerList");

// Load computer status from localStorage
function getComputerStatus(lab) {
  const data = JSON.parse(localStorage.getItem("computerStatus")) || {};
  return data[lab] || Array(50).fill("available");
}

function saveComputerStatus(lab, statusArray) {
  const data = JSON.parse(localStorage.getItem("computerStatus")) || {};
  data[lab] = statusArray;
  localStorage.setItem("computerStatus", JSON.stringify(data));
}

function renderComputers(lab) {
  const statusArray = getComputerStatus(lab);
  computerList.innerHTML = "";

  statusArray.forEach((status, index) => {
    const pcDiv = document.createElement("div");
    pcDiv.className = `pc ${status}`;
    pcDiv.innerText = `PC ${index + 1}`;
    pcDiv.addEventListener("click", () => {
      // Toggle status
      const newStatus = statusArray[index] === "available" ? "used" : "available";
      statusArray[index] = newStatus;
      saveComputerStatus(lab, statusArray);
      renderComputers(lab);
    });
    computerList.appendChild(pcDiv);
  });
}

labSelect.addEventListener("change", () => {
  const selectedLab = labSelect.value;
  if (selectedLab) {
    renderComputers(selectedLab);
  } else {
    computerList.innerHTML = "";
  }
});
