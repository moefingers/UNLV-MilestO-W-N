import { checkMinimumWindowSize } from "./checkWindowSize.js";
import { loadMap } from "./loadMap.js";
import maps from '../data/maps.json' assert { type: 'json' };

window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()

let fadeInOut = [

    {offset: 0, left: "-10%", opacity: 0, easing: "ease-out"},
    {offset: 0.8, left: "50%", opacity: 1},
    {offset: 0.9, left: "50%", opacity: 1},
    {offset: 1, left: "60%", opacity: 0}
]

let swipeIn = [

    {left: "-10%", easing: "ease-out"},
    {left: "50%", easing: "ease-in"}

]

let fadeIn = [

    {opacity: 0},
    {opacity: 1}

]

let fadeOut = [

    {opacity: 1},
    {opacity: 0}

]

let floatUp = [

    {top: "40%", easing: "ease-out"},
    {top: "30%", easing: "ease-in"}

]




export function loadSplash(gameContainer) {

    let skip = 1
    let timeoutArray = []


    function loadSkipButton(container){
        let skipButton = document.createElement('div')
        skipButton.id = "skipButton"
        skipButton.classList = "centerFitContent"
        skipButton.textContent = "skip"
        skipButton.style.top = "80%"
        skipButton.style.color = "lightgray"
        skipButton.addEventListener("click",()=>{
            timeoutArray.forEach(timeout => {clearTimeout(timeout)})
            skip = 0
            container.innerHTML = ""
            let title = loadTitle(gameContainer)
            title.style.top = "30%"
            loadInstructionsButton(gameContainer)
            loadPlayGameButton(gameContainer)
        }, false)

        container.append(skipButton)
        return skipButton
    }

    function loadPreCred(container){
        let preCred = document.createElement('h1')
        preCred.id = "preCred"
        preCred.classList = "centerFitContent"
        preCred.textContent = "MZ"
        
        container.append(preCred)

        return preCred
    }
    
    function loadTitle(container){
        let title = document.createElement(`h1`)
        title.id = "title"
        title.classList = "centerFitContent"
        title.innerHTML = `Milest<span id="headerPart">OWN</span>`

        container.append(title)
        return title
    }

    function loadPlayGameButton(container){
        let playGameButton = document.createElement("div")
        playGameButton.id = "playGameButton"
        playGameButton.classList = "centerFitContent button"
        playGameButton.textContent = "BEGIN"
        playGameButton.style.top = "40%"


        playGameButton.addEventListener("click", ()=>{loadMap(maps.map1)}, false)
        container.append(playGameButton)

        return playGameButton
    }

    function loadInstructionsButton(container){
        let instructionsButton = document.createElement("div")
        instructionsButton.id = "instructionsButton"
        instructionsButton.classList = "centerFitContent button"
        instructionsButton.textContent = "INSTRUCTIONS"
        instructionsButton.style.top = "36%"


        instructionsButton.addEventListener("click", ()=>{loadInstructions(container)}, false)
        container.append(instructionsButton)

        return instructionsButton
    }


    function loadInstructions(dead){
        console.log(dead)
    }
    
    let skipButton = loadSkipButton(gameContainer)

    let preCred = loadPreCred(gameContainer)
    preCred.animate(fadeInOut, 3000)
    preCred.style.opacity = 0

    let title

    let titleBegin = setTimeout(() => {
        title = loadTitle(gameContainer)
        title.animate(swipeIn, 2000)
        title.animate(fadeIn, 2000)
        let titleRise = setTimeout(() => {
            title.animate(floatUp, 2000)
            title.style.top = "30%"
            let instructionsButtonTimeOut = setTimeout(() => {
                loadInstructionsButton(gameContainer).animate(fadeIn, 1000)
            }, 700 );
            let playButtonTimeout = setTimeout(() => {
                loadPlayGameButton(gameContainer).animate(fadeIn, 1000)
            }, 200 );
            let removeSkipTimeOut = setTimeout(() => {
                skipButton.remove()
            }, 1500);
            timeoutArray.push(instructionsButtonTimeOut, playButtonTimeout, removeSkipTimeOut)
        }, 2300 );
        timeoutArray.push(titleRise)
    }, 3200 );

    timeoutArray.push(titleBegin)

}




// <h1 id="header" class="fadeInOut">MZ</h1>
// <h1 id="header" class="swipeIn">Milest<span id="headerPart">OWN</span></h1>