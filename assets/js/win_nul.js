import {check} from './check.js'

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

export function win_nul(board,coup_precedant,coup){
    /*
    Fonction qui retopurne -1 si nul, 0 si rien et 1 si victoire
    */
    let win = 0
    if (arrayEqual(coup, [])) {
        // valeur pour la nul
        win = -1 
        if (check(board,coup_precedant, 'black') || check(board,coup_precedant, 'white')){
            // valeur pour la win 
            win = 1
        }
    }

    let pieces = board.reduce((acc, row) => acc.concat(row), []).filter(piece => piece !== null);
    let whitePieces = pieces.filter(piece => piece.color === 'white');
    let blackPieces = pieces.filter(piece => piece.color === 'black');

    if (whitePieces.length === 1 && blackPieces.length === 1) {
        // Il ne reste que des rois
        win = -1
    }

    if (whitePieces.length === 2 && blackPieces.length === 2) {
        // Il ne reste que des rois et une autre piece
        let whiteBishopOrKnight = whitePieces.find(piece => piece.type === 'bishop' || piece.type === 'knight');
        let blackBishopOrKnight = blackPieces.find(piece => piece.type === 'bishop' || piece.type === 'knight');
        // L'autre piece restante et un roi ou un cavalier
        if (whiteBishopOrKnight && blackBishopOrKnight) {
            win = -1
        }
    }

    return win;
}