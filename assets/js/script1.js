

let block2 = document.createElement("div")
block2.className = "halfBlockStart"
let block3 = document.createElement("div")
block3.className = "halfBlockEnd"

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

// .contain1 {
//     display:flex;
//     margin: 10px;
// }

// .block2 {
//     width:500px;
//     height:100px;
//     background:green;
//     clip-path: polygon(
//         0 50%,
//         10% 0,
//         100% 0,
//         100% 100%,
//         10% 100%
//       )
// }

// .block3 {
//     width:500px;
//     height:100px;
//     background:blue;
//     clip-path: polygon(
//         0% 0%,
//         90% 0,
//         100% 50%,
//         90% 100%,
//         0% 100%
//       )
// }

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