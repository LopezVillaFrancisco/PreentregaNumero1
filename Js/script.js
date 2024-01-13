
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
            productoDiv.innerHTML=`
            <img src="${producto.imagen}" id="fotoProducto" alt="${producto.nombre}"><br>
            <h3 id='nombre'>${producto.nombre}</h3> 
            <h4 id='precio'>$ ${producto.precio}</h4><br>
            <div>
                <button class='btn-agregar-carrito'id='${producto.id}'>Agregar al carrito</button> 
            </div>` 
           contenedorProductos.append(productoDiv);  
           
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
    agregarCarritoBtn = document.querySelectorAll('.btn-agregar-carrito'); 
    agregarCarritoBtn.forEach(boton =>{
        boton.addEventListener('click', agregarAlCarrito)
    })
}


let productosCarrito;
let CarritoDb = localStorage.getItem('productos-carrito');

if(CarritoDb){ 
     
    productosCarrito = JSON.parse(CarritoDb);
}else{    
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
    const productoAgregar = productosArray.find(producto => producto.id == id); 
    if(productosCarrito.some(producto => producto.id == id)){
        const index = productosCarrito.findIndex(producto=>producto.id==id)
        productosCarrito[index].contador++; 
    }else{ 
        productoAgregar.contador=1;
        productosCarrito.push(productoAgregar); 
    console.log(productoAgregar.contador)
    }
    console.log(productosCarrito) 
    localStorage.setItem('productos-carrito',JSON.stringify(productosCarrito))
  } 
