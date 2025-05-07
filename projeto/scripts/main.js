const btnSearch = document.querySelector("#search-btn");
const selectMarca = document.querySelector("#marca");
const selectModelo = document.querySelector("#modelo");
const selectCidade = document.querySelector("#cidade");
const cardsContainer = document.querySelector(".cards-container");
const formFiltro = document.forms.filtro;

let modelos = [];
let marcas = [];
let cidades = [];

window.addEventListener("DOMContentLoaded", async () => {
  const url = "controller.php?acao=listaTodosAnuncios";
  const response = await fetch(url);
  const anuncios = await response.json();
  for (const anuncio of anuncios) {
    modelos.push(anuncio.Modelo);
    marcas.push(anuncio.Marca);
    cidades.push(`${anuncio.Cidade}, ${anuncio.Estado}`);
    criaCardAnuncio(anuncio);
  }

  criaSelects();
});

function criaSelects() {
  selectMarca.innerHTML =
    "<option value='all' selected>Todas as marcas</option>";
  selectModelo.innerHTML =
    "<option value='all' selected>Todas os modelos</option>";
  selectCidade.innerHTML =
    "<option value='all' selected>Todas as cidades</option>";

  for (let i = 0; i < modelos.length; i++) {
    const optionMarca = document.createElement("option");
    optionMarca.setAttribute("value", marcas[i]);
    optionMarca.textContent = marcas[i];
    selectMarca.appendChild(optionMarca);

    const optionModelo = document.createElement("option");
    optionModelo.setAttribute("value", modelos[i]);
    optionModelo.textContent = modelos[i];
    selectModelo.appendChild(optionModelo);

    const optionCidade = document.createElement("option");
    const cidade = cidades[i].split(",")[0].trim();
    optionCidade.setAttribute("value", cidade);
    optionCidade.textContent = cidades[i];
    selectCidade.appendChild(optionCidade);
  }
}

function criaCardAnuncio(anuncio) {
  const col = document.createElement("div");
  col.className = "col-md-4 custom-card-container";

  const card = document.createElement("div");
  card.className = "card h-100";

  const img = document.createElement("img");
  img.src = anuncio.Imagem || "https://placehold.co/300x200";
  img.className = "card-img-top";
  img.alt = "Carro";

  const body = document.createElement("div");
  body.className = "card-body";

  body.innerHTML = `
    <h5 class="card-title">${anuncio.Marca} ${anuncio.Modelo}</h5>
    <p class="card-text">
      <strong>Marca:</strong> <span class="marca-veiculo">${anuncio.Marca}</span>
    </p>
    <p class="card-text">
      <strong>Modelo:</strong> <span class="modelo-veiculo">${anuncio.Modelo}</span>
    </p>
    <p class="card-text">
      <strong>Ano:</strong> <span class="ano-veiculo">${anuncio.Ano}</span>
    </p>
    <p class="card-text">
      <strong>Cidade:</strong> <span class="cidade-veiculo">${anuncio.Cidade}</span>
    </p>
    <p class="card-text text-success">
      <strong>Valor:</strong> R$ ${parseFloat(anuncio.Valor).toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2,
        },
      )}
    </p>
    <a href="interesse-veiculo.html?${anuncio.Id}" class="btn btn-primary mt-auto">
      Adicionar Interesse
    </a>
  `;

  card.appendChild(img);
  card.appendChild(body);
  col.appendChild(card);

  cardsContainer.append(col);
}

formFiltro.addEventListener("submit", pesquisaVeiculos);

function exibirModalErro(mensagem) {
  const msgElement = document.getElementById("errorModalMessage");
  msgElement.textContent = mensagem;

  const modal = new bootstrap.Modal(document.getElementById("errorModal"));
  modal.show();
}

async function pesquisaVeiculos(e) {
  e.preventDefault();

  const formData = new FormData(formFiltro);

  const marcaFiltro = formData.get("marca");
  const modeloFiltro = formData.get("modelo");
  const cidadeFiltro = formData.get("cidade");

  cardsContainer.innerHTML = "";

  if (marcaFiltro == "all" && modeloFiltro == "all" && cidadeFiltro == "all") {
    const url = "controller.php?acao=listaTodosAnuncios";
    const response = await fetch(url);
    const anuncios = await response.json();
    for (const anuncio of anuncios) {
      criaCardAnuncio(anuncio);
    }
  } else {
    const params = new URLSearchParams(formData);
    const url = "controller.php?acao=filtrarAnuncios&" + params.toString();
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        exibirModalErro(errorText);
        return;
      }
      const anuncios = await response.json();
      for (const anuncio of anuncios) {
        criaCardAnuncio(anuncio);
      }
    } catch (error) {
      exibirModalErro("Erro na requisição: " + error.message);
    }
  }
}
