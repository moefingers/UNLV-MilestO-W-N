//define block size for everything
let fullControlSize = 750/8
let controlOffset = 2
let fullEdgeSize = {"length":fullControlSize-( controlOffset *2), "girth":10}



let controlBlockStyleGeneric = `background:gray;opacity:0.3;`
// making some classes for types of players
let halfEdgeStartStyleGeneric = `width:${fullEdgeSize.length/2}px;height:${fullEdgeSize.girth}px;background:`
let halfEdgeEndStyleGeneric = `width:${fullEdgeSize.length/2}px;height:${fullEdgeSize.girth}px;background:`


let halfEdgeStartStyleGreen = `${halfEdgeStartStyleGeneric}green;`
let halfEdgeEndStyleGreen = `${halfEdgeEndStyleGeneric}green;`

let halfEdgeStartStyleRed = `${halfEdgeStartStyleGeneric}red;`
let halfEdgeEndStyleRed = `${halfEdgeEndStyleGeneric}red;`

let halfEdgeStartStyleGray = `${halfEdgeStartStyleGeneric}gray;`
let halfEdgeEndStyleGray = `${halfEdgeEndStyleGeneric}gray;`


// map
let map1 = [
  [0, 1, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 1],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0], //using numbers instead of bool for writability
];
let map2 = [
    [1, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 1, 0, 1, 0, 1, 1],
    [0, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 0],
  ];

  let map3 = [
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
    [1, 1, 1, 0, 1, 0, 1, 0, 1, 1],
  ];

//load map
function loadMap(map){ //accept map as parameter when invoking
    for(let selectedRow = 0; selectedRow < map.length; selectedRow++){ //initialize row number as 0, select rows while less than map.length, etc.
        let currentRowArray = (map[selectedRow]) //select row from map (for readability)
        for(let selectedBlock = 0; selectedBlock < currentRowArray.length; selectedBlock++){// intialize block number as 0, select blocks while less than map.length, etc.
            let controlProperties = {
              active: currentRowArray[selectedBlock],
              pseudoCoordinates: [selectedBlock + 1,selectedRow + 1]
            };
            //console.log(controlProperties.pseudoCoordinates)

            let rightControlProperties = {
                active: "", // this block will not exist since it is after everything
                pseudoCoordinates: [selectedBlock + 2,selectedRow + 1]
            };
            if(selectedBlock + 1 >= currentRowArray.length ){rightControlProperties.active = 0}
            else if (selectedBlock < currentRowArray.length) {rightControlProperties.active = currentRowArray[selectedBlock + 1]}
            //console.log(`${rightControlProperties.pseudoCoordinates} active: ${rightControlProperties.active}`)

            let belowControlProperties = {
            active: "", //this row will not exist since it is after everything
            pseudoCoordinates: [selectedBlock + 1,selectedRow + 2]
            };
            if(selectedRow + 1 >= map.length ){belowControlProperties.active = 0}
            else if (selectedRow < map.length) {belowControlProperties.active = map[selectedRow + 1][selectedBlock]}
            //console.log(`${belowControlProperties.pseudoCoordinates} active: ${belowControlProperties.active}`)

            if (controlProperties.active == true){ // this value will actually be 1, but using boolean for readability
                //console.log(`${controlProperties.pseudoCoordinates} active`)
                let locationX = selectedBlock * fullControlSize
                let locationY = selectedRow * fullControlSize
                // MAKE BLOCK
                let control = document.createElement("div")
                control.id = `control-x${controlProperties.pseudoCoordinates[0]}-y${controlProperties.pseudoCoordinates[1]}`
                control.className = "controlBlock"
                control.style = controlBlockStyleGeneric
                control.style.width = `${fullControlSize}px`
                control.style.height = `${fullControlSize}px`
                control.style.position ="absolute"
                control.style.transformOrigin = "0px 0px"
                control.style.translate = `${locationX}px ${locationY}px`
                document.getElementById("mapArea").append(control)

                // MAKE HORIZONTAL EDGES (with dynamically named IDs )
                function horizontalEdge(controlCoordinates, locY){
                    let controlHorizontalStart = document.createElement("div")
                    controlHorizontalStart.id = `controlHorizontalStart-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlHorizontalStart.className = "halfEdgeStart"
                    controlHorizontalStart.style = halfEdgeStartStyleGray

                    let controlHorizontalEnd = document.createElement("div")
                    controlHorizontalEnd.id = `controlHorizontalEnd-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlHorizontalEnd.className = "halfEdgeEnd"
                    controlHorizontalEnd.style = halfEdgeEndStyleGray

                    let controlHorizontal = document.createElement("div")
                    controlHorizontal.id = `controlHorizontal-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlHorizontal.className = "halfEdgeContainer"
                    controlHorizontal.style.width = `${fullEdgeSize.length}px`
                    controlHorizontal.style.position ="absolute"
                    controlHorizontal.style.transformOrigin = "0px 0px"
                    controlHorizontal.style.translate = `${locationX + controlOffset}px ${locY -(fullEdgeSize.girth /2)}px`

                    controlHorizontal.append(controlHorizontalStart)
                    controlHorizontal.append(controlHorizontalEnd)

                    document.getElementById("mapArea").append(controlHorizontal)
                }
                // MAKE VERTICAL EDGES (with dynamically named IDs )
                function verticalEdge(controlCoordinates, locX){
                    let controlVerticalStart = document.createElement("div")
                    controlVerticalStart.id = `controlVerticalStart-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlVerticalStart.className = "halfEdgeStart"
                    controlVerticalStart.style = halfEdgeStartStyleGray

                    let controlVerticalEnd = document.createElement("div")
                    controlVerticalEnd.id = `controlVerticalEnd-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlVerticalEnd.className = "halfEdgeEnd"
                    controlVerticalEnd.style = halfEdgeEndStyleGray

                    let controlVertical = document.createElement("div")
                    controlVertical.id = `controlVertical-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlVertical.className = "halfEdgeContainer"
                    controlVertical.style.width = `${fullEdgeSize.length}px`
                    controlVertical.style.position ="absolute"
                    controlVertical.style.transformOrigin = "0px 0px"
                    controlVertical.style.rotate = "90deg"
                    controlVertical.style.translate = `${locX +(fullEdgeSize.girth /2)}px ${locationY +controlOffset}px`

                    controlVertical.append(controlVerticalStart)
                    controlVertical.append(controlVerticalEnd)

                    document.getElementById("mapArea").append(controlVertical)
                }
                verticalEdge(controlProperties.pseudoCoordinates, locationX)
                if(rightControlProperties.active == false){
                    verticalEdge(rightControlProperties.pseudoCoordinates, (locationX + fullControlSize))
                }
                horizontalEdge(controlProperties.pseudoCoordinates, locationY)
                if(belowControlProperties.active == false){
                    horizontalEdge(belowControlProperties.pseudoCoordinates, (locationY + fullControlSize))
                }
               
            } else if (controlProperties.active == false){
                //console.log(`${controlProperties.pseudoCoordinates} not active`)
            }
        }
    }
}

