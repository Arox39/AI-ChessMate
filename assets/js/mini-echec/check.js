import {move} from './move.js'



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
 * Fonction qui determine si il y a echec apres avoir jouer un coup
 *
 * - @param {Array} board: plateau de jeu
 * - @param {Array} coup_precedant: le coup a ete jouer precedament
 * - @param {String} color: la couleur du coup qui a ete jouer
 * 
 * - @returns {Boolean}: true si il y a echec - false si il n'y a pas
 */
export function check(board,coup_precedant, color){
    // on prend la valeur du roi de la couleur opposer
    // car on verifie si en jouant un coup ce coup met echec
    let kingValue = color === 'white' ? -255 : 255
    let isCheck = false
    let king = []
    //donne tout les coups qu' a une piece si elle pouvais bouger 2 fois
    let controle_de_case = move(board,coup_precedant[1][0],coup_precedant[1][1], coup_precedant)

    // recupere les coordonner du roi adverse
    for (let row = 0; row < 8; row++){
        for (let col = 0; col < 8; col++){
            if(board[row][col] === kingValue){
                king = [row,col]
            }
        }
    }
    // regarde si les coordonner du roi adverse sont dans les coups possible de nos pieces
    for(let i = 1; i < controle_de_case.length; i += 2){
        if (arrayEqual(king,controle_de_case[i])){
            // si oui alors il y a echec
            isCheck = true
        }
    }
    return isCheck
}