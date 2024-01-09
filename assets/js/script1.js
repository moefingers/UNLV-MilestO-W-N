import maps from '../data/maps.json' assert { type: 'json' };
import settings from '../data/settings.json' assert { type: 'json' };
import { loadMap } from './loadMap.js';
import { checkMinimumWindowSize } from "./checkWindowSize.js";
console.log(maps);
console.log(settings)
let heightValue = settings.windowSize.heightValue
let widthValue = settings.windowSize.widthValue



// maps


/*generate a character..
Param 1 string 
Param 2 (array) integers will become pixels exactly  [0] == width  && [1] == height
Param 3 (array) integers will denote how many whole blocks across and down [0] == across  && [1] == down
*/
async function generateCharacter(teamColor, sizeArray, locArray) {
    let characterBlob = document.createElement("div")
    characterBlob.style = (`
    background:${teamColor};
    width:${sizeArray[0]}px;
    height:${sizeArray[1]}px;
    left:${locArray[0] * mapProperties.fullControlSize}px;
    top:${locArray[1] * mapProperties.fullControlSize}px;
    translate: -50% -50%
    `)
    characterBlob.className = "polygonDeformedOctagon"
    document.getElementById("mapArea").append(characterBlob)
}



//check window min. window size
window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()


let mapProperties = loadMap(maps.map5) //collecting return from loading of map
console.log(mapProperties)
generateCharacter("green", [30,30], mapProperties.spawns.player1)
generateCharacter("red", [30,30], mapProperties.spawns.player2)
generateCharacter("blue", [30,30], mapProperties.spawns.player3)
generateCharacter("lightblue", [30,30], mapProperties.spawns.player4)

