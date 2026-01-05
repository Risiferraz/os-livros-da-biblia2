class GerenciadorDosLivros {
    constructor(){
        this.isHabilitado = true
        this.botaoSalvarSair = new BotaoSair()
    }
    habilitaLivroSorteado() {
        this.isHabilitado = true
        this.botaoSalvarSair.mostraBotao()
    }
    bloqueiaLivroSorteado() {
        this.isHabilitado = false
        this.botaoSalvarSair.escondeBotao()
    }
    verificaSeEstaHabilitado() {
        return this.isHabilitado
    }
}
