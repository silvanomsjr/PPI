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
     * @param mixed $foto1
     * @param mixed $foto2
     * @param mixed $foto3
     */
    public static function Create($pdo, $marca, $modelo, $ano, $cor, $quilometragem, $descricao, $valor, $estado, $cidade, $idAnunciante, $foto1, $foto2, $foto3): int {
      $sql = <<<SQL
        INSERT INTO Anuncio (Marca, Modelo, Ano, Cor, Quilometragem, Descricao, Valor, Estado, Cidade, IdAnunciante)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      SQL;
      $pdo->beginTransaction();

      try {
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

        $idAnuncio = $pdo->lastInsertId();

        $sqlFoto = "INSERT INTO Foto (IdAnuncio, NomeArqFoto) VALUES (?, ?)";

        $stmtFoto = $pdo->prepare($sqlFoto);
        $stmtFoto->execute([$idAnuncio, $foto1]);
        $stmtFoto->execute([$idAnuncio, $foto2]);
        $stmtFoto->execute([$idAnuncio, $foto3]);

        $pdo->commit();
      } catch(Exception $e) {
          $pdo->rollBack();
          error_log($e->getMessage());
          return -1;
      }

      return 1;
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
    public static function GetAll($pdo): array {
      $stmt = $pdo->query(<<<SQL
        SELECT * FROM Anuncio ORDER BY DataHora DESC
      SQL );

      return $stmt->fetchAll(PDO::FETCH_OBJ);
    }
    /**
     * @param mixed $pdo
     * @param mixed $marca
     * @param mixed $modelo
     * @param mixed $cidade
     */
    public static function Filtrar($pdo, $marca, $modelo, $cidade): array {
        $sql = "SELECT * FROM Anuncio WHERE 1=1";
        $params = [];

        if ($marca != 'all') {
            $sql .= " AND Marca = ?";
            $params[] = $marca;
        }

        if ($modelo != 'all') {
            $sql .= " AND Modelo = ?";
            $params[] = $modelo;
        }

        if ($cidade != 'all') {
            $sql .= " AND Cidade = ?";
            $params[] = $cidade;
        }

        $sql .= " ORDER BY DataHora DESC";

        $stmt = $pdo->prepare($sql);
        $stmt->execute($params);

        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * @param mixed $pdo
     * @param int $idAnunciante
     */
    public static function GetAllByAnunciante($pdo, $idAnunciante): array {
      $sql = <<<SQL
        SELECT * FROM Anuncio WHERE IdAnunciante = ? ORDER BY DataHora DESC
      SQL;

      $stmt = $pdo->prepare($sql);
      $stmt->execute([$idAnunciante]);
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
     * @param int $idAnuncio
     * @param int $idAnunciante
     */
    public static function GetByIdAndAnunciante($pdo, $idAnuncio, $idAnunciante): ?stdClass {
        $sql = <<<SQL
            SELECT * FROM Anuncio WHERE Id = ? AND IdAnunciante = ?
        SQL;

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$idAnuncio, $idAnunciante]);
        return $stmt->fetch(PDO::FETCH_OBJ) ?: null;
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
