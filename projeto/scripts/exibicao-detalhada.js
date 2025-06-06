const id = window.location.search.replace("?", "");

// const veiculos = [
//   {
//     title: "Toyota Corolla",
//     marca: "Toyota",
//     modelo: "Corolla XEi",
//     ano: 2020,
//     cidade: "São Paulo - SP",
//     valor: "R$ 98.000,00",
//     cor: "Vermelho",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "20.000 Km",
//   },
//   {
//     title: "Honda Civic",
//     marca: "Honda",
//     modelo: "Civic Touring",
//     ano: 2019,
//     cidade: "Rio de Janeiro - RJ",
//     valor: "R$ 110.000,00",
//     cor: "Azul",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "90.000 Km",
//   },
//   {
//     title: "Ford Ranger",
//     marca: "Ford",
//     modelo: "Ranger Limited",
//     ano: 2021,
//     cidade: "Belo Horizonte - MG",
//     valor: "R$ 180.000,00",
//     cor: "Amarelo",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "150.000 Km",
//   },
//   {
//     title: "Volkswagen Golf",
//     marca: "Volkswagen",
//     modelo: "Golf GTI",
//     ano: 2022,
//     cidade: "Rio de Janeiro - RJ",
//     valor: "R$ 145.000,00",
//     cor: "Preto",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "50.000 Km",
//   },
//   {
//     title: "Fiat Argo",
//     marca: "Fiat",
//     modelo: "Argo Trekking",
//     ano: 2021,
//     cidade: "Belo Horizonte - MG",
//     valor: "R$ 78.500,00",
//     cor: "Preto",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "50.000 Km",
//   },
//   {
//     title: "Hyundai HB20",
//     marca: "Hyundai",
//     modelo: "HB20S Vision",
//     ano: 2023,
//     cidade: "Curitiba - PR",
//     cor: "Prata",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "50.000 Km",
//     valor: "R$ 82.000,00",
//   },
//   {
//     title: "Jeep Renegade",
//     marca: "Jeep",
//     modelo: "Renegade Longitude",
//     ano: 2022,
//     cidade: "Porto Alegre - RS",
//     cor: "Branco",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "50.000 Km",
//     valor: "R$ 125.000,00",
//   },
//   {
//     title: "Toyota Corolla",
//     marca: "Toyota",
//     modelo: "Corolla XEi",
//     ano: 2020,
//     cidade: "São Paulo - SP",
//     cor: "Azul",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "50.000 Km",
//     valor: "R$ 98.000,00",
//   },
//   {
//     title: "Honda Civic",
//     marca: "Honda",
//     modelo: "Civic EX",
//     ano: 2021,
//     cor: "Vermelho",
//     descricao: "Veiculo utilizado para UBER por durante 2 anos",
//     km: "50.000 Km",
//     cidade: "Rio de Janeiro - RJ",
//     valor: "R$ 110.000,00",
//   },
// ];

// const veiculoSelecionado = veiculos[id - 1];

const tituloVeiculo = document.querySelector(".card-title");
const marcaVeiculo = document.querySelector(".marca-veiculo");
const modeloVeiculo = document.querySelector(".modelo-veiculo");
const anoVeiculo = document.querySelector(".ano-veiculo");
const cidadeVeiculo = document.querySelector(".cidade-veiculo");
const valorVeiculo = document.querySelector(".valor-veiculo");

const corVeiculo = document.querySelector(".cor-veiculo");
const kmVeiculo = document.querySelector(".km-veiculo");
const descricaoVeiculo = document.querySelector(".descricao-veiculo");

window.addEventListener("DOMContentLoaded", async () => {
  const url = `controller.php?acao=pegaAnuncio&idAnuncio=${id}`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (!response.ok) {
      const errorText = await response.text();
      exibirModalErro(errorText);
      return;
    } else {
      criaExibicao(responseJson);
    }
  } catch (_) {
    exibirModalErro("Erro na requisição, não foi possível pegar este anuncio");
  }
});

function criaExibicao(veiculoSelecionado) {
  tituloVeiculo.textContent = veiculoSelecionado.Marca + " " + veiculoSelecionado.Modelo;
  marcaVeiculo.textContent = veiculoSelecionado.Marca;
  modeloVeiculo.textContent = veiculoSelecionado.Modelo;
  anoVeiculo.textContent = veiculoSelecionado.Ano;
  cidadeVeiculo.textContent = veiculoSelecionado.Cidade;
  valorVeiculo.textContent = veiculoSelecionado.Valor;
  corVeiculo.textContent = veiculoSelecionado.Cor;
  kmVeiculo.textContent = veiculoSelecionado.Km;
  descricaoVeiculo.textContent = veiculoSelecionado.Descricao;
}

function exibirModalErro(mensagem) {
  const msgElement = document.getElementById("errorModalMessage");
  msgElement.textContent = mensagem;

  const modal = new bootstrap.Modal(document.getElementById("errorModal"));
  modal.show();

  setTimeout(() => {
    window.location.href = "listagem-anuncios.html";
  }, 2000);

}
