// URL base do backend (substituir pela URL do seu servidor)
const API_BASE_URL = "http://localhost:3000";

// Função para alternar entre telas
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden')); // Esconde todas as telas
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove('hidden'); // Exibe a tela específica
    }
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
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password');
        const senha = password.value;

        // login integração com backend
        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha })
            });

            if (!response.ok) {
                throw new Error('Email ou senha incorretos.');
            }

            const data = await response.json();
            localStorage.setItem('userId', data.user.id);
            localStorage.setItem('idConta', data.user.idConta);
            localStorage.setItem('id_conta', data.user.id_conta);

            mostrarDashboard(data.nomeUsuario);
        } catch (error) {
            alert(error.message);
        }
    });
}

// Evento de submissão do formulário de cadastro
const cadastroForm = document.getElementById('cadastro-form');
if (cadastroForm) {
    cadastroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // const nome = document.getElementById('cadastro-nome').value;
        // const email = document.getElementById('cadastro-email').value;
        // const password = document.getElementById('cadastro-senha');
        // const senha = password.value;
        // const endereco = document.getElementById('cadastro-endereco').value; // Novo campo de endereço
        // //const idConta = document.getElementById('cadastro-conta').value; // Novo campo de conta

        // //if (!idEndereco || !idConta) {
        // //    alert('Por favor, selecione o endereço e a conta.');
        // //    return;
        // //}

        // try {
        //     const response = await fetch(`${API_BASE_URL}/cadastro`, {
        //         method: 'POST',
        //         headers: { 'Content-Type': 'application/json' },
        //         body: JSON.stringify({ nome, email, senha, endereco })
        //     });
        //     console.log("se chegou aqui é pq conseguiu dar getElementById nessas merdinha")
        //     console.log("senha", senha);
        //     console.log("email", email)
        //     console.log("endereço", endereco)
        //     console.log("nome", nome)


        //     if (!response.ok) {
        //         throw new Error('Erro ao criar conta. Verifique os dados.');
        //     }

        const formData = {
            nome: document.getElementById("cadastro-nome").value,
            email: document.getElementById("cadastro-email").value,
            senha: document.getElementById("cadastro-senha").value,
            endereco: document.getElementById('cadastro-endereco').value,
        };
        
        fetch('http://localhost:3000/cadastro', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                console.log(JSON.stringify("formdata enviado front->back = ",formData));
                if (!response.ok) {
                    throw new Error(`Erro: ${response.status}`);
                }
                alert('Conta criada com sucesso!');
                showScreen('tela-login'); // Volta para a tela de login
                return response.json();                
            })
            .then(data => console.log(data))
            .catch(error => console.error('Erro na requisição:', error));

            // alert('Conta criada com sucesso!');
            // showScreen('tela-login'); // Volta para a tela de login
        
    });
}

// Função para mostrar o dashboard com o nome do usuário
function mostrarDashboard(nomeUsuario) {
    // Esconde todas as telas
    document.querySelectorAll('.screen').forEach(screen => screen.classList.add('hidden'));

    // Exibe a tela do dashboard
    const dashboard = document.getElementById('tela-dashboard');
    if (dashboard) {
        dashboard.classList.remove('hidden');
    }

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

// Seleciona os elementos do saldo
const saldoBtn = document.querySelector('.saldo-btn');
const saldoInput = document.getElementById('saldo-input');
const valorSaldo = document.getElementById('valor-saldo');

// Verifica se os elementos do saldo existem antes de adicionar eventos
if (saldoBtn && saldoInput && valorSaldo) {
    // Evento para mostrar o campo de entrada ao clicar na imagem
    saldoBtn.addEventListener('click', () => {
        saldoInput.classList.toggle('visible'); // Alterna a visibilidade do input
        saldoInput.focus(); // Foca no campo de entrada
    });

    // Evento para atualizar o saldo quando o valor for alterado
    saldoInput.addEventListener('input', async (e) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value)) {
            valorSaldo.textContent = `R$ ${value.toFixed(2)}`; // Atualiza o texto do saldo

            try {
                await fetch(`${API_BASE_URL}/saldo`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ saldo: value })
                });
            } catch (error) {
                console.error('Erro ao atualizar saldo:', error.message);
            }

        } else {
            valorSaldo.textContent = 'R$ 0.00'; // Valor padrão
        }
    });

    // Inicializa a navegação entre telas ao carregar a página
    document.addEventListener('DOMContentLoaded', initializeScreenNavigation);

    // Fecha o campo de entrada quando o valor for confirmado (ao perder o foco)
    saldoInput.addEventListener('blur', () => {
        saldoInput.classList.remove('visible'); // Esconde o campo de entrada
    });
}

