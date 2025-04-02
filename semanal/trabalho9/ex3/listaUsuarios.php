<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <!-- 1: Tag de responsividade -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Página Dinâmica - Listagem de Usuários</title>

  <!-- 2: Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous">
</head>

<body>

  <div class="container">

    <h3>Clientes Carregados do Arquivo <i>Clientes.txt</i></h3>

    <table class="table table-striped">
      <thead>
        <tr>
          <th>Email</th>
          <th>Senha HASH</th>
        </tr>
      </thead>

      <tbody>
        <?php
        require "usuario.php";
        $arrayClientes = carregaUsuarios();
        foreach ($arrayClientes as $usuario) {
          $email = htmlspecialchars($usuario->email);
          $senha = htmlspecialchars($usuario->senha);
          echo <<<HTML
            <tr>
              <td>$email</td>
              <td>$senha</td>
            </tr>
          HTML;
        }
        ?>
      </tbody>
    </table>
    <a href="index.html">Voltar à página inicial</a>
  </div>

</body>

</html>
