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

export function win_nul(board,coup_precedant,coup, nbEchec){
    /*
    Fonction qui retopurne -1 si nul, 0 si rien et 1 si victoire
    */
    let win = 0
    if (arrayEqual(coup, [])) {
        // valeur pour la nul
        win = -1 
        if (check(board,coup_precedant, 'black') || check(board,coup_precedant, 'white')){
            // valeur pour la win 
            win = 1
        }
    }
    
    let whitePieces = document.querySelectorAll("td[data-color = white]");
    let blackPieces = document.querySelectorAll("td[data-color = black]");
    
    if (whitePieces.length === 1 && blackPieces.length === 1) {
        // Il ne reste que des rois
        win = -1
    }

    // regle des 3 echecs de notre variante
    if(nbEchec === 3) win = 1


    return win;
}