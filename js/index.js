const estudiantesLista = document.getElementById('estudiantes-lista');

// Function to create a list item (li) element for a student
function createStudentListItem(estudiante) {
  const li = document.createElement('li');
  li.classList.add('img');

  const img = document.createElement('img');
  img.src = `reto5/${estudiante.imagen}`; // Combine path with image name from JSON

  const p = document.createElement('p');
  p.classList.add('text');
  p.textContent = estudiante.nombre;

  li.appendChild(img);
  li.appendChild(p);

  return li;
}

// Function to fetch and display student data
function loadStudentData() {
  fetch('reto5/datos/index.json') // Replace with your actual JSON file path
    .then(response => response.json())
    .then(data => {
      data.forEach(estudiante => {
        const studentListItem = createStudentListItem(estudiante);
        estudiantesLista.appendChild(studentListItem);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
}

// Load student data on page load
loadStudentData();