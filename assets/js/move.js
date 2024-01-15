

export function move(element) {

    function moveToCoordinates(left, top) {
        element.style.left = left + 'px'
        element.style.top = top + 'px'
    }

    function moveWithKeys(locArray, keyArray, fullControlSize, teamColor, callback){
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
            function checkValidTravelPath(coorX, coorY, addX, addY){
                let subtractedHalf = false
                let query
                //console.log(coorX)
                if (addX != 0){
                    console.log("working")
                    if (coorX.toString().includes(".5")){
                        subtractedHalf = "x"
                        coorX+=addX
                        query = `#controlHorizontalStart-x${coorX + 1 + (addX * 2)}-y${coorY + 1}`
                    }
                    if (coorY.toString().includes(".5")){
                        return coorX
                    } 
                } else if (addY != 0){
                    if (coorY.toString().includes(".5")){
                        subtractedHalf = "y"
                        coorY+=addY
                        query = `#controlHorizontalStart-x${coorX + 1}-y${coorY + 1 + (addY * 2)}`
                    }
                    if (coorX.toString().includes(".5")){
                        return coorY
                    } 
                }
                
                if(document.querySelector(query)){
                    x+=fullControlSize*addX
                    y+=fullControlSize*addY
                    if(subtractedHalf == "x"){coorX+=addX; return coorX} else if(subtractedHalf == "y"){coorY+=addY; return coorY} else {console.log("poopy")}
                }
            
            }

            let capturedEdge
            if(direction === 'left'){
                //coordinateX = checkValidTravelPath(coordinateX, coordinateY, -0.5, 0)
                let subtractedHalf = false
                let controlTypeName = "HorizontalEnd"
                if (coordinateX.toString().includes(".5")){
                    subtractedHalf = true
                    controlTypeName = "HorizontalStart"
                    coordinateX+=0.5
                }
                if (coordinateY.toString().includes(".5")){
                    return coordinateY
                } 
                // this is where movement happens \/
                capturedEdge = document.querySelector(`#control${controlTypeName}-x${coordinateX}-y${coordinateY + 1}`)
                console.log(capturedEdge)
                if(capturedEdge){
                    x-=fullControlSize/2
                    coordinateX-=0.5
                    if(subtractedHalf == true){coordinateX-=0.5}
                }
            }
            if(direction === 'up'){
                //coordinateY = checkValidTravelPath(coordinateX,coordinateY, 0, -0.5)
                let subtractedHalf = false
                let controlTypeName = "VerticalEnd"
                if (coordinateY.toString().includes(".5")){
                    subtractedHalf = true
                    controlTypeName = "VerticalStart"
                    coordinateY+=0.5
                }
                if (coordinateX.toString().includes(".5")){
                    return coordinateX
                } 

                capturedEdge = document.querySelector(`#control${controlTypeName}-x${coordinateX + 1}-y${coordinateY}`)
                console.log(capturedEdge)
                if(capturedEdge){
                    y-=fullControlSize/2
                    coordinateY-=0.5
                    if(subtractedHalf == true){coordinateY-=0.5}
                }
            }
            if(direction === 'right'){
                let subtractedHalf = false
                let controlTypeName = "HorizontalStart"
                if (coordinateX.toString().includes(".5")){
                    subtractedHalf = true
                    controlTypeName = "HorizontalEnd"
                    coordinateX-=0.5
                }
                if (coordinateY.toString().includes(".5")){
                    return coordinateY
                } 
                capturedEdge = document.querySelector(`#control${controlTypeName}-x${coordinateX + 1}-y${coordinateY + 1}`)
                console.log(capturedEdge)
                if(capturedEdge){
                    x+=fullControlSize/2
                    coordinateX+=0.5
                    if(subtractedHalf == true){coordinateX+=0.5}
                }
            }
            if(direction === 'down'){
                let subtractedHalf = false
                let controlTypeName = "VerticalStart"
                if (coordinateY.toString().includes(".5")){
                    subtractedHalf = true
                    controlTypeName = "VerticalEnd"
                    coordinateY-=0.5
                }
                if (coordinateX.toString().includes(".5")){
                    return coordinateX
                } 

                capturedEdge = document.querySelector(`#control${controlTypeName}-x${coordinateX + 1}-y${coordinateY + 1}`)
                console.log(capturedEdge)
                if(capturedEdge){
                    y+=fullControlSize/2
                    coordinateY+=0.5
                    if(subtractedHalf == true){coordinateY+=0.5}
                    capturedEdge.style
                }
            }
            element.style.left = x + 'px'
            element.style.top = y + 'px'
            if(capturedEdge){capturedEdge.style.background = teamColor}
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