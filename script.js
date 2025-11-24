let cardContainer = document.querySelector(".card-container");
let campoBusca = document.getElementById("campo-busca");
let botaoBusca = document.getElementById("botao-busca");
let todosOsDados =[];

async function busque() {
    // Ajustando o caminho para buscar o arquivo correto, gerado pelo script Node.js
    let resposta = await fetch("data.json");
    todosOsDados = await resposta.json()
    // renderizarCards(todosOsDados) // Não exibe mais os cards ao carregar a página
}   

function renderizarCards(dados){
    cardContainer.innerHTML = ""; // Limpa os cards existentes antes de renderizar novos
    for (let item of dados){  
        let article = document.createElement("article");
        article.classList.add("card");
        // Adaptando o HTML do card para a nova estrutura de dados
        article.innerHTML = `
            <h2>${item.nome_popular}</h2>
            <p><em>${item.nome_cientifico}</em></p>
            <p>${item.reino}</p>
            <p><strong>Filo:</strong> ${item.descricao}</p>
            <p><strong>Habitat:</strong> ${item.habitat}</p>
            <p><strong>Nível de Extinção:</strong> ${item.nivel_extincao}</p>
            <a href="${item.link}" target="_blank">Saiba mais</a>
        `
        cardContainer.appendChild(article);
    }     
}

function realizarBusca() {
    const termoBusca = campoBusca.value.toLowerCase();
    const resultados = todosOsDados.filter(item => 
        item.nome_popular.toLowerCase().includes(termoBusca) ||
        item.nome_cientifico.toLowerCase().includes(termoBusca) ||
        item.descricao.toLowerCase().includes(termoBusca)
    );

    if (resultados.length > 0) {
        renderizarCards(resultados);
    } else {
        cardContainer.innerHTML = `<p class="sem-resultados">Nenhum resultado encontrado para "${campoBusca.value}"</p>`;
    }
}

botaoBusca.addEventListener("click", realizarBusca);

// Adiciona a funcionalidade de busca ao pressionar "Enter"
campoBusca.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        realizarBusca();
    }
});

busque(); // Chama a função para carregar os dados iniciais