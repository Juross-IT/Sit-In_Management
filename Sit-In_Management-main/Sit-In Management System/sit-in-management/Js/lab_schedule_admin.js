document.addEventListener("DOMContentLoaded", () => {
    const scheduleForm = document.getElementById("scheduleUploadForm");
    const scheduleFile = document.getElementById("scheduleFile");
    const scheduleList = document.getElementById("scheduleList");
  
    // Load existing schedules
    const schedules = JSON.parse(localStorage.getItem("labSchedules")) || [];
  
    function renderSchedules() {
      scheduleList.innerHTML = "";
      schedules.forEach((schedule, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${schedule.data}" download="${schedule.name}">${schedule.name}</a>
          <button onclick="deleteSchedule(${index})">Delete</button>`;
        scheduleList.appendChild(li);
      });
    }
  
    // Upload handler
    scheduleForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const file = scheduleFile.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function () {
          schedules.push({
            name: file.name,
            data: reader.result,
          });
          localStorage.setItem("labSchedules", JSON.stringify(schedules));
          renderSchedules();
          scheduleForm.reset();
        };
        reader.readAsDataURL(file);
      }
    });
  
    window.deleteSchedule = function (index) {
      schedules.splice(index, 1);
      localStorage.setItem("labSchedules", JSON.stringify(schedules));
      renderSchedules();
    };
  
    renderSchedules();
  });
  