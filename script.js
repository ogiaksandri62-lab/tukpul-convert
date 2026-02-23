const rates = {
    "Telkomsel": 0.86,
    "XL/Axis": 0.87,
    "Indosat": 0.89,
    "Tri": 0.90
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
    const phone = "6289530922938"; 
    const provider = providerSelect.value;
    const amount = amountInput.value;
    const result = resultDisplay.innerText;

    if (amount < 50000) {
        alert("Minimal convert di Tukpul Convert adalah 50.000");
        return;
    }

    const message = `Halo Admin Tukpul Convert, saya mau tukar pulsa:\n\n` +
                    `• Provider: ${provider}\n` +
                    `• Nominal: Rp ${parseInt(amount).toLocaleString('id-ID')}\n` +
                    `• Saya Terima: ${result}\n\n` +
                    `Mohon diproses ya Min, terima kasih.`;
    
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
}
