function tambahPegawai(event) {
    event.preventDefault(); // Prevent form submission

    // Input data pegawai
    const nama = document.getElementById("nama").value;
    const umur = document.getElementById("umur").value;
    const jabatan = document.getElementById("jabatan").value;
    const status = document.getElementById("status").value;
    const errorMessage = document.getElementById("error-message");

    if (!nama || !umur) {
        errorMessage.textContent = "Nama dan Umur wajib diisi!";
        return; 
    }
    errorMessage.textContent = ""; // Reset pesan error

    // Hitung Gaji Pokok berdasarkan jabatan
    let gajiPokok = 0;
    switch (jabatan) {
        case "Manajer":
            gajiPokok = 15000000;
            break;
        case "Asisten":
            gajiPokok = 8000000;
            break;
        case "Staff":
            gajiPokok = 5000000;
            break;
    }

    // Format Gaji ke Rupiah
    // Format Gaji Pokok
    const formattedGaji = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(gajiPokok);

    // Hitung tunjangan Jabatan
    const tunjanganJabatan = gajiPokok*0.15;
    const tunjanganJabatanFormatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(tunjanganJabatan);

    // Hitung BPJS
    const BPJS = gajiPokok*0.10;
    const BPJSFormatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(BPJS);

    const tunjanganKeluarga = gajiPokok*0.20;
    // Hitung tunjangan Keluarga
    if (status === "Menikah") {
        tunjanganKeluargaFormatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(gajiPokok*0.10);
    } else {
        tunjanganKeluargaFormatted = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(0);
    }

    // Hitung Total Gaji
    const totalGaji = gajiPokok + tunjanganJabatan + BPJS + tunjanganKeluarga;
    const totalGajiFormatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
    }).format(totalGaji);

    // Get a reference to the table body
    const tableBody = document.getElementById("pegawaiTableBody");

    // Create a new table row element
    const newRow = document.createElement("tr");
    newRow.className = "border-b hover:bg-gray-50"; // Add styling for the new row

    // Create the HTML content for the new row
    newRow.innerHTML = `
    <td class="py-3 px-4">${nama}</td>
    <td class="py-3 px-4">${umur}</td>
    <td class="py-3 px-4">${jabatan}</td>
    <td class="py-3 px-4">${status}</td>
    <td class="py-3 px-4">${formattedGaji}</td>
    <td class="py-3 px-4">${tunjanganJabatanFormatted}</td>
    <td class="py-3 px-4">${BPJSFormatted}</td>
    <td class="py-3 px-4">${tunjanganKeluargaFormatted}</td>
    <td class="py-3 px-4">${totalGajiFormatted}</td>
`;

    // Append the new row to the table body
    tableBody.appendChild(newRow);

    // Reset the form fields for the next entry
    document.getElementById("pegawaiForm").reset();
}