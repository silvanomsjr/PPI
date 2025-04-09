<?php

$cep = $_GET['cep'] ?? '';

// O código basicamente, checka o CEP enviado pelo método GET,
// e logo após isso, compara com os ceps inseridos no IF para retornar "Uberlândia" ou "Patos de Minas",
// caso não seja nenhum dos dois CEPs o código retorna uma response com código 404, e $cep + " is not available"

if ($cep == '38400-100')
  echo 'Uberlândia';
else if ($cep == '38700-000')
  echo 'Patos de Minas';
else {
  http_response_code(404);
  echo "$cep is not available";
}
