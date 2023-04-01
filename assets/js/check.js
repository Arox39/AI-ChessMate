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
export function check(board,coup_precedant, color){
    /*
    paramètres : plateau_actu = liste(8*8) et une liste de 2 liste([row,col] =[0;7]
    fontion qui dit si le roi est en echec
    */
    let kingValue = color === 'white' ? -255 : 255
    let isCheck = false
    let king = []
    //donne tout les coups que' a une piece si elle pouvais bouger 2 fois
    
    let controle_de_case = move(board,coup_precedant[1][0],coup_precedant[1][1], color)

    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            if(board[row][col] === kingValue){
                king = [row,col]
            }
        }
    }
    for(let i = 1; i < controle_de_case.length; i += 2){
        if (arrayEqual(king,controle_de_case[i])){
            isCheck = true
        }
    }
    return isCheck
}