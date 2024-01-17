import { checkMinimumWindowSize } from "./checkWindowSize.js";

window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()

export function loadSplash(gameContainer) {
    let splashArea = document.createElement('div')
    splashArea.id = "splashArea"
    splashArea.style = `
    left: 50%;
    top: 50%;
    translate: -50% -50%;
    outline: black solid 1px;
    width: fit-content;
    height: fit-content;
    `

    gameContainer.append(splashArea)
}

//loadSplash(document.getElementById("gameContainer"))