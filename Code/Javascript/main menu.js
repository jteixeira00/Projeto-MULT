"use strict";

var masterW;

(function(){
    window.addEventListener("load", main);
}());

function main(){

    var jogarBtn = document.getElementById("jogar");
    var opcoesBtn = document.getElementById("opcoes");
    var ajudaBtn = document.getElementById("ajuda");
    var creditsoBtn = document.getElementById("creditos");

    window.addEventListener("message", messageHandler);
    jogarBtn.addEventListener("click", Jogar);
    opcoesBtn.addEventListener("click", Opcoes);
    ajudaBtn.addEventListener("click", Ajuda);
    creditsoBtn.addEventListener("click", Creditos);

}

function messageHandler(ev){
    masterW = ev.source;
    if(ev.data == "voltar"){
        masterW.postMessage("voltar", "*");
    }

}

function Jogar(){
    //redirecionar para o jogo
    masterW.postMessage("jogar","*");
}

function Opcoes(){
    //redirecionar para as opçoes
    masterW.postMessage("opcoes","*");
        
}

function Ajuda(){
    //redirecionar para as instruçoes
    masterW.postMessage("ajuda","*");

}

function Creditos(){
    masterW.postMessage("creditos","*");
    
    //roll the credits


}