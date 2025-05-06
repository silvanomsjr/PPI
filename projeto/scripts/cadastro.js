const nomeInput = document.querySelector("#nome");
const cpfInput = document.querySelector("#cpf");
const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");
const telefoneInput = document.querySelector("#telefone");

const formulario = document.forms.cadastro;

formulario.addEventListener("submit", checkarErros);

function checkarErros(e) {
  const nomeError = nomeInput.nextElementSibling;
  const cpfError = cpfInput.nextElementSibling;
  const emailError = emailInput.nextElementSibling;
  const senhaError = senhaInput.nextElementSibling;
  const telefoneError = telefoneInput.nextElementSibling;

  let valido = true;

  if (!nomeInput.value) {
    nomeError.style.visibility = "visible";
    valido = false;
  } else {
    nomeError.style.visibility = "hidden";
  }

  if (!cpfInput.value) {
    cpfError.style.visibility = "visible";
    valido = false;
  } else {
    cpfError.style.visibility = "hidden";
  }

  if (!emailInput.value) {
    emailError.style.visibility = "visible";
    valido = false;
  } else {
    emailError.style.visibility = "hidden";
  }

  if (!senhaInput.value) {
    senhaError.style.visibility = "visible";
    valido = false;
  } else {
    senhaError.style.visibility = "hidden";
  }

  if (!telefoneInput.value) {
    telefoneError.style.visibility = "visible";
    valido = false;
  } else {
    telefoneError.style.visibility = "hidden";
  }

  if (!valido) {
    e.preventDefault();
  }
}
