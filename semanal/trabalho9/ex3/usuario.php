<?php

class Usuario {
  public $email;
  public $senha;

  function __construct($email, $senha) {
    $this->email = $email;
    $this->senha = $senha;
  }

  function salvaEmArquivo() {
    $senha_hash = password_hash($this->senha, PASSWORD_BCRYPT);
    
    $arq = fopen("usuarios.txt", "a");
    fwrite($arq, "{$this->email};{$senha_hash}\n");

    // Fecha o arquivo de texto.
    fclose($arq);
  }
}


function carregaUsuarios() {
  $arrayUsuarios = [];

  $arq = fopen("usuarios.txt", "r");
  if (!$arq)
    return $arrayUsuarios;

  while (!feof($arq)) {
    $usuario = trim(fgets($arq));

    if ($usuario != "") {
      list($email, $senha) = array_pad(explode(';', $usuario), 3, null);

      $novoUsuario = new Usuario($email, $senha);
      $arrayUsuarios[] = $novoUsuario;
    }
  }

  fclose($arq);
  return $arrayUsuarios;
}

function loginUsuario($email_post, $senha_post) {
  $arq = fopen("usuarios.txt", "r");
  if (!$arq)
    return false;

  while (!feof($arq)) {
    $usuario = trim(fgets($arq));

    if ($usuario != "") {
      list($email, $senha) = array_pad(explode(';', $usuario), 3, null);

      if($email_post == $email) {
        $testa_senha = password_verify($senha_post, $senha);
        if ($testa_senha) {
          return true;
        }
        return false;
      }

    }
  }

  fclose($arq);
  return false;
}
