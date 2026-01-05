class JogoFinalizado {
    constructor (){
        this.html = document.getElementById("sair-jogo-finalizado")
        this.htmlProximaFase = document.getElementById("proxima-fase")
        this.html.addEventListener("click",() => this.salvaESai())
        this.htmlProximaFase.addEventListener("click",() => this.salvaEVaiParaProximaFase())
    }
    salvaESai() {
        alert("SALVANDO E SAINDO")
        const tempo = document.getElementById("mostra-tempo-final").textContent
        const pontuacao = document.getElementById("mostra-pontuacao-final").textContent
        const dadosDoJogoFinalizado = JSON.stringify({
            tempo,pontuacao
        })
        window.localStorage.setItem("dadosDoJogoFinalizado", dadosDoJogoFinalizado)
    }
    salvaEVaiParaProximaFase() {
        this.salvaESai()
        this.vaiParaProximaFase()
    }

    pegaDadosDoJogoFinalizado() {
        return window.localStorage.getItem("dadosDoJogoFinalizado")
    }
    vaiParaProximaFase() {
        window.location.href = "https://www.w3schools.com";
    }
}