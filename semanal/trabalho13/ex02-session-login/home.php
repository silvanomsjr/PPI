<?php

// Importa a conexão com o banco de dados.
require "conexaoMysql.php";
// Importa o arquivo que possui a função de verificar se o usuário
// está logado.
require "sessionVerification.php";

// Iniciamos a sessão para ter acesso as variáveis de sessão
session_start();
// Verifica se o usuário está logado, se não estiver, encerra o script
exitWhenNotLoggedIn();
$pdo = mysqlConnect();

?>
<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Home</title>
  <style>
    body {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      line-height: 1.5rem;
      background-image: url("images/bg2.jpg");
      background-size: cover;
      margin: 0;
    }

    main {
      width: 60%;
      background-color: #fafafa;
      border: 0.5px solid gray;
      margin: 0;
      padding: 2% 4%;

      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    main>h2 {
      color: limegreen;
    }
  </style>
</head>

<body>

  <main>
    <h2>Dados corretos! Bem vindo, <?php echo $_SESSION['user'] ?>!</h2> <!-- Insere aqui dentro o valor da variável 'user' dentro da sessão -->
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut tenetur distinctio odio vel possimus necessitatibus
      aut ab nesciunt beatae, laudantium at alias, quaerat debitis quam labore fugit dolores amet? Temporibus.</p>
    <hr>
    <p><strong>Dica:</strong> clique em sair e posteriormente tente acessar esta página digitando manualmente 'home.php' no final da barra de endereços do navegador</p>
    <a href="logout.php">SAIR<a>
  </main>

</body>

</html>
