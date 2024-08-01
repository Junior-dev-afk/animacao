

class Player {
    constructor () {
        this.vida = 100
        this.arma = new Espada()
        this.direction = "r"
        this.walk_velocidade = 0.7
        this.run_velocidade = 3
        this.autura_pulo = 300 //px
        this.tempo_de_pulo = 1000
        this.limite_chao = 20 //px
        this.margin_para_tela_andar = 300
        this.player = document.getElementById("player")
        this.elementLive = false
        this.interval = false
        this.position = { x : this.margin_para_tela_andar + 1, y : this.limite_chao}
        this.animationActive = false
        this.animationKey = false
        this.animationState = "stop"
        this.animacaoIninterrupta = false
        this.ataqueCombo = false
        this.esquiva = {
            velocidade : 10,
            delay : false,
            tempo_dalay: 5000,
            distancia : 200
        }
        this.drawLife()
    }

    isDead() {
        let e = this.player.className
        if (e == "morrendo_l" || e == "morrendo_r" || e == "morto_l" || e == "morto_r") {
            return true
        }

    }

    receberDano (dano) {
        if ( this.vida > 0 ) {
            this.vida = this.vida - dano
        }
        if (this.vida <= 0){
            if ( !this.isDead() ) {
                clearInterval(this.interval)
                this.setAnimation("morrendo")
            setTimeout(()=>{
                this.setAnimation("morto")
            }, 500)
            }
        }
    }

