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
Param 2,3 (integer) will become pixels exactly
Param 4,5 (integer * controlSize) will be how many whole blocks across and down
*/
async function generateCharacter(teamColor, width, height, left, top) {
    let characterBlob = document.createElement("div")
    characterBlob.style = (`
    background:${teamColor};
    width:${width}px;
    height:${height}px;
    left:${left * mapProperties.fullControlSize}px;
    top:${top * mapProperties.fullControlSize}px;
    translate: -50% -50%
    `)
    characterBlob.className = "polygonDeformedOctagon"
    document.getElementById("mapArea").append(characterBlob)
}



//check window min. window size
window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()


let mapProperties = loadMap(maps.map2) //collecting return from loading of map
console.log(mapProperties)
generateCharacter("green", 30, 30, 0, 0)
