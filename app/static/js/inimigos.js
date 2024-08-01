class Clone {

    constructor ( tipo, x, y, element, animacao, vida, dificuldade) {
        this.vida = vida
        this.tipo = tipo
        this.position = {
            x : x,
            y : y
        }
        
        this.ataques = {
            delay : 600,
            inDelay : false
        }
        this.arma = new Espada()
        this.dificuldade = dificuldade
        this.element = element
        this.elementLive = false
        this.animAtual = animacao
        this.direction = "l"
        this.animStatus = "stop"
        this.interval = false
        this.int_run = false
        if ( tipo == "clone" ) {
            this.run_velocidade = 2
            this.walk_velocidade = 0.7
            this.esquiva = {
                velocidade : 10,
                delay : false,
                tempo_dalay: 5000,
                distancia : 200
            }
        }
    }

    drawLife ( ) {
        setInterval (() => {
    
            let l = parseInt(this.element.style.left.replace("px", ''))
            if (!this.elementLive) {
                this.elementLive = document.createElement("div")
                this.elementLive.className = "barra_vida"
                this.elementLive.style.cssText += `
                    width: ${(this.vida/100) * 40 }px;
                    left : ${20+l}px;
                    bottom : 150px;
                `
                document.querySelector(".container").appendChild(this.elementLive)
            } else {
                let w_bv = parseInt(this.elementLive.style.width.replace("px", ''))
                let meio = (w_bv/2)
                this.elementLive.style.cssText += `
                    width: ${(this.vida/100) * 40 }px;
                    left : ${60-meio+l}px;
                    bottom : 150px;
                `
            }
        }, 10) 
    }

    setAnim (anim) {
        this.element.classList.remove(this.animAtual)
        this.element.classList.add(`${anim}_${this.direction}`)
        this.animAtual = `${anim}_${this.direction}`
    }

    isDead ( ) {
        for ( let e of this.element.classList ) {
            if ( e == "morrendo_l" || e == "morrendo_r" || e == "morto_l" || e == "morto_r" ) {
                return true
            }
        }
    }

    killInterval () {
        clearInterval(this.interval)
        this.interval = false
    }

    stop () {
        this.animStatus = "stop"
        this.setAnim("stop")
    }

    move () {
        this.element.style.left = `${this.position.x - mapa.position.x}px`
    }

    ataque () {
        if ( this.animStatus != "ataque" ) {
            if ( !this.ataques.inDelay ) {
                this.ataques.inDelay = true
                this.setAnim("ataque_1")
                this.animStatus = "ataque"
                setTimeout(()=>{
                    player.receberDano(this.arma.dano.ataque_basico)
                })
                setTimeout(()=>{
                    this.stop()
                    setTimeout(()=>{
                        this.ataques.inDelay = false
                    }, this.ataques.delay)
                }, 400)
            }
        }
    }

    run () {
        if (!this.int_run) {

        
        this.animStatus = "run"

        let w = window.innerWidth
        let distancia2
        let distancia = parseInt(player.player.style.left.replace("px", '')) - this.position.x
        if ( distancia > 0 ) {
            this.direction = "r"
        } else {
            this.direction = "l"
        }
        this.int_run = setInterval(()=>{
            if ( this.position.x >= 0 && mapa.position.x >= 0 ) {
                distancia2 = this.position.x - mapa.position.x
            } else if ( this.position.x <= 0 && mapa.position.x <= 0 ) {
                distancia2 = this.position.x - mapa.position.x
            }
                
            if ((distancia2 > -200 && distancia2 < w)) {
                distancia = parseInt(this.element.style.left.replace("px", '')) - parseInt(player.player.style.left.replace("px", ''))
                
                if ( distancia < 100 && distancia > -100 ) {
                    clearInterval(this.int_run)
                    this.int_run = false
                    this.stop()
                } else {
            
                    if ( this.direction == "r" ) {
                        this.position.x = this.position.x + this.run_velocidade
                    } else {
                        this.position.x = this.position.x - this.run_velocidade
                    }
                    this.setAnim("run")
                    this.move()
                }
            } else {
                if ( this.int_run != false ) {
                    clearInterval(this.int_run)
                    this.int_run = false
                    this.stop()
                }                                                                                                               
            }
        }, 10)
    }
    }

    movimentacao() {
        if (!this.isDead()) {
            let w = window.innerWidth
            this.interval = setInterval(() => {
                let distancia = parseInt(this.element.style.left.replace("px", "")) - parseInt(player.player.style.left.replace("px", ""))
                if (distancia < -100 || distancia > 100) {
                    this.run()
                    

                } else {("atacando");
                    this.ataque()
                }

            }, 10)
        }
    }

    receberDano (dano) {
        if ( this.vida > 0 ) {
            this.vida = this.vida - dano
        }
        if (this.vida <= 0){
            if ( !this.isDead() ) {
                clearInterval(this.interval)
                this.setAnim("morrendo")
            setTimeout(()=>{
                this.setAnim("morto")
            }, 500)
            }
        }
    }

}