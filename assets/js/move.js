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


export function move(board, row, col, prevMove){
    let position_initial = [row,col]
    let coup = []
    let piece = board[row][col]
    let c0 = col !== 7 
    let c7 = col !== 0
    let l0 = row !== 7
    let l7 = row !== 0
    let moveForWhitePawn = () => {
        if (l7 && board[row-1][col] === 0){
            coup.push(...[position_initial,[row-1,col]])
        }     
        if (row === 6 && board[4][col] === 0 && board[5][col] === 0){
            coup.push(...[position_initial,[4,col]])
        }
        if (l7 && c0 && board[row-1][col+1] < 0 ){
            coup.push(...[position_initial,[row-1,col+1]])
        }     
        if (l7 && c7 && board[row-1][col-1] < 0) {
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
        if (l7 && board[row+1][col] === 0  ){
            coup.push(...[position_initial,[row+1,col]])
        }     
        if (row === 1 && board[3][col] === 0 && board[2][col] === 0){
            coup.push(...[position_initial,[3,col]])
        }
        if (l7 && c0 && board[row+1][col+1] > 0 ){
            coup.push(...[position_initial,[row+1,col+1]])
        }     
        if (l7 && c7 && board[row+1][col-1] > 0) {
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
        
        while (row + nb <=7 && col + nb <=7){
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
        while (col - nb >=0 && row + nb <=7){

            if (pieceAdverse(board[row + nb][col - nb])) {
                coup.push(...[position_initial,[row+nb,col-nb]])
            }   

            if (board[row+nb][col-nb] !== 0 ){
                break   
            }
            nb++
        }

        nb = 1
        
        while (col + nb <=7 && row-nb >=0 ){
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

    //pour le cavalier
    let moveForKnight = (color) => {
        let pieceAdverse
        if (color === 'white') {
            pieceAdverse = (piece) => piece <= 0;
        } else {
            pieceAdverse = (piece) => piece >= 0;
        }
        if (row >1 && col !==7 && pieceAdverse(board[row-2][col+1])){
            coup.push(...[position_initial,[row-2,col+1]])
        }   

        if (row >1 && col !==0 && pieceAdverse(board[row-2][col-1])){
            coup.push(...[position_initial,[row-2,col-1]])
        }  

        if (row <6 && col !==7 && pieceAdverse(board[row+2][col+1])){
            coup.push(...[position_initial,[row+2,col+1]])
        }   

        if (row <6 && col !==0 && pieceAdverse(board[row+2][col-1])){
            coup.push(...[position_initial,[row+2,col-1]])
        }

        if (row !== 0 && col <6 && pieceAdverse(board[row-1][col+2])){
            coup.push(...[position_initial,[row-1,col+2]])
        } 

        if (row !== 0 && col >1 && pieceAdverse(board[row-1][col-2])){
            coup.push(...[position_initial,[row-1,col-2]])
        }  

        if (row !== 7 && col <6 && pieceAdverse(board[row+1][col+2])){
            coup.push(...[position_initial,[row+1,col+2]])
        }  

        if  (row !== 7 && col >1 && pieceAdverse(board[row+1][col-2])){
            coup.push(...[position_initial,[row+1,col-2]])
        }  
    }


    //Pour le roi
    let moveForKing = (color) => {
        let pieceAdverse
        if (color === 'white') {
            pieceAdverse = (piece) => piece <= 0;
        } else {
            pieceAdverse = (piece) => piece >= 0;
        }
        if (l7 && pieceAdverse(board[row-1][col])){
            coup.push(...[position_initial,[row-1,col]])
        }     

        if (l0 && pieceAdverse(board[row+1][col])){
            coup.push(...[position_initial,[row+1,col]])
        }     

        if (l7 && c0 && pieceAdverse(board[row-1][col+1])){
            coup.push(...[position_initial,[row-1,col+1]])
        }    

        if (l0 && c0 &&  pieceAdverse(board[row+1][col+1])){
            coup.push(...[position_initial,[row+1,col+1]])
        }    

        if (c0 && pieceAdverse(board[row][col+1])){
            coup.push(...[position_initial,[row,col+1]])
        }      

        if (l7 && c7 && pieceAdverse(board[row-1][col-1])){
            coup.push(...[position_initial,[row-1,col-1]])
        }    

        if (l0 && c7 && pieceAdverse(board[row+1][col-1]) ){
            coup.push(...[position_initial,[row+1,col-1]])
        }    

        if (c7 && pieceAdverse(board[row][col-1])){
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
        while (row + nb <=7){
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
        while (col + nb <=7){
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
    else if(piece === 2){
        moveForBishop(color)
    }
    else if(piece === 3){
        moveForKnight(color)
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