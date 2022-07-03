/* Perform lazy validation until an error is triggered on unfocus
 * Change to aggressive validation until error is fixed
 * Revert to lazy validation */

const allInput = document.querySelectorAll("input");

allInput.forEach(e => e.addEventListener('blur', validateInput)); // Add lazy validation to all inputs

function validateInput() {
  const errorMessage = this.nextElementSibling;
  // If input is invalid, activate error formatting and change to aggressive validation
  if (!this.validity.valid) {
    errorMessage.textContent = "* Please enter a valid value";
    this.classList.add("error");
    toAggressive(this, validateInput);
  } else {
    // If input is valid, remove error formatting and change back to lazy validation
    errorMessage.textContent = "";
    this.classList.remove("error");
    toLazy(this,validateInput);
    if (this.id == "password" || this.id == "confirm-password") validatePasswordMatch();
  }
  return;
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
  } else if (pw.validity.valid && confirmPw.validity.valid) {
    confirmPwError.textContent = "";
    confirmPw.classList.remove("pw-error");
    pw.classList.remove("pw-error");
    toLazy(pw, validatePasswordMatch);
    toLazy(confirmPw, validatePasswordMatch);
  }
  return;
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