
let carrito=localStorage.getItem('productos-carrito'); 
carrito=JSON.parse(carrito);
const contenedorCarrito = document.getElementById('contenedor-carrito');
const contenedorProductosCarrito = document.getElementById('contenedor-productos-carrito');
const contenedorTextoVacio = document.getElementById('texto-vacio');
const accionesBtn = document.getElementById('carrito-botones');  
const precioTotal = document.getElementById('precio-total');
let eliminarBtn;

function cargarCarrito(){
if(carrito && carrito.length >= 0){ 
    contenedorProductosCarrito.innerHTML = "";
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
            <button class='boton-contador boton-contador-sumar' onclick='sumarContador(${producto.id})' id="${producto.id}" >+</button>
            <p>${producto.contador}</p>
            <button class='boton-contador boton-contador-restar' onclick='restarContador(${producto.id})'id="${producto.contador}" >-</button>
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
    eliminarBtn = document.querySelectorAll('.btn-eliminar'); 
    eliminarBtn.forEach(boton =>{
        boton.addEventListener('click',elimnarProductoCarrito);
    })
}
function elimnarProductoCarrito(e){
    const id=e.currentTarget.id;
     const index = carrito.findIndex(producto=>producto.id == id); 
    carrito.splice(index, 1); 
    console.log(carrito)     
    actualizarLocalStorage();
    cargarCarrito(); 
  }
  function calcularTotal(){ 
    const precioFinal=carrito.reduce((total,producto)=> total +(producto.precio*producto.contador),0);
    precioTotal.innerText =`$${precioFinal}`;  
  } 
  function finalizarCompra(){
    swal.fire({
        title: '¿Desea finalizar su compra?',
        text: "Si confirma se compraran los productos que tenga en el carrito.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'rgb(2, 90, 2)',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText:'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            '¡Genial!',
            'Usted finalizo su compra.',
            'success'
          )
        }
      })

  } 

  const btnSumar = document.querySelectorAll('.boton-contador-sumar');
  const btnRestar = document.querySelectorAll('.boton-contador-restar');
    
  function sumarContador(id){
    for (let i = 0; i < carrito.length; i++){
        if(id == carrito[i].id){
            carrito[i].contador = carrito[i].contador+1; 
            cargarCarrito();
            actualizarLocalStorage(); 
        }    
    }
}
function restarContador(id){
    for (let i = 0; i < carrito.length; i++){
        if(id == carrito[i].id){
            carrito[i].contador = carrito[i].contador-1; 
            if(carrito[i].contador==0){
                Swal.fire({
                    icon: 'error',
                    title: '¿Quieres eliminar este producto?',
                    text: 'Si eso quieres, haz click en el boton eliminar',
                  })
            carrito[i].contador=carrito[i].contador+1;
            }
            actualizarLocalStorage();
            cargarCarrito(); 
        }    
    }
}  
function actualizarLocalStorage(){
    localStorage.setItem('productos-carrito',JSON.stringify(carrito));
}