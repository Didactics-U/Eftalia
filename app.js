import { cadenasProducts } from './tiposProducto/cadenas.js';
import { aretesProducts } from './tiposProducto/aretes.js';
import { candongaProducts } from './tiposProducto/candonga.js';
import { anillosProducts } from './tiposProducto/anillos.js';

const productosTodos = [...cadenasProducts, ...aretesProducts, ...candongaProducts, ...anillosProducts];

document.addEventListener('DOMContentLoaded', function () {

    const categoryButtons = document.querySelectorAll('.btn');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function (event) {
            const categoriaSeleccionada = event.target.textContent.toLowerCase();
            filtrarProductos(categoriaSeleccionada);
        });
    });

    document.getElementById('search-input').addEventListener('input', function () {
        mostrarProductos(productosTodos);
    });
});


/**
 *
 * @param {*} productos
 * @param {*} nombreSeccion
 */
function mostrarProductos(productos, nombreSeccion) {
    const container = document.getElementById('product-container');
    container.innerHTML = '';

    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();

    const productosFiltrados = productos.filter(producto => {
        return producto.nombre.toLowerCase().includes(searchTerm) ||
            producto.descripcion.toLowerCase().includes(searchTerm);
    });

    if (productosFiltrados.length > 0) {
        const seccionHTML = `<div class="mb-3">
            <div class="row row-cols-2 row-cols-md-4">
                ${productosFiltrados.map(producto => `
                    <div class="col mb-3">
                        <div class="card" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#productoModal${producto.id}">
                        <img src="${producto.imagen}" class="card-img-top custom-card-image" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <p class="card-text">Precio: $${producto.precio}</p>
                                ${producto.cantidadStock === 1 ?
                '<p class="card-text text-danger"><i class="fas fa-exclamation-triangle"></i> Último disponible</p>'
                : ''}
                                ${producto.cantidadStock === 0 ?
                '<p class="card-text text-danger">Agotado</p>'
                : ''}
                            </div>
                        </div>
                    </div>
                    <div class="modal fade" id="productoModal${producto.id}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="exampleModalLabel">${producto.nombre}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
                                    <p>${producto.descripcion}</p>
                                    <p>Precio: $${producto.precio}</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">Cerrar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
        container.innerHTML += seccionHTML;
    } else {
        container.innerHTML = `<div class="alert alert-warning" role="alert">No he podido encontrar el producto.😢
        </div>`;
    }
}


/**
 * Filtra y muestra productos según la categoría seleccionada.
 * Si no hay categoría seleccionada, muestra todos los productos.
 *
 * @param {string} categoriaSeleccionada - La categoría de productos a mostrar.
 * @returns {void}
 */
function filtrarProductos(categoriaSeleccionada) {
    let productosFiltrados = [];

    switch (categoriaSeleccionada) {
        case 'cadenas':
            productosFiltrados = cadenasProducts;
            break;
        case 'aretes':
            productosFiltrados = aretesProducts;
            break;
        case 'candongas':
            productosFiltrados = candongaProducts;
            break;
        case 'anillos':
            productosFiltrados = anillosProducts;
            break;
    }

    mostrarProductos(productosFiltrados, categoriaSeleccionada);
}
