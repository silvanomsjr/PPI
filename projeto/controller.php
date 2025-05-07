<?php

require "mysqlconnection.php";
require "anunciante.php";
require "anuncio.php";
require "interesse.php";
require "checkLogin.php";

session_start();

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
      throw new Exception("Erro ao criar anunciante: " . $e->getMessage());
    }
    break;
  case "pegaAnunciantes":
    try {
      $anunciantes = Anunciante::GetAll($pdo); 
      echo json_encode($anunciantes);
    } catch (Exception $e) {
      throw new Exception("Erro ao listar anunciantes: " . $e->getMessage());
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
      
      $_SESSION['loggedIn'] = true;
      $_SESSION['anunciante'] = $loginResult->nome;
      $_SESSION['cpf'] = $loginResult->cpf;
      $_SESSION['email'] = $email;
      $_SESSION['id'] = $loginResult->id;

      echo "Usuario logado com sucesso";

    } catch (Exception $e) {
        throw new Exception("Erro ao efetuar login: " . $e->getMessage()); 
    }
    break;
  case "logout":
    try {
      if (session_status() == PHP_SESSION_NONE) {
          session_start();
      }

      session_unset(); 
      session_destroy(); 

      setcookie(session_name(), "", 1, "/");
      echo "Usuário desconectado com sucesso";

    } catch (Exception $e) {
      throw new Exception("Erro ao efetuar logout: " . $e->getMessage());
    }
    break;
  case "cadastraAnuncio":
    if(!isset($_SESSION['loggedIn'])) {
      http_response_code(400);
      echo "Deslogado";
      return;
    } 
    try {
        $marca = $_POST['marca'] ?? '';
        $modelo = $_POST['modelo'] ?? '';
        $ano = $_POST['ano'] ?? '';
        $cor = $_POST['cor'] ?? '';
        $km = $_POST['km'] ?? '';
        $descricao = $_POST['descricao'] ?? '';
        $valor = $_POST['valor'] ?? '';
        $estado = $_POST['estado'] ?? '';
        $cidade = $_POST['cidade'] ?? '';
        $foto1 = $_POST['foto1'] ?? '';
        $foto2 = $_POST['foto2'] ?? '';
        $foto3 = $_POST['foto3'] ?? '';

        if (
          empty($marca) || empty($modelo) || empty($ano) || empty($cor) || empty($km) || empty($descricao) ||
          empty($valor) || empty($estado) || empty($cidade) || empty($foto1) || empty($foto2) || empty($foto3)
        ) {
            http_response_code(400);
            exit("Todos os campos devem ser preenchidos");
        }
        $idAnunciante = $_SESSION['id'];

        $anuncioId = Anuncio::Create($pdo, $marca, $modelo, $ano, $cor, $km, $descricao, $valor, $estado, $cidade, $idAnunciante, $foto1, $foto2, $foto3);

        if ($anuncioId == 1) {
            echo "Anúncio criado com sucesso!";
        } else {
            http_response_code(500);
            exit("Erro ao criar o anúncio");
        }

    } catch (Exception $e) {
        throw new Exception("Erro ao realizar o cadastro: " . $e->getMessage());
    }
    break;
  case "autenticaUsuario":
    error_log("Chamando autenticaUsuario");
    authenticateUser(); 
    break;
  case "listaAnunciosAnunciante":
    if(!isset($_SESSION['loggedIn'])) {
      http_response_code(400);
      echo "Deslogado";
      return;
    } 
    try {
      $idAnunciante = $_SESSION['id'];

      $anuncios = Anuncio::GetAllByAnunciante($pdo, $idAnunciante);
    
      echo json_encode($anuncios);

    } catch (Exception $e) {
      throw new Exception("Erro ao listar anúncios " . $e->getMessage());
    }
    break;
  case "listaTodosAnuncios":
    try {
      $anuncios = Anuncio::GetAll($pdo);
    
      echo json_encode($anuncios);

    } catch (Exception $e) {
      throw new Exception("Erro ao listar anúncios " . $e->getMessage());
    }
    break;
  case "filtrarAnuncios":
    $marca = $_GET['marca'] ?? '';
    $modelo = $_GET['modelo'] ?? '';
    $cidade = $_GET['cidade'] ?? '';

    try {
      $anunciosFiltrados = Anuncio::Filtrar($pdo, $marca, $modelo, $cidade);
      echo json_encode($anunciosFiltrados);
    } catch (Exception $e) {
      throw new Exception("Erro ao listar anúncios " . $e->getMessage());
    }
    break;
  case "pegaAnuncio":
    // if(!isset($_SESSION['loggedIn'])) {
    //   echo "Deslogado";
    //   return;
    // } 
    try {
      $idAnuncio = $_GET['idAnuncio'] ?? '';

      $anuncio = Anuncio::GetById($pdo, $idAnuncio);
      echo json_encode($anuncio);

    } catch (Exception $e) {
      throw new Exception("Erro ao pegar anúncio " . $e->getMessage());
    }
    break;

  case "deletaAnuncio":
    if(!isset($_SESSION['loggedIn'])) {
      http_response_code(400);
      echo "Deslogado";
      return;
    } 

    try {
      $idAnuncio = $_GET['idAnuncio'] ?? '';

      $anuncio = Anuncio::Delete($pdo, $idAnuncio);
      echo json_encode($anuncio);

    } catch (Exception $e) {
      throw new Exception("Erro ao pegar anúncio " . $e->getMessage());
    }
    break;

  case "criaInteresse":
    try {
      $idAnuncio = $_GET['idAnuncio'] ?? '';

      $nome = $_POST['nome'] ?? "";
      $telefone = $_POST['telefone'] ?? "";
      $mensagem = $_POST['mensagem'] ?? "";

      if (empty($idAnuncio) || empty($nome) || empty($telefone) || empty($mensagem)) {
        http_response_code(400);
        exit("Dados incompletos");
      }

      $id = Interesse::Create($pdo, $nome, $telefone, $mensagem, $idAnuncio);

      echo "Interesse criado com ID: $id";

    } catch (Exception $e) {
      throw new Exception("Erro ao enviar interesse " . $e->getMessage());
    }
    break;

  case "pegaInteresses":
    if(!isset($_SESSION['loggedIn'])) {
      http_response_code(400);
      echo "Deslogado";
    } 
    try {
      $idAnuncio = $_GET['idAnuncio'] ?? '';

      $interesses = Interesse::GetByAnuncioId($pdo, $idAnuncio);
      echo json_encode($interesses);

    } catch (Exception $e) {
      throw new Exception("Erro ao pegar anúncio " . $e->getMessage());
    }
    break;
  default:
    exit("Ação não disponível");
}

?>
