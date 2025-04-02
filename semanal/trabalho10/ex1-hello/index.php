<?php

require "../conexaoMysql.php";
// Aqui criamos a conexão com o banco de dados MYSQL
$pdo = mysqlConnect();

// try - catch para assegurar que tenhamos o EXIT no erro
try {
  // Query SQL a ser executada 
  $sql = <<<SQL
    SELECT nome, telefone
    FROM aluno
  SQL;

  // Envia a consulta para o banco, porém, retorna apenas um objeto do tipo PDOStatement, 
  // que mais pra frente pode ser usado para recuperar o resultado da consulta
  $stmt = $pdo->query($sql);
} 
catch (Exception $e) {
  exit('Ocorreu uma falha: ' . $e->getMessage());
}

?>
<!doctype html>
<html lang="pt-BR">

<head>
  <meta charset="utf-8">
  <!-- 1: Tag de responsividade -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Hello World - Listagem de Dados em Tabela do MySQL</title>

  <!-- 2: Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>

<body>
  <div class="container">
    <h3>Dados na tabela <b>aluno</b></h3>
    <table class="table table-striped table-hover">
      <tr>
        <th>Nome</th>
        <th>Telefone</th>
      </tr>
      <?php
      // Aqui basicamente estamos recuperand os dados da consulta SQL
      while ($row = $stmt->fetch()) 
      {
        // Formatando texto para evitar XSS
        $nome = htmlspecialchars($row['nome']);
        $telefone = htmlspecialchars($row['telefone']);

        echo <<<HTML
        <tr>
          <td>$nome</td> 
          <td>$telefone</td>
        </tr>      
        HTML;
      }
      ?>
    </table>
    <a href="../index.html">Menu de opções</a>
  </div>

</body>

</html>
