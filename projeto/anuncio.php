<?php

class Anuncio {
    /**
     * @param mixed $pdo
     * @param mixed $marca
     * @param mixed $modelo
     * @param mixed $ano
     * @param mixed $cor
     * @param mixed $quilometragem
     * @param mixed $descricao
     * @param mixed $valor
     * @param mixed $estado
     * @param mixed $cidade
     * @param mixed $idAnunciante
     */
    public static function Create($pdo, $marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante): int {
    $sql = <<<SQL
      INSERT INTO Anuncio (Marca, Modelo, Ano, Cor, Quilometragem, Descricao, Valor, Estado, Cidade, IdAnunciante)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([
      $marca,
      $modelo,
      $ano,
      $cor,
      $quilometragem,
      $descricao,
      $valor,
      $estado,
      $cidade,
      $idAnunciante
    ]);

    return $pdo->lastInsertId(); // retorna o ID do novo anúncio
  }
    /**
     * @param mixed $pdo
     * @param mixed $id
     */
    public static function GetById($pdo, $id): stdClass {
    $sql = <<<SQL
      SELECT * FROM Anuncio WHERE Id = ?
    SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$id]);
    return $stmt->fetch(PDO::FETCH_OBJ);
  }
    /**
     * @param mixed $pdo
     */
    public static function GetAll($pdo): stdClass {
    $sql = <<<SQL
      SELECT * FROM Anuncio ORDER BY DataHora DESC
    SQL;

    $stmt = $pdo->query($sql);
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }
    /**
     * @param mixed $pdo
     * @param mixed $idAnunciante
     */
    public static function GetByAnunciante($pdo, $idAnunciante): stdClass {
    $sql = <<<SQL
      SELECT * FROM Anuncio WHERE IdAnunciante = ? ORDER BY DataHora DESC
    SQL;

    $stmt = $pdo->prepare($sql);
    $stmt->execute([$idAnunciante]);
    return $stmt->fetchAll(PDO::FETCH_OBJ);
  }
    /**
     * @param mixed $pdo
     * @param mixed $id
     */
    public static function Delete($pdo, $id): bool {
    $sql = <<<SQL
      DELETE FROM Anuncio WHERE Id = ?
    SQL;

    $stmt = $pdo->prepare($sql);
    return $stmt->execute([$id]);
  }
}
