const btnSearch = document.querySelector("#search-btn");
const selectMarca = document.querySelector("#marca");
const selectModelo = document.querySelector("#modelo");
const selectCidade = document.querySelector("#cidade");

btnSearch.addEventListener("click", pesquisaVeiculos);

function pesquisaVeiculos() {
  const cardsCols = document.querySelectorAll(".custom-card-container");
  cardsCols.forEach((card) => {
    const marca = card.querySelector(".marca-veiculo").textContent.toLowerCase();
    const modelo = card.querySelector(".modelo-veiculo").textContent.toLowerCase().split(" ")[1];
    const cidade = card.querySelector(".cidade-veiculo").textContent.toLowerCase().split(" - ")[0].replaceAll(" ", "-");

    let matchMarca = true;

    if (selectMarca.value == marca || selectMarca.value == "all") {
      matchMarca = true;
    } else {
      matchMarca = false;
    }

    let matchModelo = true;

    if (selectModelo.value == modelo || selectModelo.value == "all") {
      matchModelo = true;
    } else {
      matchModelo = false;
    }

    let matchCidade = true;

    if (selectCidade.value == cidade || selectCidade.value == "all") {
      matchCidade = true;
    } else {
      matchCidade = false;
    }

    if (matchModelo & matchMarca & matchCidade) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
