import {check} from '../classique/check.js'

function arrayEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (!b.every((elem, index) => elem === a[index])) {
            return false;
        }
    }
    return true;
}

export function win_nul(board,coup_precedant,coup){
    /*
    Fonction qui retourne -1 si nul, 0 si rien et 1 si victoire
    */
    let win = 0;
    if (arrayEqual(coup, [])) {
        // valeur pour la nul
        win = -1;
        if (check(board,coup_precedant, 'black') || check(board,coup_precedant, 'white')){
            // valeur pour la win 
            win = 1;
        }
    }
    let case1 = document.getElementById('3-3')
    let case2 = document.getElementById('3-4')
    let case3 = document.getElementById('4-3')
    let case4 = document.getElementById('4-4')
    // Vérifie si l'un des rois se trouve sur l'une des cases centrales
    if (case1.dataset.piece === 'king' || case2.dataset.piece === 'king' 
    || case3.dataset.piece === 'king' || case4.dataset.piece === 'king') {
        win = 2;
    }

    let whitePieces = document.querySelectorAll("td[data-color = white]");
    let blackPieces = document.querySelectorAll("td[data-color = black]");

    let blackBishopOrKnight;
    let whiteBishopOrKnight;

    if (whitePieces.length === 2) {
        // Il ne reste que des rois et une autre piece
        if(whitePieces[0].dataset.piece === 'bishop' || whitePieces[1].dataset.piece === 'bishop'||  
        whitePieces[0].dataset.piece === 'knight' || whitePieces[1].dataset.piece === 'knight'){
            whiteBishopOrKnight = true;
        }
    }
    if (blackPieces.length === 2){
        if(blackPieces[0].dataset.piece === 'bishop' || blackPieces[1].dataset.piece === 'bishop'||  
        blackPieces[0].dataset.piece === 'knight' || blackPieces[1].dataset.piece === 'knight'){
            blackBishopOrKnight = true;
        }
        
    }
    // L'autre piece restante et un roi ou un cavalier
    if (whiteBishopOrKnight && blackBishopOrKnight || blackBishopOrKnight && whitePieces.length === 1) {
        win = -1;
    }
    if (whitePieces.length === 1 && blackPieces.length === 1 || whiteBishopOrKnight && blackPieces.length === 1) {
        // Il ne reste que des rois
        win = -1;
    }
    return win;
}