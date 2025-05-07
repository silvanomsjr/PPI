const botaoLogout = document.querySelector(".confirm-logout");

botaoLogout.addEventListener("click", fazerLogout)

async function fazerLogout() {
  const response = await fetch("/controller.php?acao=logout", {
    credentials: "include",
  });

  if (response.status === 200) {
    window.location.href = "/";
  }

  return null;

}
