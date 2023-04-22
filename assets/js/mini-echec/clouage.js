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
export function clouage(board, color, coup_precedant){
    let coupAdverse= []
    let coup = []
    let coup_clouage = []

    let pieceAdverse;
    let piecePareil;
    let kingValue;
    let colorAdverse
    if(color === 'white'){
        pieceAdverse = (piece) => piece < 0
        piecePareil = (piece) => piece > 0
        kingValue = 255
        colorAdverse = 'black'
    }
    else{
        pieceAdverse = (piece) => piece > 0
        piecePareil = (piece) => piece < 0
        kingValue = -255
        colorAdverse = 'white'
    }
    
    let roi;
    for(let row = 0; row < 5; row++){
        for( let col = 0; col < 5; col++){
            if(board[row][col] === kingValue){
                roi = [row,col]
            }
            else if (piecePareil(board[row][col])){
                coup.push(...move(board,row,col, coup_precedant))
            }
        }   
    }

    for(let i = 1; i < coup.length; i += 2){
        coupAdverse =[]
        let piece = board[coup[i][0]][coup[i][1]]
        board[coup[i][0]][coup[i][1]] = board[coup[i-1][0]][coup[i-1][1]]
        board[coup[i-1][0]][coup[i-1][1]] = 0
        for(let r = 0; r < 5; r++){
            for (let c = 0; c < 5; c++){
                if(pieceAdverse(board[r][c])){
                    coupAdverse.push(...move(board,r,c,[[coup[i - 1][0], coup[i - 1][1]],[coup[i][0], coup[i][1]]]))
                }
            }
        }
        console.log(roi);
        if (!elementInArray(roi, coupAdverse)){
            coup_clouage.push(...[coup[i-1],coup[i]])
        }
        board[coup[i-1][0]][coup[i-1][1]] = board[coup[i][0]][coup[i][1]] //fait revenir le plateau comme il étéait avant
        board[coup[i][0]][coup[i][1]] = piece
    }
    return coup_clouage
    
}