import {check} from './check.js'


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
 * - @returns {Number} -  -1 si nul -  0 si rien - 1 si victoire
 */
export function win_nul(board,coup_precedant,coup){
    let win = 0
    if (arrayEqual(coup, [])) {
        // valeur pour la nul
        win = -1 
        if (check(board,coup_precedant, 'black') || check(board,coup_precedant, 'white')){
            // valeur pour la win 
            win = 1
        }
    }
    // on selectionne les piece blanche et noir
    let whitePieces = document.querySelectorAll("td[data-color = white]");
    let blackPieces = document.querySelectorAll("td[data-color = black]");


    let blackBishopOrKnight;
    let whiteBishopOrKnight

    if (whitePieces.length === 2) {
        // Il ne reste que des rois et une autre piece
        if(whitePieces[0].dataset.piece === 'bishop' || whitePieces[1].dataset.piece === 'bishop'||  
        whitePieces[0].dataset.piece === 'knight' || whitePieces[1].dataset.piece === 'knight'){
            whiteBishopOrKnight = true
        }
    }
    if (blackPieces.length === 2){
        if(blackPieces[0].dataset.piece === 'bishop' || blackPieces[1].dataset.piece === 'bishop'||  
        blackPieces[0].dataset.piece === 'knight' || blackPieces[1].dataset.piece === 'knight'){
            blackBishopOrKnight = true
        }
        
    }
    // L'autre piece restante et un roi ou un cavalier
    if (whiteBishopOrKnight && blackBishopOrKnight || blackBishopOrKnight && whitePieces.length === 1) {
        win = -1
    }
    if (whitePieces.length === 1 && blackPieces.length === 1 || whiteBishopOrKnight && blackPieces.length === 1) {
        // Il ne reste que des rois
        win = -1
    }


    return win;
}