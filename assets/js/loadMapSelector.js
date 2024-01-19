import { loadMap } from "./loadMap.js";
import { generateCharacter } from "./generateCharacter.js";
import maps from '../data/maps.json' assert { type: 'json' };

let swipeIn = [

    {left: "-10%", easing: "ease-out"},
    {left: "50%", easing: "ease-in"}

]

export async function loadMapSelector(gameContainer){
    let selectorIndex = 0
    let mapArray =  []
    for (let map in maps){
        mapArray.push(map)
    }
    console.log(mapArray)

    let selectorContainer = document.createElement("div")
    selectorContainer.style = `
        outline: black solid 1px;
        position: absolute;
        width: 100%;
        height: 80%;
    `
    gameContainer.append(selectorContainer)
    let mapProperties = loadMap(maps.map0, selectorContainer)

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