/* Seamless pass: section order, numbered labels, signature line */
(function(){
 document.documentElement.classList.add("sx-clean");
 function order(){const f=document.getElementById("featured"),b=document.getElementById("baseline-band");if(f&&b&&f.nextElementSibling!==b)f.after(b)}
 function label(){const home=document.getElementById("page-home");if(!home||home.hidden)return;let n=0;
  [...home.children].forEach(sec=>{if(!sec.offsetHeight||sec.matches(".hero,.qtiles,.v-strip,.bl-strip,#instagram"))return;
   const eb=sec.querySelector(".eyebrow");if(!eb||eb.closest(".hero"))return;n++;
   if(!eb.querySelector(".sn")){const sp=document.createElement("span");sp.className="sn";sp.textContent=String(n).padStart(2,"0");eb.prepend(sp)}else eb.querySelector(".sn").textContent=String(n).padStart(2,"0");
   if(!sec.querySelector(".sig-line")){const l=document.createElement("span");l.className="sig-line";l.setAttribute("aria-hidden","true");eb.before(l)}})}
 function run(){order();label();if(window.mwSpacing)window.mwSpacing()}
 [100,700,1600,2600].forEach(t=>setTimeout(run,t));addEventListener("hashchange",()=>[150,800].forEach(t=>setTimeout(run,t)));
})();
