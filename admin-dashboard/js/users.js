// Modal functionality
const modal = document.getElementById("historyModal");
const span = document.getElementsByClassName("close")[0];

function viewHistory(patientId) {
    modal.style.display = "block";
    // Here you would typically fetch the patient's medical history
    // and populate the historyContent div
    const historyContent = document.getElementById("historyContent");
    historyContent.innerHTML = `<p>Loading medical history for patient ${patientId}...</p>`;
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
} 