document.addEventListener('DOMContentLoaded', function() {
    // Lógica do login
    const form = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value;
        const password = passwordInput.value;

        if (username === 'usuario' && password === 'senha') {
            window.location.href = 'pagina-inicial.html';
        } else {
            errorMessage.textContent = 'Usuário ou senha incorretos.';
        }
    });

    // Lógica de cadastro
    const cadastroLink = document.getElementById('cadastro-link');
    const cadastroContainer = document.getElementById('cadastro-form-container');
    const cadastroForm = document.getElementById('cadastro-form');
    const cadastroMessage = document.getElementById('cadastro-message');
    const voltarCadastroLogin = document.getElementById('voltar-cadastro-login');

    cadastroLink.addEventListener('click', function() {
        cadastroContainer.classList.remove('hidden');
        document.getElementById('recuperar-senha-form-container').classList.add('hidden');
    });

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('novo-username').value;
        const password = document.getElementById('novo-password').value;
        cadastroMessage.textContent = `Usuário ${username} cadastrado com sucesso.`;
    });

    voltarCadastroLogin.addEventListener('click', function() {
        cadastroContainer.classList.add('hidden');
    });
});