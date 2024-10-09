document.addEventListener("DOMContentLoaded", () => {
    let peliculas = [];
    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
      .then(response => response.json())
      .then(data => {
        peliculas = data; 
      })
      .catch(error => console.error('Error al cargar los datos:', error));
  

    const buscarPeliculas = () => {
      const inputBuscar = document.getElementById('inputBuscar').value.toLowerCase();
      const lista = document.getElementById('lista');
      lista.innerHTML = ''; 
  
      if (inputBuscar) {
        const resultados = peliculas.filter(pelicula => 
          pelicula.title.toLowerCase().includes(inputBuscar) ||
          convertirGeneros(pelicula.genres).toLowerCase().includes(inputBuscar) ||
          pelicula.tagline.toLowerCase().includes(inputBuscar) ||
          pelicula.overview.toLowerCase().includes(inputBuscar)
        );
  
        resultados.forEach(pelicula => {
          const item = document.createElement('li');
          item.classList.add('list-group-item', 'bg-dark', 'text-white', 'mb-2');
          item.innerHTML = `
            <h5>${pelicula.title}</h5>
            <p>${pelicula.tagline}</p>
            <div>${mostrarEstrellas(pelicula.vote_average)}</div>
          `;
          item.addEventListener('click', () => mostrarDetallesPelicula(pelicula));
          lista.appendChild(item);
        });
  
        if (resultados.length === 0) {
          const noResults = document.createElement('li');
          noResults.classList.add('list-group-item', 'bg-dark', 'text-white');
          noResults.innerHTML = '<p>Not results found</p>';
          lista.appendChild(noResults);
        }
      }
    };


    const convertirGeneros = (genres) => {
        return genres.map(genero => genero.name).join(', ');
    };

    const mostrarEstrellas = (vote_average) => {
      const estrellas = Math.round(vote_average / 2); 
      let estrellasHtml = '';
      for (let i = 0; i < 5; i++) {
        if (i < estrellas) {
          estrellasHtml += '<span class="fa fa-star checked"></span>'; // Estrella llena
        } else {
          estrellasHtml += '<span class="fa fa-star"></span>'; // Estrella vacía
        }
      }
      return estrellasHtml;
    };
  
  const mostrarDetallesPelicula = (pelicula) => {
    const offcanvasTitulo = document.getElementById('offcanvasTitulo');
    const offcanvasOverview = document.getElementById('offcanvasOverview');
    const offcanvasGeneros = document.getElementById('offcanvasGeneros');
    const offcanvasAnio = document.getElementById('offcanvasAnio');
    const offcanvasDuracion = document.getElementById('offcanvasDuracion');
    const offcanvasPresupuesto = document.getElementById('offcanvasPresupuesto');
    const offcanvasGanancias = document.getElementById('offcanvasGanancias');

    offcanvasTitulo.textContent = pelicula.title;
    offcanvasOverview.textContent = pelicula.overview;
    const generosComoString = convertirGeneros(pelicula.genres);
    offcanvasGeneros.textContent = generosComoString;

     // Agregar información adicional
        offcanvasAnio.textContent = new Date(pelicula.release_date).getFullYear(); // Año
        offcanvasDuracion.textContent = pelicula.runtime; // Duración en minutos
        offcanvasPresupuesto.textContent = pelicula.budget; // Presupuesto
        offcanvasGanancias.textContent = pelicula.revenue; // Ganancias

    // Mostramos el offcanvas
    const offcanvasElement = new bootstrap.Offcanvas(document.getElementById('offcanvasTop'));
    offcanvasElement.show();
  };

    document.getElementById('btnBuscar').addEventListener('click', buscarPeliculas);
  });
  