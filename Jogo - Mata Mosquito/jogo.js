var altura = 0
var largura = 0
var vidas = 1
var tempo = 30

var criaMosquitoTempo = 1500 //millesegundos

var nivel = window.location.search
nivel = nivel.replace('?', '')

if(nivel === 'normal') {
    //1500
    criaMosquitoTempo = 1500
} else if(nivel === 'dificil') {
    //1000
    criaMosquitoTempo = 1000
} else if(nivel === 'visaoAvancada') {
    //750
    criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight
    largura = window.innerWidth

}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function() {

    tempo -= 1

    if(tempo < 0) {
        clearInterval(criaMosquito)
        clearInterval(cronometro)
        window.location.href = 'vitoria.html'
    } else {
        document.getElementById('cronometro').innerHTML = tempo
    }
    
}, 1000 )

function posicaoRandomica() {

    //remover o mosquito anterior (caso exista)
    if(document.getElementById('mosquito')) {

        document.getElementById('mosquito').remove()

        if(vidas > 5) {

            window.location.href = 'fim_de_jogo.html'
        } else {

            document.getElementById('v' + vidas).src = "img/coracao_vazio.png"
            vidas++
        }
        
    }

    var posicaoX = Math.floor(Math.random() * largura) - 120
    var posicaoY = Math.floor(Math.random() * altura) - 120

    if(posicaoX < 0) {
        posicaoX = 0
    }

    if(posicaoY < 0) {
        posicaoY = 0
    }

    //criar o elemento html
    var mosquito = document.createElement('img')
    mosquito.src = 'img/mosca_visao_avancada.gif'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio()
    mosquito.style.left = posicaoX + 'px'
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function() {
        this.remove()
    }

    document.body.appendChild(mosquito)
}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    if(classe === 0){
        return 'mosquito1'
    } else if(classe === 1) {
        return 'mosquito2'
    } else if(classe === 2) {
        return 'mosquito3'
    }

    console.log(classe)
}

function ladoAleatorio() {
    var classe = Math.floor(Math.random() * 2)

    if(classe === 0){
        return 'ladoA'
    } else if(classe === 1) {
        return 'ladoB'
    }
}