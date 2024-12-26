function saveData(step) {
    const form = document.getElementById(`${step}Form`);
    const data = new FormData(form);
    for (let [key, value] of data.entries()) {
        localStorage.setItem(key, value);
    }
}

function loadData() {
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (localStorage.getItem(input.name)) {
            input.value = localStorage.getItem(input.name);
        }
    });
}

function nextStep(nextPage) {
    saveData(document.querySelector('.form-step.active').id);
    window.location.href = nextPage;
}

function prevStep(prevPage) {
    window.location.href = prevPage;
}

document.addEventListener('DOMContentLoaded', loadData); 