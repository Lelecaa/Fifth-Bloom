
/* =========================================================
   FIFTH BLOOM — SCRIPT.JS

   Este arquivo controla a interatividade do site.
   Aqui são programadas ações como cliques, pesquisas,
   filtros e mensagens para o usuário.
   ========================================================= */


/* 1. CONFIRMAÇÃO DE CARREGAMENTO */

console.log("Fifth Bloom carregado com sucesso!");


// 2. MENU PARA CELULARES

// Seleciona o botão do menu e a navegação.
const btnMenu = document.getElementById("btn-menu");
const mainNav = document.getElementById("main-nav");

// Verifica se os elementos existem na página.
if (btnMenu && mainNav) {

    // Executa uma ação quando o botão é clicado.
    btnMenu.addEventListener("click", function () {

        // Adiciona ou remove a classe que mostra o menu.
        mainNav.classList.toggle("ativo");

        // Verifica se o menu está aberto.
        const menuAberto = mainNav.classList.contains("ativo");

        // Altera o ícone conforme o estado do menu.
        btnMenu.innerHTML = menuAberto
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';

        // Atualiza o texto acessível do botão.
        btnMenu.setAttribute(
            "aria-label",
            menuAberto ? "Fechar menu" : "Abrir menu"
        );
    });
}


// 3. ABRIR E FECHAR A PESQUISA

// Seleciona os elementos da área de pesquisa.
const btnSearch = document.getElementById("btn-search");
const searchArea = document.getElementById("search-area");
const searchInput = document.getElementById("search-input");

if (btnSearch && searchArea) {

    btnSearch.addEventListener("click", function () {

        // Alterna a visibilidade da área de pesquisa.
        searchArea.classList.toggle("visible");

        // Coloca o cursor no campo quando a pesquisa abre.
        if (searchArea.classList.contains("visible") && searchInput) {
            searchInput.focus();
        }
    });
}


// 4. PESQUISAR PRODUTOS

// Seleciona todos os cartões de produtos da página.
const productCards = document.querySelectorAll(".product-card");

// Seleciona o botão de pesquisa.
const searchSubmit = document.getElementById("search-submit");

// Seleciona o espaço onde aparece o resultado da pesquisa.
const searchFeedback = document.getElementById("search-feedback");

// Função responsável por procurar os produtos.
function pesquisarProdutos() {

    // Obtém o texto digitado e transforma em letras minúsculas.
    const termo = searchInput.value.trim().toLowerCase();

    // Conta quantos produtos correspondem à pesquisa.
    let encontrados = 0;

    productCards.forEach(function (card) {

        // Obtém o nome do produto.
        const nome = card.dataset.name || "";

        // Verifica se o nome contém o texto pesquisado.
        const corresponde = nome.toLowerCase().includes(termo);

        // Mostra ou esconde o produto.
        card.classList.toggle("hidden", !corresponde);

        if (corresponde) {
            encontrados++;
        }
    });

    // Exibe uma mensagem com o resultado.
    if (searchFeedback) {

        if (termo === "") {
            searchFeedback.textContent = "";
        } else if (encontrados === 0) {
            searchFeedback.textContent = "Nenhum produto encontrado.";
        } else {
            searchFeedback.textContent =
                encontrados + " produto(s) encontrado(s).";
        }
    }
}

// Executa a pesquisa ao clicar no botão.
if (searchSubmit && searchInput) {

    searchSubmit.addEventListener("click", pesquisarProdutos);

    // Também permite pesquisar apertando Enter.
    searchInput.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            pesquisarProdutos();
        }
    });
}


// 5. FILTRAR PRODUTOS POR CATEGORIA

// Seleciona os botões de filtro.
const filterButtons = document.querySelectorAll(".filter-button");

if (filterButtons.length > 0) {

    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            // Obtém a categoria escolhida.
            const categoria = button.dataset.filter;

            // Remove o destaque de todos os botões.
            filterButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            // Destaca o botão selecionado.
            button.classList.add("active");

            let quantidade = 0;

            // Percorre os cartões e verifica a categoria.
            productCards.forEach(function (card) {

                const categoriaProduto = card.dataset.category;

                const corresponde =
                    categoria === "todos" ||
                    categoriaProduto === categoria;

                card.classList.toggle("hidden", !corresponde);

                if (corresponde) {
                    quantidade++;
                }
            });

            // Atualiza a quantidade exibida na página.
            const productCount = document.getElementById("product-count");

            if (productCount) {
                productCount.textContent =
                    quantidade + (quantidade === 1 ? " produto" : " produtos");
            }

            // Limpa a mensagem da pesquisa.
            if (searchFeedback) {
                searchFeedback.textContent = "";
            }

        });

    });

}


// 6. BOTÕES DE ADICIONAR À SACOLA

// Seleciona todos os botões de adicionar.
const addButtons = document.querySelectorAll(".add-button");

addButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Obtém o nome do produto pelo atributo data-product.
        const nomeProduto = button.dataset.product;

        // Mostra uma mensagem confirmando a ação.
        alert(nomeProduto + " foi adicionado à sua sacola!");

    });

});


// 7. FORMULÁRIO DE NOVIDADES

const newsletterForm = document.getElementById("newsletter-form");

if (newsletterForm) {

    newsletterForm.addEventListener("submit", function (event) {

        // Impede que a página seja recarregada.
        event.preventDefault();

        // Mostra uma mensagem de confirmação.
        alert("Obrigada por se cadastrar na Fifth Bloom!");

        // Limpa os campos do formulário.
        newsletterForm.reset();

    });

}


// 8. ANO AUTOMÁTICO NO RODAPÉ

// Obtém o elemento que recebe o ano.
const ano = document.getElementById("ano");

if (ano) {

    // Insere automaticamente o ano atual.
    ano.textContent = new Date().getFullYear();

}
