// fonction qui initalise le plateau de base, virtuel et non-virtuelle

export function init(){
   let chessboard = [
    [0, 0, -3, -4, -255], 
    [0, 0, 0, -8, -4], 
    [3, 0, 0, 0, -3], 
    [4, 8, 0, 0, 0], 
    [255, 4, 3, 0, 0]
  ];

    let wPieces = [4, 3, 2, 8, 255, 2, 3, 4];
    let bPieces = [-4, -3, -2, -8, -255, -2, -3, -4];
    let correspondance = {
    4: 'rook',
    3: 'bishop', 
    8: 'queen', 
    255: 'king',
    0: 'empty',
    }
    let table = document.createElement("table");
    table.id = "chessboard";

    for (let i = 0; i < 5; i++) 
    {
      let row = document.createElement("tr");
      for (let j = 0; j < 5; j++) 
      {
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
// fonciton qui actualise le plateau de la page web avec @param {array} chessboard
export function refreshBoard(chessboard) {
    let correspondance = {
      4: "rook",
      3: "bishop",
      8: "queen",
      255: "king",
      0: "empty",
    };

    let table = document.querySelector("#chessboard");
    let rows = table.getElementsByTagName("tr");

    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].getElementsByTagName("td");

      for (let j = 0; j < cells.length; j++) {
        let piece = chessboard[i][j];
        let cell = cells[j];
        cell.dataset.piece = correspondance[Math.abs(piece)];
        cell.dataset.color = piece > 0 ? "white" : "black";
        if (chessboard[i][j] === 0) {
          cell.dataset.color = "none";
        }
      }
    }
}