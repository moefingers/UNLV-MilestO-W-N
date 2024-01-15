import { move } from './move.js';

import { Location } from './location.js';

/*generate a character..
Param 1 string 
Param 2 (array) integers will become pixels exactly  [0] == width  && [1] == height
Param 3 (array) integers will denote how many whole blocks across and down [0] == across  && [1] == down
*/
export async function generateCharacter(
    teamColor,
    sizeArray,
    locationArray,
    keyArray,
    fullControlSize,
    map
) {
    const location = new Location(locationArray[0], locationArray[1]);
    let left = location.x * fullControlSize;
    let top = location.y * fullControlSize;

    let characterBlob = document.createElement('div');
    characterBlob.style = `
    background:${teamColor};
    width:${sizeArray[0]}px;
    height:${sizeArray[1]}px;
    position:"relative";
    left:${left}px;
    top:${top}px;
    translate: -50% -50%
    `;
    characterBlob.className = 'polygonDeformedOctagon';

    function changeImage(newImageParam) {
        if ((newImageParam = 'itemHeld')) {
            //characterBlob.classList.remove("polygonDeformedOctagon")
            //characterBlob.classList.add("polygonDeformedOctagonWithGun")
            //or
            let item = document.createElement('div');
            item.className = 'item';
            item.style = `
            background:black;
            width:15px;
            height:15px;
            position:"relative";
            translate: 50% 50%
            `;

            characterBlob.append(item);
        }
    }
    changeImage('itemHeld');

    document.getElementById('mapArea').append(characterBlob);

    move(characterBlob, map).withKeys(location, keyArray, fullControlSize);
}
