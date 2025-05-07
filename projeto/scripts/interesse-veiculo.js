const id = window.location.search.replace("?", "");

const tituloVeiculo = document.querySelector(".card-title");
const marcaVeiculo = document.querySelector(".marca-veiculo");
const modeloVeiculo = document.querySelector(".modelo-veiculo");
const anoVeiculo = document.querySelector(".ano-veiculo");
const cidadeVeiculo = document.querySelector(".cidade-veiculo");
const valorVeiculo = document.querySelector(".valor-veiculo");

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


function exibirModalErro(mensagem) {
  const msgElement = document.getElementById("errorModalMessage");
  msgElement.textContent = mensagem;

  const modal = new bootstrap.Modal(document.getElementById("errorModal"));
  modal.show();

}

function exibirModalSucesso(mensagem) {
  const msgElement = document.getElementById("successModalMessage");
  msgElement.textContent = mensagem;

  const modal = new bootstrap.Modal(document.getElementById("successModal"));
  modal.show();
  // setTimeout(() => {
  //   window.location.href = "home.html";
  // }, 2000);

}

function criaExibicao(veiculoInteressado) {
  tituloVeiculo.textContent = veiculoInteressado.Marca + " " + veiculoInteressado.Modelo;
  marcaVeiculo.textContent = veiculoInteressado.Marca;
  modeloVeiculo.textContent = veiculoInteressado.Modelo;
  anoVeiculo.textContent = veiculoInteressado.Ano;
  cidadeVeiculo.textContent = veiculoInteressado.Cidade;
  valorVeiculo.textContent = veiculoInteressado.Valor;
}

const nomeInput = document.querySelector("#nome");
const telefoneInput = document.querySelector("#telefone");
const mensagemInput = document.querySelector("#mensagem");

const formulario = document.forms.interesse;

formulario.addEventListener("submit", checkarErros);

function checkarErros(e) {
  e.preventDefault();
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

  if (valido) {
    console.log("uai")
    criaInteresse();
  }
}

async function criaInteresse() {
  const url = `controller.php?acao=criaInteresse&idAnuncio=${id}`;
  try {
    const response = await fetch(url, { method: "POST", body: new FormData(formulario) });

    console.log("resposta: ", response)

    if (!response.ok) {
      const errorText = await response.text();
      exibirModalErro(errorText);
      return;
    } else {
      exibirModalSucesso("Interesse enviado!");
    }
  } catch (e) {
    exibirModalErro("Erro na requisição, não foi possível criar o anuncio: ", e);
  }
}