    drawLife ( ) {
        setInterval (() => {
    
            let l = parseInt(this.player.style.left.replace("px", ''))
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

    causarDano (dano) {

        for ( let inimigo of mapa.todosInimigos ) {
            let i_l = parseInt(inimigo.element.style.left.replace("px", ''))
            if ( this.direction == "r" ) {
                if (i_l > this.position.x){
                    if ( i_l - this.position.x < this.arma.distancia_ataque ) {
                        inimigo.receberDano(dano)
                    }
                }
            } else {
                if (i_l < this.position.x){
                    if ( (i_l - this.position.x) > -this.arma.distancia_ataque ) {
                        inimigo.receberDano(dano)
                    }
                 
                }
            }
        }
    }

    esquivar () {
        this.esquiva.delay = true
        this.killInterval()
        this.animationState = "esquiva"
        let limite = this.esquiva.distancia/this.esquiva.velocidade
        let i = 0
        this.setAnimation("esquiva")
        this.interval = setInterval(()=>{
            let l = this.position.x
            let wid = window.innerWidth
            i++
            if ( i >= limite ) {
                clearInterval(this.interval)
                this.stop()
                setTimeout(()=>{
                    this.esquiva.delay = false
                }, this.esquiva.tempo_dalay)
            }
            if ( this.direction == "r" ) {
                this.position.x = this.position.x + this.esquiva.velocidade
            } else {
                this.position.x = this.position.x - this.esquiva.velocidade
            }
            if ( l >= this.margin_para_tela_andar && l <= ( wid - (this.margin_para_tela_andar+120)) ) {
                this.player.style.left = `${this.position.x}px`
            } else if ( l <= this.margin_para_tela_andar  ) {
                this.position.x = this.margin_para_tela_andar
            } else if ( l =>  wid - (this.margin_para_tela_andar + 120) ) {            
                this.position.x = wid - (this.margin_para_tela_andar + 120)
            }
            this.player.style.left = `${this.position.x}px`
            mapa.moverMapa()
        }, 10)
    }

    killInterval () {
        clearInterval(this.interval)
        this.interval = false
    }

    positionInit () {
        this.player.style.left = `${this.position.x}px`
        this.player.style.bottom = `${this.position.y}px`
        let background = document.querySelector(".background")
        background.style.left = `-${window.innerWidth}px`
    }

    move () {
        let l = this.position.x
        let wid = window.innerWidth

        let velocidade
        if ( this.animationState == "run" ) {
            velocidade = this.run_velocidade
        } else if ( this.animationState == "walk" || this.animationState == "stop" ) {
            velocidade = this.walk_velocidade
        }

        if ( l >= this.margin_para_tela_andar && l <= ( wid - (this.margin_para_tela_andar+120)) ) {
            this.player.style.left = `${this.position.x}px`
        } else if ( l <= this.margin_para_tela_andar  ) {
            this.position.x = this.margin_para_tela_andar
        } else if ( l =>  wid - (this.margin_para_tela_andar + 120) ) {            
            this.position.x = wid - (this.margin_para_tela_andar + 120)
        }

        mapa.moverMapa()
        this.player.style.bottom = `${this.position.y}px`
    }

    jump () {
        if (!this.animacaoIninterrupta) {

            this.animacaoIninterrupta = true
            this.killInterval()
            let v = 0
            let animacao_pulo_parado = false
            if ( this.animationState == "stop" ) {
                v = this.walk_velocidade
            
                animacao_pulo_parado = setInterval(() => {
                    if ( this.direction == "l" ) {
                        this.position.x = this.position.x - player.walk_velocidade
                    } else {
                        this.position.x = this.position.x + player.walk_velocidade
                    }
                    this.move()
                }, 10);
            } else if ( this.animationState == "walk" ) {
                v = this.walk_velocidade
            } else if ( this.animationState == "run" ) {
                v = this.run_velocidade
            }
            this.setAnimation("jump_1")
            let aut_inicial = this.player.style.bottom
            this.position.y = parseInt(aut_inicial.replace("px", ""))
            let pxs = this.autura_pulo / (this.tempo_de_pulo / 10)

            this.interval = setInterval(()=>{
                this.position.y = this.position.y + pxs
                this.player.style.bottom = `${this.position.y}px`

                if ( this.direction == "l" ) {
                    this.position.x = this.position.x - v
                } else {
                    this.position.x = this.position.x + v
                }
                
                this.move()

            }, 10)
            setTimeout(()=>{
                this.killInterval()
                this.interval = setInterval(()=>{

                    this.position.y = this.position.y - pxs
        
                    if ( this.direction == "l" ) {
                        this.position.x = this.position.x - v
                    } else {
                        this.position.x = this.position.x + v
                    }
                    
                    this.move()
        
                }, 10)
            }, this.tempo_de_pulo / 2)
            setTimeout(()=>{
                this.killInterval()
                
                if ( this.position.y < this.limite_chao || this.position.y > this.limite_chao ) {
                    this.position.y = this.limite_chao
                }

                this.move()
                if ( animacao_pulo_parado != false ) {
                    clearInterval(animacao_pulo_parado)
                }
                if ( this.animationState== "stop" ) {
                    this.stop()
                } else if ( this.animationState == "walk" && ( keyClicked["a"] || keyClicked["A"] || keyClicked["d"] || keyClicked["D"] ) ) {
                    this.walk()
                } else if ( this.animationState == "run" && ( keyClicked["Shift"] ) ) {
                    this.run()
                } else {
                    this.stop()
                }
                this.animacaoIninterrupta = false
            }, this.tempo_de_pulo)
                        
        }
    }

    setAnimation (anim) {
        this.player.className= `${anim}_${this.direction}`
    }

    atack () {
        if ( !this.ataqueCombo ) {
            if ( !this.animacaoIninterrupta ) {
                this.animacaoIninterrupta = true
                this.setAnimation("ataque_2")
                setTimeout(()=>{
                    this.causarDano(this.arma.dano.ataque_basico)
                }, 250)
                setTimeout(()=>{
                    this.setAnimation("stop")
                    this.animacaoIninterrupta = false
                    this.ataqueCombo = true
                    setTimeout(()=>{
                        this.ataqueCombo = false
                    }, 300)
                }, 500)
            }
        } else {
            this.animacaoIninterrupta = true
            this.setAnimation("ataque_1")
            setTimeout(()=>{
                this.causarDano(this.arma.dano.ataque_combo)
            }, 200)
            setTimeout(() => {
                this.setAnimation("stop")
                this.animacaoIninterrupta = false
            }, 400)
        }
    }

    stop () {
        this.killInterval()
        this.setAnimation("stop")
        this.animationActive = false
        this.animationState = "stop"
    }

    walk () {
        this.setAnimation("walk")
        this.animationState = "walk"
        this.killInterval()
        if ( this.interval == false ) {
            this.interval = setInterval(()=>{
                if ( this.direction == "l" ) {
                    if ( this.player.className != "walk_l" ) {
                        this.setAnimation("walk")
                    }
                    this.position.x = this.position.x - player.walk_velocidade
                } else {
                    if ( this.player.className != "walk_r" ) {
                        this.setAnimation("walk")
                    }
                    this.position.x = this.position.x + player.walk_velocidade
                }
                this.move()
            }, 10)
        }  
    }

    run () {
        this.setAnimation("run")
        this.animationState = "run"
        this.killInterval()
        this.interval = setInterval(()=>{
            if ( this.direction == "l" ) {
                if ( this.player.className != "run_l" ) {
                    this.setAnimation("run")
                }
                this.position.x = this.position.x - player.run_velocidade
            } else {
                if ( this.player.className != "run_r" ) {
                    this.setAnimation("run")
                }
                this.position.x = this.position.x + player.run_velocidade
            }
            this.move()
        }, 10)
    }
}


const player = new Player();