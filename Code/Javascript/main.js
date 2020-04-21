"use strict";

const totPages = 5;
const htmldir = "HTML/";

(function(){
    window.addEventListener("load", main);

}());

function main(){
    var startPage = 1;
    showPage(startPage);
    //window.addEventListener("message", messageHandler);
    var frm = document.getElementsByTagName("iframe")[0];
    //frm.addEventListener("load", iframeHandler);

}


function showPage(pageNum){

    var frm = document.getElementsByTagName("iframe")[0];
    if (pageNum == 1){
        frm.src = htmldir+"main menu.html"

    }

    if (pageNum == 2){
        frm.src = htmldir+"jogar.html"

    }
    if(pageNum == 3){
        frm.src = "opcoes.html"

    }
    if (pageNum == 4){
        frm.src = "ajuda.html"
    }
    if(pageNum == 5){
        frm.src = "creditos.html"
    }


}
