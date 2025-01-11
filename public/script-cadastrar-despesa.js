// URL base do backend (substituir pela URL do seu servidor)
const API_BASE_URL = "http://localhost:3000";

// // Função para alternar entre telas
// function showScreen(screenId) {
//     document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden')); // Esconde todas as telas
//     const screen = document.getElementById(screenId);
//     if (screen) {
//         screen.classList.remove('hidden'); // Exibe a tela específica
//     }
// }

// // Função principal para inicializar os eventos
// function initializeScreenNavigation() {
//     // Seleciona os botões e links
//     const btnEntrar = document.getElementById('btn-entrar');
//     const linkCadastro = document.getElementById('link-cadastro');
//     const btnVoltar = document.querySelectorAll('.btn-back'); // Seleciona todos os botões de voltar
//     const logoutIcon = document.getElementById('logout-icon');

//     // Adiciona evento ao botão "Entrar"
//     if (btnEntrar) {
//         btnEntrar.addEventListener('click', (event) => {
//             event.preventDefault();
//             showScreen('tela-login'); // Mostra a tela de login
//         });
//     }

//     // Adiciona evento para os botões "Voltar"
//     if (btnVoltar) {
//         btnVoltar.forEach((btn) => {
//             btn.addEventListener('click', (event) => {
//                 event.preventDefault();
//                 showScreen('tela-inicial'); // Retorna para a tela inicial
//             });
//         });
//     }

//     // Evento para o ícone de logout
//     if (logoutIcon) {
//         logoutIcon.addEventListener('click', () => {
//             logout();
//         });
//     }

//     // Garante que a tela inicial seja exibida ao carregar a página
//     showScreen('tela-inicial');
// }



// // Função para logout
// function logout() {
//     alert('Você saiu do sistema.');
//     showScreen('tela-inicial'); // Volta à tela inicial
// }


// // Inicializa a navegação entre telas ao carregar a página
// document.addEventListener('DOMContentLoaded', initializeScreenNavigation);


//Envia os dados do form de cadastro de despesa
document.getElementById("btn-cadastrar-despesa").addEventListener("click", async (event) => {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const idConta = localStorage.getItem("idConta");


    try {
        const response = await fetch('/despesas/cadastrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ titulo, descricao, idConta }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Erro na requisição:", errorData.message);
            throw new Error(`Erro: ${response.status} - ${errorData.message}`);
        }

        const data = await response.json();
        console.log("Despesa cadastrada com sucesso:", data);
        alert("Despesa cadastrada com sucesso!");
        //showScreen('tela-inicial'); 
        
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Erro ao cadastrar despesa: " + error.message);
    }
});
