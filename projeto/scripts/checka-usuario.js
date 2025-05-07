window.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/controller.php?acao=autenticaUsuario", {
    credentials: "include",
  });

  if (response.status === 401) {
    window.location.href = "/login.html";
  }

  return null;
});
