<?php

class Paciente
{
  static function Create($pdo, $nome, $sexo, $email, $peso, $altura, $tipoSanguineo) 
  {
    try {
      $pdo->beginTransaction();

      $stmt1 = $pdo->prepare(
        <<<SQL
        INSERT INTO pessoa (nome, sexo, email)
        VALUES (?, ?, ?)
        SQL
      );
      $stmt1->execute([$nome, $sexo, $email]);

      $idNovaPessoa = $pdo->lastInsertId();
      $stmt2 = $pdo->prepare(
        <<<SQL
        INSERT INTO paciente (peso, altura, tipoSanguineo, idPessoa)
        VALUES (?, ?, ?, ?)
        SQL
      );
      $stmt2->execute([$peso, $altura, $tipoSanguineo, $idNovaPessoa]);

      $pdo->commit();
    } 
    catch (Exception $e) {
      $pdo->rollBack();
      throw $e;
    }

    return $pdo->lastInsertId();
  }

  static function GetFirst30($pdo)
  {
    $stmt = $pdo->query(
      <<<SQL
      SELECT pessoa.id, nome, sexo, email, peso, altura, tipoSanguineo 
      FROM pessoa INNER JOIN paciente ON pessoa.id = paciente.idPessoa
      LIMIT 30
      SQL
    );

    $arrayPacientes = $stmt->fetchAll(PDO::FETCH_OBJ);
    return $arrayPacientes;
  }
}
