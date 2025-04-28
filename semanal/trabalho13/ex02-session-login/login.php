<?php

require "conexaoMysql.php";

// Classe de resultado de login para retornarmos como response
class LoginResult
{
  public $success;
  public $newLocation;

  function __construct($success, $newLocation)
  {
    $this->success = $success;
    $this->newLocation = $newLocation;
  }
}


// Função para a realização do login do usuário, onde receberemos o email e senha,
// e devemos comparar com os dados resgatados pelo banco SQL.
function checkUserCredentials($pdo, $email, $senha)
{
  $sql = <<<SQL
    SELECT senhaHash
    FROM cliente
    WHERE email = ?
    SQL;

  try {
    // É necessário utilizar prepared statements por incluir
    // parâmetros informados pelo usuário
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$email]);
    $senhaHash = $stmt->fetchColumn(); // Pegamos a coluna de "senhaHash" do banco

    if (!$senhaHash) // Caso usuário não tenha senha, isso pode significar que não encontrados dados com usuários com este email.
      return false; // a consulta não retornou nenhum resultado (email não encontrado)

    if (!password_verify($senha, $senhaHash))
      return false; // email e/ou senha incorreta
      
    // email e senha corretos
    return true;
  } 
  catch (Exception $e) {
    exit('Falha inesperada: ' . $e->getMessage());
  }
}

$email = $_POST['email'] ?? '';
$senha = $_POST['senha'] ?? '';

$pdo = mysqlConnect();
if (checkUserCredentials($pdo, $email, $senha)) {
  // Define o parâmetro 'httponly' para o cookie de sessão, para que o cookie
  // possa ser acessado apenas pelo navegador nas requisições http (e não por código JavaScript).
  // Aumenta a segurança evitando que o cookie de sessão seja roubado por eventual
  // código JavaScript proveniente de ataq. X S S.
  $cookieParams = session_get_cookie_params();
  $cookieParams['httponly'] = true;
  session_set_cookie_params($cookieParams); // Aplica os cookies dentro da aplicação
  
  session_start(); // Inicializa a sessão
  $_SESSION['loggedIn'] = true;
  $_SESSION['user'] = $email;
  $response = new LoginResult(true, 'home.php'); // Coloca o LoginResult na variável de Response
} 
else
  $response = new LoginResult(false, '');
 // Coloca também LoginResult como response,
 // mas apenas caso tenha ocorrido algum erro com o login do usuário

header('Content-Type: application/json; charset=utf-8'); // Seta alguns headers
echo json_encode($response); // Retorna a response
