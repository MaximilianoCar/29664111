let idiomaActual

//configuracion de idioma

// Establecer idioma actual

const urlParams0 = new URLSearchParams(window.location.search);
idiomaActual = urlParams0.get('lang') || 'ES'; // Idioma por defecto: "ES"

function ActualizarConf(configuracionActual){
  // Actualizar título de la página
  document.title = configuracionActual.sitio.join(" ");

  // Actualizar elementos del header
  document.querySelector('.titulo').textContent = configuracionActual.sitio[0];
  const titulo = document.querySelector('.titulo');
  const span = document.createElement('span');
  span.textContent = configuracionActual.sitio[1];

  const textNode = document.createTextNode(configuracionActual.sitio[2]);
  titulo.appendChild(span);
  titulo.appendChild(textNode);

  document.querySelector('.nombres').textContent = configuracionActual.saludo;
  document.querySelector('.buscador').placeholder = configuracionActual.buscar;
  document.querySelector('.boton').value = configuracionActual.buscar;

  // Actualizar contenido del footer
  document.querySelector('footer p').textContent = configuracionActual.copyRight;

}

function ActualizarConfPerfil(configuracionActual){
  // Actualizar título de la página
  document.title = configuracionActual.sitio.join(" ");
  document.getElementById('color').textContent = configuracionActual.color;
  document.getElementById('libro').textContent = configuracionActual.libro;
  document.getElementById('musica').textContent = configuracionActual.musica;
  document.getElementById('juegos').textContent = configuracionActual.video_juego;
  document.getElementById('lenguajes').textContent = configuracionActual.lenguajes;
  document.querySelector('.correo').textContent = configuracionActual.email;

}
  // Index
  const estudiantesLista = document.getElementById('estudiantes-lista');

  // Funcion para crear un elemento li por estudiante
  function CrearEstudiante(estudiante) {
    const li = document.createElement('li');
    li.classList.add('img');
    li.dataset.estudianteCi = estudiante.ci; 

    const img = document.createElement('img');
    img.src = `reto5/${estudiante.imagen}`; 

    const p = document.createElement('p');
    p.classList.add('text');
    p.textContent = estudiante.nombre;

    li.appendChild(img);
    li.appendChild(p);

    li.addEventListener('click', handleStudentClick);

    return li;
  }

  function handleStudentClick(event) {
      const clickedElement = event.target;
    
        const studentCi = clickedElement.dataset.estudianteCi;
    
        console.log(studentCi)
        const studentDetailURL = `perfil.html?ci=${studentCi}&lang=${idiomaActual}`; 
    
        window.location.href = studentDetailURL;
    }

  // Funcionn para mostrar datos
  function AgregarEstudiantes() {
    fetch('reto5/datos/index.json') 
      .then(response => response.json())
      .then(data => {
        data.forEach(estudiante => {
          const studentListItem = CrearEstudiante(estudiante);
          estudiantesLista.appendChild(studentListItem);
        });

        //configuracion de idioma

        // Establecer idioma actual para index

        if (idiomaActual === "ES") {
          fetch('reto5/conf/configES.json') 
            .then(response => response.json())
            .then(configuracionActual => {
              ActualizarConf(configuracionActual);
            })

        } else if (idiomaActual === "EN") {
          fetch('reto5/conf/configEN.json') 
            .then(response => response.json())
            .then(configuracionActual => {
              ActualizarConf(configuracionActual);
            })

        } else if(idiomaActual === "PT"){
          fetch('reto5/conf/configPT.json') 
            .then(response => response.json())
            .then(configuracionActual => {
              ActualizarConf(configuracionActual);
            })
        }else{
          console.error("Idioma no encontrado:", idiomaActual);
        }
            
        //buscador
        const searchInput = document.querySelector('.menuForm');

        searchInput.addEventListener('keyup', handleSearch);

        function handleSearch(event) {
          const searchTerm = event.target.value.toLowerCase().trim();
        
          const filteredStudents = data.filter(estudiante => estudiante.nombre.toLowerCase().includes(searchTerm));
        
          estudiantesLista.innerHTML = '';

          if(filteredStudents.length > 0){
            filteredStudents.forEach(estudiante => {
              const studentListItem = CrearEstudiante(estudiante);
              estudiantesLista.appendChild(studentListItem);
            });
          } else {
            let message = document.createElement('li');
            message.classList.add('noResults');
            message.textContent = configuracionActual.sinResultado ;
            list.appendChild(message);
          }
        
        }

      })
      .catch(error => console.error('Error fetching data:', error));
  }

  document.addEventListener('DOMContentLoaded', function() {
      AgregarEstudiantes();
    });


  //Perfil

const urlParams = new URLSearchParams(window.location.search);
const ci = urlParams.get('ci');
idiomaActual = urlParams.get('lang') || 'ES'; // Idioma por defecto: "ES"

const nombre = document.querySelector('.desc');

function AgregarInfoEstudiante() {
  fetch(`reto5/${ci}/perfil.json`) 
    .then(response => response.json())
    .then(estudiante => {

      if (idiomaActual === "ES") {
        fetch('reto5/conf/configES.json') 
          .then(response => response.json())
          .then(configuracionActual => {
            ActualizarConfPerfil(configuracionActual);
          })
      
      } else if (idiomaActual === "EN") {
        fetch('reto5/conf/configEN.json') 
          .then(response => response.json())
          .then(configuracionActual => {
            ActualizarConfPerfil(configuracionActual);
          })
      
      } else if(idiomaActual === "PT"){
        fetch('reto5/conf/configPT.json') 
          .then(response => response.json())
          .then(configuracionActual => {
            ActualizarConfPerfil(configuracionActual);
          })
      }else{
        console.error("Idioma no encontrado:", idiomaActual);
      }
      
      document.querySelector('.tituloPerfil').textContent = estudiante.nombre;

      const img = document.querySelector('.fotoperfil');
      img.src = `reto5/${ci}/${estudiante.imagen}`;
      img.alt = 'Foto de ' + estudiante.nombre;

      document.getElementById('nombre').textContent = estudiante.nombre;
      document.querySelector('.desc').textContent = estudiante.descripcion;
      document.querySelector('.color').textContent = estudiante.color;
      document.querySelector('.libro').textContent = estudiante.libro.join(', ');
      document.querySelector('.musica').textContent = estudiante.musica.join(', ');
      document.querySelector('.juegos').textContent = estudiante.video_juego.join(', ');

      const lenguajes = document.querySelector('.lenguajes');
      const negrita = document.createElement('b');
      negrita.textContent = estudiante.lenguajes.join(", ");
      lenguajes.appendChild(negrita);

      document.querySelector('.mail').href = `mailto:${estudiante.email}`;
      document.querySelector('.mail').textContent = estudiante.email;
      
    })
    .catch(error => console.error('Error fetching data:', error));
}

  document.addEventListener('DOMContentLoaded', function() {
  AgregarInfoEstudiante();
});