// //Envia os dados do form de cadastro de despesa
// async function cadastrarDespesa(event) {
//     if (event) event.preventDefault();

//     const titulo = document.getElementById("titulo").value;
//     const descricao = document.getElementById("descricao").value;
//     const idConta = localStorage.getItem("idConta");


//     try {
//         const response = await fetch('/despesas/cadastrar', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ titulo, descricao, idConta }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Erro na requisição:", errorData.message);
//             throw new Error(`Erro: ${response.status} - ${errorData.message}`);
//         }

//         const data = await response.json();
//         console.log("Despesa cadastrada com sucesso:", data);
//         alert("Despesa cadastrada com sucesso!");
//         showScreen('tela-inicial'); 
        
//     } catch (error) {
//         console.error("Erro na requisição:", error);
//         alert("Erro ao cadastrar despesa: " + error.message);
//     }

// }

// document.getElementById("btn-cadastrar-despesa").addEventListener("click", async (event) => {
//     event.preventDefault();

//     const titulo = document.getElementById("titulo").value;
//     const descricao = document.getElementById("descricao").value;
//     const idConta = localStorage.getItem("idConta");


//     try {
//         const response = await fetch('/despesas/cadastrar', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ titulo, descricao, idConta }),
//         });

//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error("Erro na requisição:", errorData.message);
//             throw new Error(`Erro: ${response.status} - ${errorData.message}`);
//         }

//         const data = await response.json();
//         console.log("Despesa cadastrada com sucesso:", data);
//         alert("Despesa cadastrada com sucesso!");
//         showScreen('tela-inicial'); 
        
//     } catch (error) {
//         console.error("Erro na requisição:", error);
//         alert("Erro ao cadastrar despesa: " + error.message);
//     }
// });



// Função principal para buscar e exibir despesas
async function verDespesas(event) {
    if (event) event.preventDefault(); // Impede o comportamento padrão do link, se chamado via clique.

    // Recuperar o idConta do localStorage
    const idConta = localStorage.getItem("idConta");

    if (!idConta) {
        alert("ID da conta não encontrado. Faça login novamente.");
        return false;
    }

    try {
        // Busca as despesas do backend
        const despesas = await buscarDespesas(idConta);

        // Salva as despesas no localStorage
        localStorage.setItem('despesas', JSON.stringify(despesas));
        window.location.href = 'ver-despesas.html';

    } catch (error) {
        console.error('Erro ao carregar despesas:', error);
        alert("Erro ao carregar despesas. Tente novamente.");
    }

    return false;
}

// Função para buscar despesas da API
async function buscarDespesas(idConta) {
    const response = await fetch(`${API_BASE_URL}/despesas/ver/${idConta}`, { method: 'GET' });

    if (!response.ok) {
        throw new Error('Erro ao buscar despesas');
    }

    return response.json(); // Retorna as despesas como objeto
}

// Função para exibir despesas na lista
document.addEventListener('DOMContentLoaded', () => {


    if (window.location.pathname.endsWith('ver-despesas.html')) {
        console.log('O DOM foi carregado!');
   
        const listaDespesas = document.getElementById('despesas-lista');
        console.log('Elemento #despesas-lista:', listaDespesas);

        if (!listaDespesas) {
            console.error('Elemento #despesas-lista não encontrado no DOM.');
            return;
        }

        const despesas = JSON.parse(localStorage.getItem('despesas')) || [];  
        listaDespesas.innerHTML = '';

        //Verifica se há despesas
        if (despesas.length === 0) {
            listaDespesas.innerHTML = '<p>Sem despesas para exibir.</p>';
            return;
        }
        despesas.forEach((despesa) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <div>
                    <strong>${despesa.titulo}</strong>
                    <p>R$ ${parseFloat(despesa.gastos).toFixed(2)}</p>
                </div>
                <div>
                    <button onclick="editarDespesa(${despesa.id})">Editar</button>
                    <button onclick="deletarDespesa(${despesa.id})">Deletar</button>
                </div>
            `;
            listaDespesas.appendChild(li);
        });
    }  

})



// // Função para editar uma despesa (placeholder)
// function editarDespesa(id) {
//     console.log(`Editar despesa com ID: ${id}`);
//     // Implementar lógica para edição
// }

// Função para deletar uma despesa (placeholder)
// async function deletarDespesa(id) {
//     console.log(`Deletar despesa com ID: ${id}`);
//     // Implementar lógica para exclusão
// }



