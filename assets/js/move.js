

export function move(element) {

    function moveToCoordinates(left, top) {
        element.style.left = left + 'px'
        element.style.top = top + 'px'
    }

    function moveWithKeys(locArray, keyArray, fullControlSize, callback){
        let direction
        let keysHeld = []
        let x = locArray[0] * fullControlSize
        let y = locArray[1] * fullControlSize
        let coordinateX = locArray[0]
        let coordinateY = locArray[1]
    
        // for(let keyIndex = 0; keyIndex < keyArray.length; keyIndex++){
        //     if (keyArray[keyIndex].length > 1){}
        // }
        let upKey = keyArray[0]
        let leftKey = keyArray[1]
        let downKey = keyArray[2]
        let rightKey = keyArray[3]
       


        element.style.left = x + 'px'
        element.style.top = y + 'px'
        
        function moveCharacter(){ 
            if(direction === 'left'){
                let subtractedHalf = false
                if (coordinateX.toString().includes(".5")){
                    subtractedHalf = true
                    coordinateX+=0.5
                }

                if(document.querySelector(`#controlHorizontalStart-x${coordinateX}-y${coordinateY + 1}`)){
                    x-=fullControlSize/2
                    coordinateX-=0.5
                    if(subtractedHalf == true){coordinateX-=0.5}
                }
            }
            if(direction === 'up'){
                let subtractedHalf = false
                if (coordinateY.toString().includes(".5")){
                    subtractedHalf = true
                    coordinateY+=0.5
                }

                if(document.querySelector(`#controlVerticalStart-x${coordinateX + 1}-y${coordinateY}`)){
                    y-=fullControlSize/2
                    coordinateY-=0.5
                    if(subtractedHalf == true){coordinateY-=0.5}
                }
            }
            if(direction === 'right'){
                let subtractedHalf = false
                if (coordinateX.toString().includes(".5")){
                    subtractedHalf = true
                    coordinateX-=0.5
                }

                if(document.querySelector(`#controlHorizontalStart-x${coordinateX + 1}-y${coordinateY + 1}`)){
                    x+=fullControlSize/2
                    coordinateX+=0.5
                    if(subtractedHalf == true){coordinateX+=0.5}
                }
            }
            if(direction === 'down'){
                let subtractedHalf = false
                if (coordinateY.toString().includes(".5")){
                    subtractedHalf = true
                    coordinateY-=0.5
                }

                if(document.querySelector(`#controlVerticalStart-x${coordinateX + 1}-y${coordinateY + 1}`)){
                    y+=fullControlSize/2
                    coordinateY+=0.5
                    if(subtractedHalf == true){coordinateY+=0.5}
                }
            }
            element.style.left = x + 'px'
            element.style.top = y + 'px'
            
            //console.log(coordinateX, coordinateY)
        }
        
        setInterval(moveCharacter, 100)
        
        document.addEventListener('keydown', function(e){
            //if(e.repeat) return;
        
            if(e.key === leftKey || e.key === leftKey.toUpperCase()){
                direction = 'left'
                if(!keysHeld.includes(leftKey)) {keysHeld.push(leftKey)}
            }
            if(e.key === upKey || e.key === upKey.toUpperCase()){
                direction = 'up'
                if(!keysHeld.includes(upKey)) {keysHeld.push(upKey)}
            }
            if(e.key === rightKey || e.key === rightKey.toUpperCase()){
                direction = 'right'
                if(!keysHeld.includes(rightKey)) {keysHeld.push(rightKey)}
            }
            if(e.key === downKey || e.key === downKey.toUpperCase()){
                direction = 'down'
                if(!keysHeld.includes(downKey)) {keysHeld.push(downKey)}
            }
            //console.log("keys held below")
            //console.log(keysHeld)
            //callback(direction)
        })
        
        document.addEventListener('keyup', function(e){
            
            if(keysHeld.includes(e.key || e.key.toLowerCase())){
                // let newKeys = keysHeld.filter((keys) => keys != e.key)
                // keysHeld = newKeys
                
                let keyToRemove

                if (e.key.length > 1){
                    keyToRemove = e.key
                } else if (e.key.length == 1) {
                    keyToRemove = e.key.toLowerCase()
                } else (
                    console.log("poopy")
                )

                let releasedKeyIndex = keysHeld.indexOf(keyToRemove)
                keysHeld.splice(releasedKeyIndex, 1)
                console.log("keys still held below")
                console.log(keysHeld)
            }
            console.log(e.key + " is the key released")
            console.log("keys still held below in keyup")
            console.log(keysHeld)

            if (keysHeld.length == 0) {
                console.log("stopping")
                direction = "null"
            }
            
        })
    }

    return {
        to: moveToCoordinates,
        withKeys: moveWithKeys
    }
}