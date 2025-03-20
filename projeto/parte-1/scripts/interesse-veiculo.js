const id = window.location.search.replace("?", "");

const veiculos = [
  {
    title: "Toyota Corolla",
    marca: "Toyota",
    modelo: "Corolla XEi",
    ano: 2020,
    cidade: "São Paulo - SP",
    valor: "R$ 98.000,00",
  },
  {
    title: "Honda Civic",
    marca: "Honda",
    modelo: "Civic Touring",
    ano: 2019,
    cidade: "Rio de Janeiro - RJ",
    valor: "R$ 110.000,00",
  },
  {
    title: "Ford Ranger",
    marca: "Ford",
    modelo: "Ranger Limited",
    ano: 2021,
    cidade: "Belo Horizonte - MG",
    valor: "R$ 180.000,00",
  },
  {
    title: "Volkswagen Golf",
    marca: "Volkswagen",
    modelo: "Golf GTI",
    ano: 2022,
    cidade: "Rio de Janeiro - RJ",
    valor: "R$ 145.000,00",
  },
  {
    title: "Fiat Argo",
    marca: "Fiat",
    modelo: "Argo Trekking",
    ano: 2021,
    cidade: "Belo Horizonte - MG",
    valor: "R$ 78.500,00",
  },
  {
    title: "Hyundai HB20",
    marca: "Hyundai",
    modelo: "HB20S Vision",
    ano: 2023,
    cidade: "Curitiba - PR",
    valor: "R$ 82.000,00",
  },
  {
    title: "Jeep Renegade",
    marca: "Jeep",
    modelo: "Renegade Longitude",
    ano: 2022,
    cidade: "Porto Alegre - RS",
    valor: "R$ 125.000,00",
  },
  {
    title: "Toyota Corolla",
    marca: "Toyota",
    modelo: "Corolla XEi",
    ano: 2020,
    cidade: "São Paulo - SP",
    valor: "R$ 98.000,00",
  },
  {
    title: "Honda Civic",
    marca: "Honda",
    modelo: "Civic EX",
    ano: 2021,
    cidade: "Rio de Janeiro - RJ",
    valor: "R$ 110.000,00",
  },
];

const veiculoInteressado = veiculos[id - 1];

const tituloVeiculo = document.querySelector(".card-title");
const marcaVeiculo = document.querySelector(".marca-veiculo");
const modeloVeiculo = document.querySelector(".modelo-veiculo");
const anoVeiculo = document.querySelector(".ano-veiculo");
const cidadeVeiculo = document.querySelector(".cidade-veiculo");
const valorVeiculo = document.querySelector(".valor-veiculo");

tituloVeiculo.textContent = veiculoInteressado.title;
marcaVeiculo.textContent = veiculoInteressado.marca;
modeloVeiculo.textContent = veiculoInteressado.modelo;
anoVeiculo.textContent = veiculoInteressado.ano;
cidadeVeiculo.textContent = veiculoInteressado.cidade;
valorVeiculo.textContent = veiculoInteressado.valor;

const nomeInput = document.querySelector("#nome");
const telefoneInput = document.querySelector("#telefone");
const mensagemInput = document.querySelector("#mensagem");

const formulario = document.forms.interesse;

formulario.addEventListener("submit", checkarErros);

function checkarErros(e) {
  const nomeError = nomeInput.nextElementSibling;
  const telefoneError = telefoneInput.nextElementSibling;
  const mensagemError = mensagemInput.nextElementSibling;

  let valido = true;

  if (!nomeInput.value) {
    nomeError.style.visibility = "visible";
    valido = false;
  } else {
    nomeError.style.visibility = "hidden";
  }

  if (!telefoneInput.value) {
    telefoneError.style.visibility = "visible";
    valido = false;
  } else {
    telefoneError.style.visibility = "hidden";
  }

  if (!mensagemInput.value) {
    mensagemError.style.visibility = "visible";
    valido = false;
  } else {
    mensagemError.style.visibility = "hidden";
  }

  if (!valido) {
    e.preventDefault();
  }
}
