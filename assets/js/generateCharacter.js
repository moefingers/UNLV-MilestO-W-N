import { move } from "./move.js";

/*generate a character..
Param 1 string 
Param 2 (array) integers will become pixels exactly  [0] == width  && [1] == height
Param 3 (array) integers will denote how many whole blocks across and down [0] == across  && [1] == down
*/
export async function generateCharacter(teamColor, sizeArray, locArray, fullControlSize) {
    let left =locArray[0] * fullControlSize
    let top =locArray[1] * fullControlSize

    let characterBlob = document.createElement("div")
    characterBlob.style = (`
    background:${teamColor};
    width:${sizeArray[0]}px;
    height:${sizeArray[1]}px;
    position:"relative";
    left:${left}px;
    top:${top}px;
    translate: -50% -50%
    `)
    characterBlob.className = "polygonDeformedOctagon"

    function changeImage(newImageParam){
        if (newImageParam = "gunHeld") {
            //characterBlob.classList.remove("polygonDeformedOctagon")
            //characterBlob.classList.add("polygonDeformedOctagonWithGun")
            //or
            let item = document.createElement("div")
            item.className = "item"
            item.style = (`
            background:black;
            width:15px;
            height:15px;
            position:"relative";
            translate: 50% 50%
            `)

            characterBlob.append(item)
        }
    }
    changeImage("gunHeld")

    document.getElementById("mapArea").append(characterBlob)

    move(characterBlob).withKeys(left, top, ["w","a","s","d"])
}
