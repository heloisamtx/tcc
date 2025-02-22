// Função para alternar entre telas
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden')); // Esconde todas as telas
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove('hidden'); // Exibe a tela específica
    }
}

// Inicializa eventos de navegação entre telas
function initializeScreenNavigation() {
    const btnEntrar = document.getElementById('btn-entrar');
    const linkCadastro = document.getElementById('link-cadastro');
    const btnVoltar = document.querySelectorAll('.btn-back');
    const logoutIcon = document.getElementById('logout-icon');

    // Navegar para a tela de login
    if (btnEntrar) {
        btnEntrar.addEventListener('click', (event) => {
            event.preventDefault();
            showScreen('tela-login');
        });
    }

    // Navegar para a tela de cadastro
    if (linkCadastro) {
        linkCadastro.addEventListener('click', (event) => {
            event.preventDefault();
            showScreen('tela-cadastro');
        });
    }

    // Botões de voltar
    if (btnVoltar) {
        btnVoltar.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                event.preventDefault();
                showScreen('tela-inicial');
            });
        });
    }

    // Logout
    if (logoutIcon) {
        logoutIcon.addEventListener('click', () => {
            alert('Você saiu do sistema.');
            showScreen('tela-inicial');
        });
    }

    // Mostra a tela inicial ao carregar
    showScreen('tela-inicial');
}

// Evento de submissão do formulário de login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        // Simulação de autenticação
        if (email === 'teste@teste.com' && password === '123456') {
            const nomeUsuario = email.split('@')[0];
            mostrarDashboard(nomeUsuario);
        } else {
            alert('Email ou senha incorretos.');
        }
    });
}

// Evento de submissão do formulário de cadastro
const cadastroForm = document.getElementById('cadastro-form');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('cadastro-nome').value;
        const email = document.getElementById('cadastro-email').value;
        const senha = document.getElementById('cadastro-senha').value;

        // Simulação de cadastro (substituir por integração com backend)
        if (nome && email && senha) {
            alert(`Conta criada com sucesso para ${nome}!`);
            showScreen('tela-dashboard'); // Exibe o dashboard após o cadastro
            mostrarDashboard(nome);
        } else {
            alert('Preencha todos os campos para criar a conta.');
        }
    });
}

// Função para mostrar o dashboard
function mostrarDashboard(nomeUsuario) {
    showScreen('tela-dashboard');
    const nomeElemento = document.getElementById('nome-usuario');
    if (nomeElemento) {
        nomeElemento.textContent = nomeUsuario || 'Usuário';
    }
}

// Função para inicializar a funcionalidade das metas editáveis
function initializeMetasEditaveis() {
    const metasArea = document.getElementById('area-metas');

    if (metasArea) {
        // Recupera metas do armazenamento local (se existir)
        const metasSalvas = localStorage.getItem('metas');
        if (metasSalvas) {
            metasArea.value = metasSalvas;
        }

        // Salva as metas no armazenamento local sempre que o conteúdo for alterado
        metasArea.addEventListener('input', () => {
            localStorage.setItem('metas', metasArea.value);
        });
    }
}

// Inicializa todas as funcionalidades ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    initializeScreenNavigation();
    initializeMetasEditaveis();
});
// Seleciona os elementos
const configButton = document.getElementById("configButton");
const configModal = document.getElementById("configModal");
const closeModal = document.querySelector(".close");
const deleteAccountButton = document.getElementById("deleteAccountButton");

// Abre o modal ao clicar no botão de configuração
configButton.addEventListener("click", () => {
  configModal.style.display = "block";
});

// Fecha o modal ao clicar no 'x'
closeModal.addEventListener("click", () => {
  configModal.style.display = "none";
});

// Fecha o modal ao clicar fora dele
window.addEventListener("click", (event) => {
  if (event.target === configModal) {
    configModal.style.display = "none";
  }
});

// Confirmação de exclusão de conta
deleteAccountButton.addEventListener("click", () => {
  const confirmation = confirm("Você tem certeza que deseja excluir sua conta?");
  if (confirmation) {
    alert("Conta excluída com sucesso!");
    // Aqui você pode adicionar o código para excluir a conta do usuário
  }
});
// Função para voltar à página inicial
function voltarParaInicial() {
    window.location.href = "ver-despesas.html, cadastrar-despesas.html"; // Substitua pelo caminho correto da sua página inicial
}

// Função para cadastrar uma nova despesa
function cadastrarDespesa(event) {
    event.preventDefault(); // Impede o envio do formulário

    // Captura os valores do formulário
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;

    // Verifica se os campos estão preenchidos
    if (titulo.trim() === "" || descricao.trim() === "") {
        alert("Por favor, preencha todos os campos!");
        return;
    }

    // Cria um objeto de despesa
    const despesa = { titulo, descricao };

    // Adiciona a despesa à lista (armazenamento temporário local)
    adicionarDespesaNaLista(despesa);

    // Limpa os campos do formulário
    document.getElementById("cadastro-form-despesa").reset();

    alert("Despesa cadastrada com sucesso!");
}

// Função para adicionar a despesa à lista na página
function adicionarDespesaNaLista(despesa) {
    const lista = document.getElementById("despesas-lista");

    // Cria um novo item de lista
    const item = document.createElement("li");

    // Configura o conteúdo do item
    item.innerHTML = `
        <strong>${despesa.titulo}</strong>
        <span class="descricao">${despesa.descricao}</span>
        <button onclick="mostrarPopup(this)">Excluir</button>
    `;

    // Adiciona o item à lista
    lista.appendChild(item);
}

// Função para exibir o pop-up de confirmação de exclusão
function mostrarPopup(button) {
    const popup = document.getElementById("popup-delecao");
    popup.style.display = "flex";

    // Salva o item que será excluído
    popup.dataset.itemParaExcluir = button.parentElement.outerHTML;
}

// Função para confirmar a exclusão
function confirmarDelecao() {
    const popup = document.getElementById("popup-delecao");

    // Localiza o item na lista usando o HTML armazenado
    const lista = document.getElementById("despesas-lista");
    const itemHTML = popup.dataset.itemParaExcluir;

    // Remove o item correspondente
    const items = lista.querySelectorAll("li");
    items.forEach((item) => {
        if (item.outerHTML === itemHTML) {
            lista.removeChild(item);
        }
    });

    // Fecha o pop-up
    fecharPopup();
}

// Função para fechar o pop-up
function fecharPopup() {
    const popup = document.getElementById("popup-delecao");
    popup.style.display = "none";
}

// Adiciona o evento de envio ao formulário
document
    .getElementById("cadastro-form-despesa")
    ?.addEventListener("submit", cadastrarDespesa);