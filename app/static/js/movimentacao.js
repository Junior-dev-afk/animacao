player.positionInit()

let keyClicked = {}

window.addEventListener("keydown", (e) => {
    let esquivado = false
    if (e.key == "a" || e.key == "d") {
        if (Object.keys(teclaTime).includes(e.key)) {
            if (Date.now() - teclaTime[e.key] < 200) {
                if (!player.esquiva.delay) {
                    if ( !keyClicked[e.key] ) {
                        if ( player.player.className.includes("ataque") ){
                            if ( player.direction == "r" ) {
                                player.direction = "l"
                            } else {
                                player.direction = "r"
                            }
                            player.esquivar()
                            esquivado = true
                            keyClicked[e.key] = true
                        } else {
                            player.esquivar()
                            esquivado = true
                            keyClicked[e.key] = true
                        }
                    }
                }
            }
        }
        teclaTime[e.key] = Date.now()
    }

    if (!esquivado || player.animationState != "esquiva") {
        if (player.animationState == "stop") {
            if (e.key == "Shift") {
                if (!player.animacaoIninterrupta) {
                    player.run()
                }
                keyClicked[e.key] = true
            } else if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
    
                if (!player.animacaoIninterrupta) {
                    if (true) {
                        player.direction = "l"
                        player.walk()
                        keyClicked[e.key] = true
                    }
                }
            } else if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
                if (!player.animacaoIninterrupta) {
                    if (true) {                                       
                        player.direction = "r"
                        player.walk()
                        keyClicked[e.key] = true
                    }
                }
            } else if (e.keyCode === 32 || e.key == "ArrowUp") {
                if (!player.animacaoIninterrupta) {
                    player.jump()
                }
            }
        } else if (player.animationState == "walk") {
            if (e.key == "Shift") {
                keyClicked[e.key] = true
                if (!player.animacaoIninterrupta) {
                    player.run()
                }
            } else if (e.key == "a" || e.key == "A" || e.key == "ArrowLeft") {
                keyClicked[e.key] = true
                if (!player.animacaoIninterrupta) {
                    if (true) {
                        keyClicked[e.key] = true
                        player.direction = "l"
                    }
                }
            } else if (e.key == "d" || e.key == "D" || e.key == "ArrowRight") {
                if (!player.animacaoIninterrupta) {
                    if (true) {
                        keyClicked[e.key] = true
                        player.direction = "r"
                    }
                }
            } else if (e.keyCode === 32 || e.key == "ArrowUp") {
                if (!player.animacaoIninterrupta) {
                    player.jump()
                }
            }
        } else if (player.animationState == "run") {
            if (e.keyCode === 32 || e.key == "ArrowUp") {
                if (!player.animacaoIninterrupta) {
                    player.jump()
                }
            } else if (e.key == "A" || e.key == "ArrowLeft") {
                if (!player.animacaoIninterrupta) {
                    if (true) {
                        player.direction = "l"
                        keyClicked[e.key] = true
                    }
                }
            } else if (e.key == "D" || e.key == "ArrowRight") {
                if (!player.animacaoIninterrupta) {
                    if (true) {
                        player.direction = "r"
                        keyClicked[e.key] = true
                    }
                }
            } else if (e.key == "a" || e.key == "ArrowLeft") {
                if (!player.animacaoIninterrupta) {
                    if (true) {                                                                       
                        player.direction = "l"
                        player.walk() 
                        keyClicked[e.key] = true  
                    }
                }
            } else if (e.key == "d" || e.key == "ArrowRight") {
                
                if (!player.animacaoIninterrupta) {
                    if (true) {   
                        player.direction = "r"
                        player.walk()
                        keyClicked[e.key] = true
                    }
                }
            }
        }
    }

})

let teclaTime = {}


window.addEventListener("keyup", (e) => {


    if (player.animationState == "walk") {
        if (e.key == "a" || e.key == "A" || e.key == "d" || e.key == "D" || e.key == "ArrowLeft" || e.key == "ArrowRight") {
            if (e.key == "a" || e.key == "A") {
                keyClicked["a"] = false
                keyClicked["A"] = false
            }

            if (e.key == "d" || e.key == "D") {
                keyClicked["d"] = false
                keyClicked["D"] = false
            }
            keyClicked[e.key] = false
            if (!player.animacaoIninterrupta) {
                player.stop()
            }
        }
    } else if (player.animationState == "run") {
        if (e.key == "Shift") {
            keyClicked[e.key] = false
            if (!player.animacaoIninterrupta) {
                player.stop()
            }
        }
    }


})


window.addEventListener("click", () => {
    if (!player.animacaoIninterrupta) {
        if (player.animationState == "stop" || player.animationState == "walk") {
            if (!player.animacaoIninterrupta) {
                player.stop()
                player.atack()
            }
        }
    }
})