let windowIsBigEnough = true
function checkMinimumWindowSize(){
    const widthValue = 1000
    const heightValue = 750
    if(window.innerHeight < heightValue || window.innerWidth < widthValue) {
        console.log(`Hiding page... Window too small as ${window.innerHeight} and ${window.innerWidth}`)
        windowIsBigEnough = false
        document.getElementById("mapArea").style = "opacity: 0"
        let widthOrHeightProblem = ""
        if(window.innerHeight < heightValue && window.innerWidth < widthValue){widthOrHeightProblem = "wider and taller"}
        else if (window.innerHeight < heightValue) {widthOrHeightProblem = "taller"}
        else if (window.innerWidth < widthValue) {widthOrHeightProblem = "wider"}
        document.getElementById("windowSizeWarning").textContent = (`Please make me ${widthOrHeightProblem} to play the game. - Sincerely, the window.`)
    } else if (window.innerHeight >= heightValue && window.innerWidth >= widthValue && windowIsBigEnough === false){
        console.log(`Page has become large enough as ${window.innerHeight} and ${window.innerWidth}`)
        document.getElementById("windowSizeWarning").textContent = ""
        windowIsBigEnough = true
        document.getElementById("mapArea").style = "opacity: 1"
    } else if (window.innerHeight >= heightValue && window.innerWidth >= widthValue && windowIsBigEnough === true){
        console.log(`Page still large enough as ${window.innerHeight} and ${window.innerWidth}`)
        document.getElementById("windowSizeWarning").textContent = ""
    }
}

window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()
// UNCOMMENT THESE ^

loadMap(map3)