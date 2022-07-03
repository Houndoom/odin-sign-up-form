const allInput = document.querySelectorAll("input");

allInput.forEach(e => e.addEventListener('blur', validateInput));

function validateInput() {
  const errorMessage = this.nextElementSibling;
  if (!this.validity.valid) {
    errorMessage.classList.add("with-error");
    this.classList.add("error");
    toAggressive(this, validateInput);
  } else {
    errorMessage.classList.remove("with-error");
    this.classList.remove("error");
    toLazy(this,validateInput);
  }
  return;
}

const pw = document.getElementById("password");
const confirmPw = document.getElementById("confirm-password");

pw.addEventListener('blur', validatePasswordMatch);
confirmPw.addEventListener('blur', validatePasswordMatch);

function validatePasswordMatch() {
  const pwError = pw.nextElementSibling;
  const confirmPwError = confirmPw.nextElementSibling;

  if (pw.validity.valid && confirmPw.validity.valid && pw.value != confirmPw.value) {
    confirmPwError.textContent = "* Passwords do not match";
    confirmPwError.classList.add("with-pw-error");
    confirmPw.classList.add("pw-error");
    pw.classList.add("pw-error");
    toAggressive(pw, validatePasswordMatch);
    toAggressive(confirmPw, validatePasswordMatch);
  } else if (pw.validity.valid && confirmPw.validity.valid) {
    confirmPwError.textContent = "* Please type in a valid password";
    confirmPwError.classList.remove("with-pw-error");
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