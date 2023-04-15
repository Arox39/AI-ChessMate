import {check} from './check.js'

export function win_nul(board,coup_precedant,coup, echecs){
    /*
    Fonction qui retourne 0 si rien et ajoute 1 si échec, il n'y a pas de nul possible
    */
    let win = 0;
    if (check(board,coup_precedant, 'black') || check(board,coup_precedant, 'white')){
        // valeur pour la win
        win = 1 
        echecs += 1;
        if (echecs === 3) {
            win = 2;
        }
    } else {
        echecs = 0;
    }

    return win;
}