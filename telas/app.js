// Classe principal do aplicativo
class App {
    // Construtor da classe App
    constructor() {
        // Pega o elemento com id 'app', que é onde as telas serão renderizadas
        this.container = document.getElementById('app');
        // Inicializa a tela atual como 'home', que é a tela inicial
        this.currentScreen = 'home';
    }

    // Função responsável por renderizar a tela atual com base no valor de 'currentScreen'
    render() {
        // O switch verifica qual tela deve ser renderizada
        switch (this.currentScreen) {
            case 'home': // Se a tela atual for 'home'
                this.renderHomeScreen();
                break;
            case 'login': // Se a tela atual for 'login'
                this.renderLoginScreen();
                break;
            case 'signup': // Se a tela atual for 'signup'
                this.renderSignupScreen();
                break;
            default:
                // Caso não seja nenhuma das telas definidas, exibe um erro no console
                console.error("Tela desconhecida:", this.currentScreen);
        }
    }

    // Função para renderizar a tela inicial
    renderHomeScreen() {
        this.container.innerHTML = `
            <div class="screen">
                <h1 class="logo">PiggyBank</h1> <!-- Logo do aplicativo -->
                <div class="initial-content">
                    <!-- Botão de 'Entrar', que ao ser clicado chama o método 'setScreen' para ir para a tela de login -->
                    <button class="btn-enter" onclick="app.setScreen('login')">Entrar</button>
                    <p>Ainda não tem uma conta? <a href="#" onclick="app.setScreen('signup')">Clique aqui</a></p>
                    <!-- Link para 'Clique aqui' que chama o método 'setScreen' para ir para a tela de cadastro -->
                </div>
            </div>
        `;
    }

    // Função para renderizar a tela de login
    renderLoginScreen() {
        this.container.innerHTML = `
            <div class="screen">
                <h1 class="logo">PiggyBank</h1> <!-- Logo do aplicativo -->
                <form class="form">
                    <!-- Campos do formulário para login -->
                    <input type="email" placeholder="Seu email" required> <!-- Campo de email -->
                    <input type="password" placeholder="Sua senha" required> <!-- Campo de senha -->
                    <button type="submit" class="btn">Entrar</button> <!-- Botão para submeter o formulário -->
                </form>
                <p><a href="#" onclick="app.setScreen('signup')">Ainda não tem uma conta? Clique aqui</a></p>
                <!-- Link para 'Clique aqui' que chama o método 'setScreen' para ir para a tela de cadastro -->
            </div>
        `;
    }

    // Função para renderizar a tela de cadastro
    renderSignupScreen() {
        this.container.innerHTML = `
            <div class="screen">
                <h1 class="logo">PiggyBank</h1> <!-- Logo do aplicativo -->
                <h2>Crie sua conta</h2> <!-- Título do formulário de cadastro -->
                <form class="form">
                    <!-- Campos do formulário para cadastro -->
                    <input type="email" placeholder="Seu email" required> <!-- Campo de email -->
                    <input type="text" placeholder="Seu nome" required> <!-- Campo de nome -->
                    <input type="text" placeholder="Seu endereço" required> <!-- Campo de endereço -->
                    <input type="password" placeholder="Sua senha" required> <!-- Campo de senha -->
                    <div class="radio-group">
                        <!-- Botões de rádio para selecionar o tipo de usuário -->
                        <label><input type="radio" name="role" value="dependente" required> Sou filho/dependente</label>
                        <label><input type="radio" name="role" value="responsavel" required> Sou pai/responsável</label>
                    </div>
                    <button type="submit" class="btn">Criar conta</button> <!-- Botão para submeter o formulário -->
                </form>
            </div>
        `;
    }

    // Função para definir a tela atual, com base na tela passada como parâmetro
    setScreen(screen) {
        this.currentScreen = screen; // Atualiza a tela atual
        this.render(); // Renderiza a nova tela
    }
}

// Criação de uma instância do App
const app = new App();
// Renderiza a tela inicial quando a página é carregada
app.render();