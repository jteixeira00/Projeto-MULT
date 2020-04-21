"use strict";

const totPages = 5;
const htmldir = "HTML/";

(function(){
    window.addEventListener("load", main);

}());

function main(){
    var startPage = 1;
    showPage(startPage);
    
    window.addEventListener("message", messageHandler);
    console.log("1");
    var frm = document.getElementsByTagName("iframe")[0];
    console.log("2");
    frm.addEventListener("load", iframeHandler);
    console.log("3");
    
}


function showPage(pageNum){

    var frm = document.getElementsByTagName("iframe")[0];
    if (pageNum == 1){
        frm.src = htmldir+"main menu.html"

    }

    if (pageNum == 2){
        frm.src = "../index.html"

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
    if(ev.data== "jogar"){
        showPage(2);
    }
}

function iframeHandler(ev){

    var frm = ev.target;
    console.log("batata");
	frm.contentWindow.postMessage("start", "*");
}