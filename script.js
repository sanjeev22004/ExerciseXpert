const exerciseContainer = document.getElementById('exercise-container');
const searchInput = document.getElementById('exercise-search');
const searchButton = document.getElementById('search-button');
const exerciseTypesContainer = document.querySelector('.exercise-types-container');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const pageNumbers = document.querySelector('.page-numbers');
const itemsPerPage = 10;
let currentPage = 1;

const modal = document.getElementById('exercise-modal');
const modalCloseButton = document.querySelector('.close-button');
const modalName = document.getElementById('modal-name');
const modalGif = document.getElementById('modal-gif');
const modalBodyPart = document.getElementById('modal-bodyPart');
const modalTarget = document.getElementById('modal-target');
const modalEquipment = document.getElementById('modal-equipment');
const modalInstructions = document.getElementById('modal-instructions');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    filterExercises(searchTerm);
});

function filterExercises(searchTerm) {
    const exercises = document.querySelectorAll('.exercise-card');
    exercises.forEach(exercise => {
        const name = exercise.querySelector('h3').textContent.toLowerCase();
        const bodyPart = exercise.querySelector('p:first-of-type').textContent.toLowerCase();
        const target = exercise.querySelector('p:last-of-type').textContent.toLowerCase();

        if (name.includes(searchTerm) || bodyPart.includes(searchTerm) || target.includes(searchTerm)) {
            exercise.style.display = '';
        } else {
            exercise.style.display = 'none';
        }
    });
}

function showPage(pageNumber) {
    currentPage = pageNumber;
    const start = (pageNumber - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const exercises = document.querySelectorAll('.exercise-card');
    
    exercises.forEach((exercise, index) => {
        if (index >= start && index < end) {
            exercise.style.display = '';
        } else {
            exercise.style.display = 'none';
        }
    });

    updatePagination(exercises.length);
}

function updatePagination(totalItems) {
    pageNumbers.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = i;
        pageLink.className = 'page-link';
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', () => showPage(i));
        pageNumbers.appendChild(pageLink);
    }

    prevButton.style.display = currentPage === 1 ? 'none' : 'inline-block';
    nextButton.style.display = currentPage === totalPages ? 'none' : 'inline-block';
}

prevButton.addEventListener('click', () => showPage(currentPage - 1));
nextButton.addEventListener('click', () => showPage(currentPage + 1));

document.addEventListener('DOMContentLoaded', () => {
    showPage(1);
});

exerciseContainer.addEventListener('click', (event) => {
    const exerciseCard = event.target.closest('.exercise-card');
    if (exerciseCard) {
        const exerciseId = exerciseCard.getAttribute('data-id');
        showModal(exerciseId);
    }
});

function showModal(exerciseId) {
    fetch(`https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8be4498af6msh96db5b74f19cff4p1ba17djsn8f915c436f01',
            'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
        }
    })
    .then(response => response.json())
    .then(exercise => {
        modalName.textContent = exercise.name;
        modalGif.src = exercise.gifUrl;
        modalBodyPart.textContent = `Body Part: ${exercise.bodyPart}`;
        modalTarget.textContent = `Target: ${exercise.target}`;
        modalEquipment.textContent = `Equipment: ${exercise.equipment}`;
        modalInstructions.innerHTML = '';
        exercise.instructions.forEach(instruction => {
            const li = document.createElement('li');
            li.textContent = instruction;
            modalInstructions.appendChild(li);
        });
        modal.style.display = 'block';
    })
    .catch(error => console.error('Error fetching exercise details:', error));
}

modalCloseButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
});




