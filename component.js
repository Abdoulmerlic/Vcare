import { signUp } from "./authService.js";

// Event listener for sign-up form
document.getElementById("signupForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form inputs
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;
  const name = document.getElementById("signupName").value;
  const age = document.getElementById("signupAge").value;
  const phone = document.getElementById("signupPhone").value;
  const address = document.getElementById("signupAddress").value;
  const bloodGroup = document.getElementById("signupBloodGroup").value;

  const patientData = {
    name,
    age,
    phone,
    address,
    bloodGroup,
  };

  try {
    const user = await signUp(email, password, patientData);
    alert(`User signed up successfully: ${user.email}`);
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
