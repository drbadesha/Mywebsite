/* ===================== MEDIWORKS v4 DESIGN LAYER: behaviour ===================== */
(function(){
  var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
  var home=document.getElementById("page-home");if(!home)return;
  var esc=function(s){return String(s==null?"":s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})};

  /* ---- six pillars become photo strips ---- */
  var PILLAR_IMG={"Lifestyle":"assets/images/content/c61bdab866ad.webp","Hormone Health":"assets/images/content/21a05ec4ad8f.webp","Metabolic Health":"assets/images/content/b0fd6caf432b.webp",
    "Brain & Cellular Health":"assets/images/content/ce97d3c44b1e.webp","Heart & Fitness":"assets/images/content/49ee87dcda51.webp","Aesthetic Medicine":"assets/images/content/415a74c23ed6.webp"};
  function buildPillars(){
    var p6=home.querySelector(".p6");if(!p6||p6.querySelector(".v4-strips"))return;
    var cards=[].slice.call(p6.querySelectorAll(".p6-card"));if(!cards.length)return;
    var hook=p6.querySelector(".p6h-hook"),body=p6.querySelector(".p6h-body");
    var intro=document.createElement("div");intro.className="v4-pintro";
    intro.innerHTML="<h3>"+(hook?hook.textContent.replace(/\s+/g," ").trim():"Your health is connected. Your care should be too.")+"</h3><p>"+(body?body.innerHTML:"")+"</p>";
    var ul=document.createElement("ul");ul.className="v4-strips";
    ul.innerHTML=cards.map(function(c,i){var t=(c.querySelector(".p6-t")||{}).textContent||"",d=(c.querySelector(".p6-d")||{}).textContent||"";
      return '<li class="v4-strip'+(i===0?" on":"")+'"><img src="'+esc(PILLAR_IMG[t.trim()]||"")+'" alt="" loading="lazy"><div class="v4-st"><h4>'+esc(t)+'</h4><p>'+esc(d)+'</p></div><button type="button" aria-expanded="'+(i===0)+'" aria-label="'+esc(t)+'"></button></li>'}).join("");
    var grid=p6.querySelector(".p6-grid");(grid||p6.firstChild).parentNode.insertBefore(intro,grid);p6.insertBefore(ul,grid);
    var strips=[].slice.call(ul.children);
    var open=function(s){strips.forEach(function(x){var on=x===s;x.classList.toggle("on",on);x.querySelector("button").setAttribute("aria-expanded",on)})};
    strips.forEach(function(s){s.querySelector("button").addEventListener("click",function(){open(s)});
      s.addEventListener("mouseenter",function(){if(matchMedia("(hover:hover) and (min-width:821px)").matches)open(s)})});
  }

  /* ---- protocol cards get photography ---- */
  var PT_IMG={"#protocol-baseline":"assets/images/content/952ca2ddffb8.webp","#protocol-weight-loss":"assets/images/content/4f86274a10de.webp","#protocol-mens-hormones":"assets/images/content/8ac47f193011.webp",
    "#protocol-womens-hormones":"assets/images/content/793be17b2951.webp","#protocol-longevity":"assets/images/pages/vo2-wide.webp"};
  function buildProtocols(){
    var tiles=[].slice.call(home.querySelectorAll("#ptHome .pt-tile"));
    tiles.forEach(function(a,i){if(a.querySelector(".v4-ph"))return;var src=PT_IMG[a.getAttribute("href")];if(!src)return;
      var im=document.createElement("img");im.className="v4-ph";im.src=src;im.alt="";im.loading="lazy";a.prepend(im);
      a.style.setProperty("--v4-top",(96+i*16)+"px")});
  }

  /* ---- six pillars become gradient strips ---- */
  var PILLAR_IMG={"Lifestyle":"assets/images/content/c61bdab866ad.webp","Hormone Health":"assets/images/content/21a05ec4ad8f.webp","Metabolic Health":"assets/images/content/b0fd6caf432b.webp",
    "Brain & Cellular Health":"assets/images/content/ce97d3c44b1e.webp","Heart & Fitness":"assets/images/content/49ee87dcda51.webp","Aesthetic Medicine":"assets/images/content/415a74c23ed6.webp"};
  function buildPillars(){
    var p6=home.querySelector(".p6");if(!p6||p6.querySelector(".v4-strips"))return;
    var cards=[].slice.call(p6.querySelectorAll(".p6-card"));if(!cards.length)return;
    var hook=p6.querySelector(".p6h-hook"),body=p6.querySelector(".p6h-body");
    var intro=document.createElement("div");intro.className="v4-pintro";
    intro.innerHTML="<h3>"+(hook?hook.textContent.replace(/\s+/g," ").trim():"Your health is connected. Your care should be too.")+"</h3><p>"+(body?body.innerHTML:"")+"</p>";
    var ul=document.createElement("ul");ul.className="v4-strips";
    ul.innerHTML=cards.map(function(c,i){var t=(c.querySelector(".p6-t")||{}).textContent||"",d=(c.querySelector(".p6-d")||{}).textContent||"";
      var tile=c.querySelector(".p6-tile"),bg=tile?tile.style.background:"",svg=tile&&tile.querySelector("svg")?tile.querySelector("svg").outerHTML:"";
      return '<li class="v4-strip'+(i===0?" on":"")+'" style="background:'+esc(bg)+'"><span class="v4-ic" aria-hidden="true">'+svg+'</span><div class="v4-st"><h4>'+esc(t)+'</h4><p>'+esc(d)+'</p></div><button type="button" aria-expanded="'+(i===0)+'" aria-label="'+esc(t)+'"></button></li>'}).join("");
    var grid=p6.querySelector(".p6-grid");(grid||p6.firstChild).parentNode.insertBefore(intro,grid);p6.insertBefore(ul,grid);
    var strips=[].slice.call(ul.children);
    var open=function(s){strips.forEach(function(x){var on=x===s;x.classList.toggle("on",on);x.querySelector("button").setAttribute("aria-expanded",on)})};
    strips.forEach(function(s){s.querySelector("button").addEventListener("click",function(){open(s)});
      s.addEventListener("mouseenter",function(){if(matchMedia("(hover:hover) and (min-width:821px)").matches)open(s)})});
  }

  /* ---- team: real group photo beside a clean roster ---- */
  function buildTeam(){
    var sec=home.querySelector("#team2"),grid=sec&&sec.querySelector("#tm2Grid");if(!grid||sec.querySelector(".v4-team"))return;
    var wrap=document.createElement("div");wrap.className="v4-team";
    wrap.innerHTML='<figure><img src="assets/images/content/fc3f03e05cd6.webp" alt="Members of the Mediworks clinical team at the clinic" loading="lazy"><figcaption>Part of our team at the clinic in South Surrey.</figcaption></figure><div class="v4-team-list"></div>';
    grid.parentNode.insertBefore(wrap,grid);var list=wrap.querySelector(".v4-team-list");list.appendChild(grid);
    var all=sec.querySelector(".tm2-all");if(all)list.appendChild(all);
  }

  /* ---- header hides on scroll down, returns on scroll up (phones) ---- */
  var hdr=document.querySelector("header.site"),lastY=scrollY,tick=false;
  addEventListener("scroll",function(){if(tick)return;tick=true;requestAnimationFrame(function(){var y=scrollY;
    if(hdr){var menuOpen=document.querySelector(".sp.on");hdr.classList.toggle("v4-hide",!menuOpen&&y>420&&y>lastY+2)}
    if(y<lastY-2&&hdr)hdr.classList.remove("v4-hide");lastY=y;tick=false})},{passive:true});

  /* ---- gentle reveal for new blocks ---- */
  function reveal(){
    if(RM||!("IntersectionObserver" in window))return;
    var els=[].slice.call(home.querySelectorAll(".v4-pintro,.v4-strips,.v4-team"));
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add("v4-in");io.unobserve(e.target)}})},{threshold:.12,rootMargin:"0px 0px -8% 0px"});
    els.forEach(function(e){if(e.classList.contains("v4-rv"))return;e.classList.add("v4-rv");io.observe(e)});
  }

  function run(){try{buildPillars();buildTeam();reveal()}catch(e){console.error("v4",e)}}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",run);else run();
  setTimeout(run,600);setTimeout(run,2000);
})();
