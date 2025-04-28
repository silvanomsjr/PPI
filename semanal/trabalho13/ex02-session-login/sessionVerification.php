<?php

function exitWhenNotLoggedIn()
{ 
  // Verifica se a variável de sessão 'loggedIn' NÃO está definida 
  if (!isset($_SESSION['loggedIn'])) {
    // Caso não esteja definida, 
    // iremos redirecionar o usuário para a página de login 'index.html'
    header("Location: index.html");
    // Após enviar o cabeçalho de redirecionamento, termina a execução do código
    exit();  
  }
}
