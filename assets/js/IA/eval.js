import { legalMove } from "../game/legalMove.js"
import { win_nul } from "../game/win_nul.js"
export function evaluation(board,coup_p){
    /*
    parametre : p = position de jeu d'echec(tableau 8*8)
    fonction qui evalue une position et qui retourne le score de celle ci
    */
  
    let score = 0
    let coupBlanc = legalMove(board,coup_p, 'white')
    let coupNoir = legalMove(board, coup_p, 'black')
    let win = win_nul(board,coup_p, coupBlanc)
    if(win === -1) return 0 
    if(win === 1) return -Infinity
    else if(win_nul(board, coup_p, coupNoir) === 1) return +Infinity
      for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[0].length; j++){
          let piece = board[i][j]
            if(piece === -2) score += -3 * 10
            else if(piece === 2) score += 3 * 10
            else score += piece * 10
        }
      }
      for(let i = 1; i < coupBlanc.length; i += 2){
        score += 1
      }
      for(let i = 1; i < coupNoir.length; i += 2){
        score += -1
      }
    return score
}
let board = [
    [-5,-3,-2,-8,-255,-2,-3,-5],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [5,3,2,8,255,2,3,5]
]