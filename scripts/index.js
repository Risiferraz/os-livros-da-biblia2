import { listaDeLivros } from './listaDeLivros.js';
const jogoFinalizado = new JogoFinalizado()
const dadosDoJogoFinalizado = jogoFinalizado.pegaDadosDoJogoFinalizado()
if (!!dadosDoJogoFinalizado) {//se tem dados do jogo finalizado - se não tem = false, se não não tem = true
  jogoFinalizado.vaiParaProximaFase()
}
window.passaAVez = passaAVez;
const cronometro = new Cronometro()
const pontuacao = new Pontuacao("indicador")
let listaDeNumerosAleatoriosJaSorteados = []
const listaDeLivrosJaAcertados = []
let ultimoNumeroSorteado = 999
let dragged = null
const gerenciadorDeErros = new GerenciadorDeErros()
const gerenciadorDosLivros = new GerenciadorDosLivros()
const botaoSair = new BotaoSair()
const dadosSalvos = botaoSair.pegaDadosSalvos()
pontuacao.setPontuacaoDoJogadorSalva(dadosSalvos.pontuacao)
cronometro.setTempo(dadosSalvos.tempoGasto)
if (!!dadosSalvos.numerosAleatoriosJaSorteados) {
  if (typeof dadosSalvos.numerosAleatoriosJaSorteados === "string") {
    if (dadosSalvos.numerosAleatoriosJaSorteados.includes(",")) {
      listaDeNumerosAleatoriosJaSorteados = dadosSalvos.numerosAleatoriosJaSorteados.split(",")
    }
    else {
      listaDeNumerosAleatoriosJaSorteados.push(dadosSalvos.numerosAleatoriosJaSorteados)
    }
  }
}
// X-X-X-X-X-X-X-X-X-X-X- PÁGINA 1-X-X-X-X-X-X-X-X-X-X-X
function clicarVT() {
  window.scrollTo(0, 0)
  document.getElementById("pagina1").style.display = "none"
  document.getElementById("velho-testamento").style.display = "grid"
}
function clicarNT() {
  window.scrollTo(0, 0)
  document.getElementById("pagina1").style.display = "none"
  document.getElementById("novo-testamento").style.display = "grid"
}
function clicarAP() {
  window.scrollTo(0, 0)
  document.getElementById("pagina1").style.display = "none"
  document.getElementById("apocrifos").style.display = "grid"
}
function clicarRetornar() {
  window.scrollTo(0, 0)
  document.getElementById("velho-testamento").style.display = "none"
  document.getElementById("novo-testamento").style.display = "none"
  document.getElementById("apocrifos").style.display = "none"
  document.getElementById("pagina1").style.display = "grid"
}
function clicarStart() {
  window.scrollTo(0, 0)
  document.getElementById("pagina1").style.display = "none"
  document.getElementById("pagina2").style.display = "grid"
  cronometro.iniciaCronometro()
  // sorteiaCardDaVez()
  // botaoDispenserCards.bloqueiaBotao()
}

// Disponibiliza funções no escopo global para uso no HTML
window.clicarVT = clicarVT;
window.clicarNT = clicarNT;
window.clicarAP = clicarAP;
window.clicarRetornar = clicarRetornar;
window.clicarStart = clicarStart;
// Adicione outras funções chamadas diretamente pelo HTML, se necessário

// X-X-X-X-X-X-X-X-X-X-X- PÁGINA 2 -X-X-X-X-X-X-X-X-X-X-X
const livro = document.getElementById("livro")
livro.addEventListener("click", () => {
  if (gerenciadorDosLivros.verificaSeEstaHabilitado()) {


    sorteiaLivroDaVez()
    gerenciadorDosLivros.bloqueiaLivroSorteado()
    // Habilita o input quando o livro é clicado
    const inputNomeDoLivro = document.getElementById("nome-do-livro")
    if (inputNomeDoLivro) {
      inputNomeDoLivro.disabled = false
      inputNomeDoLivro.focus()
    }
  }
})

document.getElementById("botao-despenser-dicas")
  .addEventListener("click", () => {
    document.getElementById("dica").style.display = "block"
    pontuacao.usandoDica()
    const container = document.getElementById("container-dicas")
    if (container) {
      container.style.border = "none"
      container.style.boxShadow = "none"
    }
  })

let livroCorreto = null // Variável global para armazenar o livro correto da vez
setInterval(() => {
  cronometro.atualizaCronometro()
}, 1000);
const inputDeResposta = document.getElementById('nome-do-livro')
const TEMPO_PARA_APARECER_ERRADO = 2000
inputDeResposta.value = ""
inputDeResposta.disabled = true // Garante que o input inicia desabilitado

// Função centralizada para definir tamanho de fonte baseado no texto
function defineTamanhoFonte(texto) {
  const textoNormalizado = texto.trim().toLowerCase()
  const tamanho = texto.trim().length
  if (tamanho >= 12) return "22px"
  if (tamanho >= 10) return "23px"
  if (tamanho >= 7) return "24px"
  return "24px"
}

