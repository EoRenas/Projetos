// Inclusão dos elementos
const gameContainer = document.querySelector('.container');
const userResult = document.querySelector('.user_result img');
const cpuResult = document.querySelector('.cpu_result img');
const result = document.querySelector('.result');
const optionImages = document.querySelectorAll('.option_image');
const historyList = document.querySelector('.history_list');

// Lista para armazenar o histórico das jogadas
const history = [];

// Adiciona um evento de clique às imagens de opção
optionImages.forEach((image, index) => {
    image.addEventListener('click', (e) => {
        image.classList.add('active');
        
        // Marca a imagem atual e desmarca as outras
        optionImages.forEach((image2, index2) => {
            index !== index2 && image2.classList.remove('active');
        });

        gameContainer.classList.add('start');

        let time = setTimeout(() => {
            gameContainer.classList.remove('start');

            // Seleciona o ícone e gera o seu registro
            const imageSrc = e.target.querySelector('img').src;
            userResult.src = imageSrc;

            // Gera número aleatório para a CPU
            const randomNumber = Math.floor(Math.random() * 3);
            const cpuImages = ['images/pedra.png', 'images/papel.png', 'images/tesoura.png'];
            cpuResult.src = cpuImages[randomNumber];

            // Define as opções para contagem da vitória para a CPU e o usuário
            const cpuValue = ['R', 'P', "S"][randomNumber];
            const userValue = ['R', 'P', "S"][index];

            // Cria os objetos para todos os resultados possíveis
            const outComes = {
                RR: 'Empatou',
                RP: 'Você Perdeu!!',
                RS: 'Você Ganhou!!',
                PP: 'Empatou',
                PR: 'Você Ganhou!!',
                PS: 'Você Perdeu!!',
                SS: 'Empatou',
                SP: 'Você Ganhou!!',
                SR: 'Você Perdeu!!',
            };

            const outComeValue = outComes[userValue + cpuValue];
            result.textContent = userValue === cpuValue ? 'Empatou' : `${outComeValue}`;

            // Adiciona o resultado ao histórico
            if (history.length >= 10) {
                history.shift(); // Remove o item mais antigo se já houver 10 itens
            }

            history.push({
                userMove: userResult.src,
                cpuMove: cpuResult.src,
                result: outComeValue
            });

            // Atualiza o histórico na interface
            updateHistory();
        }, 1500);
    });
});

// Atualiza a lista de histórico na interface
function updateHistory() {
    historyList.innerHTML = ''; // Limpa o histórico atual

    history.forEach((entry) => {
        const li = document.createElement('li');
        li.classList.add('history-item');

        const userImg = document.createElement('img');
        userImg.src = entry.userMove;
        userImg.alt = 'Jogada do usuário';

        const cpuImg = document.createElement('img');
        cpuImg.src = entry.cpuMove;
        cpuImg.alt = 'Jogada da CPU';

        const resultText = document.createElement('span');
        resultText.textContent = entry.result;

        li.appendChild(userImg);
        li.appendChild(cpuImg);
        li.appendChild(resultText);

        historyList.appendChild(li);
    });
}
