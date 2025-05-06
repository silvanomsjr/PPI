<?php

require "mysqlconnection.php";
require "anunciante.php";
require "checkLogin.php";

$acao = $_GET['acao'];

$pdo = mysqlConnect();

switch ($acao) {

  case "criarAnunciante":
    try {
      $nome = $_POST['nome'] ?? "";
      $cpf = $_POST['cpf'] ?? "";
      $email = $_POST['email'] ?? "";
      $telefone = $_POST['telefone'] ?? "";
      $senha = $_POST['senha'] ?? "";

      if (!$nome || !$cpf || !$email || !$telefone || !$senha) {
        http_response_code(400);
        exit("Dados incompletos");
      }

      $existente = Anunciante::GetByEmail($pdo, $email);

      if($existente) {
        http_response_code(409);
        exit("Já existe um anunciante com esse email");
      }
      
      $senhaHash = password_hash($senha, PASSWORD_DEFAULT);

      $id = Anunciante::Create($pdo, $nome, $cpf, $email, $telefone, $senhaHash);

      echo "Anunciante criado com ID: $id";

    } catch (Exception $e) {
      throw new Exception("Erro ao criar anunciante: ", $e->getMessage());
    }
    break;
  case "pegaAnunciantes":
    exitWhenNotLoggedIn();
    try {
      $anunciantes = Anunciante::GetAll($pdo); 
      echo json_encode($anunciantes);
    } catch (Exception $e) {
      throw new Exception("Erro ao listar anunciantes: ", $e->getMessage());
    }
    break;
  case "login":
    try {
      $email = $_POST['email'] ?? '';
      $senha = $_POST['senha'] ?? '';

      $loginResult = Anunciante::Login($pdo, $email, $senha);
      
      if(!$loginResult) {
        http_response_code(404);
        exit("Email ou senha incorretos");
      }

      $cookieParams = session_get_cookie_params();
      $cookieParams['httponly'] = true;
      session_set_cookie_params($cookieParams);
      
      session_start();
      $_SESSION['loggedIn'] = true;
      $_SESSION['anunciante'] = $loginResult->nome;
      $_SESSION['cpf'] = $loginResult->cpf;
      $_SESSION['email'] = $email;

      echo "Usuário logado com sucesso";

    } catch (Exception $e) {
        throw new Exception("Erro ao efetuar login: ", $e->getMessage()); 
    }
    break;
  default:
    exit("Ação não disponível");
}

?>