// Função para definir família de fonte baseado no texto
function defineFamiliaFonte(texto) {
  const textoNormalizado = texto.trim().toLowerCase()
  const tamanho = texto.trim().length
  // Usa Impact para Deuteronômio, Tessalonicenses e palavras com 12+ letras
  if (textoNormalizado === "deuteronomio") return "Impact, Arial"
  if (textoNormalizado === "1tessalonicenses" || textoNormalizado === "2tessalonicenses") return "Impact, Arial"
  if (tamanho >= 9) return "Impact, Arial"
  // Usa Swis721 BlkEx BT para os demais
  return "'Swis721 BlkEx BT', Arial"
}

function sorteiaLivroDaVez() {
  const numeroAleatorio = Math.floor(Math.random() * listaDeLivros.length)
  if (listaDeNumerosAleatoriosJaSorteados.includes(numeroAleatorio)) {
    sorteiaLivroDaVez()
  }
  else {
    livroCorreto = listaDeLivros[numeroAleatorio] // Atualiza a variável global com o livro correto da vez
    listaDeLivros[numeroAleatorio].mostraLivro() // Mostra o livro sorteado
    pontuacao.passandoParaNovoLivro()
    ultimoNumeroSorteado = numeroAleatorio
    // Desabilita o input quando um novo livro é sorteado
    const inputNomeDoLivro = document.getElementById("nome-do-livro")
    if (inputNomeDoLivro) {
      inputNomeDoLivro.disabled = true
      inputNomeDoLivro.value = ""
    }
    // listaDeNumerosAleatoriosJaSorteados.push(numeroAleatorio);
  }
}
inputDeResposta.addEventListener('keyup', event => {
  const valorDigitado = event.target.value
})
function verificaSeAcertou() {
  const resposta = inputDeResposta.value
  const r = resposta.trim().toLowerCase()
  if (livroCorreto.isRespostaCerta(resposta)) { // Se a resposta estiver certa
    listaDeNumerosAleatoriosJaSorteados.push(ultimoNumeroSorteado); // Adiciona o número do livro sorteado à lista de números já sorteados
    document.getElementById("numeros-de-livros-salvos").textContent = listaDeNumerosAleatoriosJaSorteados.join(",")
    inputDeResposta.style.color = "rgb(1, 21, 86)" // cor: azul marinho
    inputDeResposta.style.fontFamily = defineFamiliaFonte(resposta)
    const fontSize = defineTamanhoFonte(resposta)
    inputDeResposta.style.fontSize = fontSize
    livroCorreto.mostraRespostaCorreta()
    pontuacao.adicionaPontuacaoCorreta()
    gerenciadorDeErros.zerarQuantidadeDeErros()
    listaDeLivrosJaAcertados.push(livroCorreto.id)
  }
  else {
    inputDeResposta.style.color = "#ff0000"//cor: vermelho
    inputDeResposta.style.fontFamily = defineFamiliaFonte(resposta)
    inputDeResposta.style.fontSize = defineTamanhoFonte(resposta)
    setTimeout(() => acoesParaRespostaErrada(), TEMPO_PARA_APARECER_ERRADO)
  }
}

function acoesParaRespostaErrada() { // Ações a serem feitas após o tempo de resposta errada
  inputDeResposta.style.color = "#000000"//cor:preto
  inputDeResposta.style.fontSize = "22px" // Tamanho padrão
  const primeiraLetra = livroCorreto.pegaPrimeiraLetra() // Pega a primeira letra do livro correto
  inputDeResposta.value = "" // Limpa o input
  gerenciadorDeErros.adicionaErro() // Adiciona 1 erro ao gerenciador de erros
  if (gerenciadorDeErros.isPassarAVez()) { // Se atingiu o limite de erros para passar a vez
    gerenciadorDeErros.zerarQuantidadeDeErros()
    livroCorreto.fechaABiblia()
    gerenciadorDosLivros.habilitaLivroSorteado()
  }
  else {
    pontuacao.errando()
    if (isNaN(primeiraLetra)) {
      document.getElementById("dica-bonus").innerHTML =
        `<p class="dica-extra">"<strong>${primeiraLetra}</strong>"</p>
      <img id="imagem-de-fundo" src="imagens/mensagem-nova-dica-letra.png">`
    }
    else {
      document.getElementById("dica-bonus").innerHTML =
        `<p class="dica-extra">"<strong>${primeiraLetra}</strong>"</p>
      <img id="imagem-de-fundo" src="imagens/mensagem-nova-dica-numero.png">`
    }
    document.getElementById("dica-bonus").style.zIndex = "9999"
    setTimeout(() => escondeModal(), 5000)
  }
}

function escondeModal() {
  document.getElementById("dica-bonus").innerHTML = ""
  document.getElementById("dica-bonus").style.zIndex = "-20"
}

