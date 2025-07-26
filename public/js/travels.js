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

function Edit_Travel(id) {
    const row = document.getElementById('row-' + id);
    const edit = document.getElementById('edit-' + id);

    row.style.display = 'none';
    edit.style.display = 'table-row';
}

async function Confirm_Edit_Travel(id) {
    const edit = document.getElementById('edit-' + id);

    const supervisor_name = edit.querySelector("#supervisor_name").value;
    const dep_date = edit.querySelector("#dep_date").value;
    const return_date = edit.querySelector("#return_date").value;
    const makkah_hotel = edit.querySelector("#makkah_hotel").value;
    const madina_hotel = edit.querySelector("#madina_hotel").value;

    await fetch('/api/travel/update/' + id, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            supervisor: supervisor_name,
            dep_date: dep_date,
            return_date: return_date,
            makkah_hotel: makkah_hotel,
            madina_hotel: madina_hotel
        })
    });

    // Optionally reload to show changes
    window.location.reload();
}