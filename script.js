class Person {
    constructor(name, surname) {
        this.name = name;
        this.surname = surname;
    }
}

const peopleArray = loadPeopleArrayFromLocalStorage() || [];

function loadPeopleArrayFromLocalStorage() {
    return JSON.parse(localStorage.getItem('peopleArray')) || [];
}

function savePeopleArrayToLocalStorage() {
    localStorage.setItem('peopleArray', JSON.stringify(peopleArray));
}

function padalinimas() {
    const fullName = document.getElementById('fullName').value;
    const [name, ...surnameArray] = fullName.split(' ');

    peopleArray.push(new Person(name, surnameArray.join(' ')));

    document.getElementById('result').innerHTML = `<p>Vardas: ${name}</p><p>Pavardė: ${surnameArray.join('')}</p>`;

    savePeopleArrayToLocalStorage();
    displayPeopleTable();

    // Pridėti naują įrašą į lentelę iš karto po įvedimo
    const tableBody = document.querySelector('#peopleTable tbody');
    const newRow = tableBody.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = surnameArray.join('');
}

const deleteFirstPerson = () => deletePerson(0);
const deleteLastPerson = () => deletePerson(peopleArray.length -1);

const deletePerson = index => {
    if (peopleArray.length > 0) {
        peopleArray.splice(index, 1);
        savePeopleArrayToLocalStorage();
        displayPeopleTable();
    }
}

function displayPeopleTable() {
    const tableBody = document.querySelector('#peopleTable tbody');
    tableBody.innerHTML = '';

    peopleArray.forEach(person => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = person.name;
        row.insertCell(1).textContent = person.surname;
    });
}

// Inicijuoti lentelės atvaizdavimą
displayPeopleTable();
