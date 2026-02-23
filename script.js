// ==============================
// TUKPUL CONVERT PREMIUM SCRIPT
// ==============================

// Smooth Scroll
document.querySelectorAll("a[href^='#']").forEach(anchor => {
    anchor.addEventListener("click", function(e){
        e.preventDefault();
        document.querySelector(this.getAttribute("href"))
            .scrollIntoView({behavior:"smooth"});
    });
});

// Dark / Light Mode
const toggle = document.querySelector(".toggle-mode");
if(toggle){
    toggle.addEventListener("click", ()=>{
        document.body.classList.toggle("light");
        showToast("Mode berhasil diganti 🔥");
    });
}

// Toast Notification
function showToast(message){
    let toast = document.createElement("div");
    toast.classList.add("toast");
    toast.innerText = message;
    document.body.appendChild(toast);

    setTimeout(()=>toast.classList.add("show"),100);
    setTimeout(()=>{
        toast.classList.remove("show");
        setTimeout(()=>toast.remove(),300);
    },3000);
}

// Convert Function
const form = document.querySelector("form");

if(form){
    form.addEventListener("submit", function(e){
        e.preventDefault();

        const provider = document.getElementById("provider").value;
        const nominal = document.getElementById("nominal").value;
        const resultBox = document.getElementById("hasil");
        const btn = document.querySelector(".submit-btn");

        if(!provider || nominal <= 0){
            showToast("Harap isi data dengan benar!");
            return;
        }

        btn.classList.add("loading");
        btn.innerText = "Memproses...";

        setTimeout(()=>{
            let hasil = nominal * provider;
            animateValue(resultBox, 0, hasil, 1000);
            btn.classList.remove("loading");
            btn.innerText = "Hitung & Convert";
            showToast("Convert berhasil dihitung ✅");
        },1200);
    });
}

// Animasi Counter
function animateValue(obj, start, end, duration){
    let startTime = null;
    function animation(currentTime){
        if(!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime)/duration,1);
        const value = Math.floor(progress*(end-start)+start);
        obj.innerHTML = "Estimasi Saldo Diterima: Rp " + value.toLocaleString("id-ID");
        if(progress < 1){
            requestAnimationFrame(animation);
        }
    }
    requestAnimationFrame(animation);
}
