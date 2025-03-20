const id = window.location.search.replace("?", "");

const veiculos = [
  {
    title: "Toyota Corolla",
    marca: "Toyota",
    modelo: "Corolla XEi",
    ano: 2020,
    cidade: "São Paulo - SP",
    valor: "R$ 98.000,00",
    cor: "Vermelho",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "20.000 Km",
    interesses: [
      {
        nome: "Silvano",
        telefone: "34 9 99418527",
        mensagem: "Consegue fazer por 95 em dinheiro vivo?",
      },
      {
        nome: "João Pedro",
        telefone: "21 9 99887766",
        mensagem: "O carro está quitado? Tem algum detalhe a mais?",
      },
    ],
  },
  {
    title: "Honda Civic",
    marca: "Honda",
    modelo: "Civic Touring",
    ano: 2019,
    cidade: "Rio de Janeiro - RJ",
    valor: "R$ 110.000,00",
    cor: "Azul",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "90.000 Km",
    interesses: [
      {
        nome: "Mariana",
        telefone: "11 9 88776655",
        mensagem: "Aceita troca por um Honda Civic 2018?",
      },
    ],
  },
  {
    title: "Ford Ranger",
    marca: "Ford",
    modelo: "Ranger Limited",
    ano: 2021,
    cidade: "Belo Horizonte - MG",
    valor: "R$ 180.000,00",
    cor: "Amarelo",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "150.000 Km",
    interesses: [],
  },
  {
    title: "Volkswagen Golf",
    marca: "Volkswagen",
    modelo: "Golf GTI",
    ano: 2022,
    cidade: "Rio de Janeiro - RJ",
    valor: "R$ 145.000,00",
    cor: "Preto",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "50.000 Km",
    interesses: [
      {
        nome: "Carlos",
        telefone: "19 9 91234567",
        mensagem: "Ainda está disponível? Posso ver pessoalmente?",
      },
    ],
  },
  {
    title: "Fiat Argo",
    marca: "Fiat",
    modelo: "Argo Trekking",
    ano: 2021,
    cidade: "Belo Horizonte - MG",
    valor: "R$ 78.500,00",
    cor: "Preto",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "50.000 Km",
    interesses: [
      {
        nome: "Fernanda",
        telefone: "31 9 92345678",
        mensagem: "Tem como parcelar uma parte no cartão?",
      },
      {
        nome: "Larissa",
        telefone: "47 9 90011223",
        mensagem: "O carro tem todas as revisões em dia?",
      },
      {
        nome: "Rodrigo",
        telefone: "51 9 93334455",
        mensagem: "Esse valor é negociável? Estou muito interessado!",
      },
    ],
  },
  {
    title: "Hyundai HB20",
    marca: "Hyundai",
    modelo: "HB20S Vision",
    ano: 2023,
    cidade: "Curitiba - PR",
    cor: "Prata",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "50.000 Km",
    valor: "R$ 82.000,00",
    interesses: [
      {
        nome: "Gustavo",
        telefone: "62 9 95554433",
        mensagem: "É possível enviar mais fotos do interior?",
      },
      {
        nome: "Isabela",
        telefone: "27 9 91112233",
        mensagem: "O carro já sofreu algum tipo de sinistro?",
      },
    ],
  },
  {
    title: "Jeep Renegade",
    marca: "Jeep",
    modelo: "Renegade Longitude",
    ano: 2022,
    cidade: "Porto Alegre - RS",
    cor: "Branco",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "50.000 Km",
    valor: "R$ 125.000,00",
    interesses: [],
  },
  {
    title: "Toyota Corolla",
    marca: "Toyota",
    modelo: "Corolla XEi",
    ano: 2020,
    cidade: "São Paulo - SP",
    cor: "Azul",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "50.000 Km",
    interesses: [
      {
        nome: "Paula",
        telefone: "85 9 97776655",
        mensagem: "Qual o valor do veículo no Pix?",
      },
    ],
    valor: "R$ 98.000,00",
  },
  {
    title: "Honda Civic",
    marca: "Honda",
    modelo: "Civic EX",
    ano: 2021,
    cor: "Vermelho",
    descricao: "Veiculo utilizado para UBER por durante 2 anos",
    km: "50.000 Km",
    cidade: "Rio de Janeiro - RJ",
    valor: "R$ 110.000,00",
    interesses: [],
  },
];

const veiculoSelecionado = veiculos[id - 1];

console.log("veiculoSelecionado: ", veiculoSelecionado.interesses);

const interessesContainer = document.querySelector(".interesses-container");
const nenhumInteresse = document.querySelector(".nenhum-interesse");

veiculoSelecionado.interesses.forEach((interesse) => {
  const novoInteresse = document.createElement("div");
  novoInteresse.classList.add("interesse");
  const spanNome = document.createElement("span");
  const valorNome = document.createElement("span");
  const spanTelefone = document.createElement("span");
  const valorTelefone = document.createElement("span");
  const spanMensagem = document.createElement("span");
  const valorMensagem = document.createElement("span");

  spanNome.textContent = "Nome: ";
  valorNome.classList.add("nome-interesse");
  valorNome.textContent = interesse.nome;
  spanNome.appendChild(valorNome);
  novoInteresse.appendChild(spanNome);

  spanTelefone.textContent = "Telefone: ";
  valorTelefone.classList.add("telefone-interesse");
  valorTelefone.textContent = interesse.telefone;
  spanTelefone.appendChild(valorTelefone);
  novoInteresse.appendChild(spanTelefone);

  spanMensagem.textContent = "Mensagem: ";
  valorMensagem.classList.add("Mensagem-interesse");
  valorMensagem.textContent = interesse.mensagem;
  spanMensagem.appendChild(valorMensagem);
  novoInteresse.appendChild(spanMensagem);

  interessesContainer.appendChild(novoInteresse);
});

if (veiculoSelecionado.interesses.length == 0) {
  nenhumInteresse.style.display = "block";
} else {
  nenhumInteresse.style.display = "none";
}
