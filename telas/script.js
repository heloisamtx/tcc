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
    const logoutIcon = document.getElementById('logout-icon');

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

    // Evento para o ícone de logout
    if (logoutIcon) {
        logoutIcon.addEventListener('click', () => {
            logout();
        });
    }

    // Garante que a tela inicial seja exibida ao carregar a página
    showScreen('tela-inicial');
}

// Evento de submissão do formulário de login
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Simulação de login (substituir por integração com backend)
    if (email === 'teste@teste.com' && password === '123456') {
        const nomeUsuario = email.split('@')[0]; // Extrai o nome do usuário do e-mail
        mostrarDashboard(nomeUsuario);
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

// Função para mostrar o dashboard com o nome do usuário
function mostrarDashboard(nomeUsuario) {
    // Esconde todas as telas
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));

    // Exibe a tela do dashboard
    document.getElementById('tela-dashboard').classList.remove('hidden');

    // Define o nome do usuário na tela do dashboard
    const nomeElemento = document.getElementById('nome-usuario');
    if (nomeElemento) {
        nomeElemento.textContent = nomeUsuario || 'Usuário';
    }
}

// Função para logout
function logout() {
    alert('Você saiu do sistema.');
    showScreen('tela-inicial'); // Volta à tela inicial
}

// Função para compartilhar o link
function compartilharLink() {
    const link = "http://seusite.com"; // Substitua com o link da sua plataforma
    const texto = "Oi! Venha conhecer o PiggyBank e ajude a organizar minha mesada. Aqui está o link: " + link;

    // Abre o aplicativo de e-mail com o link
    window.location.href = "mailto:?subject=Convite para usar o PiggyBank&body=" + encodeURIComponent(texto);
}

// Inicializa a navegação entre telas ao carregar a página
document.addEventListener('DOMContentLoaded', initializeScreenNavigation);
// Seleciona os elementos
const saldoBtn = document.querySelector('.saldo-btn');
const saldoInput = document.getElementById('saldo-input');
const valorSaldo = document.getElementById('valor-saldo');

// Evento para mostrar o campo de entrada ao clicar na imagem
saldoBtn.addEventListener('click', () => {
    saldoInput.classList.toggle('visible'); // Alterna a visibilidade do input
    saldoInput.focus(); // Foca no campo de entrada
});

// Evento para atualizar o saldo quando o valor for alterado
saldoInput.addEventListener('input', (e) => {
    const value = e.target.value;
    valorSaldo.textContent = `R$ ${parseFloat(value).toFixed(2)}`; // Atualiza o texto do saldo
});

// Fecha o campo de entrada quando o valor for confirmado (ao pressionar Enter)
saldoInput.addEventListener('blur', () => {
    saldoInput.classList.remove('visible'); // Esconde o campo de entrada
});
