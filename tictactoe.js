const X_CLASS ='x'
const CIRCLE_CLASS = 'circle'
const winningCombination =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,5,8],
    [2,5,6]
]
const cellElements = document.querySelectorAll('[data-cell]')
const board = document.getElementById('board')
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
let circleTurn

startGame()

restartButton.addEventListener('click',startGame)

function startGame() {
    circleTurn = false
    cellElements.forEach(cell =>{
        cell.addEventListener('click',handleClick,{once:true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove('show')
}


function handleClick(e) {
    const currentClass = circleTurn? CIRCLE_CLASS:X_CLASS
    placeMark(cell,currentClass)
    if(checkWin(currentClass)){
        endGame(false)
    }else if (isdraw()){
        endGame(true)
    }else{
        swapTurn()
        setBoardHoverClass()
    }
    
}

function endGame(draw){
    if(draw){
        winningMessageElement.innerText='Draw!'
    }else{
        winningMessageTextElement.innertext=`${circleTurn? "O's":"X's"} Wins!!`
    }
    winningMessageElement.classList.add('show')
}

function isDraw(){
    return [...cellElements].every(cell=> {
        return cell.classList.contains(X_CLASS) ||
        cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell,currentClass){
    cell.classList.addEventListener(currentClass)
}

function swapTurns(){
    circleTurn = !circleTurn
}

function setBoardHoverClass(){
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn){
        board.classList.add(CIRCLE_CLASS)
    }else{
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass){
    return winningCombination.some(combination =>{
        return combination.every(index=>{
            return cellElements[index].classList.contains(currentClass)
        })
    })
}