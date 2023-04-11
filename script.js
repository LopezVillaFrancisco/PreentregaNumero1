let mateUno = 'Mate Imperial Negro';
let mateDos = 'Mate Camionero';
let mateTres = 'Mate Torpedo'; 
let mateActivo=true;


function verMate () {
    let mate=prompt(`Ingrese el numero del mate que desea ver \n 1.${mateUno}\n2.${mateDos}\n3.${mateTres}`); 
    while (mate !='1' && mate!='2' && mate!='3') {
        mate = prompt(`Error ingrese un numero de mate valido \n 1.${mateUno}\n2.${mateDos}\n3.${mateTres}`);
    } 

    switch (mate) {
        case '1': mostrarMateUno(); 
        break; 
        case '2': mostrarMateDos(); 
        break;
        case '3': mostrarMateTres(); 
        break;  
    }
} 
function mostrarMateUno(){  
    if(mateActivo){
        document.getElementById("mateDos").style.display="none"; 
        document.getElementById("mateTres").style.display="none";
    }
    document.getElementById("mateUno").style.display="";
} 
function mostrarMateDos(){ 
    if(mateActivo){
        document.getElementById("mateUno").style.display="none"; 
        document.getElementById("mateTres").style.display="none";
    }
    document.getElementById("mateDos").style.display="";
} 
function mostrarMateTres(){ 
    if(mateActivo){
        document.getElementById("mateDos").style.display="none"; 
        document.getElementById("mateUno").style.display="none";
    }
    document.getElementById("mateTres").style.display="";
} 
function comprar (){
    alert("Esta opcion no esta disponible");
}