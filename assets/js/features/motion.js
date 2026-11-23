/* MediSpa-style motion: headings write in, blocks fade up in sequence, counters, process line, moving reviews */
(function(){
 const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
 if(RM||!("IntersectionObserver" in window))return;
 const root=document.documentElement;root.classList.add("mx");
 const SKIP=".hero,.hero-full,.t-banner,.ph-hero,.at-hero,.ab-hero,.philo-stage,.ticker,.qtiles,.vtrack,.sp,.drawer,header,footer .fine,#intro,.mx-skip";
 const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("mx-on");io.unobserve(en.target)}}),{rootMargin:"0px 0px -8% 0px",threshold:.05});
 function splitHead(h){if(h.querySelector(".wi"))return;let wi=0;(function sp(node){[...node.childNodes].forEach(n=>{
   if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(t=>{if(!t)return;if(/^\s+$/.test(t)){f.append(document.createTextNode(t));return}const o=document.createElement("span");o.className="wl";const i=document.createElement("span");i.className="wi";i.style.setProperty("--i",wi++);i.textContent=t;o.append(i);f.append(o)});n.replaceWith(f)}
   else if(n.nodeType===1&&!n.classList.contains("wl"))sp(n)})})(h)}
 function inView(el){const r=el.getBoundingClientRect();return r.top<innerHeight*.92&&r.bottom>0}
 function tag(main){
  // headings
  main.querySelectorAll("h2,.mw2-h1,.c-hero h1").forEach(h=>{if(h.closest(SKIP)||h.dataset.mxh)return;h.dataset.mxh=1;splitHead(h);
   const w=h.querySelectorAll(".wi");w.forEach((x,k)=>x.style.setProperty("--i",k));h.classList.add("mx-h");if(inView(h))requestAnimationFrame(()=>h.classList.add("mx-on"));else io.observe(h)});
  // blocks: children of each section's wrap; grids/lists stagger their own children
  const blocks=[];
  [...main.children].forEach(sec=>{if(sec.matches(SKIP))return;const wraps=sec.matches(".wrap")?[sec]:[...sec.querySelectorAll(":scope > .wrap, :scope > div > .wrap")];(wraps.length?wraps:[sec]).forEach(w=>[...w.children].forEach(c=>blocks.push(c)))});
  blocks.forEach(b=>{if(b.closest(SKIP)||b.matches(SKIP)||b.dataset.mx||b.offsetHeight===0)return;
   const kids=[...b.children].filter(k=>k.offsetHeight>0);const cs=getComputedStyle(b);
   const isList=kids.length>=3&&(cs.display.includes("grid")||cs.display.includes("flex"))&&!b.matches(".rev-wrap,.rev-grid,.vnav,.jchips,.chips")&&!(b.scrollWidth>b.clientWidth+4||/auto|scroll/.test(cs.overflowX));
   const items=isList?kids:[b];b.dataset.mx=1;
   items.forEach((it,k)=>{if(it.matches("h2,.mx-h")||it.querySelector(":scope > h2.mx-h")&&!isList){}
     if(it.matches("h2"))return;it.classList.add("mx-i");it.style.setProperty("--d",isList?Math.min(k,6):0);
     if(inView(it))requestAnimationFrame(()=>it.classList.add("mx-on"));else io.observe(it)})});
 }
 // counters in the hero proof row
 function counters(){document.querySelectorAll(".hero-proof b").forEach(el=>{if(el.dataset.cnt)return;const m=el.textContent.match(/^(\d+)(.*)$/);if(!m)return;el.dataset.cnt=1;const target=+m[1],post=m[2];el.textContent="0"+post;
   const go=()=>{const s=performance.now();(function f(n){const k=Math.min(1,(n-s)/1600),e=1-Math.pow(1-k,3);el.textContent=Math.round(target*e)+post;if(k<1)requestAnimationFrame(f)})(s)};
   const o=new IntersectionObserver(es=>{if(es[0].isIntersecting){o.disconnect();setTimeout(go,500)}});o.observe(el)})}
 // process line on the first-visit steps
 function processLine(){document.querySelectorAll(".mw2-steps").forEach(processLine1)}function processLine1(ol){if(!ol||ol.dataset.pl)return;ol.dataset.pl=1;const lis=[...ol.children];
   const upd=()=>{if(!ol.offsetParent)return;const r=ol.getBoundingClientRect(),mid=innerHeight*.6,p=Math.max(0,Math.min(1,(mid-r.top)/r.height));ol.style.setProperty("--pl",p.toFixed(3));lis.forEach(li=>li.classList.toggle("done",li.getBoundingClientRect().top+22<mid))};
   addEventListener("scroll",upd,{passive:true});addEventListener("hashchange",()=>setTimeout(upd,300));upd()}
 // reviews become a slow moving strip
 function reviews(){const g=document.querySelector(".reviews .rev-grid");if(!g||g.dataset.mq)return;g.dataset.mq=1;
   [...g.children].forEach(f=>{const who=f.querySelector(".who strong");if(who&&!f.querySelector(".ini")){const ini=who.textContent.replace(/[^A-Za-z ]/g,"").trim().split(/\s+/).map(x=>x[0]).join("").slice(0,2).toUpperCase();const sp=document.createElement("span");sp.className="ini";sp.setAttribute("aria-hidden","true");sp.textContent=ini;who.before(sp)}
     });
   const wrap=document.createElement("div");wrap.className="rev-wrap mx-skip";g.before(wrap);wrap.append(g);
   [...g.children].forEach(c=>{const d=c.cloneNode(true);d.setAttribute("aria-hidden","true");g.append(d)});g.classList.add("mx-marq")}
 function run(){reviews();const main=[...document.querySelectorAll("main")].find(m=>!m.hidden&&m.offsetHeight>0);if(main)tag(main);counters();processLine()}
 const later=()=>[150,700,1600].forEach(t=>setTimeout(run,t));
 addEventListener("hashchange",later);
 if(document.readyState==="loading")addEventListener("DOMContentLoaded",later);else later();
 // safety net: anything still hidden after 6s on screen gets shown
 setInterval(()=>document.querySelectorAll(".mx-i:not(.mx-on),.mx-h:not(.mx-on)").forEach(e=>{const r=e.getBoundingClientRect();if(r.height&&r.top<innerHeight*.92)e.classList.add("mx-on")}),900);
})();
