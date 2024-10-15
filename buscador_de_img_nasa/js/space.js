document.getElementById('btnBuscar').addEventListener('click', function() {
    const terminoBusqueda = document.getElementById('inputBuscar').value;
    console.log("Término de búsqueda: ", terminoBusqueda);  //verifica que capture el termin

    const url = `https://images-api.nasa.gov/search?q=${terminoBusqueda}`;
    console.log("URL generada: ", url);  //verifica url bien generada

    fetch(url)
        .then(response => response.json())
          .then(data => {
            console.log("Respuesta de la API:", data);  // muestra la respuesta de la api en la consola
            mostrarResultados(data.collection.items);
        })
          .catch(error => console.error('Error:', error));//mnejo error
});

function mostrarResultados(items) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; 

    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        const imagen = item.links && item.links[0].href;
        const titulo = item.data[0].title;
        const descripcion = item.data[0].description || 'Sin descripción disponible';
       
        const fecha = item.data[0].date_created;

        const tarjeta = `
            <div class="col-md-4 mb-3">
                <div class="card h-100">
                    <img src="${imagen}" class="card-img-top" alt="${titulo}" style="height: 200px; object-fit: cover;">
                    <div class="card-body">
                        <h5 class="card-title">${titulo}</h5>
                        <p class="card-text">${descripcion}</p>
                        <p class="card-text"><small class="text-muted">Fecha: ${fecha}</small></p>
                    </div>
                </div>
            </div>
        `;
        contenedor.innerHTML += tarjeta;
    }
}
