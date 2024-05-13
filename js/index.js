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
      const studentDetailURL = `perfil.html?ci=${studentCi}`; 
  
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
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.addEventListener('DOMContentLoaded', function() {
    AgregarEstudiantes();
  });

  //Perfil

const urlParams = new URLSearchParams(window.location.search);
const ci = urlParams.get('ci');

const nombre = document.querySelector('.desc');

function AgregarInfoEstudiante() {
  fetch(`reto5/${ci}/perfil.json`) 
    .then(response => response.json())
    .then(estudiante => {

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
