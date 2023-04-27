

/*
 * Fonction qui determine la valeur de la promotion
 * 
 * - @param {String} color: la couleur de la promotion
 * 
 * - @returns {Number}: la valeur de la promotion
 */
export function promotion(color){
    let value = parseInt(prompt("Pour avoir une reine tapez 8, pour une tour tapez 4, un fou tapez 2, un cavalier tapez 3"))
    // tant que la valeur est mauvaise on redemande
    while(!(value === 8 || value === 3 || value === 2 || value === 4)){
        alert('Merci de rentrez une valeur correct svp. Recommencer')
        value = parseInt(prompt("Pour avoir une reine tapez 8, pour une tour tapez 4, un fou tapez 2, un cavalier tapez 3"))
    }
    if(color === 'white'){
        return value
    }
    else{
        return 0 - value
    }
}