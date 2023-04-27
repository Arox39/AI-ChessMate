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
 * Fonction qui renvoie tout les coups qu'une piece peut faire selon les regles des echecs
 *
 * - @param {Array} board: plateau du jeu
 * - @param {Number} row: la ligne de board ou se trouve la piece a etudier
 * - @param {Number} col: la colonne de board ou se trouve la piece a etudier
 * - @param {Array} prevMove: coordonner du coup precedant
 * 
 * - @returns {Array} contient tout les coup d'une pieces 
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
 * Fonction qui verifie qu'un coup ne mette pas son roi en echec
 *
 * - @param {Array} board: plateau de jeu
 * - @param {String} color: couleur des coups qu'on verifie
 * - @param {Array} coup_precedant: le coup qui a ete jouer
 * 
 * - @returns {Array}: la liste des coup qui sont bon, qui ne mettent pas en echec leurs roi 
 */
export function clouage(board, color, coup_precedant){
    // initialisation des variables de bases
    let coupAdverse= []
    let coup = []
    let coup_clouage = []

    let pieceAdverse;
    let piecePareil;
    let kingValue;
    if(color === 'white'){
        pieceAdverse = (piece) => piece < 0
        piecePareil = (piece) => piece > 0
        kingValue = 255
    }
    else{
        pieceAdverse = (piece) => piece > 0
        piecePareil = (piece) => piece < 0
        kingValue = -255
    }


    let roi;
    for(let row = 0; row < 5; row++){
        for( let col = 0; col < 5; col++){
            // on recherche la position du roi 
            if(board[row][col] === kingValue){
                roi = [row,col]
            }
            // on met les coup possible pour nos piece
            else if (piecePareil(board[row][col])){
                coup.push(...move(board,row,col, coup_precedant))
            }
        }   
    }

    for(let i = 1; i < coup.length; i += 2){
        coupAdverse =[]
        let piece = board[coup[i][0]][coup[i][1]]
        // on fait jouer un coup a la piece
        board[coup[i][0]][coup[i][1]] = board[coup[i-1][0]][coup[i-1][1]]
        board[coup[i-1][0]][coup[i-1][1]] = 0
        for(let r = 0; r < 5; r++){
            for (let c = 0; c < 5; c++){
                // on selection les coups adverse
                if(pieceAdverse(board[r][c])){
                    coupAdverse.push(...move(board,r,c,[[coup[i - 1][0], coup[i - 1][1]],[coup[i][0], coup[i][1]]]))
                }
            }
        }
        // si il n'y a pas echec on ajoute le coup dans la version final
        if (!elementInArray(roi, coupAdverse)){
            coup_clouage.push(...[coup[i-1],coup[i]])
        }
        // on remet le tableau a son etat d'origine
        board[coup[i-1][0]][coup[i-1][1]] = board[coup[i][0]][coup[i][1]]
        board[coup[i][0]][coup[i][1]] = piece
    }
    return coup_clouage
    
}