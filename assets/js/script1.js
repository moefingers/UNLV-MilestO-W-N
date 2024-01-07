//define block size for everything
let fullEdgeSize = {"length":96, "girth":10}
let fullControlSize = 100

// making some classes for types of players
let halfEdgeStartStyleGreen = `width:${fullEdgeSize.length/2}px;height:${fullEdgeSize.girth}px;background:green;`
let halfEdgeEndStyleGreen = `width:${fullEdgeSize.length/2}px;height:${fullEdgeSize.girth}px;background:green;`

let halfEdgeStartStyleRed = `width:${fullEdgeSize.length/2}px;height:${fullEdgeSize.girth}px;background:red;`
let halfEdgeEndStyleRed = `width:${fullEdgeSize.length/2}px;height:${fullEdgeSize.girth}px;background:red;`


// map
let map1 = [
  [0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 0, 1],
  [1, 1, 0, 1, 1, 1],
  [1, 1, 0, 0, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0], //using numbers instead of bool for writability
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
            console.log(`${rightControlProperties.pseudoCoordinates} active: ${rightControlProperties.active}`)

            let belowControlProperties = {
            active: "", //this row will not exist since it is after everything
            pseudoCoordinates: [selectedBlock + 1,selectedRow + 2]
            };
            if(selectedRow + 1 >= map.length ){belowControlProperties.active = 0}
            else if (selectedRow < map.length) {belowControlProperties.active = map[selectedRow + 1][selectedBlock]}
            console.log(`${belowControlProperties.pseudoCoordinates} active: ${belowControlProperties.active}`)

            if (controlProperties.active == true){ // this value will actually be 1, but using boolean for readability
                console.log(`${controlProperties.pseudoCoordinates} active`)
                let locationX = selectedBlock * fullControlSize
                let locationY = selectedRow * fullControlSize
                // MAKE BLOCK
                let control = document.createElement("div")
                control.id = `control-x${controlProperties.pseudoCoordinates[0]}-y${controlProperties.pseudoCoordinates[1]}`
                control.className = "controlBlock"
                control.style.position ="absolute"
                control.style.transformOrigin = "0px 0px"
                control.style.translate = `${locationX}px ${locationY}px`
                document.getElementById("mapArea").append(control)

                // MAKE HORIZONTAL EDGES (with dynamically named IDs )
                function horizontalEdge(controlCoordinates, locY){
                    let controlHorizontalStart = document.createElement("div")
                    controlHorizontalStart.id = `controlHorizontalStart-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlHorizontalStart.className = "halfEdgeStart"
                    controlHorizontalStart.style = halfEdgeStartStyleGreen

                    let controlHorizontalEnd = document.createElement("div")
                    controlHorizontalEnd.id = `controlHorizontalEnd-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlHorizontalEnd.className = "halfEdgeEnd"
                    controlHorizontalEnd.style = halfEdgeEndStyleRed

                    let controlHorizontal = document.createElement("div")
                    controlHorizontal.id = `controlHorizontal-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlHorizontal.className = "halfEdgeContainer"
                    controlHorizontal.style.width = `${fullEdgeSize.length}px`
                    controlHorizontal.style.position ="absolute"
                    controlHorizontal.style.transformOrigin = "0px 0px"
                    controlHorizontal.style.translate = `${locationX}px ${locY -5}px`

                    controlHorizontal.append(controlHorizontalStart)
                    controlHorizontal.append(controlHorizontalEnd)

                    document.getElementById("mapArea").append(controlHorizontal)
                }
                // MAKE VERTICAL EDGES (with dynamically named IDs )
                function verticalEdge(controlCoordinates, locX){
                    let controlVerticalStart = document.createElement("div")
                    controlVerticalStart.id = `controlVerticalStart-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlVerticalStart.className = "halfEdgeStart"
                    controlVerticalStart.style = halfEdgeStartStyleGreen

                    let controlVerticalEnd = document.createElement("div")
                    controlVerticalEnd.id = `controlVerticalEnd-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlVerticalEnd.className = "halfEdgeEnd"
                    controlVerticalEnd.style = halfEdgeEndStyleRed

                    let controlVertical = document.createElement("div")
                    controlVertical.id = `controlVertical-x${controlCoordinates[0]}-y${controlCoordinates[1]}`
                    controlVertical.className = "halfEdgeContainer"
                    controlVertical.style.width = `${fullEdgeSize.length}px`
                    controlVertical.style.position ="absolute"
                    controlVertical.style.transformOrigin = "0px 0px"
                    controlVertical.style.rotate = "90deg"
                    controlVertical.style.translate = `${locX+3}px ${locationY +2}px`

                    controlVertical.append(controlVerticalStart)
                    controlVertical.append(controlVerticalEnd)

                    document.getElementById("mapArea").append(controlVertical)
                }
                verticalEdge(controlProperties.pseudoCoordinates, locationX)
                console.log(rightControlProperties.active)
                if(rightControlProperties.active == false){
                    verticalEdge(rightControlProperties.pseudoCoordinates, (locationX + fullControlSize))
                }
                horizontalEdge(controlProperties.pseudoCoordinates, locationY)
                console.log(belowControlProperties.active)
                if(belowControlProperties.active == false){
                    horizontalEdge(belowControlProperties.pseudoCoordinates, (locationY + fullControlSize))
                }
               
            } else if (controlProperties.active == false){
                console.log(`${controlProperties.pseudoCoordinates} not active`)
            }
        }
    }
}


//EXAMPLE BEGIN
//exampleTop
let exampleTopStart = document.createElement("div")
exampleTopStart.className = "halfEdgeStart"
exampleTopStart.style = halfEdgeStartStyleGreen

let exampleTopEnd = document.createElement("div")
exampleTopEnd.className = "halfEdgeEnd"
exampleTopEnd.style = halfEdgeEndStyleRed

let exampleTop = document.createElement("div")
exampleTop.className = "halfEdgeContainer"
exampleTop.style.width = `${fullEdgeSize.length}px`
exampleTop.style.position ="absolute"
exampleTop.style.transformOrigin = "0px 0px"
exampleTop.style.translate = "0px -5px"

exampleTop.append(exampleTopStart)
exampleTop.append(exampleTopEnd)

document.getElementById("mapAreaExample").append(exampleTop)

//exampleLeft
let exampleLeftStart = document.createElement("div")
exampleLeftStart.className = "halfEdgeStart"
exampleLeftStart.style = halfEdgeStartStyleGreen

let exampleLeftEnd = document.createElement("div")
exampleLeftEnd.className = "halfEdgeEnd"
exampleLeftEnd.style = halfEdgeEndStyleRed


let exampleLeft = document.createElement("div")
exampleLeft.className = "halfEdgeContainer"
exampleLeft.style.width = `${fullEdgeSize.length}px`
exampleLeft.style.position ="absolute"
exampleLeft.style.transformOrigin = "0px 0px"
exampleLeft.style.translate = "3px 2px"
exampleLeft.style.rotate = "90deg"

exampleLeft.append(exampleLeftStart)
exampleLeft.append(exampleLeftEnd)

document.getElementById("mapAreaExample").append(exampleLeft)

//exampleRight
let exampleRightStart = document.createElement("div")
exampleRightStart.className = "halfEdgeStart"
exampleRightStart.style = halfEdgeStartStyleGreen

let exampleRightEnd = document.createElement("div")
exampleRightEnd.className = "halfEdgeEnd"
exampleRightEnd.style = halfEdgeEndStyleRed


let exampleRight = document.createElement("div")
exampleRight.className = "halfEdgeContainer"
exampleRight.style.width = `${fullEdgeSize.length}px`
exampleRight.style.position ="absolute"
exampleRight.style.transformOrigin = "0 0"
exampleRight.style.rotate = "90deg"
exampleRight.style.translate = "103px 2px"

exampleRight.append(exampleRightStart)
exampleRight.append(exampleRightEnd)

document.getElementById("mapAreaExample").append(exampleRight)

//exampleBottom
let exampleBottomStart = document.createElement("div")
exampleBottomStart.className = "halfEdgeStart"
exampleBottomStart.style = halfEdgeStartStyleGreen

let exampleBottomEnd = document.createElement("div")
exampleBottomEnd.className = "halfEdgeEnd"
exampleBottomEnd.style = halfEdgeEndStyleRed


let exampleBottom = document.createElement("div")
exampleBottom.className = "halfEdgeContainer"
exampleBottom.style.width = `${fullEdgeSize.length}px`
exampleBottom.style.position ="absolute"
exampleBottom.style.transformOrigin = "0px 0px"
exampleBottom.style.translate = "0 95px"

exampleBottom.append(exampleBottomStart)
exampleBottom.append(exampleBottomEnd)

document.getElementById("mapAreaExample").append(exampleBottom)


//exampleBlock
let exampleBlock = document.createElement("div")
exampleBlock.className = "controlBlock"
exampleBlock.style.position ="absolute"
exampleBlock.style.transformOrigin = "0px 0px"
exampleBlock.style.translate = "0px 0px"

document.getElementById("mapAreaExample").append(exampleBlock)
//exampleBlock2
let exampleBlock2 = document.createElement("div")
exampleBlock2.className = "controlBlock"
exampleBlock2.style.background = "green"
exampleBlock2.style.position ="absolute"
exampleBlock2.style.transformOrigin = "0px 0px"
exampleBlock2.style.translate = "100px 0px"

document.getElementById("mapAreaExample").append(exampleBlock2)
document.getElementById("mapAreaExample").style.display = "none" // TO REMOVE EXAMPLE
//EXAMPLE END

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

//window.onresize = checkMinimumWindowSize
//checkMinimumWindowSize()
// UNCOMMENT THESE ^

loadMap(map1)