const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");
const formulario = document.forms.login;

formulario.addEventListener("submit", checkarErros);

function checkarErros(e) {
  e.preventDefault();
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

  if (valido) {
    realizaLogin();
  }
}

async function realizaLogin() {
  const url = "http://localhost:8000/controller.php?acao=login";
  const resultado = await fetch(url, {
    method: "POST",
    body: new FormData(formulario)
  }); 
  const json = await resultado.json();
  console.log("json: ", json);
}
