import { loadMap } from "./loadMap.js";
import { generateCharacter } from "./generateCharacter.js";
import maps from '../data/maps.json' assert { type: 'json' };

let swipeIn = [

    {left: "-10%", easing: "ease-out"},
    {left: "50%", easing: "ease-in"}

]

let fadeIn = [

    {opacity: 0},
    {opacity: 1}

]

export async function loadMapSelector(gameContainer){
    let selectorIndex = 4
    let mapArray =  []
    for (let map in maps){
        mapArray.push({mapName:map, map:maps[map]["map"], spawns:maps[map]["spawns"]})
    }

    

    let mapAmount = mapArray.length
    console.log(mapArray)
    

    //selector container
    let selectorContainer = document.createElement("div")
    selectorContainer.style = `
        outline: black solid 1px;
        position: absolute;
        overflow:hidden;
        width: 100%;
        height: 80%;
        opacity: 0;
    `
    gameContainer.append(selectorContainer)
    
    //map name preview
    let mapNameDiv = document.createElement("div")
    mapNameDiv.textContent = mapArray[selectorIndex].mapName
    mapNameDiv.classList = "centerFitContent"
    mapNameDiv.style = `
        outline: black solid 1px;
        position: absolute;
        overflow:hidden;
        width: fit-content;
        height: fit-content;
        top: 80%;
        opacity: 0;
    `
    gameContainer.append(mapNameDiv)
    mapNameDiv.style.opacity = 1
    mapNameDiv.animate(fadeIn, 200)


    //selector buttons
    let selectLeftButton = document.createElement("div")
    let selectRightButton = document.createElement("div")


    //load map based on selection and load other elements
    let mapProperties = loadMap(mapArray[selectorIndex], selectorContainer)
    selectorContainer.style.opacity = 1
    selectorContainer.animate(fadeIn, 200)
    mapProperties.mapAreaElement.animate(swipeIn, 500)


    let characterSize = [50,50]
    generateCharacter("green", characterSize, mapProperties.spawns.player1, false, mapProperties.fullControlSize)
    generateCharacter("red", characterSize, mapProperties.spawns.player2,  false,mapProperties.fullControlSize)
    generateCharacter("blue", characterSize, mapProperties.spawns.player3, false,mapProperties.fullControlSize)
    generateCharacter("lightblue", characterSize, mapProperties.spawns.player4,false,mapProperties.fullControlSize)

    //mapProperties return
        // mapSize:[map[0].length,map.length],
        // fullControlSize:fullControlSize,
        // spawns:fullMap.spawns,
        // mapAreaElement: mapArea
    //loadMap(maps.map0, gameContainer)
   
}