function autocomplete(inp, arr) {
  var currentFocus;
  inp.addEventListener("input", function (e) {
    var a, b, i, val = this.value;
    closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    document.getElementById('nome-autocomplete').appendChild(a);
    for (i = 0; i < arr.length; i++) {
      let propriedadesDosEstilos = {
        clicavel: true,
        classeParaAdicionar: "habilitado"
      }
      if (listaDeLivrosJaAcertados.includes(arr[i])) {
        propriedadesDosEstilos.clicavel = false
        propriedadesDosEstilos.classeParaAdicionar = "desabilitado"
      }
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement("DIV");
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);

        b.classList.add(propriedadesDosEstilos.classeParaAdicionar)
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        if (propriedadesDosEstilos.clicavel) {
          b.addEventListener("click", function (e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            verificaSeAcertou()
            closeAllLists();
          });
        }
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}
// Opções falsas para incrementar o autocomplete
import { opcoesFalsas } from './opcoesFalsas.js';
const opcoesParaAutocomplete = listaDeLivros.map(b => b.id).concat(opcoesFalsas);
autocomplete(document.getElementById("nome-do-livro"), opcoesParaAutocomplete);
// let dragged = null;

document.addEventListener("dragstart", event => {
  dragged = event.target;
  setTimeout(() => {
    event.target.style.opacity = "0"; // Deixa a imagem transparente durante o arraste
  }, 0);
});
document.addEventListener("dragend", event => {
  dragged = event.target;
  document.getElementById("at").classList.remove("caixa-dropped-escolha")
  document.getElementById("nt").classList.remove("caixa-dropped-escolha")
  document.getElementById("at").classList.remove("caixa-dropped-hover")
  document.getElementById("nt").classList.remove("caixa-dropped-hover")
});
document.addEventListener("dragleave", event => {
  document.getElementById("at").classList.remove("caixa-dropped-hover")
  document.getElementById("nt").classList.remove("caixa-dropped-hover")
});
document.addEventListener("dragover", event => {
  if (event.target.classList && event.target.classList.contains("caixa-dropped")) {
    document.getElementById("at").classList.add("caixa-dropped-escolha");
    document.getElementById("nt").classList.add("caixa-dropped-escolha");
  }
  event.preventDefault();
});

document.addEventListener("dragleave", event => {
  if (event.target.classList && event.target.classList.contains("caixa-dropped")) {
    event.target.classList.remove("caixa-dropped-hover");
  }
});
document.addEventListener("drop", event => {
  // impedir a ação padrão (default) e assim permitir dropagem para elementos dragaveis)
  event.preventDefault();
  if (livroCorreto.isDoTestamento(event.target.id)) {
    realizaAcoesDeAcerto()
  } else {
    realizaAcoesDeErro()
  }
});
function realizaAcoesDeErro() {
  pontuacao.errandoTestamento()
  document.getElementById("modal-erro").checked = true
  // Recoloca a imagem draggable na div 'despenser-livros'
  if (livroCorreto && typeof livroCorreto.criaImagemResposta === 'function') { // Verifica se livroCorreto existe e tem a função criaImagemResposta
    document.getElementById('despenser-livros').innerHTML = livroCorreto.criaImagemResposta(); // Recria a imagem do livro para ser arrastada novamente
  }
  setTimeout(() => {
    document.getElementById("modal-erro").checked = false
  }, 1200)
}

function realizaAcoesDeAcerto() {
  pontuacao.adicionaPontuacaoCorretaTestamento()
  livroCorreto.fechaABiblia()
  dragged.style.display = "none"
  inputDeResposta.value = ""
  inputDeResposta.disabled = true
  verificaFimDeJogo()
  document.getElementById("modal-acerto").checked = true
  setTimeout(() => {
    document.getElementById("modal-acerto").checked = false
    gerenciadorDosLivros.habilitaLivroSorteado()
    const container = document.getElementById("container-dicas")
    if (container) {
      container.style.border = "solid 1px #30250b"
      container.style.boxShadow = "rgba(0, 0, 0, 0.8) 5px 5px"
    }
  }, 1000)
}

function verificaFimDeJogo() {
  if (isFimDeJogo()) {
    realizaAcoesDeFimDeJogo()
  }
}
function isFimDeJogo() {
  return listaDeLivros.length == listaDeNumerosAleatoriosJaSorteados.length
}
function realizaAcoesDeFimDeJogo() {
  cronometro.pararCronometro()
  pontuacao.adicionaPontuacaoDeAcordoComCronometro(cronometro)
  setTimeout(() => {
    window.scrollTo(0, 0)
    document.getElementById("pagina2").style.display = "none"
    document.getElementById("mensagem-final").style.display = "grid"
  }, 1800)
}

function passaAVez() {
  if (!livroCorreto) return


  const inputNomeDoLivro = document.getElementById("nome-do-livro")
  if (inputNomeDoLivro) {
    inputNomeDoLivro.disabled = false
    inputNomeDoLivro.focus()
  }
  livroCorreto.fechaABiblia()
  gerenciadorDosLivros.habilitaLivroSorteado()
  const container = document.getElementById("container-dicas")
  if (container) {
    container.style.border = "solid 1px #30250b"
    container.style.boxShadow = "rgba(0, 0, 0, 0.8) 5px 5px"
  }
}
