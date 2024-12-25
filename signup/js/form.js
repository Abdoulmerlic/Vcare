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

function validateForm(step) {
    const form = document.getElementById(`${step}Form`);
    if (!form.checkValidity()) {
        form.reportValidity();
        return false;
    }
    return true;
}

function nextStep(nextPage, currentStep) {
    if (validateForm(currentStep)) {
        window.location.href = nextPage;
    }
}

function prevStep(prevPage) {
    window.location.href = prevPage;
}

document.addEventListener('DOMContentLoaded', loadData); 