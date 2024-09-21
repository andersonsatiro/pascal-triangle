let matriz = []
const main = document.getElementById('main-content')
const input = document.getElementById('num-linhas')
const binomioDiv = document.getElementById('div-binomio')

// Função para exibir o Triângulo de Pascal na tela
const inserirMarizNaTela = () => {
    for (let l = 0; l < matriz.length; l++) {
        const ul = document.createElement('ul')
        main.appendChild(ul)

        for (let c = 0; c < matriz[l].length; c++) {
            const li = document.createElement('li')
            li.innerHTML = matriz[l][c]
            ul.appendChild(li)
        }
    }
}

// Função para gerar o Triângulo de Pascal
const gerarMatriz = (numLinhas) => {
    for (let l = 0; l < numLinhas; l++) {
        if (l == 0) {
            matriz[0] = [1]
        } else {
            maxColunas = matriz[l - 1].length + 1
            matriz[l] = []

            for (let c = 0; c < maxColunas; c++) {
                if (c == 0 || c == maxColunas - 1) {
                    matriz[l][c] = 1
                } else {
                    matriz[l][c] = matriz[l - 1][c - 1] + matriz[l - 1][c]
                }
            }
        }
    }

    inserirMarizNaTela()
}

// Função para calcular e exibir a expansão do binômio (a + b)^n
const exibirBinomio = (n) => {
    binomioDiv.innerHTML = '';  // Limpa o conteúdo anterior

    const coeficientes = matriz[n - 1]; // Pega os coeficientes da linha n-1
    let expansao = '';

    // Gera a expressão do binômio
    for (let k = 0; k <= n - 1; k++) {
        const coef = coeficientes[k];
        const termoA = n - 1 - k > 0 ? `a<sup>${n - 1 - k}</sup>` : 'a';
        const termoB = k > 0 ? `b<sup>${k}</sup>` : 'b';

        expansao += `${coef !== 1 ? coef : ''}${n - 1 - k > 0 ? termoA : ''}${k > 0 ? termoB : ''}`;

        // Adiciona o sinal de + entre os termos
        if (k < n - 1) {
            expansao += ' + ';
        }
    }

    binomioDiv.innerHTML = expansao;  // Insere a expansão na div
}

// Evento para atualizar o Triângulo de Pascal e o binômio
input.addEventListener('input', () => {
    const numLinhas = parseInt(input.value, 10);

    if (numLinhas > 0) {
        main.innerText = '';
        matriz = [];
        gerarMatriz(numLinhas);
        exibirBinomio(numLinhas);  // Exibe o binômio com base no número de linhas
    }
});

// Gera a matriz inicial com 7 linhas
gerarMatriz(7);
exibirBinomio(7);
