let currentRate = 0.85;

// Fungsi pindah halaman (Tombol Lanjut & Kembali)
function nextStep(step) {
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    
    document.getElementById('step' + step).classList.add('active');
    for(let i=1; i<=step; i++) {
        document.getElementById('step' + i + '-dot').classList.add('active');
    }

    // Mengambil data untuk ringkasan di Tahap 3
    if(step === 3) {
        const bank = document.getElementById('bank-name').value;
        const norek = document.getElementById('acc-number').value;
        const nama = document.getElementById('acc-name').value;
        
        document.getElementById('confirm-bank-info').innerText = bank + " - " + norek;
        document.getElementById('confirm-name-info').innerText = "a.n " + nama;
    }
}

// Menghitung uang otomatis saat nominal diisi
document.getElementById('amount').addEventListener('input', function() {
    const nominal = this.value;
    const terima = nominal * currentRate;
    document.getElementById('display-result').innerText = "Rp " + terima.toLocaleString('id-ID');
    document.getElementById('final-amount').innerText = "Rp " + terima.toLocaleString('id-ID');
});

// Mengatur pilihan Provider (Telkomsel, Indosat, dll)
document.querySelectorAll('.provider-item').forEach(item => {
    item.addEventListener('click', function() {
        document.querySelector('.provider-item.active').classList.remove('active');
        this.classList.add('active');
        currentRate = parseFloat(this.dataset.rate);
        
        // Update hitungan otomatis saat ganti provider
        const event = new Event('input');
        document.getElementById('amount').dispatchEvent(event);
    });
});

// Fungsi Kirim Data ke WhatsApp
function sendToWA() {
    const provider = document.querySelector('.provider-item.active').innerText;
    const nominal = document.getElementById('amount').value;
    const bank = document.getElementById('bank-name').value;
    const norek = document.getElementById('acc-number').value;
    const nama = document.getElementById('acc-name').value;

    const pesan = `Halo Admin Tukpul, saya mau convert:\n\n` +
                  `Provider: ${provider}\n` +
                  `Nominal: ${nominal}\n` +
                  `Tujuan: ${bank}\n` +
                  `No. Rek/HP: ${norek}\n` +
                  `Atas Nama: ${nama}`;

    // Gunakan nomor WA kamu di sini (628...)
    window.open(`https://wa.me/6289530922938?text=${encodeURIComponent(pesan)}`, '_blank');
}
