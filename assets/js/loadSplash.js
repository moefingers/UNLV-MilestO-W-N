import { checkMinimumWindowSize } from "./checkWindowSize.js";
import { loadMapSelector } from "./loadMapSelector.js";

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
    gameContainer.innerHTML = ""
    let clicked = false
    let timeoutArray = []
    let splashElementArray = []


    function loadSkipButton(container){
        let skipButton = document.createElement('div')
        skipButton.id = "skipButton"
        skipButton.classList = "centerFitContent"
        skipButton.textContent = "skip"
        skipButton.style.top = "80%"
        skipButton.style.color = "lightgray"
        skipButton.addEventListener("click",()=>{
            skipAnimationFunction(container)
        }, false)

        container.append(skipButton)
        return skipButton
    }

    function skipAnimationFunction(container){
        timeoutArray.forEach(timeout => {clearTimeout(timeout)})
        container.innerHTML = ""
        let title = loadTitle(container)
        title.style.top = "30%"
        loadInstructionsButton(container)
        loadPlayGameButton(container)
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
        splashElementArray.push(title)
        return title
    }

    function loadPlayGameButton(container){
        let playGameButton = document.createElement("div")
        playGameButton.id = "playGameButton"
        playGameButton.classList = "centerFitContent button"
        playGameButton.textContent = "BEGIN"
        playGameButton.style.top = "40%"


        playGameButton.addEventListener("click", ()=>{
            if(!clicked){ clicked = true;
                splashElementArray.forEach(element => {
                    element.animate(fadeOut, 200)
                    setTimeout(() => {
                        element.remove()
                    }, 200);
                })
                setTimeout(() => {
                    loadMapSelector(container)
                }, 200);
            }
        }, false)
        container.append(playGameButton)
        splashElementArray.push(playGameButton)

        return playGameButton
    }

    function loadInstructionsButton(container){
        let instructionsButton = document.createElement("div")
        instructionsButton.id = "instructionsButton"
        instructionsButton.classList = "centerFitContent button"
        instructionsButton.textContent = "INSTRUCTIONS"
        instructionsButton.style.top = "36%"


        instructionsButton.addEventListener("click", ()=>{
            if(!clicked){ clicked = true;
            splashElementArray.forEach(element => {
                element.animate(fadeOut, 200)
                setTimeout(() => {
                    element.remove()
                }, 200);
            })
            setTimeout(() => {
                loadInstructions(container)
                clicked = false
            }, 200);
        }}, false)
        container.append(instructionsButton)
        splashElementArray.push(instructionsButton)

        return instructionsButton
    }


    function loadInstructions(container){
        let instructionsDiv = document.createElement("div")
        instructionsDiv.id = "instructionsDiv"
        instructionsDiv.className = "centerFitContent"
        instructionsDiv.innerHTML = `
        Movement
        <br>Use the following keys based on the player to move your character:
        <br>Player 1: WASD keys.
        <br>Player 2: Arrow keys.
        <br>Player 3: 8, 4, 5, 6 keys.
        <br>Player 4: IJKL keys.

        <br>How to Play
        <br>Move your character to color the path and surround each block, capturing it as your territory once all four sides are in your color.

        <br>Goal
        <br>The player with the most captured territories after time runs out wins.


        `
        instructionsDiv.style = `
        
        `

        container.append(instructionsDiv)
        clicked = false
        instructionsDiv.animate(fadeIn, 400)

        let backButton = document.createElement("div")
        backButton.id = "backButton"
        backButton.classList = "centerFitContent button"
        backButton.textContent = "BACK"
        backButton.style = "top: 80%"
        backButton.addEventListener("click",()=>{
            if(clicked == false){clicked = true
                instructionsDiv.animate(fadeOut,400)
                backButton.animate(fadeOut,400)
                setTimeout(() => {
                    skipAnimationFunction(gameContainer)
                    gameContainer.animate(fadeIn, 400)
                    clicked = false
                }, 400);
            }
        },false)
        container.append(backButton)
        backButton.animate(fadeIn, 900)
    }
    
    let skipButton = loadSkipButton(gameContainer)
    skipButton.animate(fadeIn, 400)

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
                skipButton.style.opacity = 0
                skipButton.animate(fadeOut, 1000)
                setTimeout(() => {
                    skipButton.remove()
                }, 1000);
            }, 200);
            timeoutArray.push(instructionsButtonTimeOut, playButtonTimeout, removeSkipTimeOut)
        }, 2300 );
        timeoutArray.push(titleRise)
    }, 3200 );

    timeoutArray.push(titleBegin)

}




// <h1 id="header" class="fadeInOut">MZ</h1>
// <h1 id="header" class="swipeIn">Milest<span id="headerPart">OWN</span></h1>