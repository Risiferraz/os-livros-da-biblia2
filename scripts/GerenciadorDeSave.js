class GerenciadorDeSave {
    constructor() {
        this.html=document.getElementById("dados-salvos-json")
    }
    atualizaDadosDoSave() {
        const pontuacaoString= document.getElementById("pontuacao-para-salvar").textContent
        const tempoGasto = document.getElementById('cronometro').textContent
        const numerosAleatoriosJaSorteados = document.getElementById('numeros-de-livros-salvos').textContent
        const pontuacao = +pontuacaoString
        const dadosParaSalvar = {pontuacao, tempoGasto, numerosAleatoriosJaSorteados}
        this.html.textContent=JSON.stringify(dadosParaSalvar)
        return this.html.textContent
    }
}