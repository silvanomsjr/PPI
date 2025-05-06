<?php

class Foto
{
  public static function Create(PDO $pdo, int $idAnuncio, string $nomeArqFoto): int
  {
    $sql = <<<SQL
      INSERT INTO Foto (IdAnuncio, NomeArqFoto)
      VALUES (?, ?)
    SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$idAnuncio, $nomeArqFoto]);
    return (int) $pdo->lastInsertId();
  }

  public static function GetByAnuncioId(PDO $pdo, int $idAnuncio): array
  {
    $sql = <<<SQL
      SELECT Id, IdAnuncio, NomeArqFoto
      FROM Foto
      WHERE IdAnuncio = ?
    SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$idAnuncio]);
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
  }

  public static function Delete(PDO $pdo, int $id): bool
  {
    $sql = <<<SQL
      DELETE FROM Foto WHERE Id = ?
    SQL;

    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$id]);
  }
}
