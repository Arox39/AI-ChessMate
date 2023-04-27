import {move} from './move.js'


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
* Fonction qui regarde si un element est compris dans un autre array
* 
* - @param {Array} element: L'element que l'on cherche
* - @param {Array} array: l'array dans lequel on regarde si l'element est dedans
* - @retrurns {Boolean}: true si element est dans array - false si non
*/

function elementInArray(element, array) {
    for(let i = 0; i < array.length; i++){
        if(arrayEqual(element, array[i])){
            return true
        }
    }
    return false
}


/* 
* Fonction qui empeche le roi d'aller sur une case ou il est en echec
* 
* - @param {Array} board: le plateau de jeu
* - @param {Array} coup_precedant: le dernier coup jouer
* - @param {String} color: la couleur du roi


* - @retrurns {Array}: retourne les coordonner des coups ou le roi peut aller sans etre echec
*/
export function anti_suicide(board,coup_precedant, color){
    // on intialise les valeur de base
    let kingValue;
    let pieceAdverse
    if(color === 'white'){
        kingValue = 255
        pieceAdverse = (piece) => piece < 0
    }
    else{
        kingValue = -255
        pieceAdverse = (piece) => piece > 0
    }


    let anti_s = []
    let king;
    let coup_roi
    // on va chercher la position du roi et ses coups possible
    for(let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col++){
            if (board[row][col] === kingValue){
                // sa position
                king = [row,col]
                // ses different coups
                coup_roi = move(board,row,col,coup_precedant)
            }
        }


    }
    // on prend tout les coups possible pour les pions adverse lorsqu'on deplace le roi
    for(let i = 1; i < coup_roi.length; i +=2){
        let coup = []
        let piece = board[coup_roi[i][0]][coup_roi[i][1]]
        // fait jouer un coup au roi
        board[coup_roi[i][0]][coup_roi[i][1]] = kingValue
        board[coup_roi[i-1][0]][coup_roi[i-1][1]] = 0
        for(let r = 0; r < 8; r++){
            for (let c = 0; c < 8; c++){
                if (pieceAdverse(board[r][c])){
                    coup.push(...move(board,r,c,coup_precedant))
                }
            }
        }
    
        // on verifie que la position du roi n'est pas dans les coups possible adverse
        if(!elementInArray(coup_roi[i], coup)){
            anti_s.push(...[king,coup_roi[i]])
        }
        // fait revenir le plateau comme il était avant
        board[coup_roi[i-1][0]][coup_roi[i-1][1]] = board[coup_roi[i][0]][coup_roi[i][1]]
        board[coup_roi[i][0]][coup_roi[i][1]] = piece
    }

    return anti_s
}