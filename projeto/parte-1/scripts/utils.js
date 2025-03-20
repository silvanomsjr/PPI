const botaoLogout = document.querySelector(".confirm-logout");

botaoLogout.addEventListener("click", fazerLogout)

function fazerLogout() {
  const urlAtual = window.location.origin;
  window.location.href = urlAtual + "/index.html"; 
}
