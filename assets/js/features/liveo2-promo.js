/* LiveO2 promotion: rotate the top bar message, and add a "New in BC" badge on the LiveO2 page */
(function(){
 const span=document.querySelector(".topbar-in>span:first-child");
 if(span&&!span.classList.contains("tb-rot")){
  // if a dated announcement is already showing, rotate it with the original "Accepting new patients" line
  if(span.dataset.noAnn||(span.classList.contains("tb-ann")&&!span.dataset.orig))return;
  const ann=span.classList.contains("tb-ann")?span.querySelector(".tb-ann-link"):null;
  const a=document.createElement("span");a.className="tb-s";a.innerHTML=ann?span.dataset.orig:span.innerHTML;
  const b=document.createElement("a");b.className="tb-s tb-lo2 off";b.href=ann?ann.getAttribute("href"):"#t-liveo2";b.setAttribute("aria-hidden","true");b.tabIndex=-1;
  if(ann){const lb=span.querySelector(".tb-ann-label"),msg=span.querySelector(".tb-ann-msg"),cta=span.querySelector(".tb-ann-cta");
    b.innerHTML=`${lb?`<b>${lb.textContent}</b>`:""}<span class="lg">${msg.textContent} <u>${cta?cta.textContent:"Learn more →"}</u></span><span class="sm">${msg.textContent} <u>→</u></span>`;span.classList.remove("tb-ann")}
  else b.innerHTML='<b>New in BC</b><span class="lg">LiveO2 Adaptive Contrast Therapy, now in South Surrey <u>Learn more →</u></span><span class="sm">LiveO2 Adaptive Contrast Therapy <u>→</u></span>';
  span.innerHTML="";span.classList.add("tb-rot");span.append(a,b);
  let on=0;setInterval(()=>{if(document.hidden)return;on=1-on;[a,b].forEach((el,k)=>{const show=k===on;el.classList.toggle("off",!show);el.setAttribute("aria-hidden",show?"false":"true");if(el.tagName==="A")el.tabIndex=show?0:-1})},5000);
 }
 function badge(){if(location.hash!=="#t-liveo2")return;const m=document.querySelector("#page-treatment");if(!m||m.hidden||m.querySelector(".lo2-badge"))return;
  const h=m.querySelector("h1");if(!h)return;const bd=document.createElement("p");bd.className="lo2-badge";bd.textContent="New in BC · Now in South Surrey";h.parentNode.insertBefore(bd,h)}
 const run=()=>[80,500,1200].forEach(t=>setTimeout(badge,t));addEventListener("hashchange",run);run();
})();
