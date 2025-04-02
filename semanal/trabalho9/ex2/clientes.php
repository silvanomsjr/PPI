<?php

class Cliente
{
  public $nome; 
  public $cpf; 
  public $email; 
  public $senha; 
  public $cep; 
  public $endereco; 
  public $bairro; 
  public $cidade; 
  public $estado; 

  function __construct($nome, $cpf, $email, $senha, $cep, $endereco, $bairro, $cidade, $estado)
  {
    $this->nome = $nome;
    $this->cpf = $cpf;
    $this->email = $email;
    $this->senha = $senha;
    $this->cep = $cep;
    $this->endereco = $endereco;
    $this->bairro = $bairro;
    $this->cidade = $cidade;
    $this->estado = $estado;
  }

  public function SalvaEmArquivo()
  {
    // Abre o arquivo de texto para escrita de conteúdo no final
    $arq = fopen("clientes.txt", "a");

    // Neste exemplo os dados são armazenados de maneira simplificada,
    // no formato textual com campos separados por dois ponto-e-vírgula.
    fwrite($arq, "{$this->nome};{$this->cpf};{$this->email};{$this->senha};{$this->cep};{$this->endereco};{$this->bairro};{$this->cidade};{$this->estado}\n");

    // Fecha o arquivo de texto.
    echo "Salvou tudo aqui;";
    fclose($arq);
  }
}

// Carrega as informações dos Clientes do arquivo de texto
// e retorna um array de objetos correspondente
function carregaClientesDeArquivo()
{
  $arrayClientes = [];

  $arq = fopen("clientes.txt", "r");
  if (!$arq)
    return $arrayClientes;

  // Le os dados do arquivo, linha por linha, e armazena no vetor $Clientes
  while (!feof($arq)) {
    // fgets lê uma linha de texto do arquivo, mas traz junto a quebra de linha (/n) no final, se houver
    // a função trim elimina caracteres em branco (inclusive /n) do início e do final da string
    $cliente = trim(fgets($arq));

    if ($cliente != "") {
      // Separa dados na linha utilizando o ';' como separador
      list($nome, $cpf, $email, $senha, $cep, $endereco, $bairro, $cidade, $estado) = array_pad(explode(';', $cliente), 3, null);

      // Cria novo objeto representado o contato e adiciona no final do array
      $novoContato = new Cliente($nome, $cpf, $email, $senha, $cep, $endereco, $bairro, $cidade, $estado);
      $arrayClientes[] = $novoContato;
    }
  }

  // Fecha o arquivo
  fclose($arq);
  return $arrayClientes;
}
