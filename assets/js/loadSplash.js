import { checkMinimumWindowSize } from "./checkWindowSize.js";
import { loadMap } from "./loadMap.js";
import maps from '../data/maps.json' assert { type: 'json' };

window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()

export function loadSplash(gameContainer) {

    async function loadPreCred(container){
        let preCred = document.createElement('h1')
        preCred.id = "preCred"
        preCred.classList = "centerFitContent"
        preCred.textContent = "MZ"
        preCred.style = `
        animation-name: fadeInOut;
        animation-duration: 2s;
        opacity: 0
        `
        
        container.append(preCred)

        return preCred
    }
    
    function loadTitle(container){
        let title = document.createElement(`h1`)
        title.id = "title"
        title.classList = "centerFitContent"
        title.innerHTML = `Milest<span id="headerPart">OWN</span>`
        title.style.animation = "swipeIn 2s, fadeIn 2s"
        //  `
        // animation: swipeIn 2s,
        //            fadeIn 2s;
        // `
        container.append(title)
        return title
    }

    function loadPlayGameButton(container){
        let playGameButton = document.createElement("div")
        playGameButton.id = "playGameButton"
        playGameButton.classList = "centerFitContent button"
        playGameButton.textContent = "BEGIN"
        playGameButton.style.animation = "fadeIn 2s"
        playGameButton.style.top = "40%"


        playGameButton.addEventListener("click", ()=>{loadMap(maps.map5)}, false)
        container.append(playGameButton)

        return playGameButton
    }

    function loadInstructionsButton(container){
        let instructionsButton = document.createElement("div")
        instructionsButton.id = "instructionsButton"
        instructionsButton.classList = "centerFitContent button"
        instructionsButton.textContent = "INSTRUCTIONS"
        instructionsButton.style.animation = "fadeIn 2s"
        instructionsButton.style.top = "36%"


        instructionsButton.addEventListener("click", ()=>{loadInstructions(container)}, false)
        container.append(instructionsButton)

        return instructionsButton
    }


    function loadInstructions(dead){
        console.log(dead)
    }
    let preCred = loadPreCred(gameContainer)

    let title
    setTimeout(() => {
        title = loadTitle(gameContainer)
        setTimeout(() => {
            title.style.animation = "floatUp 2s"
            title.style.top = "30%"
            setTimeout(() => {
                loadInstructionsButton(gameContainer)
            }, 500);
            setTimeout(() => {
                loadPlayGameButton(gameContainer)
            }, 300);
        }, 2000);
    }, 3000);


}




// <h1 id="header" class="fadeInOut">MZ</h1>
// <h1 id="header" class="swipeIn">Milest<span id="headerPart">OWN</span></h1>