const cardContainer = document.querySelector(".card-container");

window.addEventListener("DOMContentLoaded", async () => {
  const url = "controller.php?acao=listaAnunciosAnunciante";
  const response = await fetch(url);
  const anuncios = await response.json();
  for (const anuncio of anuncios) {
    criaCardAnuncio(anuncio);
  }
});

function criaCardAnuncio(anuncio) {
  const cardContent = document.createElement("div");
  cardContent.className = "col-md-4 custom-card-container";

  const cardDiv = document.createElement("div");
  cardDiv.className = "card h-100";

  const img = document.createElement("img");
  img.className = "card-img-top";
  img.src = anuncio.Foto1 || "https://placehold.co/300x200";
  img.alt = "Carro";
  cardDiv.appendChild(img);

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = `${anuncio.Marca} ${anuncio.Modelo}`;
  cardBody.appendChild(cardTitle);

  const marca = document.createElement("p");
  marca.className = "card-text";
  marca.innerHTML = `<strong>Marca:</strong> <span class="marca-veiculo">${anuncio.Marca}</span>`;
  cardBody.appendChild(marca);

  const modelo = document.createElement("p");
  modelo.className = "card-text";
  modelo.innerHTML = `<strong>Modelo:</strong> <span class="modelo-veiculo">${anuncio.Modelo}</span>`;
  cardBody.appendChild(modelo);

  const ano = document.createElement("p");
  ano.className = "card-text";
  ano.innerHTML = `<strong>Ano:</strong> <span class="ano-veiculo">${anuncio.Ano}</span>`;
  cardBody.appendChild(ano);

  const linkDetalhes = document.createElement("a");
  linkDetalhes.className = "btn btn-primary";
  linkDetalhes.href = `exibicao-detalhada.html?${anuncio.Id}`;
  linkDetalhes.textContent = "Ver detalhes";
  cardBody.appendChild(linkDetalhes);

  const linkInteresse = document.createElement("a");
  linkInteresse.className = "btn btn-primary my-2";
  linkInteresse.href = `listagem-interesse.html?${anuncio.Id}`;
  linkInteresse.textContent = "Visualizar interesses";
  cardBody.appendChild(linkInteresse);

  const botaoExcluir = document.createElement("a");
  botaoExcluir.className = "btn btn-danger";
  botaoExcluir.href = "#";
  botaoExcluir.innerHTML = `<i class="bi bi-trash"></i> Excluir`;
  botaoExcluir.addEventListener("click", function (event) {
    event.preventDefault();
    excluirAnuncio(anuncio);
  });

  cardBody.appendChild(botaoExcluir);

  cardDiv.appendChild(cardBody);
  cardContent.appendChild(cardDiv);
  cardContainer.appendChild(cardContent);
}

async function excluirAnuncio(anuncio) {
  console.log("quer apagar esse daqui: ", anuncio);
  const url = "controller.php?acao=deletaAnuncio&idAnuncio=" + anuncio.Id;
  const response = await fetch(url);
  console.log("response: ", response)
  const responseJson = await response.json();
  console.log("anuncio: ", responseJson)

  setTimeout(() => {
    window.location.reload();
  }, 500);
}
