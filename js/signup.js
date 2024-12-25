let currentStep = 0;

function showStep(step) {
    const steps = document.querySelectorAll('.form-step');
    steps.forEach((stepElement, index) => {
        stepElement.classList.toggle('active', index === step);
    });

    const progressSteps = document.querySelectorAll('.progress-bar .step');
    progressSteps.forEach((progressStep, index) => {
        progressStep.classList.toggle('active', index <= step);
    });
}

function nextStep() {
    const steps = document.querySelectorAll('.form-step');
    if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    showStep(currentStep);
}); 