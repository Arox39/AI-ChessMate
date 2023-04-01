
export function promotion(color){
    let value = parseInt(prompt("Pour avoir une reine tapez 8, pour une tour tapez 4, un fou tapez 2, un cavalier tapez 3"))
    if(!(value === 8 || value === 3 || value === 2 || value === 4)){
        alert('Merci de rentrez une valeur correct svp. Recommencer')
        promotion(color)
    }
    if(color === 'white'){
        return value
    }
    else{
        return 0 - value
    }
}