//define block size for everything
let fullEdgeSizeStyle = {"length":96, "girth":10}

// making some classes for types of players
let halfEdgeStartStyleGreen = `width:${fullEdgeSizeStyle.length/2}px;height:${fullEdgeSizeStyle.girth}px;background:green;`
let halfEdgeEndStyleGreen = `width:${fullEdgeSizeStyle.length/2}px;height:${fullEdgeSizeStyle.girth}px;background:green;`

let halfEdgeStartStyleRed = `width:${fullEdgeSizeStyle.length/2}px;height:${fullEdgeSizeStyle.girth}px;background:red;`
let halfEdgeEndStyleRed = `width:${fullEdgeSizeStyle.length/2}px;height:${fullEdgeSizeStyle.girth}px;background:red;`


// map
let map1 = [
  [0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0], //using numbers instead of bool for writability
];

//load map
function loadMap(map){ //accept map as parameter when invoking
    for(let selectedRow = 0; selectedRow < map.length; selectedRow++){ //initialize row number as 0, select rows while less than map.length, etc.
        let currentRow = (map[selectedRow]) //select row from map (for readability)
        for(let selectedBlock = 0; selectedBlock < currentRow.length; selectedBlock++){// intialize block number as 0, select blocks while less than map.length, etc.
            let blockActive = (currentRow[selectedBlock])// value determined by data in array, block found in row.. (also for readability)
            console.log(blockActive) //this will return 1 or 0 if block active or not
            
            let controlPseudoCoordinates = [selectedBlock + 1,selectedRow + 1]
            if (blockActive == true){ // this value will actually be 1, but using boolean for readability
                console.log("block active")
                let locationX = selectedBlock * 100
                let locationY = selectedRow * 100
                //make block
                let control = document.createElement("div")
                control.id = `x${locationX}y${locationY}`
                control.className = "controlBlock"
                control.style.position ="absolute"
                control.style.transformOrigin = "0px 0px"
                control.style.translate = `${locationX}px ${locationY}px`
                document.getElementById("mapArea").append(control)

            } else if (blockActive == false){
                console.log("block not active")
            }
        }
    }
}

//exampleTop
let exampleTopStart = document.createElement("div")
exampleTopStart.className = "halfEdgeStart"
exampleTopStart.style = halfEdgeStartStyleGreen

let exampleTopEnd = document.createElement("div")
exampleTopEnd.className = "halfEdgeEnd"
exampleTopEnd.style = halfEdgeEndStyleRed

let exampleTop = document.createElement("div")
exampleTop.className = "halfEdgeContainer"
exampleTop.style.width = `${fullEdgeSizeStyle.length}px`
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
exampleLeft.style.width = `${fullEdgeSizeStyle.length}px`
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
exampleRight.style.width = `${fullEdgeSizeStyle.length}px`
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
exampleBottom.style.width = `${fullEdgeSizeStyle.length}px`
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