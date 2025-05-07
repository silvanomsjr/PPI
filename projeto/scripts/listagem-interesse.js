const id = window.location.search.replace("?", "");

let anuncio = {};

window.addEventListener("DOMContentLoaded", async () => {
  const urlDetalhes = `controller.php?acao=pegaAnuncio&idAnuncio=${id}`;

  try {
    const response = await fetch(urlDetalhes);
    const responseJson = await response.json();

    if (!response.ok) {
      const errorText = await response.text();
      exibirModalErro(errorText);
      return;
    } else {
      anuncio = responseJson;
      preencherCardAnuncio();
    }
  } catch (e) {
    console.log("Error: ", e);
    exibirModalErro("Erro na requisição, não foi possível pegar este anuncio");
  }

  const url = `controller.php?acao=pegaInteresses&idAnuncio=${id}`;
  try {
    const response = await fetch(url);
    const responseJson = await response.json();

    if (!response.ok) {
      const errorText = await response.text();
      exibirModalErro(errorText);
      return;
    } else {
      criaInteresse(responseJson);
    }
  } catch (_) {
    exibirModalErro(
      "Erro na requisição, não foi possível pegar os interesses deste anuncio",
    );
  }
});

function exibirModalErro(mensagem) {
  const msgElement = document.getElementById("errorModalMessage");
  msgElement.textContent = mensagem;

  const modal = new bootstrap.Modal(document.getElementById("errorModal"));
  modal.show();

  // setTimeout(() => {
  //   window.location.href = "listagem-anuncios.html";
  // }, 2000);
}

const interessesContainer = document.querySelector(".interesses-container");
const nenhumInteresse = document.querySelector(".nenhum-interesse");

function preencherCardAnuncio() {
  document.querySelector(".card-title").textContent =
    `${anuncio.Marca} ${anuncio.Modelo}`;
  document.querySelector(".marca-veiculo").textContent = anuncio.Marca;
  document.querySelector(".modelo-veiculo").textContent = anuncio.Modelo;
  document.querySelector(".ano-veiculo").textContent = anuncio.Ano;
  document.querySelector(".cidade-veiculo").textContent = anuncio.Cidade;
  document.querySelector(".cor-veiculo").textContent = anuncio.Cor;
  document.querySelector(".km-veiculo").textContent =
    `${anuncio.Quilometragem.toLocaleString()} Km`;
  document.querySelector(".descricao-veiculo").textContent = anuncio.Descricao;
  document.querySelector(".valor-veiculo").textContent = `R$ ${anuncio.Valor}`;
}

function criaInteresse(interesses) {
  interesses.forEach((interesse) => {
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
    valorNome.textContent = interesse.Nome;
    spanNome.appendChild(valorNome);
    novoInteresse.appendChild(spanNome);

    spanTelefone.textContent = "Telefone: ";
    valorTelefone.classList.add("telefone-interesse");
    valorTelefone.textContent = interesse.Telefone;
    spanTelefone.appendChild(valorTelefone);
    novoInteresse.appendChild(spanTelefone);

    spanMensagem.textContent = "Mensagem: ";
    valorMensagem.classList.add("mensagem-interesse");
    valorMensagem.textContent = interesse.Mensagem;
    spanMensagem.appendChild(valorMensagem);
    novoInteresse.appendChild(spanMensagem);

    interessesContainer.appendChild(novoInteresse);
  });

  if (interesses.length == 0) {
    nenhumInteresse.style.display = "block";
  } else {
    nenhumInteresse.style.display = "none";
  }
}
