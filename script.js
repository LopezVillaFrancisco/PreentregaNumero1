
class Mates{ 
    constructor (nombre, precio, descripcion, disponibilidad){
        this.nombre = nombre; 
        this.precio = precio; 
        this.descripcion = descripcion; 
        this.disponibilidad = disponibilidad; 
    }
}

const mateImperial = new Mates ("Mate Imperial", "5000","Mate moderno de color negro ideal para usar en el dia a dia", true); 

const mateTorpedo = new Mates ("Mate Torpedo", "5000","Hermoso mate color madera", true);  

const mateCamionero = new Mates ("Mate Camionero", "5000","Mate moderno de color negro ideal para usar en el dia a dia", false);  

const botonComprar = document.getElementById("comprar");

function elegirMate () {
    let mate=prompt(`Ingrese el numero del mate que desea ver \n 1.${mateImperial.nombre}\n2.${mateTorpedo.nombre}\n3.${mateCamionero.nombre}`); 
    while (mate !='1' && mate!='2' && mate!='3') {
        mate = prompt(`Error ingrese un numero de mate valido \n 1.${mateImperial.nombre}\n2.${mateTorpedo.nombre}\n3.${mateCamionero.nombre}`); 
    }  
        switch (mate) {
            case '1': mostrarMates("Imperial");  
            break; 
            case '2': mostrarMates("Torpedo");  
            break;
            case '3': mostrarMates("Camionero");  
            break;  
        }
} 
function mostrarMates (nombre){ 
    document.getElementById("mates").style.display="";
    const nombreMate=document.getElementById("nombre"); 
    const precioMate=document.getElementById("precio"); 
    const descripcionMate=document.getElementById("descripcion"); 
    const fotoMate=document.getElementById("fotoMate"); 
    if (nombre=='Imperial'){
        nombreMate.innerText = mateImperial.nombre; 
        precioMate.innerText = mateImperial.precio;  
        descripcionMate.innerText = mateImperial.descripcion; 
        fotoMate.src="./mateImperial.jpg";
    }else{
        if (nombre=='Torpedo'){
            nombreMate.innerText = mateTorpedo.nombre; 
            precioMate.innerText = mateTorpedo.precio;  
            descripcionMate.innerText = mateTorpedo.descripcion;   
            fotoMate.src="./mateTorpedo.jpg";
        }else{
            nombreMate.innerText = mateCamionero.nombre; 
            precioMate.innerText = mateCamionero.precio;  
            descripcionMate.innerText = mateCamionero.descripcion;  
            fotoMate.src="./mateCamionero.jpg";
        }
    }
}

function comprar(){ 
    const nombreMate=prompt(`Por favor confirme el mate que quiere comprar \n 1.${mateImperial.nombre}\n2.${mateTorpedo.nombre}\n3.${mateCamionero.nombre}`); 
    while (nombreMate !='1' && nombreMate!='2' && nombreMate!='3') {
        nombreMate = prompt(`Error ingrese un numero de mate valido \n 1.${mateImperial.nombre}\n2.${mateTorpedo.nombre}\n3.${mateCamionero.nombre}`); 
    }
    if (nombreMate=='1'){
        if(mateImperial.disponibilidad){
            alert(`Felicidades usted compro el mate ${mateImperial.nombre}`)
        }else{
            alert(`Lamentamos decirles que el mate ${mateImperial.nombre} no esta disponible`)
        }
    }else{
        if (nombreMate=='2'){
            if(mateTorpedo.disponibilidad){
                alert(`Felicidades usted compro el mate ${mateTorpedo.nombre}`)
            }else{
                alert(`Lamentamos decirles que el mate ${mateTorpedo.nombre} no esta disponible`)
            }  
        }else{ 
            if(mateCamionero.disponibilidad){
                alert(`Felicidades usted compro el mate ${mateCamionero.nombre}`)
            }else{
                alert(`Lamentamos decirles que el mate ${mateCamionero.nombre} no esta disponible`)
            }
        }
    }
}
