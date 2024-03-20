var listaNumerosEscolhidos = [];
var limiteNumeros = 10;
var numeroSecreto = gerarAleatorio();
var tentativas = 1;
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) {
    var campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.3});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'JOGO DO NÚMERO SECRETO');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10:');
}


function verificarChute() {
    var chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Parabéns, você acertou o número secreto!');
        var palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        var mensagemTentativas = `Você descobriu com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('h1', `O número secreto é menor que ${chute}...`);
        } else {
            exibirTextoNaTela('h1', `O número secreto é maior que ${chute}...`);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarAleatorio() {
    var numeroEscolhido = parseInt(Math.random() * limiteNumeros + 1);
    var quantidadeElementosLista = listaNumerosEscolhidos.length;

    if (quantidadeElementosLista == limiteNumeros) {
        listaNumerosEscolhidos = [];
    }

    if (listaNumerosEscolhidos.includes(numeroEscolhido)) {
        return gerarAleatorio();

    } else {
        listaNumerosEscolhidos.push(numeroEscolhido);
        console.log(listaNumerosEscolhidos);
        return numeroEscolhido;
    }
    
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';    
}

function novoJogo() {
    limparCampo();
    numeroSecreto = gerarAleatorio();
    tentativas = 1;
    exibirMensagemInicial()
    document.getElementById('reiniciar').setAttribute('disabled', true);
}