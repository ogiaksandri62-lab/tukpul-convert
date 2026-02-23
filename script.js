let rates = {
    Telkomsel: 0.86,
    Axis: 0.88,
    Tri: 0.89,
    Indosat: 0.87,
    Smartfren: 0.85
};

if(localStorage.getItem("rates")){
    rates = JSON.parse(localStorage.getItem("rates"));
}

function loadProviders(){
    let select = document.getElementById("provider");
    select.innerHTML = "";
    for(let key in rates){
        select.innerHTML += `<option value="${rates[key]}">${key} (${rates[key]})</option>`;
    }
}
loadProviders();

let finalAmount = 0;
let selectedProvider = "";

function calculate(){
    let amount = document.getElementById("amount").value;
    let provider = document.getElementById("provider");
    let rate = provider.value;
    selectedProvider = provider.options[provider.selectedIndex].text;

    if(amount <= 0){
        document.getElementById("result").innerHTML="Masukkan nominal valid.";
        return;
    }

    finalAmount = amount * rate;

    document.getElementById("result").innerHTML=
    "Estimasi diterima: Rp "+ finalAmount.toLocaleString("id-ID");

    document.getElementById("waBtn").style.display="inline-block";
}

function sendWhatsApp(){
    let amount = document.getElementById("amount").value;

    let message = `Halo Admin, saya ingin convert pulsa:

Provider: ${selectedProvider}
Nominal Pulsa: Rp ${parseInt(amount).toLocaleString("id-ID")}
Estimasi Diterima: Rp ${finalAmount.toLocaleString("id-ID")}

Mohon diproses.`;

    window.open("https://wa.me/6289530922938?text="+encodeURIComponent(message));
}Saya ingin convert pulsa:

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
