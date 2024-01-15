import { checkValidTravelPath } from './checkValidTravelPath.js';

export function move(element, map) {
    function moveToCoordinates(left, top) {
        element.style.left = left + 'px';
        element.style.top = top + 'px';
    }

    function moveWithKeys(location, keyArray, fullControlSize, callback) {
        let direction;
        let keysHeld = [];
        let x = location.x * fullControlSize;
        let y = location.y * fullControlSize;

        let upKey = keyArray[0];
        let leftKey = keyArray[1];
        let downKey = keyArray[2];
        let rightKey = keyArray[3];

        element.style.left = x + 'px';
        element.style.top = y + 'px';

        const moveCharacter = () => {
            let diffX = 0;
            let diffY = 0;
            switch (direction) {
                case 'left':
                    diffX = -0.5;
                    break;
                case 'up':
                    diffY = -0.5;
                    break;
                case 'right':
                    diffX = 0.5;
                    break;
                case 'down':
                    diffY = 0.5;
                    break;
                default:
                    return;
            }
            if (checkValidTravelPath(map, location, diffX, diffY)) {
                location.updateCoordinates(diffX, diffY);
                x += diffX * fullControlSize;
                y += diffY * fullControlSize;
                element.style.left = x + 'px';
                element.style.top = y + 'px';
            }
        };

        setInterval(moveCharacter, 100);

        document.addEventListener('keydown', function (e) {
            //if(e.repeat) return;

            if (e.key === leftKey || e.key === leftKey.toUpperCase()) {
                direction = 'left';
                if (!keysHeld.includes(leftKey)) {
                    keysHeld.push(leftKey);
                }
            }
            if (e.key === upKey || e.key === upKey.toUpperCase()) {
                direction = 'up';
                if (!keysHeld.includes(upKey)) {
                    keysHeld.push(upKey);
                }
            }
            if (e.key === rightKey || e.key === rightKey.toUpperCase()) {
                direction = 'right';
                if (!keysHeld.includes(rightKey)) {
                    keysHeld.push(rightKey);
                }
            }
            if (e.key === downKey || e.key === downKey.toUpperCase()) {
                direction = 'down';
                if (!keysHeld.includes(downKey)) {
                    keysHeld.push(downKey);
                }
            }
            //console.log("keys held below")
            //console.log(keysHeld)
            //callback(direction)
        });

        document.addEventListener('keyup', function (e) {
            if (keysHeld.includes(e.key || e.key.toLowerCase())) {
                // let newKeys = keysHeld.filter((keys) => keys != e.key)
                // keysHeld = newKeys

                let keyToRemove;

                if (e.key.length > 1) {
                    keyToRemove = e.key;
                } else if (e.key.length == 1) {
                    keyToRemove = e.key.toLowerCase();
                } else console.log('poopy');

                let releasedKeyIndex = keysHeld.indexOf(keyToRemove);
                keysHeld.splice(releasedKeyIndex, 1);
                console.log('keys still held below');
                console.log(keysHeld);
            }
            console.log(e.key + ' is the key released');
            console.log('keys still held below in keyup');
            console.log(keysHeld);

            if (keysHeld.length == 0) {
                console.log('stopping');
                direction = 'null';
            }
        });
    }

    return {
        to: moveToCoordinates,
        withKeys: moveWithKeys,
    };
}
