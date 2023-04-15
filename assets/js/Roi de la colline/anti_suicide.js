import {move} from './move.js'
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

function elementInArray(element, array) {
    for(let i = 1; i < array.length; i += 2){
        if(arrayEqual(element, array[i])){
            return true
        }
    }
    return false
}
export function anti_suicide(board,coup_precedant, color){
    /*
    parametre ; toujours les même
    fonction qui retourne les coups legaux du roi selon la couleur
    */
    let kingValue;
    let colorInverse
    let pieceAdverse
    if(color === 'white'){
        kingValue = 255
        colorInverse = 'black'
        pieceAdverse = (piece) => piece < 0
    }
    else{
        kingValue = -255
        colorInverse = 'white'
        pieceAdverse = (piece) => piece > 0
    }


    let anti_s = []
    let king;
    let coup_roi
    for(let row = 0; row < 8; row++){
        for(let col = 0; col < 8; col++){
            if (board[row][col] === kingValue){
                king = [row,col]
                coup_roi = move(board,row,col,coup_precedant)
            }
        }


    }
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
    
    
        if(!elementInArray(coup_roi[i], coup)){
            anti_s.push(...[king,coup_roi[i]])
        }
        // fait revenir le plateau comme il était avant
        board[coup_roi[i-1][0]][coup_roi[i-1][1]] = board[coup_roi[i][0]][coup_roi[i][1]]
        board[coup_roi[i][0]][coup_roi[i][1]] = piece
    }

    return anti_s
}