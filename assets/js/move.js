

export function move(element) {

    function moveToCoordinates(left, top) {
        element.style.left = left + 'px'
        element.style.top = top + 'px'
    }

    function moveWithKeys(left, top, keyArray, callback){
        let direction
        let keysHeld = []
        let x = left;
        let y = top;
        let upKey = keyArray[0].toLowerCase()
        let leftKey = keyArray[1].toLowerCase()
        let downKey = keyArray[2].toLowerCase()
        let rightKey = keyArray[3].toLowerCase()
       


        element.style.left = x + 'px'
        element.style.top = y + 'px'
        
        function moveCharacter(){ 
            if(direction === 'left'){
                x-=1
            }
            if(direction === 'up'){
                y-=1
            }
            if(direction === 'right'){
                x+=1
            }
            if(direction === 'down'){
                y+=1
            }
            element.style.left = x + 'px'
            element.style.top = y + 'px'
            //console.log("fired")
        }
        
        setInterval(moveCharacter, 1)
        
        document.addEventListener('keydown', function(e){
            //if(e.repeat) return;
        
            if(e.key === leftKey || e.key === 'A'){
                direction = 'left'
                if(!keysHeld.includes("a")) {keysHeld.push("a")}
            }
            if(e.key === upKey || e.key === upKey.toUpperCase()){
                direction = 'up'
                if(!keysHeld.includes("w")) {keysHeld.push("w")}
            }
            if(e.key === rightKey || e.key === rightKey.toUpperCase()){
                direction = 'right'
                if(!keysHeld.includes("d")) {keysHeld.push("d")}
            }
            if(e.key === downKey || e.key === downKey.toUpperCase()){
                direction = 'down'
                if(!keysHeld.includes("s")) {keysHeld.push("s")}
            }
            console.log("keys held below")
            console.log(keysHeld)
            //callback(direction)
        })
        
        document.addEventListener('keyup', function(e){
            
            if(keysHeld.includes(e.key.toLowerCase())){
                // let newKeys = keysHeld.filter((keys) => keys != e.key)
                // keysHeld = newKeys


                let releasedKeyIndex = keysHeld.indexOf(e.key.toLowerCase())
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