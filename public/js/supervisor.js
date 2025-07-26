document.getElementById("supervisorForm").onsubmit = async function (e) {
    e.preventDefault();
    const form = document.getElementById("supervisorForm");
    const formData = new FormData(form);

    await fetch("/api/supervisor/create", {
        method: "POST",
        body: formData
    })

    location.reload();

}

async function DeleteSupervisor(id){
    await fetch("/api/supervisor/delete/" + id, {
        method: "DELETE"
    })
    
    location.reload();

}

async function EditSupervisor(id) {
    const row = document.getElementById("row-" + id);
    const nameCell = row.querySelector(".name");
    const idCell = row.querySelector(".n_id");
    const imageCell = row.querySelector(".image");
    const editButton = row.querySelector(".edit-btn");
    const confirmButton = row.querySelector(".confirm-btn");
    const passport_number_cell = row.querySelector("#passport_number");
    const moroccan_tel_cell = row.querySelector("#moroccan_tel");
    const saudi_tel_cell = row.querySelector("#saudi_tel");

    nameCell.innerHTML = `<input class="edit-input" name="name" type="text" placeholder="name" value="${nameCell.textContent.trim()}" >`;
    idCell.innerHTML = `<input class="edit-input" name="n_id" type="text" placeholder="name" value="${idCell.textContent.trim()}" >`;
    passport_number_cell.innerHTML = `<input class="edit-input" name="passport_number" type="text" placehoder="passport number" value="${passport_number_cell.textContent.trim()}" >`;
    moroccan_tel_cell.innerHTML = `<input class="edit-input" name="moroccan_tel" type="text" placehoder="passport number" value="${moroccan_tel_cell.textContent.trim()}" >`;
    saudi_tel_cell.innerHTML = `<input class="edit-input" name="saudi_tel" type="text" placehoder="passport number" value="${saudi_tel_cell.textContent.trim()}" >`;
    imageCell.innerHTML = `
    <label for="edit-image"> <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> عدل الصورة </label>
    <input style="display: none;" id="edit-image" name="image" type="file" accept="image/*"></input>`

    editButton.style.display = "none";
    confirmButton.style.display = "inline-block";
}

async function ConfirmEdit(id) {
    const row = document.getElementById("row-" + id);
    const inputName = row.querySelector(".name input");
    const inputId = row.querySelector(".n_id input");
    const inputImage = row.querySelector(".image input[type='file']");
    const passport_number_input = row.querySelector("#passport_number input");
    const moroccan_tel_input = row.querySelector("#moroccan_tel input");
    const saudi_tel_input = row.querySelector("#saudi_tel input");
    const editButton = row.querySelector(".edit-btn");
    const confirmButton = row.querySelector(".confirm-btn");


    const name = inputName.value;
    const n_id = inputId.value;
    const passport_number = passport_number_input.value;
    const moroccan_tel = moroccan_tel_input.value;
    const saudi_tel = saudi_tel_input.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("n_id", n_id);
    formData.append("passport_number", passport_number);
    formData.append("moroccan_tel", moroccan_tel);
    formData.append("saudi_tel", saudi_tel);

    if (inputImage && inputImage.files.length > 0) {
        formData.append("image", inputImage.files[0]);
    }

    await fetch('/api/supervisor/update/' + id, {
        method: 'PUT',
        body: formData
    });

    location.reload();
}