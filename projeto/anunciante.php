<?php

class Anunciante
{
    /**
     * @param mixed $pdo
     * @param string $nome
     * @param string $cpf
     * @param string $email
     * @param string $telefone
     * @param string $senhaHash
     */
    public static function Create($pdo, $nome, $cpf, $email, $telefone, $senhaHash): int {
        $stmt = $pdo->prepare(
            <<<SQL
            INSERT INTO Anunciante (Nome, Cpf, Email, SenhaHash, Telefone)
            VALUES (?, ?, ?, ?, ?)
            SQL
        );

        $stmt->execute([$nome, $cpf, $email, $senhaHash, $telefone]);

        return (int) $pdo->lastInsertId();
    }

    /**
     * @param mixed $pdo
     * @param int $id
     */
    public static function Get($pdo, $id): object {
        $stmt = $pdo->prepare(
            <<<SQL
            SELECT id, nome, cpf, email, senhaHash, telefone
            FROM Anunciante
            WHERE id = ?
            SQL
        );

        $stmt->execute([$id]);

        if ($stmt->rowCount() == 0)
            throw new Exception("Anunciante não localizado");

        $anunciante = $stmt->fetch(PDO::FETCH_OBJ);
        return $anunciante;
    }

    /**
     * @param mixed $pdo
     * @param string $email
     */
    public static function GetByEmail($pdo, $email): object {
        $stmt = $pdo->prepare(
            <<<SQL
            SELECT id, nome, cpf, email, senhaHash, telefone
            FROM Anunciante
            WHERE email = ?
            SQL
        );

        $stmt->execute([$email]);

        if ($stmt->rowCount() == 0)
            throw new Exception("Anunciante não localizado");

        $anunciante = $stmt->fetch(PDO::FETCH_OBJ);
        return $anunciante;
    }

    /**
     * @param mixed $pdo
     */
    public static function GetAll($pdo): array {
        $stmt = $pdo->query(
            <<<SQL
            SELECT id, nome, cpf, email, senhaHash, telefone
            FROM Anunciante
            SQL
        );

        return $stmt->fetchAll(PDO::FETCH_OBJ);
    }

    /**
     * @param mixed $pdo
     * @param int $id
     */
    public static function Remove($pdo, $id): void {
        $stmt = $pdo->prepare(
            <<<SQL
            DELETE FROM Anunciante
            WHERE id = ?
            LIMIT 1
            SQL
        );

        $stmt->execute([$id]);
    }

    /**
     * @param mixed $pdo
     * @param string $email
     * @param string $senha
     */
    public static function Login($pdo, $email, $senha): false|stdClass {
        
        $stmt = $pdo->prepare(
            <<<SQL
            SELECT id, nome, cpf, email, senhaHash, telefone
            FROM Anunciante
            WHERE email = ?
            LIMIT 1
            SQL
        );

        $stmt->execute([$email]);

        if ($stmt->rowCount() == 0) {
            return false; 
        }

        $anunciante = $stmt->fetch(PDO::FETCH_OBJ);


        if (password_verify($senha, $anunciante->senhaHash)) {
            return $anunciante; 
        }

        return false; 
    }
}
?>
