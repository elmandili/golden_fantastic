document.getElementById("hotelForm").onsubmit = async function (e) {
    e.preventDefault();
    const form = document.getElementById("hotelForm");
    const form_data = new FormData(form);
    console.log(form_data)

    await fetch("/api/hotel/create", {
        method: "POST",
        body: form_data
    })

    window.location.reload();
}

async function Delete_Hotel(id) {
    await fetch('/api/hotel/delete/' + id, {
        method: "DELETE",
    })

    window.location.reload();
}

function Edit_Hotel(id) {
    const row = document.getElementById("row-" + id);
    const hotel_name_cell = row.querySelector("#hotel_name_cell")
    const hotel_location_cell = row.querySelector("#hotel_location_cell")
    const hotel_tel_cell = row.querySelector("#hotel_tel_cell")
    const hotel_city_cell = row.querySelector("#hotel_city_cell")
    const edit_btn = row.querySelector("#edit_btn");
    const confirm_btn = row.querySelector("#confirm_btn");
    edit_btn.style.display = "none",
    confirm_btn.style.display = "inline-flex"

    hotel_name_cell.innerHTML = `<input value="${hotel_name_cell.textContent.trim()}">`
    hotel_location_cell.innerHTML = `<input value="${hotel_location_cell.textContent.trim()}">`
    hotel_tel_cell.innerHTML = `<input value="${hotel_tel_cell.textContent.trim()}">`
    hotel_city_cell.innerHTML = `<input value="${hotel_city_cell.textContent.trim()}">`
}

async function Confirm_Edit(id) {
    const row = document.getElementById("row-" + id);
    const hotel_name = row.querySelector("#hotel_name_cell input").value
    const hotel_location = row.querySelector("#hotel_location_cell input").value
    const hotel_tel = row.querySelector("#hotel_tel_cell input").value
    const hotel_city = row.querySelector("#hotel_city_cell input").value

    const form_data = new FormData();
    form_data.append("hotel_name", hotel_name);
    form_data.append("hotel_location", hotel_location);
    form_data.append("hotel_tel", hotel_tel);
    form_data.append("hotel_city", hotel_city);

    await fetch('/api/hotel/update/' + id, {
        method: "PUT",
        body: form_data
    })

    window.location.reload();
}