
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
 * Fonction qui renvoie tout les coups qu'une piece peut faire selon les regles des echecs
 *
 * - @param {Array} board: plateau du jeu
 * - @param {Number} row: la ligne de board ou se trouve la piece a etudier
 * - @param {Number} col: la colonne de board ou se trouve la piece a etudier
 * - @param {Array} prevMove: coordonner du coup precedant
 * 
 * - @returns {Array} contient tout les coup d'une pieces 
 */
export function move(board, row, col, prevMove){
    let position_initial = [row,col]
    let coup = []
    let piece = board[row][col]
    let c0 = col !== 4 
    let c4 = col !== 0
    let l0 = row !== 4
    let l4 = row !== 0
    let moveForWhitePawn = () => {
        if (l4 && board[row-1][col] === 0){
            coup.push(...[position_initial,[row-1,col]])
        }     
        if (row === 6 && board[4][col] === 0 && board[5][col] === 0){
            coup.push(...[position_initial,[4,col]])
        }
        if (l4 && c0 && board[row-1][col+1] < 0 ){
            coup.push(...[position_initial,[row-1,col+1]])
        }     
        if (l4 && c4 && board[row-1][col-1] < 0) {
            coup.push(...[position_initial,[row-1,col-1]])
        }  
        if (row === 3 && col >= 1 && arrayEqual(prevMove[0],[1,col-1]) && arrayEqual(prevMove[1], [3, col-1])
        && board[3][col-1] === -1){
            coup.push(...[position_initial,[2,col-1]])
        } 
        if (row === 3 && col <= 6 && arrayEqual(prevMove[0],[1,col+1]) && arrayEqual(prevMove[1], [3, col+1]) 
        && board[3][col+1] === -1){
            coup.push(...[position_initial,[2,col+1]])
        } 
    }
    let moveForBlackPawn = () => {
        if (l0 && board[row+1][col] === 0  ){
            coup.push(...[position_initial,[row+1,col]])
        }     
        if (row === 1 && board[3][col] === 0 && board[2][col] === 0){
            coup.push(...[position_initial,[3,col]])
        }
        if (l0 && c0 && board[row+1][col+1] > 0 ){
            coup.push(...[position_initial,[row+1,col+1]])
        }     
        if (l0 && c4 && board[row+1][col-1] > 0) {
            coup.push(...[position_initial,[row+1,col-1]])
        }  
        if (row === 4 && col >= 1 && arrayEqual(prevMove[0],[6,col-1]) && arrayEqual(prevMove[1], [4, col-1])
            && board[4][col-1] === 1){
            coup.push(...[position_initial,[5,col-1]])
        } 
        if (row === 4 && col <= 6 && arrayEqual(prevMove[0],[6,col+1]) && arrayEqual(prevMove[1], [4, col+1])
            && board[4][col+1] === 1){
            coup.push(...[position_initial,[5,col+1]])
        } 
    }
    let moveForBishop = (color) => {
        let pieceAdverse
        if (color === 'white') {
            pieceAdverse = (piece) => piece <= 0;
        } else {
            pieceAdverse = (piece) => piece >= 0;
        }
          
        let nb = 1

        while (row - nb >= 0 && col - nb>=0){
            if (pieceAdverse(board[row - nb][col - nb])){
                coup.push(...[position_initial,[row-nb,col-nb]])
            }     
            if (board[row-nb][col-nb] !== 0 ){
                break   
            }
    
            nb++
        }

        nb = 1
        
        while (row + nb <=4 && col + nb <=4){
            if (pieceAdverse(board[row + nb][col + nb])){
                coup.push(...[position_initial,[row+nb,col+nb]])
            }    
            if (board[row+nb][col+nb] !== 0 ){
                break   
            }
            nb++

        }

        nb = 1
        //pour en bas a droite
        while (col - nb >=0 && row + nb <=4){

            if (pieceAdverse(board[row + nb][col - nb])) {
                coup.push(...[position_initial,[row+nb,col-nb]])
            }   

            if (board[row+nb][col-nb] !== 0 ){
                break   
            }
            nb++
        }

        nb = 1
        
        while (col + nb <=4 && row-nb >=0 ){
            if (pieceAdverse(board[row - nb][col + nb]) ){
                coup.push(...[position_initial,[row-nb,col+nb]])
            }    
            if (board[row-nb][col+nb] !== 0 ){
                break   
            }
            nb++
        }


    }
    let moveForQueen = (color) => {
        moveForBishop(color)
        moveForRook(color)
    }


    //Pour le roi
    let moveForKing = (color) => {
        let pieceAdverse
        if (color === 'white') {
            pieceAdverse = (piece) => piece <= 0;
        } else {
            pieceAdverse = (piece) => piece >= 0;
        }
        if (l4 && pieceAdverse(board[row-1][col])){
            coup.push(...[position_initial,[row-1,col]])
        }     

        if (l0 && pieceAdverse(board[row+1][col])){
            coup.push(...[position_initial,[row+1,col]])
        }     

        if (l4 && c0 && pieceAdverse(board[row-1][col+1])){
            coup.push(...[position_initial,[row-1,col+1]])
        }    

        if (l0 && c0 &&  pieceAdverse(board[row+1][col+1])){
            coup.push(...[position_initial,[row+1,col+1]])
        }    

        if (c0 && pieceAdverse(board[row][col+1])){
            coup.push(...[position_initial,[row,col+1]])
        }      

        if (l4 && c4 && pieceAdverse(board[row-1][col-1])){
            coup.push(...[position_initial,[row-1,col-1]])
        }    

        if (l0 && c4 && pieceAdverse(board[row+1][col-1]) ){
            coup.push(...[position_initial,[row+1,col-1]])
        }    

        if (c4 && pieceAdverse(board[row][col-1])){
            coup.push(...[position_initial,[row,col-1]])
        }
    }

    let moveForRook = () => {
        let pieceAdverse
        if (color === 'white') {
            pieceAdverse = (piece) => piece <= 0;
        } else {
            pieceAdverse = (piece) => piece >= 0;
        }

        let nb = 1

        
        while (row - nb >=0){
            if (pieceAdverse(board[row-nb][col])){
                coup.push(...[position_initial,[row-nb,col]])
            }    
    
            if (board[row-nb][col] !== 0 ){
                break   
            }
    
            nb++
        }

        nb = 1
        while (row + nb <= 4){
            if (pieceAdverse(board[row+nb][col])){
                coup.push(...[position_initial,[row+nb,col]])
            }     
    
            if (board[row+nb][col] !== 0 ){
                break  
            }
            nb++
        }

        nb = 1
        while (col - nb >=0){
            if (pieceAdverse(board[row][col-nb])){
                coup.push(...[position_initial,[row,col-nb]])
            }    
    
            if (board[row][col-nb] !== 0 ){
                break  
            }
            nb++
        }


        nb = 1
        while (col + nb <=4){
            if (pieceAdverse(board[row][col+nb])){
                coup.push(...[position_initial,[row,col+nb]])
            }    
            if (board[row][col+nb] !== 0 ){
                break 
            }
    
            nb++
        }
    }
    let color = piece < 0 ? 'black' : 'white'

    piece = Math.abs(piece)
    
    if(piece === 1 && color === 'white'){
        moveForWhitePawn()
    }
    else if(piece === 1 && color === 'black'){
        moveForBlackPawn()
    }
    else if(piece === 3){
        moveForBishop(color)
    }
    else if(piece === 4){
        moveForRook(color)
    }
    else if(piece === 8){
        moveForQueen(color)
    }
    else if(piece === 255){
        moveForKing(color)
    }
    return coup
}