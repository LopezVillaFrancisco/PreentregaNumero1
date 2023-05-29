
let productosArray = [];

fetch("../Js/productos.json")
    .then( (res) => res.json())
    .then( (data) => {
        productosArray = data; 
        cargarProductos(productosArray)
    })


const contenedorProductos = document.getElementById('contenedor-productos');  
const botonesNav=document.querySelectorAll('.btn-nav');
const btnMate = document.getElementById('mate'); 
const btnTermo = document.getElementById('termo');
const btnBombilla = document.getElementById('bombilla'); 
const titulo = document.getElementById('titulo'); 

let agregarCarritoBtn;
function cargarProductos(tipoProducto) {
        contenedorProductos.innerHTML="";
        tipoProducto.forEach( producto => {              
            const productoDiv=document.createElement("div"); 
            productoDiv.classList.add('mate'); 
            productoDiv.innerHTML=`<h3 id='nombre'>${producto.nombre}</h3> 
            <h4 id='precio'>$ ${producto.precio}</h4>
             <p id='descripcion'>${producto.descripcion}</p>
             <img src="${producto.imagen}" id="fotoProducto" alt="${producto.nombre}"><br/>
           <button class='btn-agregar-carrito'id='${producto.id}'>Agregar al carrito</button>` 
           contenedorProductos.append(productoDiv);  
           //Se agregan los botones al html y los actualizo para agregarlos a la variable
           actualizarBoton(); 
            
            }
        );
    }  
    

    botonesNav.forEach(boton =>{ 
        boton.addEventListener('click',(e) =>{ 
            if(e.currentTarget.id!='inicio'){
            const tipoProductos = productosArray.filter(producto=>producto.tipo===e.currentTarget.id)
            titulo.innerText=e.currentTarget.id; 
            cargarProductos(tipoProductos); 
        }else{ 
            titulo.innerText='Todos los productos'
            cargarProductos(productosArray);
        }
        })
    })
 
function actualizarBoton(){ 
    //Cuando se agrega un boton al html se agrega a la variable agregarCarritoBtn
    agregarCarritoBtn = document.querySelectorAll('.btn-agregar-carrito'); 
    agregarCarritoBtn.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito)
    })
}


let productosCarrito;
//Traigo informacion del local
let CarritoDb = localStorage.getItem('productos-carrito');

if(CarritoDb){ 
    // Si hay informacion en el local la parseo para seguir usandola 
    productosCarrito = JSON.parse(CarritoDb);
}else{
    // Si no hay informacion uso el array de productos carrito vacio    
    productosCarrito=[];
}
  function agregarAlCarrito(e){ 
    swal({
        title: "Se agrego el producto al carrito",
        text: "Producto agregado!",
        icon: "success",
        button: "Ok!",
      });

    const id=e.currentTarget.id; 
    //busco el id a agregar
    const productoAgregar = productosArray.find(producto => producto.id == id); 
    // reviso que el producto a agregar no exista ya en el array de productosCarrito   
    if(productosCarrito.some(producto => producto.id == id)){
        const index = productosCarrito.findIndex(producto=>producto.id==id)
        // cada vez que se agrega un producto repetido incremento el contador 
        productosCarrito[index].contador++; 
    }else{ 
        // para evitar repetir agrego un contador a cada producto agregado
        productoAgregar.contador=1;
        productosCarrito.push(productoAgregar); 
    // console.log(productosCarrito)
    console.log(productoAgregar.contador)
    }
    console.log(productosCarrito) 
    localStorage.setItem('productos-carrito',JSON.stringify(productosCarrito))
  } 
//   console.log(productosCarrito)
