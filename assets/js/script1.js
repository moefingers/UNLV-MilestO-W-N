import maps from '../data/maps.json' assert { type: 'json' };
import settings from '../data/settings.json' assert { type: 'json' };
import { loadMap } from './loadMap.js';
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


//check window size
let windowIsBigEnough = true
function checkMinimumWindowSize(){
    if(window.innerHeight < heightValue || window.innerWidth < widthValue) {
        console.log(`Hiding page... Window too small as ${window.innerHeight} and ${window.innerWidth}`)
        windowIsBigEnough = false
        document.getElementById("game").style = "opacity: 0"
        let widthOrHeightProblem = ""
        if(window.innerHeight < heightValue && window.innerWidth < widthValue){widthOrHeightProblem = "wider and taller"}
        else if (window.innerHeight < heightValue) {widthOrHeightProblem = "taller"}
        else if (window.innerWidth < widthValue) {widthOrHeightProblem = "wider"}
        document.getElementById("windowSizeWarning").textContent = (`Please make me ${widthOrHeightProblem} to play the game. - Sincerely, the window.`)
    } else if (window.innerHeight >= heightValue && window.innerWidth >= widthValue && windowIsBigEnough === false){
        console.log(`Page has become large enough as ${window.innerHeight} and ${window.innerWidth}`)
        document.getElementById("windowSizeWarning").textContent = ""
        windowIsBigEnough = true
        document.getElementById("game").style = "opacity: 1"
    } else if (window.innerHeight >= heightValue && window.innerWidth >= widthValue && windowIsBigEnough === true){
        console.log(`Page still large enough as ${window.innerHeight} and ${window.innerWidth}`)
        document.getElementById("windowSizeWarning").textContent = ""

    }
}

window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()
// UNCOMMENT THESE ^



let mapProperties = loadMap(maps.map2) //collecting return from loading of map
console.log(mapProperties)
generateCharacter("green", 30, 30, 0, 0)
