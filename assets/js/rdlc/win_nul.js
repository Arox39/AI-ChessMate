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
/* 
 * Fonction qui compare 2 arrays simple pour savoir si ils sont egaux
 * 
 * - @param {Array} board:  represente le plateau de jeu
 * - @param {Array} coup_precedant: represente le coup qui vient d'etre jouer
 * - @param {Array} coup: represente tout les coup possibles de la couleur etudier
 * - @param {Number} nbEchec: le nombre d'echec qu'il y a eu pour la couleur etudier
 * 
 * @returns {Number} -  -1 si nul -  0 si rien - 1 si victoire - 2 si roi de la colline
 */
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

    return win;
}