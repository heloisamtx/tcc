// Função para alternar entre telas
function showScreen(screenId) {
    // Seleciona todas as telas
    const screens = document.querySelectorAll('.screen');
    screens.forEach((screen) => {
        if (screen.id === screenId) {
            screen.classList.remove('hidden'); // Exibe a tela especificada
        } else {
            screen.classList.add('hidden'); // Esconde as outras telas
        }
    });
}

// Função principal para inicializar os eventos
function initializeScreenNavigation() {
    // Seleciona os botões e links
    const btnEntrar = document.getElementById('btn-entrar');
    const linkCadastro = document.getElementById('link-cadastro');
    const btnVoltar = document.querySelectorAll('.btn-back'); // Seleciona todos os botões de voltar

    // Adiciona evento ao botão "Entrar"
    if (btnEntrar) {
        btnEntrar.addEventListener('click', (event) => {
            event.preventDefault();
            showScreen('tela-login'); // Mostra a tela de login
        });
    }

    // Adiciona evento ao link "Cadastro"
    if (linkCadastro) {
        linkCadastro.addEventListener('click', (event) => {
            event.preventDefault();
            showScreen('tela-cadastro'); // Mostra a tela de cadastro
        });
    }

    // Adiciona evento para os botões "Voltar"
    if (btnVoltar) {
        btnVoltar.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                showScreen('tela-inicial'); // Retorna para a tela inicial
            });
        });
    }

    // Garante que a tela inicial seja exibida ao carregar a página
    showScreen('tela-inicial');
}

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', initializeScreenNavigation);
// Função para exibir uma tela específica
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// Evento ao clicar no botão "Entrar"
document.getElementById('btn-entrar').addEventListener('click', () => {
    showScreen('tela-dashboard'); // Mostra a tela do dashboard
});

// Evento ao clicar no link de cadastro
document.getElementById('link-cadastro').addEventListener('click', (e) => {
    e.preventDefault();
    showScreen('tela-cadastro'); // Mostra a tela de cadastro
});

// Evento para criar conta
document.querySelector('#tela-cadastro form').addEventListener('submit', (e) => {
    e.preventDefault();
    showScreen('tela-dashboard'); // Mostra a tela do dashboard
});

// Botão de voltar para a tela inicial
function voltarParaInicial() {
    showScreen('tela-inicial'); // Volta à tela inicial
}
