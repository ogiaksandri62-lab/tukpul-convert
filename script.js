document.getElementById("convertForm").addEventListener("submit", function(e){
  e.preventDefault();

  const provider = document.getElementById("provider").value;
  const nominal = parseInt(document.getElementById("nominal").value);
  const tujuan = document.getElementById("tujuan").value;

  let rate = 0.85;
  if(provider === "Indosat") rate = 0.88;
  if(provider === "XL / Axis") rate = 0.87;
  if(provider === "Tri") rate = 0.90;

  const hasil = nominal * rate;

  const text = `Halo Tukpul Convert,%0A%0ASaya ingin convert pulsa:%0A
Provider: ${provider}%0A
Nominal: Rp ${nominal.toLocaleString()}%0A
Tujuan: ${tujuan}%0A
Perkiraan diterima: Rp ${hasil.toLocaleString()}`;

  document.getElementById("hasil").innerHTML = `
    <b>Rate:</b> ${(rate*100)}%<br>
    <b>Diterima:</b> Rp ${hasil.toLocaleString()}<br><br>
    <a href="https://wa.me/6289530922938?text=${text}" 
       target="_blank"
       style="color:#16a34a;font-weight:bold;">
       👉 Order via WhatsApp
    </a>
  `;
});