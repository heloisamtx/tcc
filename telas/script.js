// Função para alternar entre telas
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden')); // Esconde todas as telas
    document.getElementById(screenId).classList.remove('hidden'); // Exibe a tela específica
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

// Função para simular o login
function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulação de login (você pode substituir pela lógica de autenticação real)
    if (username === 'user' && password === 'password') {
        alert('Login bem-sucedido!');
        showScreen('tela-dashboard'); // Exibe a tela do dashboard
    } else {
        alert('Usuário ou senha incorretos.');
    }
}

// Função para simular o cadastro
function register() {
    const email = document.getElementById('email').value;
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;

    // Simulação de registro (você pode substituir pela lógica de registro real)
    if (email && name && password) {
        alert('Cadastro concluído!');
        showScreen('tela-dashboard'); // Exibe a tela do dashboard
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Evento para logout
function logout() {
    alert('Você saiu do sistema.');
    showScreen('tela-inicial'); // Volta à tela inicial
}

// Evento de submissão do formulário de login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simulação de login (substituir por integração com backend)
    if (email === 'teste@teste.com' && password === '123456') {
        showScreen('tela-dashboard'); // Exibe o dashboard
    } else {
        alert('Email ou senha incorretos.');
    }
});

// Evento de submissão do formulário de cadastro
document.getElementById('cadastro-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('cadastro-nome').value;
    alert(`Conta criada com sucesso para ${nome}!`);
    showScreen('tela-dashboard'); // Exibe o dashboard após o cadastro
});

// Inicializa a navegação entre telas ao carregar a página
document.addEventListener('DOMContentLoaded', initializeScreenNavigation);
