
// import des fonctions depuis d'autres fichiers
import { clouage } from './clouage.js'
import { anti_suicide } from './anti_suicide.js'
import { init, refreshBoard,  } from './init.js'
import { win_nul } from './win_nul.js'
import { move } from './move.js'
import { check } from './check.js'
import { minimax } from './IA/minimax.js'



// initialisation du plateau de jeu et du joueur courant
let board = init()
let currentPlayer = 'white'
// initialisation du dernier coup joué
let coup_precedant = [[0,0], [0,0]]

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
 * Change le joueur qui doit jouer 
 */
function switchPlayer() {
    if (currentPlayer === 'white') {
        currentPlayer = 'black'
    } else {
        currentPlayer = 'white'
    }
}

/* 
 * Fonctions qui recupere tout les coups possible et legaux pour tout les pions d'une couleur
 * 
 * - @param {Array} board: represente l'etat actuelle du jeux
 * - @param {Array} coup_precedant: represente le coup qui vient d'etre jouer
 * - @param {string} color: (soit 'white' soit 'black') qui nous dit la couleur des pieces qu'on veut avoir
 * 
 *  
 * - @returns {array}: contient tous les coups possible et legaux pour les pieces de `color`
 */
export function legalMove(board, coup_precedant, color){
  // on intialise coup_legal
  let coup_legal = []
  // on lui ajoute les valeurs de clouage et de anti_suicide
  coup_legal.push(...clouage(board, color, coup_precedant))
  coup_legal.push(...anti_suicide(board,coup_precedant, color))
return coup_legal
}

/* 
 * Fonction qui affiche le pop up qui nous indique comment et qui a gagner la partie
 * 
 *  
 * - @param {String} winner: nous dit la couleur du gagnant ou si il y a nulle (soit 'white' soit 'black' soit 'draw')
 * - @param {String} cause: nous dit pour quelle raison le gagnant a gagner
 * 
 * 
 * - @returns {fonction} appel la fonction game avec comme parametere true pour que ca arrete le jeux
 */
function endgame(winner, cause) {
  let endgameElement = document.querySelector('.endgame')
  console.log(endgameElement);
  endgameElement.classList.remove('cacher')
  let state = document.getElementById('etat')
  let causeTxt = document.getElementById('cause')
  let title;
  if(winner === 'draw'){
    title = 'Égalité!'
  }
  else if(winner === 'white'){
    title = 'Vous avez gagné!'
  }
  else{
    title = 'Vous avez perdu!'
  }
  state.textContent = title
  causeTxt.textContent = `Par ${cause}`
  game(true)
}
/* 
 * Fonction qui fait bouger une pieces en fonction de sont mouvements associer
 * 
 * - @params {array} move: les coordonner de depart et d'arriver du mouvements
 */
function playMove(move) {
  let caseDepartPrecedant = document.getElementById(`${coup_precedant[0][0]}-${coup_precedant[0][1]}`)
  caseDepartPrecedant.classList.remove('prevMove')
  let caseArriverPrecedant = document.getElementById(`${coup_precedant[1][0]}-${coup_precedant[1][1]}`)
  caseArriverPrecedant.classList.remove('prevMove')

    let [from, to] = move
    let piece = board[from[0]][from[1]]

    let caseDepart = document.getElementById(`${from[0]}-${from[1]}`)
    let caseArriver = document.getElementById(`${to[0]}-${to[1]}`)

    // on met de la couleur a la case d'arriver et de depart pour que le coup qui vient d'etre jouer
    // soit plus facilement identifiable
    caseDepart.classList.add('prevMove')
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

     let colorAdverse = currentPlayer === 'white' ? 'black' : 'white'
     if (check(board, coup_precedant, currentPlayer)) {
       let king = document.querySelector(`td[data-piece='king'][data-color=${colorAdverse}]`)
       king.classList.add('check')
     }
     else if(document.querySelector('.check'))document.querySelector('.check').classList.remove('check')
      let legalMovesAdverse = legalMove(board, coup_precedant, colorAdverse)
      let win = win_nul(board, coup_precedant, legalMovesAdverse)
      if(win === 1) endgame(currentPlayer, 'Échec et mat')
      else if(win === -1 && legalMovesAdverse.length === 0) endgame('draw', 'Pat')
      else if(win === -1) endgame('draw', 'Matériel insuffisant')
}

// fonction principale du jeu
export function game(endgame){
  if(endgame)
  {
    let cells = document.querySelectorAll(`td[data-color=${currentPlayer}]`)
    cells.forEach(cell => 
      {
          cell.removeEventListener('click', cellListener)
      })
    return
  }
  // fonction setTimeout qui exécute le code après un délai de 10 millisecondes
  setTimeout(() => {

    // si c'est au tour du joueur noir
    if(currentPlayer === 'black'){

      // calcul du meilleur coup à jouer avec l'algorithme minimax (profondeur = 2)
      // la variable "best_move" contient le coup à jouer sous la forme [depart, arrivee, promotion] 
      // "board" est le tableau représentant l'état actuel du jeu
      // "-Infinity" et "+Infinity" représentent les bornes pour l'alpha-beta pruning
      // "true" indique que c'est au tour du joueur noir
      // "0" est la valeur initiale pour la profondeur
      // "'b'" est la lettre représentant le dernier coup joué
      // "coup_precedant" est une variable qui stocke le dernier coup joué
      let best_move = minimax(board, 2, -Infinity, +Infinity, true, 0, 'b', coup_precedant)[0]

      // exécution du coup
      playMove(best_move)

      // actualisation de l'affichage du plateau de jeu
      refreshBoard(board)

      // changement de joueur
      switchPlayer()

      // calcul des coups légaux de l'adversaire
      let legalMovesAdverse = legalMove(board, coup_precedant, 'white')

      // vérification s'il y a un échec et mat ou une situation de pat ou de matériel insuffisant
      let win = win_nul(board, coup_precedant, legalMovesAdverse)
      // si le joueur noir gagne par échec et mat
      if(win === 1) endgame('black', 'Échec et mat')

      // si la partie est nulle par pat
      else if(win === -1 && legalMovesAdverse.length === 0) endgame('draw', 'Pat')

      // si la partie est nulle par matériel insuffisant
      else if(win === -1) endgame('draw', 'Matériel insuffisant')
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
    // Attendre que le joueur sélectionne une destination parmi les coups possibles
    let destinationPiece = await getDestination(possibleMove)
    // Vérifier si la destination sélectionnée est légale et jouer le coup si c'est le cas
    if (elementInArray(destinationPiece, possibleMove)) {
      playMove([departPiece, destinationPiece])
      
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

  currentPlayer = 'white'
  coup_precedant = [[0,0], [0,0]]


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
  // let endgameElement = document.querySelector('.endgame')
  // endgameElement.classList.add('hide')
  board =  [
    [0, 0, -3, -4, -255], 
    [0, 0, 0, -8, -4], 
    [3, 0, 0, 0, -3], 
    [4, 8, 0, 0, 0], 
    [255, 4, 3, 0, 0]
  ];
  refreshBoard(board)
  // Réinitialisation du jeu
  game()  
  })
})
