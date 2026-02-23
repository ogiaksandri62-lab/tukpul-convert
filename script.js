// =======================================
// TUKPUL CONVERT - PREMIUM FINAL SCRIPT
// =======================================

// Nomor Admin WhatsApp
const ADMIN_WA = "6289530922938";

// =======================
// SMOOTH SCROLL
// =======================
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({behavior:"smooth"});
        }
    });
});

// =======================
// DARK / LIGHT MODE
// =======================
const toggle = document.querySelector(".toggle-mode");
if(toggle){
    toggle.addEventListener("click", ()=>{
        document.body.classList.toggle("light");
        showToast("Mode berhasil diganti 🔥");
    });
}

// =======================
// TOAST NOTIFICATION
// =======================
function showToast(message){
    let toast = document.createElement("div");
    toast.className = "toast";
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(()=>toast.classList.add("show"),100);

    setTimeout(()=>{
        toast.classList.remove("show");
        setTimeout(()=>toast.remove(),300);
    },3000);
}

// =======================
// ANIMATE COUNTER
// =======================
function animateValue(obj, start, end, duration){
    let startTime = null;

    function animation(currentTime){
        if(!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime)/duration,1);
        const value = Math.floor(progress*(end-start)+start);

        obj.innerHTML = "Estimasi Saldo Diterima: Rp " + 
                        value.toLocaleString("id-ID");

        if(progress < 1){
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// =======================
// FORM CONVERT + AUTO WA
// =======================
const form = document.querySelector("form");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const providerSelect = document.getElementById("provider");
        const providerText = providerSelect.options[providerSelect.selectedIndex]?.text;
        const rate = providerSelect.value;

        const nominal = document.getElementById("nominal").value;
        const rekeningInput = document.querySelector("input[placeholder='Nomor Rekening / E-Wallet']");
        const rekening = rekeningInput ? rekeningInput.value : "";

        const resultBox = document.getElementById("hasil");
        const btn = document.querySelector(".submit-btn");

        // VALIDASI
        if(!rate || nominal <= 0 || rekening.trim() === ""){
            showToast("Harap isi semua data dengan benar!");
            return;
        }

        btn.classList.add("loading");
        btn.innerText = "Memproses...";

        setTimeout(()=>{

            let hasil = nominal * rate;

            // Animasi hasil
            animateValue(resultBox, 0, hasil, 1000);

            // Format pesan WhatsApp
            let pesan = 
`Halo Admin TukPul Convert

Saya ingin convert pulsa:

Provider: ${providerText}
Nominal Pulsa: Rp ${Number(nominal).toLocaleString("id-ID")}
Estimasi Diterima: Rp ${Number(hasil).toLocaleString("id-ID")}
Rekening/E-Wallet: ${rekening}

Mohon diproses 🙏`;

            let encodedPesan = encodeURIComponent(pesan);
            let urlWA = `https://wa.me/${ADMIN_WA}?text=${encodedPesan}`;

            // Buka WhatsApp
            setTimeout(()=>{
                window.open(urlWA, "_blank");
            },800);

            btn.classList.remove("loading");
            btn.innerText = "Hitung & Convert";

            showToast("Data siap dikirim ke WhatsApp 🚀");

        },1200);
    });
}
