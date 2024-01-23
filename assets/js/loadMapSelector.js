import { loadMap } from "./loadMap.js";
import { generateCharacter } from "./generateCharacter.js";
import { generateScoreBoards } from "./generateScoreBoards.js";
import { generateTimer } from "./generateTimer.js";
import maps from '../data/maps.json' assert { type: 'json' };

let swipeIn = [

    {left: "-10%", easing: "ease-out"},
    {left: "50%", easing: "ease-in"}

]
let swipeLeft = [

    {left: "110%", easing: "ease-out"},
    {left: "50%", easing: "ease-in"}

]

let fadeIn = [

    {opacity: 0},
    {opacity: 1}

]

export async function loadMapSelector(gameContainer){
    let characterKeysArray = {
        player1:["w","a","s","d"],
        player2:["ArrowUp","ArrowLeft","ArrowDown","ArrowRight"],
        player3:["8","4","5","6"],
        player4:["i","j","k","l"]
    }
    let characterSize = [50,50]
    let selectorIndex = 0
    let characterCount = 1
    let mapProperties
    let characterColorArray = {1:"green",2:"red",3:"blue",4:"lightblue"}
    let colorArray = ["red","orange","yellow","green","blue","indigo","violet"]
    let scoreBoardElementsArray = []
    let mapArray =  []
    for (let map in maps){
        mapArray.push({
            mapName:map,
             map:maps[map]["map"],
              spawns:maps[map]["spawns"]})
    }

    

    //selector container
    let selectorContainer = document.createElement("div")
    selectorContainer.id = "selectorContainer"
    selectorContainer.style = `
        position: absolute;
        overflow:hidden;
        width: 100%;
        height: 80%;
        opacity: 1;
        background: lightgray;
        border-radius: 5%;
    `

 
    gameContainer.append(selectorContainer)


    //map name preview
    let mapNameDiv = document.createElement("div")
    mapNameDiv.style = `
        overflow:hidden;
        width: fit-content;
        height: fit-content;
    `
    mapNameDiv.style.opacity = 1
    mapNameDiv.animate(fadeIn, 200)

    //selector buttons
    let buttonSelectorContainer = document.createElement("div")
    buttonSelectorContainer.id = "buttonSelectorContainer"
    buttonSelectorContainer.style = `
    position: absolute;
    width: 30%;
    height: 5%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    left: 50%;
    top: 80%;
    translate: -50% 10%;
    `

    function changeMapSelector(direction, characterCount, container){
        selectorIndex += direction
         //load map based on selection and load other elements
        container.innerHTML = ""
        mapProperties = loadMap(mapArray[selectorIndex], container)
        let animationDirection
        if(direction == 1){animationDirection = swipeIn} else if(direction == -1){animationDirection = swipeLeft} else if(direction == 0){animationDirection = fadeIn}
        mapProperties.mapAreaElement.animate(animationDirection, 500)
        mapNameDiv.textContent = mapArray[selectorIndex].mapName.toUpperCase()

        buttonSelectorContainer.innerHTML = ""
        if(selectorIndex > 0){
            let selectLeftButton = document.createElement("div")
            selectLeftButton.id = "selectLeftButton"
            selectLeftButton.className = "leftArrow"
            selectLeftButton.style = `width: 30%; height: 100%; background:black`
            selectLeftButton.addEventListener("click", ()=>{if(selectorIndex > 0){changeMapSelector(-1, characterCount, selectorContainer)}},false)
            buttonSelectorContainer.append(selectLeftButton)
        } else if (selectorIndex <= 0){let placeHolder = document.createElement("div"); placeHolder.style = "width: 30%"; buttonSelectorContainer.append(placeHolder)}
        buttonSelectorContainer.append(mapNameDiv)
        if(selectorIndex < mapArray.length - 1) {
            let selectRightButton = document.createElement("div")
            selectRightButton.id = "selectRightButton"
            selectRightButton.className = "rightArrow"
            selectRightButton.style = `width: 30%; height: 100%; background:black`
            selectRightButton.addEventListener("click", ()=>{if(selectorIndex < mapArray.length -1){changeMapSelector(1, characterCount, selectorContainer)}},false)
            buttonSelectorContainer.append(selectRightButton)
        } else if (selectorIndex >= mapArray.length -1){let placeHolder = document.createElement("div"); placeHolder.style = "width: 30%"; buttonSelectorContainer.append(placeHolder)}
        gameContainer.append(buttonSelectorContainer)
        buttonSelectorContainer.animate(fadeIn, 500)

        loadCharactersOnMap(mapProperties)
    }

    function loadCharactersOnMap(mapProperties){
        for(let count = 1; count <= characterCount; count++){
            generateCharacter(characterColorArray[count], characterSize, mapProperties.spawns["player" + count], false, mapProperties.fullControlSize, mapProperties.mapAreaElement, `previewChar${count}`)
            
        }   

    }

    function loadCharacterSelectors(direction, container) {
        characterCount += direction
        let oldBlobList = undefined
        oldBlobList = document.querySelectorAll("#mapArea > .polygonDeformedOctagon")
        console.log(oldBlobList)

        oldBlobList.forEach(blob => blob.remove())

        container.innerHTML = ""
        if(characterCount > 1){
            let minusCharacterCountButton = document.createElement("div")
            minusCharacterCountButton.id = "minusCharacterCountButton"
            minusCharacterCountButton.classList = "minusSymbol"
            minusCharacterCountButton.style = `width: 20%; height: 100%; background:black`
            minusCharacterCountButton.addEventListener("click", ()=>{loadCharacterSelectors(-1, container)})
        
            container.append(minusCharacterCountButton)
        }
        
        for(let count = 1; count <= characterCount; count++){
            loadCharactersOnMap(mapProperties)
            let characterSelector = document.createElement("div")
            characterSelector.style = `
            width: 20%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            `
            let changeCharacterUp = document.createElement("div")
            changeCharacterUp.id = `changeCharacterUp${count}`
            changeCharacterUp.className = "upChevron"
            changeCharacterUp.style = `width: 30%; height: 20%; background:black; margin:auto;`
            changeCharacterUp.addEventListener("click", ()=>{}, false)

            let characterBlob = document.createElement("div")
            characterBlob.id = `characterBlob${count}`
            characterBlob.className = `polygonDeformedOctagon`
            characterBlob.style = `width: ${characterSize[0]}px; height: ${characterSize[1]}px; background:${characterColorArray[count]}; margin:auto;`

            let changeCharacterDown = document.createElement("div")
            changeCharacterUp.id = `changeCharacterDown${count}`
            changeCharacterDown.className = `downChevron`
            changeCharacterDown.style = `width: 30%; height: 20%; background:black; margin:auto;`

            characterSelector.append(changeCharacterUp,characterBlob,changeCharacterDown)
            container.append(characterSelector)
        }
        if(characterCount < 4){
            let plusCharacterCountButton = document.createElement("div")
            plusCharacterCountButton.id = "plusCharacterCountButton"
            plusCharacterCountButton.classList = "plusSymbol"
            plusCharacterCountButton.style = `width: 20%; height: 100%; background:black;`
            plusCharacterCountButton.addEventListener("click", ()=>{loadCharacterSelectors(1, container)})
        
            container.append(plusCharacterCountButton)
        }
    }



    
    let characterCountSelectorContainer = document.createElement("div")
    characterCountSelectorContainer.id = "characterCountSelectorContainer"
    characterCountSelectorContainer.style = `
    position: absolute;
    width: 80%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    left: 50%;
    top: 85%;
    translate: -50% 10%;
    `


    gameContainer.append(characterCountSelectorContainer)
    characterCountSelectorContainer.animate(fadeIn, 500)
    

    changeMapSelector(0, characterCount, selectorContainer)
    loadCharacterSelectors(0, characterCountSelectorContainer)
    
    let clicked = false

    let playGameButton = document.createElement("div")
    playGameButton.id = "playGameButton"
    playGameButton.textContent = "READY"
    playGameButton.classList = "button"
    playGameButton.style = `
    position: absolute;
    width: fit-content;
    height: fit-content;
    left: 50%;
    top: 97%;
    translate: -50% 0;
    `
    console.log(maps[mapArray[selectorIndex].mapName])
    console.log(gameContainer)
    playGameButton.addEventListener("click",()=>{ 
        if(!clicked){clicked = true
          gameContainer.innerHTML = "";
          let innerGameContainer = document.createElement("div");
          innerGameContainer.id = "innerGameContainer"
          innerGameContainer.style = "width: 100%; height: 100%"
          gameContainer.append(innerGameContainer)
          innerGameContainer.animate(fadeIn, 500)
          let mapProperties = loadMap(maps[mapArray[selectorIndex].mapName], innerGameContainer)//loadmap
          let playerObject = {}
          for(let count = 1; count <= characterCount; count++){
            generateCharacter(characterColorArray[count], characterSize, mapProperties.spawns["player" + count], characterKeysArray["player" + count], mapProperties.fullControlSize, mapProperties.mapAreaElement, count)
            
            scoreBoardElementsArray.push(generateScoreBoards(count, characterColorArray[count], gameContainer));
            playerObject[count] = characterColorArray[count]
          }
          generateTimer(80,innerGameContainer,playerObject, scoreBoardElementsArray)
        }      
        }, false)

    gameContainer.append(playGameButton)


    //mapProperties return
        // mapSize:[map[0].length,map.length],
        // fullControlSize:fullControlSize,
        // spawns:fullMap.spawns,
        // mapAreaElement: mapArea
    //loadMap(maps.map0, gameContainer)
   
}