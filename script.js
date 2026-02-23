// ==========================================
// DAFTAR RATE (Ubah angka di bawah ini saja)
// ==========================================
const daftarRate = {
    "Telkomsel": 0.86,  // Contoh: 0.88 artinya potongan 12%
    "Indosat": 0.88,
    "XL/Axis": 0.87,
    "Three": 0.89
};

// Rate awal saat web pertama dibuka (mengikuti Telkomsel)
let currentRate = daftarRate["Telkomsel"];

// 1. Fungsi Hitung Otomatis
function calculate() {
    const nominal = document.getElementById('amount').value;
    const terima = nominal * currentRate;
    
    // Update tampilan nominal di Step 1 dan Step 3
    const formatRupiah = "Rp " + Math.floor(terima).toLocaleString('id-ID');
    document.getElementById('display-result').innerText = formatRupiah;
    document.getElementById('final-amount').innerText = formatRupiah;
}

// 2. Event Listener Input Nominal
document.getElementById('amount').addEventListener('input', calculate);

// 3. Logika Klik Provider
document.querySelectorAll('.provider-item').forEach(item => {
    item.addEventListener('click', function() {
        // Pindahkan tanda warna biru (class active)
        document.querySelector('.provider-item.active').classList.remove('active');
        this.classList.add('active');
        
        // Ambil nama provider yang diklik
        const namaProvider = this.innerText.trim();
        
        // Ambil rate dari daftarRate di atas berdasarkan nama
        currentRate = daftarRate[namaProvider];
        
        // Hitung ulang otomatis setelah ganti provider
        calculate();
    });
});

// 4. Fungsi Pindah Halaman (Step by Step)
function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    
    document.getElementById('step' + step).classList.add('active');
    for(let i=1; i<=step; i++) {
        document.getElementById('step' + i + '-dot').classList.add('active');
    }

    // Ambil data untuk ringkasan di Tahap Konfirmasi
    if(step === 3) {
        const bank = document.getElementById('bank-name').value;
        const norek = document.getElementById('acc-number').value;
        const nama = document.getElementById('acc-name').value;
        
        document.getElementById('confirm-bank-info').innerText = bank + " - " + norek;
        document.getElementById('confirm-name-info').innerText = "a.n " + nama;
    }
}

// 5. Fungsi Kirim WhatsApp
function sendToWA() {
    const provider = document.querySelector('.provider-item.active').innerText;
    const nominal = document.getElementById('amount').value;
    const bank = document.getElementById('bank-name').value;
    const norek = document.getElementById('acc-number').value;
    const nama = document.getElementById('acc-name').value;
    const terima = document.getElementById('final-amount').innerText;

    const pesan = `Halo Admin Tukpul, saya mau convert:\n\n` +
                  `Provider: ${provider}\n` +
                  `Nominal: ${nominal}\n` +
                  `Rate: ${currentRate}\n` +
                  `Terima Saldo: ${terima}\n` +
                  `Tujuan: ${bank}\n` +
                  `No. Rek/HP: ${norek}\n` +
                  `Atas Nama: ${nama}`;

    // Gunakan nomor WA kamu di sini
    window.open(`https://wa.me/6289530922938?text=${encodeURIComponent(pesan)}`, '_blank');
}
