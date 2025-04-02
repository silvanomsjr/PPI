<?php
require "usuario.php";

$email = $_POST["email"] ?? "";
$senha = $_POST["senha"] ?? "";

$novoUsuario = new Usuario($email, $senha);
$novoUsuario->salvaEmArquivo();

header("location: listaUsuarios.php");

?>
