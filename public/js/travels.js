document.getElementById('travelForm').onsubmit = async function (e) {
    e.preventDefault();
    const supervisor = document.getElementById('supervisor').value;
    const dep_date = document.getElementById('dep_date').value;
    const return_date = document.getElementById('return_date').value;
    const makkah_hotel = document.getElementById('makkah_hotel').value;
    const madina_hotel = document.getElementById('madina_hotel').value;
    await fetch('/api/travel/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            supervisor: supervisor, 
            dep_date: dep_date, 
            return_date: return_date,
            makkah_hotel: makkah_hotel,
            madina_hotel: madina_hotel
        })
    });
    location.reload(); // Reload to show the new travel

};

async function deleteTravel(_id) {
    await fetch('/api/travel/delete/' + _id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .catch(err => console.log(err));
    location.reload(); // Optionally reload to update the table
}

function editTravel(id) {
    const row = document.getElementById('row-' + id);
    const supervisorCell = row.querySelector('.supervisor');
    const depDateCell = row.querySelector('.dep_date');
    const returnDateCell = row.querySelector('.return_date');
    const editBtn = row.querySelector('.edit-btn');
    const confirmBtn = row.querySelector('.confirm-btn');

    // Replace text with input fields
    supervisorCell.innerHTML = `<input class="edit-input" type="text" value="${supervisorCell.textContent.trim()}" style="width:90%;">`;
    depDateCell.innerHTML = `<input class="edit-input" type="date" value="${depDateCell.dataset.date}" style="width:90%;">`;
    returnDateCell.innerHTML = `<input class="edit-input" type="date" value="${returnDateCell.dataset.date}" style="width:90%;">`;

    editBtn.style.display = 'none';
    confirmBtn.style.display = 'inline-block';
}

async function confirmEdit(id) {
    const row = document.getElementById('row-' + id);
    const supervisorInput = row.querySelector('.supervisor input');
    const depDateInput = row.querySelector('.dep_date input');
    const returnDateInput = row.querySelector('.return_date input');
    const editBtn = row.querySelector('.edit-btn');
    const confirmBtn = row.querySelector('.confirm-btn');

    const supervisor = supervisorInput.value;
    const depDate = depDateInput.value;
    const returnDate = returnDateInput.value;

    await fetch('/api/travel/update/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supervisor, dep_date: depDate, return_date: returnDate })
    });

    // Update the table cells with new values
    row.querySelector('.supervisor').textContent = supervisor;
    row.querySelector('.dep_date').textContent = depDate;
    row.querySelector('.return_date').textContent = returnDate;

    editBtn.style.display = 'inline-block';
    confirmBtn.style.display = 'none';
}