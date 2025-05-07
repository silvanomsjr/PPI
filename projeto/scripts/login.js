const emailInput = document.querySelector("#email");
const senhaInput = document.querySelector("#senha");
const formulario = document.forms.login;

formulario.addEventListener("submit", checkarErros);


window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/controller.php?acao=autenticaUsuario", {
    credentials: "include",
  });

  if (response.status === 200) {
    window.location.href = "/";
  }

  return null;
});

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
  const loginError = document.querySelector(".login-error");

  const url = "../controller.php?acao=login";
  const response = await fetch(url, {
    method: "POST",
    body: new FormData(formulario),
  });
  console.log("resultado: ", response);
  if (!response.ok) {
    loginError.style.visibility = "visible";
    return;
  }

  loginError.style.visibility = "hidden";

  window.location.href = "home.html"

}
