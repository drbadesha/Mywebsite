/* Page heroes: put a photo behind the heading of selected pages */
(function(){
 const HERO={"protocols":"assets/images/pages/hero-protocols.webp","baseline":"assets/images/pages/hero-baseline.webp","faq":"assets/images/pages/hero-faq.webp","goals":"assets/images/pages/hero-goals.webp","lab-tests":"assets/images/pages/hero-lab-tests.webp","quiz":"assets/images/pages/hero-quiz.webp","shop":"assets/images/pages/hero-shop.webp"};
 function apply(){
  const key=(location.hash||"").replace(/^#/,"").split(/[?&]/)[0];const img=HERO[key];if(!img)return;
  const main=[...document.querySelectorAll("main")].find(m=>!m.hidden&&m.offsetParent!==null);if(!main||main.querySelector(".ph-hero"))return;
  const h=[...main.querySelectorAll("h1,h2")].find(x=>x.offsetParent!==null&&!x.closest(".ph-hero"));if(!h)return;
  const parts=[];let e=h.previousElementSibling;if(e&&e.classList.contains("eyebrow"))parts.push(e);parts.push(h);
  let n=h.nextElementSibling;if(n&&n.tagName==="P")parts.push(n);
  const hero=document.createElement("div");hero.className="ph-hero";hero.style.backgroundImage=`url(${img})`;
  const w=document.createElement("div");w.className="wrap";const inn=document.createElement("div");inn.className="ph-in";
  parts.forEach(p=>{const c=p.cloneNode(true);c.removeAttribute("id");c.style.marginTop="";inn.appendChild(c);p.classList.add("ph-src-hidden")});
  w.appendChild(inn);hero.appendChild(w);main.insertBefore(hero,main.firstElementChild);main.classList.add("has-ph");
  const sec=h.closest("section");if(sec)sec.classList.add("ph-first");
 }
 const run=()=>{[80,400,1000,2000].forEach(t=>setTimeout(apply,t))};
 addEventListener("hashchange",run);run();
})();
