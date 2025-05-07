const marcaInput = document.querySelector("#marca");
const modeloInput = document.querySelector("#modelo");
const anoInput = document.querySelector("#ano");
const corInput = document.querySelector("#cor");
const kmInput = document.querySelector("#km");
const descricaoInput = document.querySelector("#descricao");
const valorInput = document.querySelector("#valor");
const estadoInput = document.querySelector("#estado");
const cidadeInput = document.querySelector("#cidade");
const foto1Input = document.querySelector("#foto1");
const foto2Input = document.querySelector("#foto2");
const foto3Input = document.querySelector("#foto3");

const formulario = document.forms.cadastro;

const cidadesPorEstado = {
  SP: ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
  RJ: ["Rio de Janeiro", "Niterói", "Petrópolis", "Volta Redonda"],
  MG: ["Belo Horizonte", "Uberlândia", "Juiz de Fora", "Montes Claros"],
  PR: ["Curitiba", "Londrina", "Maringá", "Cascavel"],
};

formulario.addEventListener("submit", checkarErros);

function checkarErros(e) {
  e.preventDefault();
  const marcaError = marcaInput.nextElementSibling;
  const modeloError = modeloInput.nextElementSibling;
  const anoError = anoInput.nextElementSibling;
  const corError = corInput.nextElementSibling;
  const kmError = kmInput.nextElementSibling;
  const descricaoError = descricaoInput.nextElementSibling;
  const valorError = valorInput.nextElementSibling;
  const estadoError = estadoInput.nextElementSibling;
  const cidadeError = cidadeInput.nextElementSibling;
  const fotoError = foto3Input.nextElementSibling;

  let valido = true;
  let possuiFotos = true;

  if (!marcaInput.value) {
    marcaError.style.visibility = "visible";
    valido = false;
  } else {
    marcaError.style.visibility = "hidden";
  }

  if (!modeloInput.value) {
    modeloError.style.visibility = "visible";
    valido = false;
  } else {
    modeloError.style.visibility = "hidden";
  }

  if (!anoInput.value) {
    anoError.style.visibility = "visible";
    valido = false;
  } else {
    anoError.style.visibility = "hidden";
  }

  if (!corInput.value) {
    corError.style.visibility = "visible";
    valido = false;
  } else {
    corError.style.visibility = "hidden";
  }

  if (!kmInput.value) {
    kmError.style.visibility = "visible";
    valido = false;
  } else {
    kmError.style.visibility = "hidden";
  }

  if (!descricaoInput.value) {
    descricaoError.style.visibility = "visible";
    valido = false;
  } else {
    descricaoError.style.visibility = "hidden";
  }

  if (!valorInput.value) {
    valorError.style.visibility = "visible";
    valido = false;
  } else {
    valorError.style.visibility = "hidden";
  }

  if (!estadoInput.value) {
    estadoError.style.visibility = "visible";
    valido = false;
  } else {
    estadoError.style.visibility = "hidden";
  }

  if (!cidadeInput.value) {
    cidadeError.style.visibility = "visible";
    valido = false;
  } else {
    cidadeError.style.visibility = "hidden";
  }

  if (!foto1Input.value) {
    possuiFotos = false;
    valido = false;
  } else {
    possuiFotos = true;
  }

  if (!foto2Input.value) {
    possuiFotos = false;
    valido = false;
  } else {
    possuiFotos = true;
  }

  if (!foto3Input.value) {
    possuiFotos = false;
    valido = false;
  } else {
    possuiFotos = true;
  }

  if (!possuiFotos) {
    fotoError.style.visibility = "visible";
  } else {
    fotoError.style.visibility = "hidden";
  }

  if (valido) {
    criaAnuncio();
  }
}

async function criaAnuncio() {
  const formData = new FormData(formulario);
  formData.append("foto1", foto1Input.files[0].name);
  formData.append("foto2", foto2Input.files[0].name);
  formData.append("foto3", foto3Input.files[0].name);

  const url = "../controller.php?acao=cadastraAnuncio";

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    if (!response.ok) {
      const errorText = await response.text();
      exibirModalErro(errorText);
      return;
    } else {
      exibirModalSucesso("Anúncio criado com sucesso.");
    }
  } catch (error) {
    exibirModalErro("Erro na requisição: " + error.message);
  }
}

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
  setTimeout(() => {
    window.location.href = "home.html";
  }, 2000);

}

function atualizarCidades() {
  // Precisamos primeiro limpar todas as opções já existentes
  cidadeInput.innerHTML =
    "<option value='' selected disabled>Selecione um estado primeiro</option >";

  if (estadoInput.value in cidadesPorEstado) {
    cidadesPorEstado[estadoInput.value].forEach((cidade) => {
      const novaOption = document.createElement("option");
      novaOption.setAttribute("value", cidade);
      novaOption.textContent = cidade;
      cidadeInput.appendChild(novaOption);
    });
  }
}

