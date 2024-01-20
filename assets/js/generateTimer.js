import { loadGameOver } from "./loadGameOver.js"

export function generateTimer(time, container, playerObject, scoreBoardElementsArray){
    
    let timerDiv = document.createElement("div")
    timerDiv.id = "timerDiv"
    timerDiv.time = time
    timerDiv.textContent = (`TIME: ${time}`)
    timerDiv.classList = "centerFitContent"
    timerDiv.style = `
    top: 0%;
    `

    container.append(timerDiv)


    // console.log(playerObject)


    let timerInterval = setInterval(() => {
        console.log(timerDiv.time)
        timerDiv.time--
        timerDiv.textContent = (`TIME: ${timerDiv.time}`)
        if(timerDiv.time <= 0){loadGameOver(container, playerObject, scoreBoardElementsArray); clearInterval(timerInterval)}
    }, 1000);
}