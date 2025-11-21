let cardContainer = document.querySelector(".card-container");
let dados = [];

async function carregarDados() {
    let resposta = await fetch("data.json");
    dados = await resposta.json();
    renderizarCards(dados);
}

function buscar() {
    let termoBusca = document.getElementById("caixa-busca").value.toLowerCase();
    let resultados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca) || 
        dado.empresa.toLowerCase().includes(termoBusca) || 
        dado.ano.toLowerCase().includes(termoBusca) || 
        dado.descricao.toLowerCase().includes(termoBusca)
    );
    renderizarCards(resultados);
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ""; // Limpa os cards existentes
    for (let dado of dados){
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
        <h2>${dado.nome}</h2>
        <p>${dado.empresa}</p>
        <p>${dado.ano}</p>
        <p>${dado.descricao}</p>
        <a href="${dado.link}" target="_blank">Saiba Mais</a>
        `;
        cardContainer.appendChild(article);
    }
}

window.onload = () => {
    carregarDados();
    document.getElementById("caixa-busca").addEventListener("input", buscar);
};