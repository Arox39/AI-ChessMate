import { clouage } from './clouage.js'
import { anti_suicide } from './anti_suicide.js'

export function legalMove(board, coup_precedant, color){
    /*
    parametres : board : 8liste avec 8 argument dans une liste
    fonction qui devra retourne tout les coup legaux

    */    
    let coup_legal = []
    coup_legal.push(...clouage(board, color, coup_precedant))
    coup_legal.push(...anti_suicide(board,coup_precedant, color))
    return coup_legal
}