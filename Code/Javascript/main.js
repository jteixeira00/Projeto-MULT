"use strict";

const totPages = 5;
const htmldir = "Code/HTML/";

(function(){
    window.addEventListener("load", main);

}());

function main(){
    var startPage = 1;
    showPage(startPage);
    
    window.addEventListener("message", messageHandler);
    var frm = document.getElementsByTagName("iframe")[0];
    frm.addEventListener("load", iframeHandler);
    
}


function showPage(pageNum){

    var frm = document.getElementsByTagName("iframe")[0];
    var dir;
    if (pageNum == 1){
        frm.src = htmldir+"main menu.html"

    }

    if (pageNum == 2){
        frm.src = htmldir+"jogo.html"

    }
    if(pageNum == 3){
        frm.src = htmldir+"opcoes.html"

    }
    if (pageNum == 4){
        frm.src = htmldir+"ajuda.html"
    }
    if(pageNum == 5){
        frm.src = htmldir+"creditos.html"
    }


}

function messageHandler(ev){
    if(ev.data == "voltar"){
        showPage(1);

    }
    if(ev.data== "jogar"){
        showPage(2);
    }

    if(ev.data == "opcoes"){
        showPage(3);
    }
    if(ev.data == "ajuda"){
        showPage(4);
    }
    if(ev.data == "creditos"){
        
    }
}

function iframeHandler(ev){

    var frm = ev.target;
    
	frm.contentWindow.postMessage("start", "*");
}