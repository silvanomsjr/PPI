<?php

class Interesse
{
  public static function Create(PDO $pdo, string $nome, string $telefone, ?string $mensagem, int $idAnuncio): int
  {
    $sql = <<<SQL
      INSERT INTO Interesse (Nome, Telefone, Mensagem, IdAnuncio)
      VALUES (?, ?, ?, ?)
    SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$nome, $telefone, $mensagem, $idAnuncio]);
    return (int) $pdo->lastInsertId();
  }

  public static function GetByAnuncioId(PDO $pdo, int $idAnuncio): array
  {
    $sql = <<<SQL
      SELECT Id, Nome, Telefone, Mensagem, DataHora, IdAnuncio
      FROM Interesse
      WHERE IdAnuncio = ?
      ORDER BY DataHora DESC
    SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$idAnuncio]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function Delete(PDO $pdo, int $id): bool
  {
    $sql = <<<SQL
      DELETE FROM Interesse WHERE Id = ?
    SQL;

    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$id]);
  }
}
