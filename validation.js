/* Perform lazy validation until an error is triggered on unfocus
 * Change to aggressive validation until error is fixed
 * Revert to lazy validation */

const allInput = document.querySelectorAll("input");

allInput.forEach(e => e.addEventListener('blur', () => validateInput(e))); // Add lazy validation to all inputs

function validateInput(input) {
  const errorMessage = input.nextElementSibling;
  // If input is invalid, activate error formatting and change to aggressive validation
  if (!input.validity.valid) {
    errorMessage.textContent = "* Please enter a valid value";
    input.classList.add("error");
    toAggressive(input, () => validateInput(input));
    return 1;
  } else {
    // If input is valid, remove error formatting and change back to lazy validation
    errorMessage.textContent = "";
    input.classList.remove("error");
    toLazy(input, () => validateInput(input));
    if (input.id == "password" || input.id == "confirm-password") validatePasswordMatch();
    return 0;
  }
}

// Additional validation that the two password fields should match

const pw = document.getElementById("password");
const confirmPw = document.getElementById("confirm-password");

function validatePasswordMatch() {
  const pwError = pw.nextElementSibling;
  const confirmPwError = confirmPw.nextElementSibling;

  if (pw.validity.valid && confirmPw.validity.valid && pw.value != confirmPw.value) {
    confirmPwError.textContent = "* Passwords do not match";
    confirmPw.classList.add("pw-error");
    pw.classList.add("pw-error");
    toAggressive(pw, validatePasswordMatch);
    toAggressive(confirmPw, validatePasswordMatch);
    return 1;
  } else if (pw.validity.valid && confirmPw.validity.valid) {
    confirmPwError.textContent = "";
    confirmPw.classList.remove("pw-error");
    pw.classList.remove("pw-error");
    toLazy(pw, validatePasswordMatch);
    toLazy(confirmPw, validatePasswordMatch);
    return 0;
  }
  return 1;
}

function toAggressive(e, func) {
  e.removeEventListener("blur", func);
  e.addEventListener('input', func);
  return;
}

function toLazy(e, func) {
  e.removeEventListener("input", func);
  e.addEventListener("blur", func);
  return;
}

/* Validate on form submission */

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  let errors = 0;
  allInput.forEach(f => errors += validateInput(f)); // validateInput returns 1 if error, so this counts errors
  if (errors > 0) e.preventDefault(); // Prevent form submission if there are errors
})