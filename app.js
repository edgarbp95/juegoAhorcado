const nuevaLetra = document.getElementById("decirLetra");
const adivinarPalabra = document.getElementById("adivinarPalabra");
const baseAhorcado = document.getElementById("base");
const cabeza = document.getElementById("cabeza");
const cuerpo = document.getElementById("cuerpo");
const brazoIzquierdo = document.getElementById("brazoIzquierdo");
const brazoDerecho = document.getElementById("brazoDerecho");
const piernaIzquierda = document.getElementById("piernaIzquierda");
const piernaDerecha = document.getElementById("piernaDerecha");
const inputLetra = document.getElementById("letra");
const inputAdivinar = document.getElementById("adivinar");
const palabra = document.querySelector(".palabra");
const imagenAhorcado = document.querySelectorAll(".img_inv");
// const palabraCompleta = document.querySelectorAll(".letra_palabra");
const botonStart = document.querySelector(".start");
const msjFinDePartida = document.getElementById("perdiste");

let contador = 0;

let diccionario = ["abandonar","anaconda","camisa","armario","calendario","camuflaje","ceremonia","cliente","clinica","correo","deporte","dinamita","duelo","duende","diente","eclipse","elefante","empatia","estimulo","explicar","farsante","franela","genio","gorila","guarida","hamburguesa","honor","ilusion","inocente","instinto","jinete","laberinto","lechuga","loteria","luna","medico","melodia","miniatura","neurona","novela","oceano","olfato","ombligo","pagina","parasito","petroleo","piramide","psicologia","radio","restaurante","sarcasmo","silencio","tatuaje","tomate","violeta","virus","violin","zanahoria"];

function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

const palabraAleatoria = ()=>{
    
    let i = numeroAleatorio(0,diccionario.length);

    let palabraElegida = diccionario[i]
    
    return palabraElegida;

}

const adivinarLaPalabra = ()=>{
    
    adivinarPalabra.addEventListener("click",()=>{
        if(inputAdivinar.value==""){
            inputAdivinar.classList.add("borde_rojo_input");
            setInterval(()=>{
                inputAdivinar.classList.remove("borde_rojo_input");
            },1000);
        } else{
            let palabra = inputAdivinar.value.toLowerCase();
            let palabraSeparada = palabra.split("");
            
            let coincidencia = true;
            const palabraCompleta = document.querySelectorAll(".letra_palabra");
            console.log(palabraCompleta);
            console.log(palabraSeparada);
            for(let i=0;i<palabraSeparada.length;i++){
                if(palabraSeparada[i] == palabraCompleta[i].innerHTML){
                    palabraCompleta[i].setAttribute("data-coincidencia","si");
                }
    
                if(palabraCompleta[i].dataset.coincidencia != "si"){
                    coincidencia = false;
                }
             }
    
        if(coincidencia){
            msjFinDePartida.innerHTML = "¡Has acertado!";
            msjFinDePartida.style.display = "block";
            nuevaLetra.disabled = true;
            inputLetra.disabled = true;
            inputAdivinar.disabled = true;
            adivinarPalabra.disabled = true;
            for(let i=0;i<palabraCompleta.length;i++){
                palabraCompleta[i].classList.add("letra_visible");
            }
        } else{
            msjFinDePartida.innerHTML = "¡Has perdido!";
            msjFinDePartida.style.display = "block";
            nuevaLetra.disabled = true;
            inputLetra.disabled = true;
            inputAdivinar.disabled = true;
            adivinarPalabra.disabled = true;
            for(let i=0;i<imagenAhorcado.length;i++){
                imagenAhorcado[i].style.display = "block";
            }
        }
    
        inputAdivinar.value = "";
    
        }
        
    })
}


const crearDiv = (letter)=>{
    let div = document.createElement("div");
    let p = document.createElement("p");
    p.setAttribute("class","letra_palabra");
    div.setAttribute("class","borde_inferior_letra");
    p.innerHTML = letter;
    palabra.appendChild(div); 
    div.appendChild(p); 
}


//funcion que genera nueva palabra
const generarPalabra = ()=>{
    let palabraAlea = palabraAleatoria();
    let palabraDividida = palabraAlea.split("");
    
    for(let i=0; i<palabraDividida.length;i++){
       crearDiv(palabraDividida[i]);

    }
   
}

const chequearGanador = ()=>{
    let contador = 0;
    let coincidencia = true;
    const palabraCompleta = document.querySelectorAll(".letra_palabra");
    for(let i=0;i<palabraCompleta.length;i++){
        if(palabraCompleta[i].dataset.coincidencia!="si"){
            coincidencia=false;
        }
    }
    if(coincidencia == true){
        msjFinDePartida.innerHTML= "¡Ganaste!";
        msjFinDePartida.style.display = "block";
        nuevaLetra.disabled = true;
        inputLetra.disabled = true;
        inputAdivinar.disabled = true;
        adivinarPalabra.disabled = true;
        inputLetra.classList.remove("borde_rojo_input")
    }


    console.log(palabraCompleta)

}


const adivinarUnaLetra = ()=>{
    // let letraPresionada = detectarLetra();
    contador = 0;
    
    nuevaLetra.addEventListener("click",(e)=>{
        let letraIngresada = inputLetra.value.toLowerCase();
        console.log(letraIngresada);
        
        const palabraCompleta = document.querySelectorAll(".letra_palabra");
        let coincidencia = false;

        if(inputLetra.value==""){
            inputLetra.classList.add("borde_rojo_input");
            setInterval(()=>{
                inputLetra.classList.remove("borde_rojo_input");
            },1000);
        } else{
            inputLetra.classList.remove("borde_rojo_input");
            for(let i=0;i<palabraCompleta.length;i++){
            
                if(letraIngresada==palabraCompleta[i].innerHTML){
                    palabraCompleta[i].classList.add("letra_visible");
                    palabraCompleta[i].setAttribute("data-coincidencia","si");
                    coincidencia = true;
                } 
                
            }
            
            if(coincidencia==false){
                        
                    const imagen = document.querySelectorAll(".img_inv");
                    imagen[contador].style.display = "block";
                    contador++;
                
                if(contador==6){
                    msjFinDePartida.innerHTML= "¡Perdiste!";
                    msjFinDePartida.style.display = "block";
                    for(let i=0;i<palabraCompleta.length;i++){
                        palabraCompleta[i].classList.add("letra_visible");
                        palabraCompleta[i].style.color = "red";
                    }
                    nuevaLetra.disabled = true;
                    inputLetra.disabled = true;
                    inputAdivinar.disabled = true;
                    adivinarPalabra.disabled = true;
                    contador=0;
    
                }
                         
            }
             inputLetra.value = "";
        }

        chequearGanador();
        
    })

    
}

const resetJuego = ()=>{
    imagenAhorcado.forEach(element => {
        element.style.display = "none";        
    });
    baseAhorcado.style.display="block";
    palabra.innerHTML = "";
    msjFinDePartida.style.display = "none";
    nuevaLetra.disabled = false;
    inputLetra.disabled = false;
    inputAdivinar.disabled = false;
    adivinarPalabra.disabled = false;
    contador = 0;
    

}

const comenzarJuego = ()=>{

    resetJuego()
    
    
    generarPalabra();

    adivinarUnaLetra();
    
    adivinarLaPalabra();
    
}


botonStart.addEventListener("click",()=>{
    comenzarJuego();
})


