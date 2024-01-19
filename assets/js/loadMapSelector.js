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
    let selectorIndex = 0
    let mapArray =  []
    for (let map in maps){
        mapArray.push(maps[map])
    }
    console.log(mapArray)
    console.log(mapArray[0])

    let selectorContainer = document.createElement("div")
    selectorContainer.style = `
        outline: black solid 1px;
        position: absolute;
        width: 100%;
        height: 80%;
        opacity: 0
    `
    gameContainer.append(selectorContainer)



    let mapProperties = loadMap(mapArray[1], selectorContainer)
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