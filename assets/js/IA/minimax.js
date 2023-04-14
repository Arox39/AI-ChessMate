import { legalMove } from "../game/legalMove.js";
import { evaluation } from "./eval.js";




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

// Fonction pour trouver le meilleur coup en utilisant l'algorithme Minimax
export function minimax(state, depth, isMaximizingPlayer, coup_precedant, alpha, beta) {
  // Condition de sortie : la profondeur maximale a été atteinte ou l'état du jeu est terminé
  if (depth === 0  || isGameOver(state,coup_precedant)) {
    return evaluation(state, coup_precedant);
  }
  // Si le joueur actuel est celui qui maximise le score
  if (isMaximizingPlayer) {
    let bestScore = -Infinity;
    // Parcourir tous les coups possibles
    for (let move of getPossibleMoves(state, coup_precedant, 'black')) {
      // Simuler le coup
      makeMove(move, state, coup_precedant);

      // Récursivement trouver le meilleur score pour l'état suivant
      let score = minimax(state, depth - 1, false, coup_precedant, alpha, beta);
      // Annuler le coup
      undoMove(state);
      // Mettre à jour le meilleur score
      bestScore = Math.max(bestScore, score);
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
          break;  // Élagage alpha-beta
      }
    }
    return bestScore;
  } else {
    // Si le joueur actuel est celui qui minimise le score
    let bestScore = Infinity;
    // Parcourir tous les coups possibles
    for (let move of getPossibleMoves(state, coup_precedant, 'white')) {
      // Simuler le coup
      makeMove(move, state, coup_precedant);
      // Récursivement trouver le meilleur score pour l'état suivant
      let score = minimax(state, depth - 1, true, coup_precedant, alpha, beta);
      // Annuler le coup
      undoMove(state);
      // Mettre à jour le meilleur score
      bestScore = Math.min(bestScore, score);
      beta = Math.min(beta, score);
      if (beta <= alpha) {
          break;  // Élagage alpha-beta
      }
    }
    return bestScore;
  }
}
  
// Fonction pour trouver le meilleur coup à jouer en utilisant l'algorithme Minimax
export function findBestMove(state, depth, coup_precedant) {
    let bestScore = Infinity;
    let bestMove;
    // Parcourir tous les coups possibles
    for (let move of getPossibleMoves(state, coup_precedant, 'black')) {
        // Simuler le coup
        makeMove(move, state, coup_precedant);
        // Récursivement trouver le score pour l'état suivant en utilisant Minimax
        let score = minimax(state, depth - 1, true, coup_precedant, -Infinity, Infinity);
        // Annuler le coup
        undoMove(state);
        // Mettre à jour le meilleur score et le meilleur coup
        if (score < bestScore) {
            console.log(score, bestScore)
            bestScore = score;
            bestMove = move;
        }
    }
    return bestMove;
}

function getPossibleMoves(state, coup_p, color){
    let possibleM = legalMove(state, coup_p, color)
    let possibleMoves = []
    // actuellement les coup sont [[0,0][0,0][0,0][0,0]]
    // on les met comme ca [[[0,0],[0,0]],[[0,0][0,0]]]
    for(let i = 1; i < possibleM.length; i+= 2){
      possibleMoves.push([possibleM[i-1], possibleM[i]])
    }
    return possibleMoves
}
function isGameOver(state, coup_p) {
  console.log(JSON.parse(JSON.stringify(state)), coup_p);
  let whiteMoves = legalMove(state, coup_p, 'white')
  let blackMoves = legalMove(state, coup_p, 'black')
  if(whiteMoves.length === 0 || blackMoves.length === 0) {
      return true
  }
  return false
}
function makeMove(move, state, coup_precedant){
  let [from, to] = move
  let piece = state[from[0]][from[1]]
  let possibleMoves;
  let legalMove = false
  if(piece !== 0){
    if(piece < 0) possibleMoves = getPossibleMoves(state, coup_precedant, 'black')
    if(piece > 0) possibleMoves = getPossibleMoves(state, coup_precedant, 'white')
    for(let moves of possibleMoves){
      if (arrayEqual(move[0], moves[0]) && arrayEqual(move[1], moves[1])) {
        legalMove = true
        break
      }
    }
  }
  if(legalMove) {
    if(piece === 1){
      //prise en passant 
      if(from[1] !== to[1] && state[to[0]][to[1]] === 0){
        state[to[0] + 1][to[1]] = 0
      }
    }
    else if(piece === -1){
      // prise en passant
      if(from[1] !== to[1] && state[to[0]][to[1]] === 0){
        state[to[0] - 1][to[1]] = 0
      }
    }
    // Enregistrer le coup et la valeur de la case "to" sur la pile 
    coup_precedant = [from, to]
    undoStack.push([move, state[to[0]][to[1]], piece]);
    if(piece === 1 && to[0] === 0) piece = 8
    else if(piece === -1 && to[0] === 7) piece = -8
    state[to[0]][to[1]] = piece
    state[from[0]][from[1]] = 0
  }
} 
function undoMove(state){
  // Récupérer le dernier coup joué sur la pile
  let lastElement = undoStack.pop();
  console.log(lastElement);
  let lastMove = lastElement[0]
  let pieceManger = lastElement[1]
  let pieceBouger = lastElement[2]
  let [from, to] = lastMove
  // elle a deja bouger
  let piece = state[to[0]][to[1]]
  if(piece === 1){
    //prise en passant 
    if(from[1] !== to[1] && state[to[0]][to[1]] === 0){
      state[to[0] + 1][to[1]] = 1
    }
  }
  else if(piece === -1){
    // prise en passant
    if(from[1] !== to[1] && state[to[0]][to[1]] === 0){
      state[to[0] - 1][to[1]] = -1
    }
  }

  state[from[0]][from[1]] = pieceBouger
  state[to[0]][to[1]] = pieceManger
} 
let board = [
    [-4,-3,-2,-8,-255,-2,-3,-4],
    [-1,-1,-1,-1,-1,-1,-1,-1],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1],
    [4,3,2,8,255,2,3,4]
]
let undoStack = []
