// script.js - Minimalis Premium Tukpul Convert

// FAQ toggle
document.querySelectorAll('.faq .question').forEach(q => {
    q.addEventListener('click', () => {
        const ans = q.nextElementSibling;
        ans.style.maxHeight = ans.style.maxHeight ? null : ans.scrollHeight + 'px';
    });
});

// Form submit
function submitForm(e) {
    e.preventDefault();
    alert("Formulir berhasil dikirim! Admin akan menghubungi Anda segera via WhatsApp.");
    e.target.reset();
}
