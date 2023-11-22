import { cadenasProducts } from './tiposProducto/cadenas.js';
import { aretesProducts } from './tiposProducto/aretes.js';

const productosTodos = [...cadenasProducts, ...aretesProducts];

document.addEventListener('DOMContentLoaded', function () {
    // Llamamos a la función mostrarProductos con todos los productos al cargar la página
    mostrarProductos(productosTodos);

    const categoryList = document.getElementById('category-list');
    categoryList.addEventListener('click', function (event) {
        if (event.target.classList.contains('category-item')) {
            const categoriaSeleccionada = event.target.dataset.category;
            filtrarProductos(categoriaSeleccionada);
        }
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
      <h2>${nombreSeccion ? nombreSeccion : 'Todos los productos'}</h2>
            <div class="row row-cols-2 row-cols-md-4">
                ${productosFiltrados.map(producto => `
                    <div class="col mb-3">
                        <div class="card">
                            <img src="${producto.imagen}" class="card-img-top custom-image-size" alt="${producto.nombre}">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">${producto.descripcion}</p>
                                <p class="card-text">Precio: $${producto.precio}</p>
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
        default:
            // Si no se especifica ninguna categoría, mostramos todos los productos
            productosFiltrados = productosTodos;
            break;
    }

    mostrarProductos(productosFiltrados, categoriaSeleccionada);
}
