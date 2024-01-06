//define block size for everything
let blockSizeStyle = {"length":100, "girth":20}

// making some classes for types of players
let halfBlockStartStyleGreen = `width:${blockSizeStyle.length}px;height:${blockSizeStyle.girth}px;background:green;`
let halfBlockEndStyleGreen = `width:${blockSizeStyle.length}px;height:${blockSizeStyle.girth}px;background:green;`

let halfBlockStartStyleRed = `width:${blockSizeStyle.length}px;height:${blockSizeStyle.girth}px;background:red;`
let halfBlockEndStyleRed = `width:${blockSizeStyle.length}px;height:${blockSizeStyle.girth}px;background:red;`



let block2 = document.createElement("div")
block2.className = "halfBlockStart"
block2.style = halfBlockStartStyleGreen

let block3 = document.createElement("div")
block3.className = "halfBlockEnd"
block3.style = halfBlockEndStyleRed

let container1 = document.createElement("div")
container1.className = "containHalfBlocks"

let container2 = document.createElement("div")
container2.className = "containHalfBlocks"

container1.append(block2)
container1.append(block3)

container2.append(block2)
container2.append(block3)

document.getElementById("mapArea").append(container1)
document.getElementById("mapArea").append(container2)


let windowIsBigEnough = true
function checkMinimumWindowSize(){
    const widthValue = 1000
    const heightValue = 750
    if(window.innerHeight < heightValue || window.innerWidth < widthValue) {
        console.log(`Hiding page... Window too small as ${window.innerHeight} and ${window.innerWidth}`)
        windowIsBigEnough = false
        document.getElementById("mapArea").style = "opacity: 0"
    } else if (window.innerHeight >= heightValue && window.innerWidth >= widthValue && windowIsBigEnough === false){
        console.log(`Page has become large enough as ${window.innerHeight} and ${window.innerWidth}`)

        windowIsBigEnough = true
        document.getElementById("mapArea").style = "opacity: 1"
    } else if (window.innerHeight >= heightValue && window.innerWidth >= widthValue && windowIsBigEnough === true){
        console.log(`Page still large enough as ${window.innerHeight} and ${window.innerWidth}`)
        //do not reload page
    }
}

window.onresize = checkMinimumWindowSize
checkMinimumWindowSize()