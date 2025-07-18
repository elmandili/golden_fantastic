document.getElementById('travelerForm').onsubmit = async function (e) {
    e.preventDefault();
    const form = document.getElementById('travelerForm');
    const formData = new FormData(form);

    await fetch('/api/traveler/create/' + window.travel_id, {
        method: 'POST',
        body: formData
    });
    location.reload();
};

document.getElementById('toggle-preview-btn').onclick = function () {
    const previewSection = document.getElementById('preview-section');
    if (previewSection.style.display === 'none') {
        previewSection.style.display = 'flex';
        this.textContent = 'إخفاء المعاينة';
    } else {
        previewSection.style.display = 'none';
        this.textContent = 'معاينة بطاقات التعريف';
    }
};

document.getElementById('print-cards-btn').onclick = function () {
    // Make sure the preview section is visible before printing
    const previewSection = document.getElementById('preview-section');
    if (previewSection.style.display === 'none' || previewSection.style.display === '') {
        previewSection.style.display = 'flex';
    }
    window.print();
};

async function deleteTravel(_id) {
    await fetch('/api/traveler/delete/' + _id, {
        method: "DELETE"
    })
        .then(res => res.json())
        .catch(err => console.log(err));
    location.reload(); // Optionally reload to update the table
}

function editTravel(id) {
    const row = document.getElementById('row-' + id);
    const nameCell = row.querySelector('.traveler_name');
    const idCell = row.querySelector('.traveler_n_id');
    const imageCell = row.querySelector('.traveler_image');
    const editBtn = row.querySelector('.edit-btn');
    const confirmBtn = row.querySelector('.confirm-btn');

    // Replace text with input fields
    nameCell.innerHTML = `<input class="edit-input" type="text" value="${nameCell.textContent.trim()}" style="width:90%; text-align: right;">`;
    idCell.innerHTML = `<input class"edit-input" type="text" value="${idCell.textContent.trim()}" style="width:90%; text-align: right;">`;

    // Add file input for image update
    imageCell.innerHTML = `
        <input type="file" class="edit-image-input" accept="image/*" style="width:90%;">
        <br>
        <small>اختر صورة جديدة إذا أردت التغيير</small>
    `;

    editBtn.style.display = 'none';
    confirmBtn.style.display = 'inline-block';
}

async function confirmEdit(id) {
    const row = document.getElementById('row-' + id);
    const nameInput = row.querySelector('.traveler_name input');
    const idInput = row.querySelector('.traveler_n_id input');
    const imageInput = row.querySelector('.traveler_image input[type="file"]');
    const editBtn = row.querySelector('.edit-btn');
    const confirmBtn = row.querySelector('.confirm-btn');

    const name = nameInput.value;
    const n_id = idInput.value;

    // Prepare FormData for PUT request
    const formData = new FormData();
    formData.append('name', name);
    formData.append('n_id', n_id);
    if (imageInput && imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
    }

    await fetch('/api/traveler/update/' + id, {
        method: 'PUT',
        body: formData
    });

    // Update the table cells with new values
    row.querySelector('.traveler_name').textContent = name;
    row.querySelector('.traveler_n_id').textContent = n_id;
    // Optionally, you can reload the page to show the new image
    // location.reload();

    editBtn.style.display = 'inline-block';
    confirmBtn.style.display = 'none';
    window.location.reload();
}