const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");
const formulario = document.forms.login;

formulario.addEventListener("submit", checkarErros);

function checkarErros(e) {
  const senhaError = senhaInput.nextElementSibling;
  const emailError = emailInput.nextElementSibling;

  let valido = true;

  if (!senhaInput.value) {
    senhaError.style.visibility = "visible";
    valido = false;
  } else {
    senhaError.style.visibility = "hidden";
  }

  if (!emailInput.value) {
    emailError.style.visibility = "visible";
    valido = false;
  } else {
    emailError.style.visibility = "hidden";
  }

  if (!valido) {
    e.preventDefault();
  }
}
