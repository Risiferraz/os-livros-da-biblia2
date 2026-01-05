class Pontuacao {
    constructor(idPontuacao) {
        this.idPontuacao = idPontuacao
        this.elementoHtml = document.getElementById(idPontuacao)
        this.pontosDoJogador = 0
        this.usouDica = false
        this.errou = false
        this.errouTestamento = false
    }
    pegaPontuacao() {
        return this.pontosDoJogador
    }
    setPontuacaoDoJogador(pontosDoJogador) {
        this.pontosDoJogador = pontosDoJogador
    }
    setPontuacaoDoJogadorSalva(pontosDoJogador) {
        this.setPontuacaoDoJogador(pontosDoJogador)
        this.atualizaPontuacao()
    }
    atualizaPontuacao() {
        this.elementoHtml.textContent = this.pontosDoJogador
        this.animacaoDeMudancaDePontuacao()
        document.getElementById("pontuacao-para-salvar").textContent = this.pontosDoJogador
    }
    animacaoDeMudancaDePontuacao() {
        this.elementoHtml.style.color="white"
        setTimeout(()=>{
            this.elementoHtml.style.color="black"
        },2000)
    }
    pegaPontoParaAcertoSemDica() {
        return 10
    }
    pegaPontoParaAcertoComDica() {
        return 5
    }
    pegaPontoParaAcertoComErro() {
        return 2
    }
    passandoParaNovoLivro() {
        this.usouDica = false
        this.errou = false
        this.errouTestamento = false
    }
    adicionaPontuacaoCorreta() {
        this.pontosDoJogador += this.pegaPontuacaoCerta()
        this.atualizaPontuacao()
        this.passandoParaNovoLivro()
    }
    usandoDica() {
        this.usouDica = true
    }
    pegaPontuacaoCerta() {
        if (!this.usouDica && !this.errou) {
            return this.pegaPontoParaAcertoSemDica()
        }
        else if (this.usouDica && !this.errou) {
            return this.pegaPontoParaAcertoComDica()
        }
        else {
            return this.pegaPontoParaAcertoComErro()
        }
    }
    errando() {
        this.errou = true
    }
    errandoTestamento() {
        this.errouTestamento = true
    }
    adicionaPontuacaoCorretaTestamento(){
        this.pontosDoJogador += this.pegaPontuacaoCertaTestamento()
        this.atualizaPontuacao()
        this.passandoParaNovoLivro()
    }
    pegaPontuacaoCertaTestamento(){
        if (this.errouTestamento) {
            return this.pegaPontoParaAcertoComErroTestamento()
        }
        else {
            return this.pegaPontoParaAcertoSemErroTestamento()
        }
    }
    pegaPontoParaAcertoComErroTestamento() {
        return 1
    }
    pegaPontoParaAcertoSemErroTestamento() {
        return 5
    }
    adicionaPontuacaoDeAcordoComCronometro(cronometro) {
        if(cronometro.isOtimo()) {
            this.pontosDoJogador *= 3
        }
        else if(cronometro.isMuitoBom()) {
            this.pontosDoJogador *= 2
        }
        this.atualizaPontuacao()
        const relogio = cronometro.pegaRelogio()
        this.mostraPontuacaoFinal(relogio)
    }
    mostraPontuacaoFinal(relogio) {
        document.getElementById("mostra-tempo-final").textContent = relogio
        document.getElementById("mostra-pontuacao-final").textContent = this.pontosDoJogador
    }
}
