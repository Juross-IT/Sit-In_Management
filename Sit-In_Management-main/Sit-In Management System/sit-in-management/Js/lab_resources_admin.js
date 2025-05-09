const form = document.getElementById("uploadForm");
const tableBody = document.querySelector("#resourceTable tbody");
const currentAdmin = JSON.parse(localStorage.getItem("currentUser")) || { username: "Unknown" };

function loadResources() {
  const resources = JSON.parse(localStorage.getItem("labResources")) || [];
  tableBody.innerHTML = "";

  resources.forEach(resource => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${resource.title}</td>
      <td>${resource.description}</td>
      <td><a href="${resource.fileUrl}" download>Download</a></td>
    `;
    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();
  const fileInput = document.getElementById("file");
  const file = fileInput.files[0];

  if (!file) {
    alert("Please choose a file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    const fileData = event.target.result;

    const newResource = {
      title,
      description,
      uploadedBy: currentAdmin.username,
      fileUrl: fileData
    };

    const resources = JSON.parse(localStorage.getItem("labResources")) || [];
    resources.push(newResource);
    localStorage.setItem("labResources", JSON.stringify(resources));

    alert("Resource uploaded successfully.");
    form.reset();
    loadResources();
  };

  reader.readAsDataURL(file); // Converts file to base64
});

// Initial load
loadResources();
