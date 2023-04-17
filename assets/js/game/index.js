// import des fonctions depuis d'autres fichiers
import { init, refreshBoard,  } from './init.js'
import { win_nul } from './win_nul.js'
import { move } from './move.js'
import { check } from './check.js'
import { legalMove } from './legalMove.js'
import { promotion } from './promotion.js'
import { petit_rook, grand_rook } from './rook.js'
import { clouage } from './clouage.js'
import { minimax } from '../IA/minimax.js'
export function variante0(){
// initialisation du plateau de jeu et du joueur courant
let board = init()
let currentPlayer = 'white'
// initialisation du dernier coup joué
let coup_precedant = [[0,0], [0,0]]

// fonction pour comparer deux tableaux
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

// fonction pour vérifier si un élément est présent dans un tableau
function elementInArray(element, array) {
  for(let i = 0; i < array.length; i++){
      if(arrayEqual(element, array[i])){
          return true
      }
  }
  return false
}

// fonction pour passer au joueur suivant
function switchPlayer() {
  let indication = document.querySelector('.current-player')
    if (currentPlayer === 'white') {
        currentPlayer = 'black'
        indication.dataset.color = 'black'
    } else {
        currentPlayer = 'white'
        indication.dataset.color = 'white'
    }
}

// fonction appelée à la fin du jeu pour désactiver les clics sur les cases
function endgame(winner) {
  let cells = document.querySelectorAll(`td[data-color=${currentPlayer}]`)
  cells.forEach(cell => {
    cell.removeEventListener('click', cellListener)
  })
  let endgameElement = document.querySelector('.endgame')
  endgameElement.classList.toggle('hide')
  let endgameTitle = document.getElementById('endgame-title')
  let title;
  if(winner === 'draw'){
    title = 'Égalité !'
  }
  else if(winner === 'white'){
    title = 'Les blancs ont gagnés !'
  }
  else{
    title = 'Les noirs ont gagnés !'
  }
  endgameTitle.textContent = title
  return;
}
// fonction pour jouer un coup sur le plateau de jeu
function playMove(move) {
  let caseDepartPrecedant = document.getElementById(`${coup_precedant[0][0]}-${coup_precedant[0][1]}`)
  caseDepartPrecedant.classList.remove('prevMove')
  let caseArriverPrecedant = document.getElementById(`${coup_precedant[1][0]}-${coup_precedant[1][1]}`)
  caseArriverPrecedant.classList.remove('prevMove')

    let [from, to] = move
    let piece = board[from[0]][from[1]]
    let pieceColor = piece > 0 ? 'white' : 'black'
    let correspondance = {255: 'king', 8: 'queen', '4': 'rook', 3: 'knight', 2: 'bishop', 1: 'pawn'}
    let caseDepart = document.getElementById(`${from[0]}-${from[1]}`)
    let caseArriver = document.getElementById(`${to[0]}-${to[1]}`)
    if(piece === 1){
      // prise en passant
      if(from[1] !== to[1] && board[to[0]][to[1]] === 0){
        let caseSpecial = document.getElementById(`${to[0] + 1}-${to[1]}`)
        caseSpecial.dataset.piece = 'empty'
        caseSpecial.dataset.color = 'none'
        board[to[0] + 1][to[1]] = 0
      }
    }
    else if(piece === -1){
      // promotion (on prend la reine direct pour l'IA pour pas tout compliquer)
      if(to[0] === 7) piece = -8
      // prise en passant 
      if(from[1] !== to[1] && board[to[0]][to[1]] === 0){
        let caseSpecial = document.getElementById(`${to[0] + 1}-${to[1]}`)
        caseSpecial.dataset.piece = 'empty'
        caseSpecial.dataset.color = 'none'
        board[to[0] - 1][to[1]] = 0
      }
    }
    // on fait le mouvement dans le plateau afficher 
    caseDepart.dataset.piece = 'empty'
    caseDepart.dataset.color = 'none'
    caseDepart.classList.add('prevMove')
    caseArriver.dataset.piece = correspondance[Math.abs(piece)]
    caseArriver.dataset.color = pieceColor
    caseArriver.classList.add('prevMove')
    // on effectue le mouvement dans notre array
    board[to[0]][to[1]] = piece
    board[from[0]][from[1]] = 0
    // Enregistrer le coup précédent
    coup_precedant = [[from[0], from[1]], [to[0], to[1]]]

     // Supprimer tous les coups possibles affichés
     let possibleMoves = document.querySelectorAll('.possibleMove')
     possibleMoves.forEach(pElement => {
       pElement.classList.remove('possibleMove')
     })

     if (check(board, coup_precedant, currentPlayer)) {
       let colorAdverse = currentPlayer === 'white' ? 'black' : 'white'
       let king = document.querySelector(`td[data-piece='king'][data-color=${colorAdverse}]`)
       king.classList.add('check')

       // Vérifier s'il y a échec et mat
       let legalMovesAdverse = legalMove(board, coup_precedant, colorAdverse)
       if (win_nul(board, coup_precedant, legalMovesAdverse) === 1) {
         endgame(currentPlayer)
       }
     }
     else{
       let check = document.querySelector('.check')
       if(check) check.classList.remove('check')
       // verifier si il y a nul
       let colorAdverse = currentPlayer === 'white' ? 'black' : 'white'
       let legalMovesAdverse = legalMove(board, coup_precedant, colorAdverse)
       if (win_nul(board, coup_precedant, legalMovesAdverse) === -1) {
         
         endgame('draw')
       }
     }
}


// fonction principale du jeu
function game(){
  setTimeout(() => {
    if(currentPlayer === 'black'){
      let best_move = minimax(board, 3, -Infinity, +Infinity, true, 0, 'b', coup_precedant)[0]
      playMove(best_move)
      refreshBoard(board)
      switchPlayer()
    }
    
    // récupération des cases appartenant au joueur courant
    let cells = document.querySelectorAll(`td[data-color=${currentPlayer}]`)
    cells.forEach(cell => {
      // ajout d'un événement de clic sur chaque case
      cell.addEventListener('click', cellListener)
    })
  }, 10)
}

// initialisation du jeu
let moveBking = 0
let moveWking = 0
let moveBRook0 = 0
let moveWRook0 = 0
let moveBRook7 = 0
let moveWRook7 = 0
let departPiece
game()

async function cellListener() {
    // Vérifier si la pièce sélectionnée appartient au joueur courant
  if (this.dataset.color === currentPlayer) {
    // Supprimer les coups possibles affichés précédemment
    let possibleMoves = document.querySelectorAll('.possibleMove')
    possibleMoves.forEach(possibleElement => {
      possibleElement.classList.remove('possibleMove')
    })

    // Obtenir les coordonnées de la pièce sélectionnée
    departPiece = this.id.split('-').map(Number)
    let row = departPiece[0]
    let col = departPiece[1]

    // Obtenir les coups légaux possibles pour le joueur courant et le coup précédent
    let legalMoves = legalMove(board, coup_precedant, currentPlayer)
    // Obtenir les mouvements théoriques possibles pour la pièce sélectionnée
    let theoriqueMove = move(board, row, col, coup_precedant)

    let possibleMove = []
    
    // Vérifier si les mouvements théoriques sont légaux et les afficher
    for (let i = 1; i < theoriqueMove.length; i += 2) {
      for (let j = 1; j < legalMoves.length; j += 2) {
        if (arrayEqual(theoriqueMove[i], legalMoves[j]) && arrayEqual(theoriqueMove[i - 1], legalMoves[j - 1])) {
          possibleMove.push(legalMoves[j])
          document.getElementById(`${legalMoves[j][0]}-${legalMoves[j][1]}`).classList.add('possibleMove')
        }
      }
    }
    // obtenir les coup adverse
    let adverseLegalMoves = legalMove(board, coup_precedant, currentPlayer === 'white' ? 'black' : 'white')
    let mKing
    let mRook0
    let mRook7
    let rowRook
    if(currentPlayer === 'white'){
      mKing = moveWking
      mRook0 = moveWRook0
      mRook7 = moveWRook7
      rowRook = 7
    }
    if(currentPlayer === 'black'){
      mKing = moveBking
      mRook0 = moveBRook0
      mRook7 = moveBRook7
      rowRook = 0
    }
    if(petit_rook(board, mKing, mRook7, currentPlayer) && this.dataset.piece === 'king' && 
    !(elementInArray([rowRook, 6], adverseLegalMoves))){
      possibleMove.push([rowRook, 6])
      document.getElementById(`${rowRook}-6`).classList.add('possibleMove')
    }
    if(grand_rook(board, mKing, mRook0, currentPlayer) && this.dataset.piece === 'king' && 
    !(elementInArray([rowRook, 2], adverseLegalMoves))){
      possibleMove.push([rowRook, 2])
      document.getElementById(`${rowRook}-2`).classList.add('possibleMove')
      
    }
    // Attendre que le joueur sélectionne une destination parmi les coups possibles
    let destinationPiece = await getDestination(possibleMove)
    // Vérifier si la destination sélectionnée est légale et jouer le coup si c'est le cas
    if (elementInArray(destinationPiece, possibleMove)) {
      
      if((destinationPiece[0] === 0 || destinationPiece[0] === 7) && Math.abs(board[departPiece[0]][departPiece[1]]) === 1){
        board[departPiece[0]][departPiece[1]] = promotion(currentPlayer)
      }
      playMove([departPiece, destinationPiece])
      let rowRook = currentPlayer === 'white' ? 7 : 0
      if(arrayEqual(departPiece, [rowRook, 4]) && arrayEqual(destinationPiece, [rowRook, 2])){
        playMove([[rowRook, 0], [rowRook, 3]])
      }
      else if(arrayEqual(departPiece, [rowRook, 4]) && arrayEqual(destinationPiece, [rowRook, 6])){
        playMove([[rowRook, 7], [rowRook, 5]])
      }
      
      if(arrayEqual(departPiece, [0,4])) moveBking = 1
      if(arrayEqual(departPiece, [7,4])) moveWking = 1
      if(arrayEqual(departPiece, [0,0])) moveBRook0 = 1
      if(arrayEqual(departPiece, [0,7])) moveWRook0 = 1
      if(arrayEqual(departPiece, [1,0])) moveBRook7 = 1
      if(arrayEqual(departPiece, [1,7])) moveWRook7 = 1

      
    }
    refreshBoard(board)
    // Passer la main au joueur suivant
    switchPlayer()
    // On récupère toutes les cellules qui contiennent une pièce appartenant au joueur courant
    let cells = document.querySelectorAll(`td[data-color=${currentPlayer}]`)

    // On retire l'écouteur d'événement click sur chacune de ces cellules
    cells.forEach(cell => {
      cell.removeEventListener('click', cellListener)
    })
  }
  // On lance la fonction "game" pour passer au tour suivant
  game()
}

// Fonction qui permet de récupérer la destination choisie par le joueur parmi les mouvements possibles
function getDestination(possibleMove){
  let promises = [];
  possibleMove.forEach(element => {

    // On crée une promesse pour chaque mouvement possible
    let promise = new Promise(resolve => {
      let possibleElement = document.getElementById(`${element[0]}-${element[1]}`)
      // On ajoute un écouteur d'événement click sur chaque case de destination possible
      possibleElement.addEventListener('click', (e) => {
        if(possibleElement.classList.contains('possibleMove')){
          let destination = e.target.id.split('-').map(Number);
          resolve(destination);
        }
      })
    });
    promises.push(promise);
  });

  // On retourne la promesse qui est résolue lorsqu'une case de destination est cliquée
  return Promise.race(promises);
}

let rematchBtn = document.querySelectorAll('.rematch')
rematchBtn.forEach(element => {
  element.addEventListener('click', () => {
  // Réinitialisation des variables de jeu
  board = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]]
  
  currentPlayer = 'white'
  coup_precedant = [[0,0], [0,0]]
  moveBking = 0
  moveWking = 0
  moveBRook0 = 0
  moveWRook0 = 0
  moveBRook7 = 0
  moveWRook7 = 0

  // Suppression des coups possibles affichés précédemment
  let possibleMoves = document.querySelectorAll('.possibleMove')
  possibleMoves.forEach(possibleElement => {
    possibleElement.classList.remove('possibleMove')
  })
  document.querySelectorAll('.prevMove').forEach(element => {
    element.classList.remove('prevMove')
  })
  let check = document.querySelector('.check')
  if(check) check.classList.remove('check')
  let endgameElement = document.querySelector('.endgame')
  endgameElement.classList.add('hide')
  board = [[-4,-3,-2,-8,-255,-2,-3,-4],[-1,-1,-1,-1,-1,-1,-1,-1],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0],[1,1,1,1,1,1,1,1],[4,3,2,8,255,2,3,4]]
  refreshBoard(board)
  // Réinitialisation du jeu
  game()  
  })
})

let cross = document.querySelector('.x-mark')
cross.addEventListener('click', () => {
  let endgameElement = document.querySelector('.endgame')
  endgameElement.classList.add('hide')
})
}
variante0()