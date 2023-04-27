import { legalMove } from "./game.js"

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
 * Fonction qui determine si le grand_rook est possible ou non 
 *
 * - @param {Array} board: represente le plateau d'echecs
 * - @param {Number} nb_m_roi: nombre de mouvement du roi 
 * - @param {Number} nb_m_tour0: nombre de mouvement de la tour a gauche du roi
 * - @param {String} color: represente la couleur pour laquelle on verifie le grand rook
 * 
 * - @returns {Boolean}: true si le grand rook est possible - false s'il ne l'est pas
 */
export function grand_rook(board, nb_m_roi, nb_m_tour0, color){
    let row = color === 'white' ? 7 : 0
    let rook = true
    let coupAdverse = legalMove(board, [[0,0],[0,0]], color === 'white' ? 'black' : 'white')
    
    // verifier que la tour existe 
    if(board[row][0] === 0) rook = false
    
    // verifier que le roi et la tour n'on pas bouger

    if(nb_m_roi !== 0 || nb_m_tour0 !== 0){
        rook = false
    }

    // si le roi est en echec on peut pas rook
    
    if(elementInArray([row,4], coupAdverse)) rook = false
    // Vérifier si les cases entre le roi et la tour sont vides
    for(let i = 1; i < 4; i++){
        if (board[row][i] !== 0 || elementInArray([row,i], coupAdverse)){
            rook = false
        }
    }
    return rook
}
/*
 * Fonction qui determine si le petit rook est possible ou non 
 *
 * - @param {Array} board: represente le plateau d'echecs
 * - @param {Number} nb_m_roi: nombre de mouvement du roi 
 * - @param {Number} nb_m_tour7: nombre de mouvement de la tour a droite du roi
 * - @param {String} color: represente la couleur pour laquelle on verifie le petit rook
 * 
 * - @returns {Boolean}: true si le petit rook est possible - false s'il ne l'est pas
 */
export function petit_rook(board, nb_m_roi, nb_m_tour7, color){

   let row = color === 'white' ? 7 : 0
   let rook = true
   let coupAdverse = legalMove(board, [[0,0],[0,0]], color === 'white' ? 'black' : 'white')
   // verifier que la tour existe
   if(board[row][7] === 0) rook = false
   
   // verifier que le roi et la tour n'on pas bouger
   if (nb_m_roi !== 0 || nb_m_tour7 !== 0) rook = false
   
   // si le roi est en echec on peut pas rook
   if(elementInArray([row,4], coupAdverse)) rook = false


   for (let i = 5; i < 7; i++){
        if (board[row][i] !== 0 || elementInArray([row,i], coupAdverse)){
            rook = false
        }
    }
    return rook
}