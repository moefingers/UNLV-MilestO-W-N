import maps from '../data/maps.json' assert { type: 'json' };
//import settings from '../data/settings.json' assert { type: 'json' };
import { loadMap } from './loadMap.js';
import { checkMinimumWindowSize } from "./checkWindowSize.js";
import { generateCharacter } from "./generateCharacter.js";


//let heightValue = settings.windowSize.heightValue
//let widthValue = settings.windowSize.widthValue
// the above are not yet needed


//check window min. window size
window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()

//Loading the map from json in below line and collecting return
let mapProperties = loadMap(maps.map5)
//console.log(mapProperties)
generateCharacter("green", [30,30], mapProperties.spawns.player1, ["w","a","s","d"], mapProperties.fullControlSize)
generateCharacter("red", [30,30], mapProperties.spawns.player2,  ["ArrowUp","ArrowLeft","ArrowDown","ArrowRight"],mapProperties.fullControlSize)
//generateCharacter("blue", [30,30], mapProperties.spawns.player3,  ["8","4","5","6"],mapProperties.fullControlSize)
//generateCharacter("lightblue", [30,30], mapProperties.spawns.player4,  ["i","j","k","l"],mapProperties.fullControlSize)

