document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recuperar-senha-form');
    const identificadorInput = document.getElementById('identificador');
    const message = document.getElementById('recuperar-senha-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const identificador = identificadorInput.value;

        // Simulação de envio de email (substitua pela lógica real)
        message.textContent = `Um link de recuperação foi enviado para ${identificador}.`;
    });
});