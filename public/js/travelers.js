document.getElementById('travelerForm').onsubmit = async function (e) {
    e.preventDefault();
    const form = document.getElementById('travelerForm');
    const formData = new FormData(form);

    const res = await fetch('/api/traveler/create/' + window.travel_id, {
        method: 'POST',
        body: formData
    })

    if (res.status === 302) {
        const error = document.getElementById("not_found_error");
        error.style.display = 'flex'
        console.log("already exist");
    }

    if(res.status === 200) {

        location.reload();
    }
};

document.getElementById('image').addEventListener('change', ()=>{
    const preview_image = document.getElementById('preview_image');
    const image_input = document.getElementById('image');

    const file = image_input.files[0];

    if(file) {
        const reader = new FileReader();

        reader.onload = () => {
            preview_image.src = reader.result;
        }

        reader.readAsDataURL(file);
    }
})

document.getElementById("print_id").style.display = "initial";


document.getElementById('print_id').onclick = function () {
    const body = document.getElementById("body")
    body.className = '';
    body.classList.add("print_cards");
    window.print();
};

const fileInput = document.getElementById('image');
fileInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file && !file.type.startsWith('image/')) {
        alert("Only image files are allowed!");
        this.value = ''; // clear the input
    }
    else {
        console.log("selected");
    }
});
document.getElementById('print_table').onclick = function () {
    const body = document.getElementById("body");
    body.className = '';
    body.classList.add('print_table');
    window.print();
}

async function deleteTravel(_id) {
    await fetch('/api/traveler/delete/' + _id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .catch(err => console.log(err));
    location.reload(); // Optionally reload to update the table
}

function Edit_Traveler(id) {
    const row = document.getElementById('row-' + id);
    const edit = document.getElementById('edit-' + id);

    row.style.display = 'none';
    edit.style.display = 'table-row';
}

async function Confirm_Edit(id) {
    const edit = document.getElementById('edit-' + id);
    const image = edit.querySelector("#image-" + id)
    const name = edit.querySelector("#name").value
    const n_id = edit.querySelector("#n_id").value
    const passport_number = edit.querySelector("#passport_number").value
    const makkah_hotel = edit.querySelector("#makkah_hotel-" + id).value;
    const madina_hotel = edit.querySelector("#madina_hotel-" + id).value;
    const room_type = edit.querySelector("#room_type-" + id).value


    

    

    // Prepare FormData for PUT request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('n_id', n_id);
    formData.append('passport_number', passport_number);
    formData.append('makkah_hotel', makkah_hotel);
    formData.append('madina_hotel', madina_hotel);
    formData.append('room_type', room_type);
    if (image && image.files.length > 0) {
        console.log("image append")
        formData.append('image', image.files[0]);
    }

    await fetch('/api/traveler/update/' + id, {
        method: 'PUT',
        body: formData
    });




    window.location.reload();
}


