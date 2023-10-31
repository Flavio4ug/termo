// Selecione os elementos da Máquina Divina
const divisao = document.querySelector(".divisao");
const apagaEnter = document.querySelector("#apagar-e-enter");
const primeiraLinha = document.querySelector("#primeira-linha"); // Adicione um ponto antes de "primeira-linha"
const segundaLinha = document.querySelector("#segunda-linha"); // Adicione um ponto antes de "segunda-linha"
const terceiraLinha = document.querySelector("#terceira-linha"); // Adicione um ponto antes de "terceira-linha"

// Defina as teclas sagradas
const teclaPrimeiraLinha = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
const teclaSegundaLinha = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ç'];
const teclaTerceiraLinha = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

// Estabeleça as variáveis para o jogo
const linha = 6;
const coluna = 5;
let linhaAtual = 0;
let colunaAtual = 0;

// Desvende o Códex das Palavras
let palavras = ['SENAI', 'NOITE', 'MILHO', 'LETRA', 'MOUSE'];

// Invocação de uma palavra aleatória do Códex
let palavra = palavras[Math.floor(Math.random() * palavras.length)];
console.log(palavra)

let palavraMapa = {};
for (let i = 0; i < palavra.length; i++) {
    // Desvende as runas da palavra
    palavraMapa[palavra[i]] = i; // Corrija a atribuição
}
const tentativas = [];

// Forje as caixas divinas
for (let linhaIndex = 0; linhaIndex < linha; linhaIndex++) {
    tentativas[linhaIndex] = new Array(coluna);

    const divisaoLinha = document.createElement('div'); // Crie uma nova div
    divisaoLinha.setAttribute('id', 'linha' + linhaIndex); // Define o atributo ID
    divisaoLinha.setAttribute('class', 'div-linha');
    for (let colunaIndex = 0; colunaIndex < coluna; colunaIndex++) {
        // Forje as colunas
        const divisaoColuna = document.createElement('div');
        divisaoColuna.setAttribute('id', 'linha' + linhaIndex + 'coluna' + colunaIndex);
        let classColuna;
        if (linhaIndex === 0) {
            classColuna = 'div-coluna digitando';
        } else {
            classColuna = 'div-coluna desativado';
        }
        divisaoColuna.setAttribute('class', classColuna);
        divisaoLinha.appendChild(divisaoColuna); // Adicione a coluna como uma peça da máquina
        tentativas[linhaIndex][colunaIndex] = ''; // A tentativa começa vazia
    }
    divisao.appendChild(divisaoLinha); // Adicione a linha como parte da grande engrenagem
}

// Inspeção da tentativa
const checkTentativa = () => {
    const tentativa = tentativas[linhaAtual].join(''); // Cria um objeto a partir do Array 'tentativas' usando o método join
    if (tentativa.length !== coluna) {
        // Verifique se já foi colocada uma letra (tentativas) na coluna
        return;
    }
    let atColuna = document.querySelectorAll('.digitando');
    for (let i = 0; i < coluna; i++) {
        const letra = tentativa[i]; // Selecione a letra correspondente à coluna atual, corrija a variável 'index' para 'i'
        if (palavraMapa[letra] === undefined) { // Corrija a condição
            atColuna[i].classList.add('errado');
        } else {
            if (palavraMapa[letra] === i) {
                atColuna[i].classList.add('certa');
            } else {
                atColuna[i].classList.add('deslocada'); // Corrija para 'add' em vez de 'class'
            }
        }
    }

    if (tentativa === palavra) {
        window.alert('Parabéns, você conseguiu!');
        return;
    } else {
        if (linhaAtual === linha - 1) {
            window.alert('Que pena, você perdeu! A palavra era: ');
        } else {
            proximaLinha();
        }
    }
};

// Prossiga com a próxima linha
const proximaLinha = () => {
    let digColuna = document.querySelectorAll('.digitando');
    // Seleciona todos os elementos com a classe digitando
    for (let i = 0; i < coluna; i++) {
        digColuna[i].classList.remove('digitando');
        digColuna[i].classList.add('desativado');
    }
    linhaAtual++;
    colunaAtual = 0;
    // linhaAtual++ para ir para a próxima linha e a coluna volta a ser 0 para ser a primeira caixinha da linha

    const linhaAtualElemento = document.querySelectorAll('.div-coluna');
    for (let i = 0; i < atColuna.length; i++) {
        atColuna[i].classList.remove('desativado');
        atColuna[i].classList.add('digitando');
    }
};

// Registre as palavras sagradas do teclado
const tecladoOnClick = (key) => {
    if (colunaAtual === coluna) {
        // Verifique se acabaram as colunas
        return;
    }
    const divatual = document.querySelector('#linha' + linhaAtual + 'coluna' + colunaAtual);
    divatual.textContent = key;
    tentativas[linhaAtual][colunaAtual] = key;
    colunaAtual++;
};

// Crie as linhas de teclado sagradas
const criarLinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key => {
        let botaoElemento = document.createElement('button');
        botaoElemento.textContent = key;
        botaoElemento.setAttribute('id', key);
        botaoElemento.addEventListener('click', () => tecladoOnClick(key));
        linhaTeclado.appendChild(botaoElemento); // Corrija para 'appendChild' em vez de 'append'
    });
};

criarLinhaTeclado(teclaPrimeiraLinha, primeiraLinha);
criarLinhaTeclado(teclaSegundaLinha, segundaLinha);
criarLinhaTeclado(teclaTerceiraLinha, terceiraLinha);

// Desfira a runa do Backspace
const backspace = () => {
    if (colunaAtual === 0) {
        return
    }
    colunaAtual--
    tentativas[linhaAtual][colunaAtual] = ''
    const div = document.querySelector('#linha' + linhaAtual + 'coluna' + colunaAtual)
    div.textContent = ''
}

const backspaceBotao = document.createElement('button')
backspaceBotao.addEventListener('click', backspace)
backspaceBotao.textContent = '<x'
apagaEnter.append(backspaceBotao)

const enterButton = document.createElement('button')
enterButton.addEventListener('click', checkTentativa)
enterButton.textContent = 'ta bom'
apagaEnter.append(enterButton)

document.onkeydown = function (evt) {
    evt = evt || window.evt
    if (evt.key === 'Enter') {
        checkTentativa()
    }
    else if (evt.key === 'Backspace') {
        backspace()
    }
    else {
        tecladoOnClick(evt.key.toUpperCase())
    }
}
