//recibo los elementos guardados en el localStorage
let carrito=localStorage.getItem('productos-carrito'); 
// console.log(carrito) 
carrito=JSON.parse(carrito);
const contenedorCarrito = document.getElementById('contenedor-carrito');
const contenedorProductosCarrito = document.getElementById('contenedor-productos-carrito');
const contenedorTextoVacio = document.getElementById('texto-vacio');
const accionesBtn = document.getElementById('carrito-botones');  
const precioTotal = document.getElementById('precio-total');
let eliminarBtn;

// console.log(contenedorTextoVacio); 
// console.log(carrito)
function cargarCarrito(){
if(carrito && carrito.length > 0){ 
    // console.log(carrito);
    contenedorTextoVacio.classList.add('esconder');
    
    contenedorProductosCarrito.innerHTML = " ";
    carrito.forEach(producto => {
        const div = document.createElement('div'); 
        div.classList.add('producto'); 
        div.innerHTML=`                  
          <img src="${producto.imagen}" class="foto-carrito" alt="">
        <div class="producto-nombre">
            <h5>Nombre producto</h5> 
            <h3>${producto.nombre}</h3>
        </div> 
        <div class="cantidad">
            <h5>Cantidad</h5>
            <p>${producto.contador}</p>
        </div>
        <div class="producto-precio">
            <h5>Precio</h5>
            <p>$${producto.precio}</p>
        </div> 
        <div class="suma-productos">
            <h5>Total</h5> 
            <p>$${producto.precio*producto.contador}</p>
        </div>
        <div class="contenedor-btn-eliminar">
            <button class="btn-eliminar" id='${producto.id}'>Eliminar</button>
        </div>
    </div> 
    
        `    
        contenedorProductosCarrito.append(div)
    });
 }
 actualizarBoton();
 calcularTotal();
}

cargarCarrito();

function actualizarBoton(){ 
    //Cuando se agrega un boton al html se agrega a la variable eliminarBtn
    eliminarBtn = document.querySelectorAll('.btn-eliminar'); 
    eliminarBtn.forEach(boton =>{
        boton.addEventListener('click',elimnarProductoCarrito);
    })
}
function elimnarProductoCarrito(e){
    const id=e.currentTarget.id;
    // console.log(id)
     const index = carrito.findIndex(producto=>producto.id == id); 
    //  console.log(index); 
    // console.log(carrito)
    carrito.splice(index, 1); 
    //  console.log(carrito) 
    cargarCarrito(); 
    localStorage.setItem('productos-carrito',JSON.stringify(carrito))
  }
  function calcularTotal(){ 
    const precioFinal=carrito.reduce((total,producto)=> total +(producto.precio*producto.contador),0);
    precioTotal.innerText =`$${precioFinal}`;  
  } 
  function finalizarCompra(){
    swal({
        title: "Felicidades !",
        text: "Usted finalizo su compra!",
        icon: "success",
        button: "Ok!",
      });
  }