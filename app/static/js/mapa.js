class Mapa {
    constructor () {
        this.position = {
            x : 0
        }
        this.lados = 0
        this.backgroundSize = window.innerWidth
        this.backgroundPosition = 0
        this.todosInimigos = []
        this.inimigos = [
            {
                tipo : "clone",
                x : 1000,
                y : 20,
                element : false,
                vida : 100,
                dificuldade : "facil",
                classe : Clone
            }
        
        ]
        this.intervalo_inimigos = false
        this.gerarInimigos()
    }

    gerarInimigos () {
        for ( let inimigo of this.inimigos ) {
            let ini = document.createElement("div")

            inimigo.element = ini

            ini.classList.add(inimigo.tipo, "stop_l")

            ini.style.left = inimigo.x
            ini.style.bottom = inimigo.y

            document.querySelector(".container").appendChild(ini)

            let enemy = new inimigo.classe(inimigo.tipo, inimigo.x, inimigo.y, ini, "stop_l", inimigo.vida, inimigo.dificuldade)

            enemy.drawLife()

            this.todosInimigos.push(enemy)
        }
        this.moverInimigos()
    }

    moverMapa () {
        this.moveBackground()
    }

    moverInimigos () {
        let w = window.innerWidth
        for ( let inimigo of this.todosInimigos ) {

            inimigo.element.style.left = `${inimigo.position.x - this.position.x}px`
            inimigo.element.style.bottom = `${inimigo.position.y}px`

            if ( parseInt(inimigo.element.style.left.replace("px", "")) < parseInt(player.player.style.left.replace("px", "")) ) {
                if ( inimigo.direction != "r") {
                    inimigo.direction = "r"
                }
            } else {
                if ( inimigo.direction != "l") {
                    inimigo.direction = "l"
                }
            }
            if ( !this.intervalo_inimigos ) {
                let distancia = 0
                this.intervalo_inimigos = setInterval( () => {
                    if ( inimigo.position.x >= 0 && this.position.x >= 0 ) {
                        distancia = inimigo.position.x - this.position.x
                    } else if ( inimigo.position.x <= 0 && this.position.x <= 0 ) {
                        distancia = inimigo.position.x - this.position.x
                    }
                        
                        if (distancia > -200 && distancia < w) {
                            if (!inimigo.interval) {
                                if ( !inimigo.isDead() ) {
                                    inimigo.movimentacao()
                                }
                            }
                            console.log("start")
                        } else {
                            console.log("top")
                            if (inimigo.interval != false) {
                                console.log("parada");
                                inimigo.killInterval()
                                inimigo.stop()
                            }
                        }
                            
                }, 10)
            }
        }
        
    }

    

    moveBackground ( ) {
        let background = document.querySelector(".background")

        let velocidade = 0
        if ( player.animationState == "run" ) {
            velocidade = player.run_velocidade
        } else if ( player.animationState == "walk" || player.animationState == "stop" ) {
            velocidade = player.walk_velocidade
        } else if ( player.animationState == "esquiva" ) {
            velocidade = player.esquiva.velocidade
        }

        if ( player.position.x <= player.margin_para_tela_andar  ) {
            if ( this.backgroundPosition > -1 ) {
                background.style.left = `-${this.backgroundSize}px`
                this.backgroundPosition = -this.backgroundSize
            } else {
                this.position.x = this.position.x - velocidade
                this.backgroundPosition = this.backgroundPosition + velocidade
                background.style.left = `${this.backgroundPosition}px`
                this.moverInimigos()
            }
        }

        if ( player.position.x >=  this.backgroundSize - (player.margin_para_tela_andar + 120) ) {  
            if ( this.backgroundPosition < -this.backgroundSize ) {
                background.style.left = `${0}px`
                this.backgroundPosition = 0
            } else {
                this.position.x = this.position.x + velocidade
                this.backgroundPosition = this.backgroundPosition - velocidade
                background.style.left = `${this.backgroundPosition}px`
                this.moverInimigos()
            }
        }
    }

}


const mapa = new Mapa()
