"use strict";
var masterW;

(function(){
    window.addEventListener("load", main);

}());

function main(){


    window.addEventListener("message", messageHandler);
    var backBtn = document.getElementById("voltar");
    backBtn.addEventListener("click", Voltar);

}


function messageHandler(ev){
    masterW = ev.source;

}
function Voltar(){
    masterW.postMessage("voltar", "*");
}