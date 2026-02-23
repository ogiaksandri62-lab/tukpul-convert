const rates = {
    "Telkomsel": 0.86,
    "XL/Axis": 0.87,
    "Indosat": 0.88,
    "Tri": 0.88
};

const amountInput = document.getElementById('amount');
const providerSelect = document.getElementById('provider');
const resultDisplay = document.getElementById('result');

function calculate() {
    const provider = providerSelect.value;
    const amount = amountInput.value || 0;
    const rate = rates[provider];
    const total = amount * rate;
    
    resultDisplay.innerText = "Rp " + total.toLocaleString('id-ID');
}

amountInput.addEventListener('input', calculate);
providerSelect.addEventListener('change', calculate);

function sendToWA() {
    const phone = "6289530922938"; // Nomor Anda
    const provider = providerSelect.value;
    const amount = amountInput.value;
    const result = resultDisplay.innerText;

    if (amount < 50000) {
        alert("Minimal convert adalah 50.000");
        return;
    }

    const message = `Halo Admin ConvertX, saya mau convert pulsa:\n\n` +
                    `- Provider: ${provider}\n` +
                    `- Nominal: Rp ${parseInt(amount).toLocaleString('id-ID')}\n` +
                    `- Terima Saldo: ${result}\n\n` +
                    `Mohon instruksi selanjutnya.`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}
