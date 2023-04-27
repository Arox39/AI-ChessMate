import { legalMove } from "../game.js";
import { win_nul } from "../../classique/win_nul.js";
import { evaluateBoard } from "./eval.js";

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
 * Explore recursivement tout les coups possibles jusqu'a une certaine profondeur, et evalue le plateau au niveau des feuilles
 * 
 * Idee principal : maximize la valeur minimum de la position resultant des coups possibles de l'adversaire.
 * 
 * Parametre:
 *  - game:                 the game object.
 *  - depth:                la profondeur a laquelle le minimix va au maximum.
 *  - alpha & beta:         sert a elaguer les branches inutile   
 *  - isMaximizingPlayer:   true si on maximise, false si on minimise.
 *  - sum:                  la somme (l'evalutation) du plateau actuelle
 *  - color:                la couleur de l'IA
 *  - coup_precedant:       le coup jouer juste avant
 * 
 * retourne :
 *  le meilleur coup a jouer
 */
export function minimax(game, depth, alpha, beta, isMaximizingPlayer, sum, color, coup_precedant)
{

    let children = getAllMoves(game, coup_precedant, isMaximizingPlayer ? 'b' : 'w')
    // trie children au hazard pour pas que ce soit toujours le meme choisi entre 2 meme coup
    children[0].sort(function(a, b){return 0.5 - Math.random()});
    
    let currMove;
    // si on atteint la profondeur max ou si on atteint un etat de jeux terminal
    if (depth === 0 || children[0].length === 0)
    {
      return [null, sum]
    }

    // trouve la valeur maximal/minimal de l'evalutation des coup possible
    let maxValue = Number.NEGATIVE_INFINITY;
    let minValue = Number.POSITIVE_INFINITY;
    let bestMove;
    for (let i = 0; i < children[0].length; i++)
    {
      // c'est comme si on jouait un coup
        game = children[0][i][0];
        let game_initial = JSON.parse(JSON.stringify(children[1]))
        // Note: in our case, the 'children' are simply modified game states
        let currMove = children[0][i][1]
        if(game_initial[currMove[0][0]][currMove[0][1]] === 0) continue
        let [from, to] = currMove
        // deplace la tour si il y a un rook
        let rowRook =game_initial[from[0]][from[1]] > 0 ? 7 : 0
        // ici a la place de faire arrayEqual([from, to], [[rowRook, 4], [rowRook, 2]]) 
        // on fait en plusieur morceau car la fonction n'aime pas les arrays d'array
        if(arrayEqual(from, [rowRook, 4]) && arrayEqual(to, [rowRook, 2]) && Math.abs(game_initial[from[0]][from[1]]) === 255){
          board[rowRook][2] = game_initial[from[0]][from[1]]
          board[rowRook][4] = 0
        }
        else if(arrayEqual(from, [rowRook, 4]) && arrayEqual(to, [rowRook, 6]) && Math.abs(game_initial[from[0]][from[1]]) === 255){
          board[rowRook][6] = game_initial[from[0]][from[1]]
          board[rowRook][4] = 0
        }


        coup_precedant = currMove;
        let coupAdverse = getAllMoves(game, coup_precedant, 'w')
        let win = win_nul(game, coup_precedant, coupAdverse)
        let newSum = evaluateBoard(currMove, game_initial, sum, color, win);
        let [childBestMove, childValue] = minimax(game, depth - 1,alpha, beta, !isMaximizingPlayer, newSum, color, coup_precedant);
        // on remet le plateau a son etat initial
        game = game_initial
        if (isMaximizingPlayer)
        {
            if (childValue > maxValue)
            {
              maxValue = childValue;
              bestMove = currMove;
            }
            if (childValue > alpha)
            {
                alpha = childValue;
            }
        }

        else
        {
            if (childValue < minValue)
            {
                minValue = childValue;
                bestMove = currMove;
            }
            if (childValue < beta)
            {
                beta = childValue;
            }
        }
        // Alpha-beta elagage
        if (alpha >= beta)
        {
            break;
        }
    }
    if (isMaximizingPlayer)
    {
        return [bestMove, maxValue]
    }
    else
    {
        return [bestMove, minValue];
    }
}

function getAllMoves(game, coup_precedant, color)
{
  let board_initial = JSON.parse(JSON.stringify(game))

  let black_move = legalMove(game, coup_precedant, 'black', true)
  let white_move = legalMove(game, coup_precedant, 'white', true)
  let allMoves = [[], board_initial]

  if(color === 'b')
  {
      for(let i = 1; i < black_move.length; i += 2)
      {
        let move = [black_move[i-1], black_move[i]]
        board = playMove(move, board_initial)
        allMoves[0].push([JSON.parse(JSON.stringify(board)), move])
        board = JSON.parse(JSON.stringify(board_initial))
      }
  }
  else
  {
      for(let i = 1; i < white_move.length; i += 2)
      {
        let move = [white_move[i-1], white_move[i]]
        board = playMove(move, board_initial)
        allMoves[0].push([JSON.parse(JSON.stringify(board)), move])
        board = JSON.parse(JSON.stringify(board_initial));
      }
  }
  return allMoves
}
function playMove(move, board_initial) {
    board = JSON.parse(JSON.stringify(board_initial))
    let [from, to] = move
    let piece = board[from[0]][from[1]]
    if(piece === 1){
      if(from[1] !== to[1] && board[to[0]][to[1]] === 0){
        board[to[0] + 1][to[1]] = 0
      }
    }
    else if(piece === -1){
      if(from[1] !== to[1] && board[to[0]][to[1]] === 0){
        board[to[0] - 1][to[1]] = 0
      }
    }
    // on effectue le coup
    board[to[0]][to[1]] = piece
    board[from[0]][from[1]] = 0
    return board
}
let board = [
    [ -4, -3, -2, -8,-255, -2, -3, -4],
    [ -1, -1, -1, -1, -1 , -1, -1, -1],
    [  0,  0,  0,  0,  0,   0,  0,  0],
    [  0,  0,  0,  0,  0,   0,  0,  0],
    [  0,  0,  0,  0,  0,   0,  0,  0],
    [  0,  0,  0,  0,  0,   0,  0,  0],
    [  1,  1,  1,  1,  1,   1,  1,  0],
    [  4,  3,  2,  8, 255,  2,  3,  0],
]
