class LivroDaBiblia {
    constructor(testamento, id, src, dicaSRC, respostaSRC) {
        this.testamento = testamento
        this.id = id
        this.src = src
        this.dicaSRC = dicaSRC
        this.respostaSRC = respostaSRC
        this.isHabilitado = true
    }
    mostraLivro() {
        const livroElementoHTML = document.getElementById("livro")
        document.getElementById("nome-livro").textContent = this.id
        livroElementoHTML.src = this.src
        document.getElementById("dica").style.display = "none"
        document.getElementById("dica").src = this.dicaSRC
    }
    criaImagemResposta() {
        return `<img class="draggable" draggable="true" id="${this.id}" src="${this.respostaSRC}">`
    }
    mostraRespostaCorreta() {
        const imagem = this.criaImagemResposta()
        document.getElementById('despenser-livros').innerHTML = imagem//gerando um html no javascript dentro do despenser-livros
    }
    isRespostaCerta(resposta) {
        return this.id == resposta
    }
    isVelhoTestamento() {
        return this.testamento == "at"
    }
    isNovoTestamento() {
        return this.testamento == "nt"
    }
    isDoTestamento(testamento) {
        if (testamento == "img-cx-nt") testamento="nt"
        if (testamento == "img-cx-at") testamento="at"
        return this.testamento == testamento
    }
    fechaABiblia() {
        const livroElementoHTML = document.getElementById("livro")
        livroElementoHTML.src = "/imagens/livrofechado.jpg"
        document.getElementById("dica").style.display = "none"
    }
    pegaPrimeiraLetra() {
        return this.id.charAt(0).toUpperCase()
    }
}