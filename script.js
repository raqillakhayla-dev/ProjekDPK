
let daftarPasien = JSON.parse(localStorage.getItem('dataPasien')) || [];
let idYangSedangDiedit = null;

window.onload = function() {
    renderTabel();
};


function simpanData(event) {
    if (event) event.preventDefault(); 

    let nama = document.getElementById('nama').value;
    let hewan = document.getElementById('hewan').value;
    let tanggal = document.getElementById('tanggal').value;
    let telp = document.getElementById('telp').value;

    if (nama === "" || hewan === "" || tanggal === "" || telp === "") {
        alert("Harap isi semua kolom!");
        return;
    }

    if (idYangSedangDiedit) {

        let index = daftarPasien.findIndex(p => p.id === idYangSedangDiedit);
        
        if (index !== -1) {
            daftarPasien[index].nama = nama.toUpperCase();
            daftarPasien[index].hewan = hewan;
            daftarPasien[index].tgl = tanggal;
            daftarPasien[index].telp = telp;
            alert("Data Pasien Berhasil Diperbarui!");
        }
    } else {

        let idUnik = "PAS-" + Math.floor(Math.random() * 1000);
        const dataBaru = { 
            id: idUnik, 
            nama: nama.toUpperCase(), 
            hewan: hewan, 
            tgl: tanggal, 
            telp: telp 
        };
        daftarPasien.push(dataBaru);
        alert("Data Berhasil Didaftarkan!");
    }

    localStorage.setItem('dataPasien', JSON.stringify(daftarPasien));
    renderTabel();
    resetForm();
}


function siapkanEdit(event, id) {
    if (event) event.preventDefault();

    const pasien = daftarPasien.find(p => p.id === id);

    if (pasien) {
        document.getElementById('nama').value = pasien.nama;
        document.getElementById('hewan').value = pasien.hewan;
        document.getElementById('tanggal').value = pasien.tgl;
        document.getElementById('telp').value = pasien.telp;

        idYangSedangDiedit = id;


        document.getElementById('btn-daftar').style.display = 'none';
        document.getElementById('btn-simpan').style.display = ''; 
        document.getElementById('btn-batal').style.display = '';
        
        window.scrollTo(0, 0); 
    }
}


function renderTabel() {
    let tbody = document.getElementById('tabelPasien');
    

    tbody.innerHTML = "";


    daftarPasien.forEach(pasien => {
        let barisBaru = tbody.insertRow(); 
        
        barisBaru.insertCell(0).innerText = pasien.id;
        barisBaru.insertCell(1).innerText = pasien.nama;
        barisBaru.insertCell(2).innerText = pasien.hewan;
        barisBaru.insertCell(3).innerText = pasien.tgl;
        barisBaru.insertCell(4).innerText = pasien.telp;

        let aksiCell = barisBaru.insertCell(5);
        aksiCell.innerHTML = `
            <button type="button" class="btn-edit" onclick="siapkanEdit(event, '${pasien.id}')">EDIT</button>
            <button type="button" class="btn-hapus" onclick="hapusBaris(event, '${pasien.id}')">HAPUS</button>
        `;
    });
}


function hapusBaris(event, id) {
    if (event) event.preventDefault();

    if (confirm("APAKAH ANDA YAKIN INGIN MENGHAPUS DATA?")) {
        daftarPasien = daftarPasien.filter(p => p.id !== id);
        localStorage.setItem('dataPasien', JSON.stringify(daftarPasien));
        renderTabel();
        
        if (idYangSedangDiedit === id) resetForm();
    }
}

function resetForm(event) {
    if (event) event.preventDefault();
    document.getElementById('nama').value = "";
    document.getElementById('hewan').value = "";
    document.getElementById('tanggal').value = "";
    document.getElementById('telp').value = "";
    
    idYangSedangDiedit = null;

    document.getElementById('btn-daftar').style.display = '';
    document.getElementById('btn-simpan').style.display = 'none';
    document.getElementById('btn-batal').style.display = 'none';
}