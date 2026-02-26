let currentProvider = "";
let currentRate = 0;

// 1. Fungsi saat gambar Provider diklik
function selectProvider(name, rate) {
    currentProvider = name;
    currentRate = rate;
    
    // Pindah ke Step 2 (Form Input)
    nextStep(2);
    
    // Reset estimasi saldo saat ganti provider
    calculateRate();
}

// 2. Fungsi pindah halaman (Step)
function nextStep(step) {
    // Sembunyikan semua halaman
    document.querySelectorAll('.form-step').forEach(section => {
        section.style.display = 'none';
    });

    // Munculkan halaman yang dipilih
    const target = document.getElementById('step' + step);
    if (target) {
        target.style.display = 'block';
    }
}

// 3. Fungsi hitung saldo otomatis pas ngetik nominal
function calculateRate() {
    const inputNominal = document.getElementById('amount').value;
    const displayHasil = document.getElementById('est-receive');
    
    if (inputNominal && inputNominal >= 10000) {
        const hasil = Math.floor(inputNominal * currentRate);
        displayHasil.innerText = "Rp " + hasil.toLocaleString('id-ID');
    } else {
        displayHasil.innerText = "Rp 0";
    }
}

// 4. Fungsi kirim data ke WhatsApp
function sendToWA() {
    const pengirim = document.getElementById('sender-number').value;
    const nominal = document.getElementById('amount').value;
    const rekening = document.getElementById('acc-number').value;
    const nama = document.getElementById('acc-name').value;
    const terima = document.getElementById('est-receive').innerText;

    if(!pengirim || !nominal || !rekening) {
        alert("Harap isi semua data!");
        return;
    }

    const pesan = `Halo Admin, saya mau convert pulsa:%0A%0A` +
        `*Provider:* ${currentProvider}%0A` +
        `*Nomor Pengirim:* ${pengirim}%0A` +
        `*Nominal:* ${nominal}%0A` +
        `*Rekening/E-Wallet:* ${rekening}%0A` +
        `*Atas Nama:* ${nama}%0A` +
        `*Saldo Diterima:* ${terima}`;

    window.open(`https://wa.me/6281234567890?text=${pesan}`, '_blank');
}
