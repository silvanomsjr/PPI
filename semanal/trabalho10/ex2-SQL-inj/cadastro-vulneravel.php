<?php

require "../conexaoMysql.php";
$pdo = mysqlConnect();

$nome = $_POST["nome"] ?? "";
$telefone = $_POST["telefone"] ?? "";

  // Exercício 2:
  // O motivo para o ataque ter acontecido, é que o texto inserido no INSERT,
  // não foi tratado anteriormente, dessa forma, o texto inserido foi um código SQL,
  // e foi executado como um ao executar essa Query  

try {

  /* // NÃO FAÇA ISSO! Exemplo de código vulnerável a inj. de S-Q-L
  $sql = <<<SQL
  INSERT INTO aluno (nome, telefone)
  VALUES ('$nome', '$telefone');
  SQL;   */
  $sql = "
    INSERT INTO aluno (nome, telefone) 
    VALUES (:nome, :telefone)";
  $stmt = $pdo->prepare($sql);
  $stmt->bindParam(":nome", $nome);
  $stmt->bindParam(":telefone", $telefone);

  if ($stmt->execute()) {
    header("location: mostra-alunos.php");
  } else {
    throw new Exception("Falha ao cadastrar os dados");
  }
} 
catch (Exception $e) {  
  exit('Falha ao cadastrar os dados: ' . $e->getMessage());
}
