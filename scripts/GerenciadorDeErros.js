class GerenciadorDeErros {
    constructor() {
        this.quantidadeDeErros = 0
        this.quantidadeMaximaDeErros = 1
    }
    adicionaErro() {
        this.quantidadeDeErros ++
    }
    isPassarAVez() {
        return this.quantidadeDeErros > this.quantidadeMaximaDeErros
    }
    zerarQuantidadeDeErros() {
        this.quantidadeDeErros = 0
    }
}