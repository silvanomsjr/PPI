<?php
session_start();

function authenticateUser() { 
  if (!isset($_SESSION['loggedIn']) || $_SESSION['loggedIn'] !== true) {
    header("Content-Type: application/json");
    http_response_code(401);
    echo json_encode(['logado' => false, 'erro' => 'Sessão expirada ou usuário não autenticado']);
    exit();  
  } else {
    echo json_encode(['logado' => true]);
    return;
  }
}

?>
