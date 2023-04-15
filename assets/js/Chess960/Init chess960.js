let wPieces = [4, 3, 2, 8, 255, 2, 3, 4];
let bPieces = [-4, -3, -2, -8, -255, -2, -3, -4];

function random(wPieces, bPieces){
    wPieces.sort(() => Math.random() - 0.5);
    bPieces.sort(() => Math.random() - 0.5);
}

export function init(){
    let chessboard = [];
    let correspondance = {
    4: 'rook',
    3: 'knight', 
    2: 'bishop', 
    8: 'queen', 
    255: 'king',
    0: 'empty',
    1: 'pawn'
    }
    for (let i = 0; i < 8; i++) {
      let row = [];
      for (let j = 0; j < 8; j++) {
      let piece;
      if(i === 1){
        piece = -1
      }
      else if(i === 6){
        piece = 1
      }
      else if(i === 0){
        piece = bPieces[j]
      }
      else if(i === 7){
        piece = wPieces[j]
      }
      else{
        piece = 0
      }
      row.push(piece);
      }
    chessboard.push(row);
    }

    let table = document.createElement("table");
    table.id = "chessboard";

    for (let i = 0; i < 8; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 8; j++) {
    let cell = document.createElement("td");
    cell.className = ((i + j) % 2 === 0) ? "white" : "black";
    cell.dataset.piece = correspondance[Math.abs(chessboard[i][j])];
    cell.dataset.color = chessboard[i][j] > 0 ? 'white' : 'black';
    if(chessboard[i][j] === 0){
        cell.dataset.color = 'none'
    }
    cell.id = i + "-" + j; // ajoute l'id basé sur les coordonnées (i,j)
    row.appendChild(cell);
    }
    table.appendChild(row);
    }

    document.body.appendChild(table);
    return chessboard
}
export function refreshBoard(chessboard) {
    let correspondance = {
      4: 'rook',
      3: 'knight',
      2: 'bishop',
      8: 'queen',
      255: 'king',
      0: 'empty',
      1: 'pawn'
    }
  
    let table = document.querySelector("#chessboard");
    let rows = table.getElementsByTagName("tr");
  
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].getElementsByTagName("td");
  
      for (let j = 0; j < cells.length; j++) {
        let piece = chessboard[i][j];
        let cell = cells[j];
        cell.dataset.piece = correspondance[Math.abs(piece)];
        cell.dataset.color = piece > 0 ? 'white' : 'black';
        if(chessboard[i][j] === 0){
            cell.dataset.color = 'none'
        }
      }
    }
  }