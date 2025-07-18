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

    nameCell.innerHTML = `<input class="edit-input" name="name" type="text" placeholder="name" value="${nameCell.textContent.trim()}" >`;
    idCell.innerHTML = `<input class="edit-input" name="n_id" type="text" placeholder="name" value="${idCell.textContent.trim()}" >`;
    imageCell.innerHTML = `
    <label for="edit-image"> <i class="fa-solid fa-arrow-up-from-bracket" aria-hidden="true"></i> عدل الصورة </label>
    <input style="display: none;" id="edit-image" name="image" type="file" accept="image/*"></input>`

    editButton.style.display = "none";
    confirmButton.style.display = "inline-block";
}

async function ConfirmEdit(id) {
    const row = document.getElementById("row-" + id); // Fix: correct row id selector
    const inputName = row.querySelector(".name input"); // Fix: select input inside .name
    const inputId = row.querySelector(".n_id input");
    const inputImage = row.querySelector(".image input[type='file']");
    const editButton = row.querySelector(".edit-btn");
    const confirmButton = row.querySelector(".confirm-btn");

    const name = inputName.value;
    const n_id = inputId.value;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("n_id", n_id);

    if (inputImage && inputImage.files.length > 0) {
        formData.append("image", inputImage.files[0]);
    }

    await fetch('/api/supervisor/update/' + id, {
        method: 'PUT',
        body: formData
    });

    location.reload();
}