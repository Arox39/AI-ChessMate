import {check} from '../classique/check.js'


/* 
 * Fonction qui compare 2 arrays simple pour savoir si ils sont egaux
 * 
 * - @param {Array} a: L'array qui se fait comparer
 * - @param {Array} b: L'array qui compare
 * 
 * @returns {Boolean} - true si les 2 array sont egaux - false si non
 */
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


/* 
 * Fonction qui compare 2 arrays simple pour savoir si ils sont egaux
 * 
 * - @param {Array} board:  represente le plateau de jeu
 * - @param {Array} coup_precedant: represente le coup qui vient d'etre jouer
 * - @param {Array} coup: represente tout les coup possibles de la couleur etudier
 * - @param {Number} nbEchec: le nombre d'echec qu'il y a eu pour la couleur etudier
 * 
 * @returns {Number} -  -1 si nul -  0 si rien - 1 si victoire
 */
export function win_nul(board,coup_precedant,coup, nbEchec){
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