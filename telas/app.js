class App {
    // Construtor da classe App
    constructor() {
        this.container = document.getElementById('app'); // Container principal
        this.currentScreen = 'home'; // Tela inicial
        this.previousScreen = null; // Tela anterior
    }

    // Renderiza a tela atual
    render() {
        switch (this.currentScreen) {
            case 'home':
                this.renderHomeScreen();
                break;
            case 'login':
                this.renderLoginScreen();
                break;
            case 'signup':
                this.renderSignupScreen();
                break;
            default:
                console.error("Tela desconhecida:", this.currentScreen);
        }
    }

    // Tela inicial
    renderHomeScreen() {
        this.container.innerHTML = `
            <div class="screen">
                <h1 class="logo">PiggyBank</h1>
                <div class="initial-content">
                    <button class="btn-enter" onclick="app.setScreen('login')">Entrar</button>
                    <p>Ainda não tem uma conta? <a href="#" onclick="app.setScreen('signup')">Clique aqui</a></p>
                </div>
            </div>
        `;
    }

    // Tela de login
    renderLoginScreen() {
        this.container.innerHTML = `
            <div class="screen">
                <h1 class="logo">PiggyBank</h1>
                <form id="login-form" class="form">
                    <input type="email" id="login-email" placeholder="Seu email" required>
                    <input type="password" id="login-password" placeholder="Sua senha" required>
                    <button type="submit" class="btn">Entrar</button>
                </form>
                <p><a href="#" onclick="app.setScreen('signup')">Ainda não tem uma conta? Clique aqui</a></p>
            </div>
        `;
        
        // Registra a tela anterior
        this.previousScreen = 'home';

        // Adiciona evento ao formulário de login
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            // Simulação de login
            if (email === "teste@teste.com" && password === "123456") {
                alert("Login realizado com sucesso!");
                this.setScreen('home'); // Redireciona para a tela inicial
            } else {
                alert("Email ou senha incorretos.");
            }
        });
    }

    // Tela de cadastro
    renderSignupScreen() {
        this.container.innerHTML = `
            <div class="screen">
                <h1 class="logo">PiggyBank</h1>
                <h2>Crie sua conta</h2>
                <form id="signup-form" class="form">
                    <input type="email" id="signup-email" placeholder="Seu email" required>
                    <input type="text" id="signup-name" placeholder="Seu nome" required>
                    <input type="text" id="signup-address" placeholder="Seu endereço" required>
                    <input type="password" id="signup-password" placeholder="Sua senha" required>
                    <div class="radio-group">
                        <label><input type="radio" name="role" value="dependente" required> Sou filho/dependente</label>
                        <label><input type="radio" name="role" value="responsavel" required> Sou pai/responsável</label>
                    </div>
                    <button type="submit" class="btn">Criar conta</button>
                </form>
            </div>
        `;

        // Registra a tela anterior
        this.previousScreen = 'home';

        // Adiciona evento ao formulário de cadastro
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signup-email').value;
            const name = document.getElementById('signup-name').value;

            // Simulação de cadastro
            alert(`Conta criada com sucesso para ${name}!`);
            this.setScreen('home'); // Redireciona para a tela inicial
        });
    }

    // Altera a tela atual
    setScreen(screen) {
        this.previousScreen = this.currentScreen; // Guarda a tela anterior
        this.currentScreen = screen;
        this.render();
    }

    // Função para voltar para a tela anterior
    goBack() {
        if (this.previousScreen) {
            this.setScreen(this.previousScreen); // Volta para a tela anterior
        } else {
            console.warn("Nenhuma tela anterior configurada.");
        }
    }
}

// Criação da instância do App e renderização inicial
const app = new App();
app.render();
