import { legalMove } from "./game.js"



/* 
 * 
 * en utilisant le score lier a chaque piece et leurs position
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
  
// fonction pour vérifier si un élément est présent dans un tableau
function elementInArray(element, array) {
for(let i = 0; i < array.length; i++){
    if(arrayEqual(element, array[i])){
        return true
    }
}
return false
}

export function grand_rook(board, nb_m_roi, nb_m_tour0, color){
    /*
    parametres:
    board : tableau de 8*8 représentant le plateau d'échecs
    nb_m_roi : nombre de mouvements du roi noir
    nb_m_tour0 : nombre de mouvements de la tour à gauche du roi blanc
    retourne True si le grand roque est possible pour le roi blanc, False sinon
    */
    let row = color === 'white' ? 7 : 0
    let rook = true
    let coupAdverse = legalMove(board, [[0,0],[0,0]], color === 'white' ? 'black' : 'white')
    
    // verifier que la tour existe 
    if(board[row][0] === 0) rook = false
    // Vérifier si le nombre de mouvements du roi et de la tour est égal à 0
    if(nb_m_roi !== 0 || nb_m_tour0 !== 0){
        rook = false
    }
    if(elementInArray([row,4], coupAdverse)) rook = false
    // Vérifier si les cases entre le roi et la tour sont vides
    for(let i = 1; i < 4; i++){
        if (board[row][i] !== 0 || elementInArray([row,i], coupAdverse)){
            rook = false
        }
    }
    return rook
}

export function petit_rook(board, nb_m_roi, nb_m_tour7, color){
    /*
    parametre : board = tableau de 8*8 , le reste des entier
    def qui renvoi  oui ou non ilk peut faire le petit rook
    */
   let row = color === 'white' ? 7 : 0
   let rook = true
   let coupAdverse = legalMove(board, [[0,0],[0,0]], color === 'white' ? 'black' : 'white')
   // verifier que la tour existe
   if(board[row][7] === 0) rook = false
   
   if (nb_m_roi !== 0) rook = false
   
   if (nb_m_tour7 !== 0) rook = false
   
   if(elementInArray([row,4], coupAdverse)) rook = false
   for (let i = 5; i < 7; i++){
        if (board[row][i] !== 0 || elementInArray([row,i], coupAdverse)){
            rook = false
        }
    }
    return rook
}