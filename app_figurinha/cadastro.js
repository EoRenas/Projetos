document.addEventListener('DOMContentLoaded', function() {
    const cadastroForm = document.getElementById('cadastro-form');
    const cadastroMessage = document.getElementById('cadastro-message');

    cadastroForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nome = document.getElementById('nome').value;
        const apelido = document.getElementById('apelido').value;
        const dataNascimento = document.getElementById('dataNascimento').value;
        const email = document.getElementById('email').value;
        const confirmEmail = document.getElementById('confirmEmail').value;
        const novaSenha = document.getElementById('novaSenha').value;
        const confirmSenha = document.getElementById('confirmSenha').value;

        // Validação de idade (maior de 18 anos)
        const dataNascimentoObj = new Date(dataNascimento);
        const hoje = new Date();
        const idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();
        const m = hoje.getMonth() - dataNascimentoObj.getMonth();
        if (m < 0 || (m === 0 && hoje.getDate() < dataNascimentoObj.getDate())) {
            idade--;
        }

        if (idade < 18) {
            cadastroMessage.textContent = 'Você deve ter pelo menos 18 anos para se cadastrar.';
            return;
        }

        // Validação de email e senha
        if (email !== confirmEmail) {
            cadastroMessage.textContent = 'Os emails não coincidem.';
            return;
        }

        if (novaSenha !== confirmSenha) {
            cadastroMessage.textContent = 'As senhas não coincidem.';
            return;
        }

        // Lógica de cadastro (simulada)
        cadastroMessage.textContent = `Usuário ${apelido} cadastrado com sucesso.`;
    });
});