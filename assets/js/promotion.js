
export function promotion(color){
    let value = parseInt(prompt("Pour avoir une reine tapez 8, pour une tour tapez 4, un fou tapez 2, un cavalier tapez 3"))
    console.log(value);
    while(!(value === 8 || value === 3 || value === 2 || value === 4)){
        alert('Merci de rentrez une valeur correct svp. Recommencer')
        value = parseInt(prompt("Pour avoir une reine tapez 8, pour une tour tapez 4, un fou tapez 2, un cavalier tapez 3"))
    }
    if(color === 'white'){
        console.log(value);
        return value
    }
    else{
        console.log(value);
        return 0 - value
    }
}