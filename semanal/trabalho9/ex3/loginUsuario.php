<?php
require "usuario.php";

$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

if(loginUsuario($email, $senha)) {
  header("Location: login.html?erro=0");
} else {
  header("Location: login.html?erro=1");
}
?>
