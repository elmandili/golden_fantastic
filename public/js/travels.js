document.getElementById('travelForm').onsubmit = async function (e) {
    e.preventDefault();
    const supervisor = document.getElementById('supervisor').value;
    const date = document.getElementById('date').value;
    await fetch('/api/travel/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supervisor: supervisor, date: date })
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
    const dateCell = row.querySelector('.date');
    const editBtn = row.querySelector('.edit-btn');
    const confirmBtn = row.querySelector('.confirm-btn');

    // Replace text with input fields
    supervisorCell.innerHTML = `<input class="edit-input" type="text" value="${supervisorCell.textContent.trim()}" style="width:90%;">`;
    dateCell.innerHTML = `<input class="edit-input" type="date" value="${dateCell.dataset.date}" style="width:90%;">`;

    editBtn.style.display = 'none';
    confirmBtn.style.display = 'inline-block';
}

async function confirmEdit(id) {
    const row = document.getElementById('row-' + id);
    const supervisorInput = row.querySelector('.supervisor input');
    const dateInput = row.querySelector('.date input');
    const editBtn = row.querySelector('.edit-btn');
    const confirmBtn = row.querySelector('.confirm-btn');

    const supervisor = supervisorInput.value;
    const date = dateInput.value;

    await fetch('/api/travel/update/' + id, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ supervisor, date })
    });

    // Update the table cells with new values
    row.querySelector('.supervisor').textContent = supervisor;
    row.querySelector('.date').textContent = date;
    row.querySelector('.date').dataset.date = date;

    editBtn.style.display = 'inline-block';
    confirmBtn.style.display = 'none';
}