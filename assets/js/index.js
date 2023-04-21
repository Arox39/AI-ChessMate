
let home = document.getElementById('home')
let submit = document.getElementById('submit')
let rematch = document.querySelectorAll('.rematch')
let homeBtn = document.querySelectorAll('.home')
let endgame = document.querySelector('.endgame')
let xmark = document.querySelector('.fa-xmark')
// chessBoard.remove()
submit.addEventListener('click', () => {
    const selectElement = document.querySelectorAll('select');
    let variante = selectElement[0].value
    let depth =  selectElement[1].value
    let script = document.createElement('script');
    console.log(variante);
    script.src = `./assets/js/${variante}/game.js`;
    script.classList.add(depth)
    script.id = 'script'
    script.type = 'module';
    home.classList.toggle('hide')
    rematch[0].classList.toggle('hide')
    homeBtn[0].classList.toggle('hide')
    document.getElementsByTagName('body')[0].appendChild(script);
})
homeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        let chessBoard = document.getElementById('chessboard')
        chessBoard.remove()
        let script = document.getElementById('script')
        script.remove()
        home.classList.toggle('hide')
        rematch[0].classList.toggle('hide')
        homeBtn[0].classList.toggle('hide')
        endgame.classList.add('cacher')
        location.reload()
    })
});

xmark.addEventListener('click', () => {
    endgame.classList.add('cacher')
})