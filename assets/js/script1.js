//define block size for everything
let fullBlockSizeStyle = {"length":96, "girth":10}

// making some classes for types of players
let halfBlockStartStyleGreen = `width:${fullBlockSizeStyle.length/2}px;height:${fullBlockSizeStyle.girth}px;background:green;`
let halfBlockEndStyleGreen = `width:${fullBlockSizeStyle.length/2}px;height:${fullBlockSizeStyle.girth}px;background:green;`

let halfBlockStartStyleRed = `width:${fullBlockSizeStyle.length/2}px;height:${fullBlockSizeStyle.girth}px;background:red;`
let halfBlockEndStyleRed = `width:${fullBlockSizeStyle.length/2}px;height:${fullBlockSizeStyle.girth}px;background:red;`


// map
let map1 = [
  [0, 1, 1, 1, 1, 0],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [0, 1, 1, 1, 1, 0],
];

//load map
function loadMap(map){
    console.log(map.length)
    for(let row = 0; row < map.length; row++){
        let currentRow = (map[row])
        for(let block = 0; block < currentRow.length; block++){
            let blockActive = (currentRow[block])
            console.log(blockActive) //this will return 1 or 0 if block active or not
            if (blockActive == true){
                console.log("block active")
            } else if (blockActive == false){
                console.log("block not active")
            }
        }
    }
// map.forEach(row => {
//     console.log("row")
//     row.forEach(item => {
//         console.log(item)
//     })
// });
}

//exampleTop
let exampleTopStart = document.createElement("div")
exampleTopStart.className = "halfBlockStart"
exampleTopStart.style = halfBlockStartStyleGreen

let exampleTopEnd = document.createElement("div")
exampleTopEnd.className = "halfBlockEnd"
exampleTopEnd.style = halfBlockEndStyleRed

let exampleTop = document.createElement("div")
exampleTop.className = "containHalfBlocks"
exampleTop.style.width = `${fullBlockSizeStyle.length}px`
exampleTop.style.position ="absolute"
exampleTop.style.transformOrigin = "0px 0px"
exampleTop.style.translate = "0px -5px"

exampleTop.append(exampleTopStart)
exampleTop.append(exampleTopEnd)

document.getElementById("mapAreaExample").append(exampleTop)

//exampleLeft
let exampleLeftStart = document.createElement("div")
exampleLeftStart.className = "halfBlockStart"
exampleLeftStart.style = halfBlockStartStyleGreen

let exampleLeftEnd = document.createElement("div")
exampleLeftEnd.className = "halfBlockEnd"
exampleLeftEnd.style = halfBlockEndStyleRed


let exampleLeft = document.createElement("div")
exampleLeft.className = "containHalfBlocks"
exampleLeft.style.width = `${fullBlockSizeStyle.length}px`
exampleLeft.style.position ="absolute"
exampleLeft.style.transformOrigin = "0px 0px"
exampleLeft.style.translate = "3px 2px"
exampleLeft.style.rotate = "90deg"

exampleLeft.append(exampleLeftStart)
exampleLeft.append(exampleLeftEnd)

document.getElementById("mapAreaExample").append(exampleLeft)

//exampleRight
let exampleRightStart = document.createElement("div")
exampleRightStart.className = "halfBlockStart"
exampleRightStart.style = halfBlockStartStyleGreen

let exampleRightEnd = document.createElement("div")
exampleRightEnd.className = "halfBlockEnd"
exampleRightEnd.style = halfBlockEndStyleRed


let exampleRight = document.createElement("div")
exampleRight.className = "containHalfBlocks"
exampleRight.style.width = `${fullBlockSizeStyle.length}px`
exampleRight.style.position ="absolute"
exampleRight.style.transformOrigin = "0 0"
exampleRight.style.rotate = "90deg"
exampleRight.style.translate = "103px 2px"

exampleRight.append(exampleRightStart)
exampleRight.append(exampleRightEnd)

document.getElementById("mapAreaExample").append(exampleRight)

//exampleBottom
let exampleBottomStart = document.createElement("div")
exampleBottomStart.className = "halfBlockStart"
exampleBottomStart.style = halfBlockStartStyleGreen

let exampleBottomEnd = document.createElement("div")
exampleBottomEnd.className = "halfBlockEnd"
exampleBottomEnd.style = halfBlockEndStyleRed


let exampleBottom = document.createElement("div")
exampleBottom.className = "containHalfBlocks"
exampleBottom.style.width = `${fullBlockSizeStyle.length}px`
exampleBottom.style.position ="absolute"
exampleBottom.style.transformOrigin = "0px 0px"
exampleBottom.style.translate = "0 95px"

exampleBottom.append(exampleBottomStart)
exampleBottom.append(exampleBottomEnd)

document.getElementById("mapAreaExample").append(exampleBottom)


//exampleBlock
let exampleBlock = document.createElement("div")
exampleBlock.className = "fullBlock"
exampleBlock.style.position ="absolute"
exampleBlock.style.transformOrigin = "0px 0px"
exampleBlock.style.translate = "0px 0px"

document.getElementById("mapAreaExample").append(exampleBlock)
//exampleBlock2
let exampleBlock2 = document.createElement("div")
exampleBlock2.className = "fullBlock"
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