/* ===================== MYROCKY-INSPIRED ENHANCEMENTS (Nov 2026) ===================== */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  function store(k,v){try{if(v===undefined)return sessionStorage.getItem(k);sessionStorage.setItem(k,v)}catch(e){return null}}

  /* ---- "Most popular" panel at the top of the mobile menu ---- */
  var POP=[
    ["#t-neuromodulators","neuromodulators","Wrinkle-Relaxing Injections","Softer lines, natural movement"],
    ["#t-dermal-fillers","dermal-fillers","Lip &amp; Dermal Filler","Natural, balanced volume"],
    ["#t-nad-iv","nad-iv","NAD+ IV","Cellular energy support"],
    ["#t-glp1-support","glp1-support","GLP-1 Weight Loss","Medically supervised Weight Loss"],
    ["#m-hormones","trt","TRT &amp; Menopause care","Hormone health, assessed first"],
    ["#baseline","vo2-max","The Mediworks Baseline","Measure before you change"]
  ];
  window.mwPopular=function(){
    return (document.getElementById("wnTab")?'<button type="button" class="sp-wn" data-wn-open><span><i aria-hidden="true"></i>What\'s new at Mediworks</span><small>New treatments and diagnostics</small></button>':'')+'<div class="sp-pop"><p class="sp-cat">Most popular</p><ul class="sp-pop-list">'+POP.map(function(p){
      var im=document.querySelector('#mwPopImgs img[data-jtx="'+p[1]+'"]'),src=im&&im.getAttribute("src")?im.src:"";
      return '<li><a href="'+p[0]+'"><span class="sp-pop-t"><b>'+p[2]+'</b><small>'+p[3]+'</small></span>'+(src?'<img class="th" alt="" src="'+src+'"'+(im.style.objectPosition?' style="object-position:'+im.style.objectPosition+'"':'')+'>':'<span class="th" aria-hidden="true"></span>')+'</a></li>'}).join("")+'</ul></div>';
  };

  /* ---- Baseline page: body-system explorer, in-page jumps, booking bar label ---- */
  document.addEventListener("click",function(e){
    var t=e.target.closest("[data-blt]");
    if(t){var box=t.closest(".bl2-block");box.querySelectorAll("[data-blt]").forEach(function(b){b.setAttribute("aria-selected",b===t?"true":"false")});
      box.querySelectorAll("[data-blp]").forEach(function(p){p.hidden=p.dataset.blp!==t.dataset.blt});try{t.scrollIntoView({inline:"nearest",block:"nearest",behavior:"smooth"})}catch(_){}return}
    var g=e.target.closest("[data-blgo]");
    if(g){var el=document.getElementById(g.dataset.blgo);if(el)el.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"start"});return}
    var j=e.target.closest("[data-jfgo]");
    if(j){var f=j.dataset.jfgo;setTimeout(function(){var b=document.querySelector('#articles [data-jf="'+f+'"]');if(b)b.click()},450)}
  });
  document.addEventListener("keydown",function(e){
    var t=e.target.closest&&e.target.closest("[data-blt]");if(!t||!["ArrowRight","ArrowLeft"].includes(e.key))return;
    var all=[].slice.call(t.parentNode.querySelectorAll("[data-blt]")),i=all.indexOf(t)+(e.key==="ArrowRight"?1:-1);
    var nx=all[(i+all.length)%all.length];nx.focus();nx.click();e.preventDefault();
  });
  (function(){
    var btn=$("#mctaPrimary");if(!btn)return;
    function sync(){var pg=document.getElementById("page-x-baseline"),on=pg&&!pg.hidden,want=null;
      if(want&&btn.textContent!==want)btn.textContent=want}
    new MutationObserver(sync).observe(btn,{childList:true,characterData:true,subtree:true});
    var pg=document.getElementById("page-x-baseline");if(pg)new MutationObserver(sync).observe(pg,{attributes:true,attributeFilter:["hidden"]});
    sync();
  })();

  /* ---- homepage team: one row of four faces + "Meet our team" ---- */
  (function(){
    var g=document.getElementById("tm2Grid");if(!g)return;var keep=[0,5,6,7];
    [].forEach.call(g.querySelectorAll(".tm2-card"),function(c,i){if(keep.indexOf(i)<0)c.hidden=true});
    g.classList.add("tm2-row");
    var a=document.createElement("a");a.href="#about-team";a.className="btn btn-ghost tm2-all";a.innerHTML='Meet our team <span class="arr">→</span>';g.after(a);
  })();

  /* ---- What's new: open from the top bar and the menu instead of a floating side tab ---- */
  (function(){
    function openWN(){var t=document.getElementById("wnTab");if(!t)return;var sp=document.getElementById("spClose");if(document.getElementById("sp").classList.contains("on")&&sp)sp.click();setTimeout(function(){t.click()},sp?60:0)}
    window.mwOpenWhatsNew=openWN;
    var bar=document.querySelector(".topbar-in");
    if(bar){var b=document.createElement("button");b.type="button";b.className="tb-wn";b.hidden=true;b.setAttribute("aria-haspopup","dialog");b.innerHTML='<i aria-hidden="true"></i>What\'s new';b.addEventListener("click",openWN);bar.appendChild(b);
      var show=function(){if(document.getElementById("wnTab"))b.hidden=false};show();
      if(b.hidden){var mo=new MutationObserver(function(){show();if(!b.hidden)mo.disconnect()});mo.observe(document.body,{childList:true})}}
    document.addEventListener("click",function(e){if(e.target.closest("[data-wn-open]")){e.preventDefault();openWN()}});
  })();

  /* ---- app preview: Worth a look + Biggest improvements swipe sideways on phones ---- */
  (function(){
    var host=document.getElementById("hdHome");if(!host)return;
    function attach(box){
      if(box.dataset.swipe)return;box.dataset.swipe="1";box.classList.add("mw-swipe");
      var nav=document.createElement("div");nav.className="vnav mw-swipe-nav";
      nav.innerHTML='<button type="button" class="vbtn vprev" aria-label="Previous">\u2039</button><div class="vbar" aria-hidden="true"><span></span></div><button type="button" class="vbtn vnext" aria-label="Next">\u203a</button>';
      box.after(nav);
      var bar=nav.querySelector(".vbar span"),pv=nav.querySelector(".vprev"),nx=nav.querySelector(".vnext");
      function upd(){var w=box.scrollWidth,c=box.clientWidth,l=box.scrollLeft;if(w<=c+2){nav.classList.add("vnav-off");return}nav.classList.remove("vnav-off");
        bar.style.width=(c/w*100)+"%";bar.style.left=(l/w*100)+"%";pv.disabled=l<4;nx.disabled=l+c>=w-4}
      function step(dir){var card=box.firstElementChild,g=parseFloat(getComputedStyle(box).columnGap)||0;box.scrollBy({left:dir*((card?card.offsetWidth:box.clientWidth)+g),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}
      pv.addEventListener("click",function(){step(-1)});nx.addEventListener("click",function(){step(1)});
      box.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);requestAnimationFrame(upd);
    }
    function scan(){host.querySelectorAll("#panel-overview .hd-rows,#panel-overview .wins").forEach(attach)}
    scan();new MutationObserver(scan).observe(host,{childList:true,subtree:true});
  })();

  /* ---- fuller, unique content on treatment and goal pages ---- */
  (function(){
    function E(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
    function sec(id,h,body){var d=document.createElement("div");d.className="t-sec mw-x";d.id=id;d.innerHTML="<h2>"+h+"</h2>"+body;return d}
    function ul(a){return '<ul class="mw-list">'+a.map(function(x){return "<li>"+E(x)+"</li>"}).join("")+"</ul>"}
    function faqs(box,q){q.forEach(function(x){var d=document.createElement("details");d.innerHTML="<summary>"+E(x[0])+"</summary><p>"+E(x[1])+"</p>";box.appendChild(d)})}
    function tx(){
      var pg=document.getElementById("page-treatment");if(!pg||pg.hidden)return;
      var about=pg.querySelector("#t-about");if(!about||about.dataset.mwx)return;
      var slug=(location.hash.match(/^#t-([a-z0-9-]+)/)||[])[1],D=slug&&window.MW_TXP&&window.MW_TXP[slug];if(!D)return;
      about.dataset.mwx="1";
      var name=(window.MW_TXN&&window.MW_TXN[slug])||"this treatment";
      if(D.a2){var p=document.createElement("p");p.textContent=D.a2;about.appendChild(p)}
      var mech=pg.querySelector("#t-mech")||about;
      var apS=D.ap?sec("t-approach","How Mediworks approaches it","<p>"+E(D.ap)+"</p>"):null;
      if(apS)mech.after(apS);
      var faq=pg.querySelector("#t-faq"),risk=null;
      if(faq){[].slice.call(faq.querySelectorAll("details")).forEach(function(d){var s=d.querySelector("summary");if(!risk&&s&&/side effects/i.test(s.textContent)){risk=d.querySelector("p")?d.querySelector("p").innerHTML:"";d.remove()}})}
      var anchor=pg.querySelector("#t-expect")||apS||mech,after=[];
      if(risk)after.push(sec("t-risks","Risks and side effects","<p>"+risk+"</p><p class=\"mw-note\">Your clinician reviews your health history and medications before treatment and explains what to watch for afterwards.</p>"));
      if(D.prep)after.push(sec("t-prep","Before your visit",ul(D.prep)));
      after.reverse().forEach(function(n){anchor.after(n)});
      var resA=pg.querySelector("#t-results")||pg.querySelector("#t-res")||faq;
      if(D.ev){var src=(D.src||[]).map(function(s){return '<li><a href="'+E(s[1])+'" target="_blank" rel="noopener">'+E(s[0])+"</a></li>"}).join("");
        var ev=sec("t-evidence","What the research says","<p>"+E(D.ev)+"</p>"+(src?'<p class="mw-src-h">Sources</p><ul class="mw-src">'+src+"</ul>":"")+'<p class="mw-note">Research describes groups of people; individual results vary.</p>');
        if(resA)resA.before(ev)}
      if(D.alt&&faq){var al=sec("t-alt","Compared with other options",'<p>Other options our clinicians may discuss alongside '+E(name)+':</p><div class="mw-alt">'+D.alt.map(function(a){return '<a href="'+(a[0].indexOf("lab-")===0?"#lt-"+a[0].slice(4):"#t-"+a[0])+'"><b>'+E((window.MW_TXN||{})[a[0]]||a[0])+'</b><span>'+E(a[1])+'</span><i aria-hidden="true">→</i></a>'}).join("")+"</div>");faq.before(al)}
      if(D.q&&faq)faqs(faq,D.q);
    }
    function goal(){
      var pg=document.getElementById("page-goal");if(!pg||pg.hidden)return;
      var slug=(location.hash.match(/^#g-([a-z0-9-]+)/)||location.hash.match(/^#goal-([a-z0-9-]+)/)||[])[1];
      var D=slug&&window.MW_GOALP&&window.MW_GOALP[slug];if(!D||pg.querySelector(".g-about"))return;
      var hero=pg.querySelector(".g-banner")||pg.querySelector("section");if(!hero)return;
      var w=document.createElement("section");w.className="g-about";
      w.innerHTML='<div class="wrap"><div class="g-about-in"><div><p class="eyebrow">About this concern</p>'+D.a.map(function(x){return "<p>"+E(x)+"</p>"}).join("")+'</div><div class="t-sec faq g-faq"><p class="eyebrow">Common questions</p></div></div></div>';
      faqs(w.querySelector(".g-faq"),D.q);hero.after(w);
    }
    function run(){tx();goal()}
    ["page-treatment","page-goal"].forEach(function(id){var el=document.getElementById(id);if(el)new MutationObserver(run).observe(el,{childList:true,attributes:true,attributeFilter:["hidden"]})});
    addEventListener("hashchange",function(){setTimeout(run,0)});run();
  })();

  /* ---- compact, collapsible footer on phones ---- */
  (function(){
    var foot=document.querySelector("footer.rp-foot");if(!foot)return;
    var mq=matchMedia("(max-width:760px)"),n=0,togs=[];
    foot.querySelectorAll(".rf-pop,.rf-grid>.rf-sec").forEach(function(sec){
      var h=sec.querySelector(":scope>h5");if(!h)return;
            var id="rfb"+(++n),body=document.createElement("div");body.className="rf-body";body.id=id;
      [].slice.call(sec.childNodes).forEach(function(c){if(c!==h)body.appendChild(c)});sec.appendChild(body);
      var label=h.textContent.trim();if(label==="Connect")label="Contact";
      h.textContent="";var b=document.createElement("button");b.type="button";b.className="rf-tog";b.setAttribute("aria-controls",id);b.setAttribute("aria-expanded","false");
      b.innerHTML='<span></span><i class="rf-chev" aria-hidden="true"></i>';b.firstChild.textContent=label;h.appendChild(b);
      sec.classList.add("rf-acc");togs.push(b);
      b.addEventListener("click",function(){if(!mq.matches)return;var o=sec.classList.toggle("open");b.setAttribute("aria-expanded",o?"true":"false")});
    });
    function mode(){togs.forEach(function(b){if(mq.matches){b.removeAttribute("tabindex");b.setAttribute("aria-expanded",b.closest(".rf-acc").classList.contains("open")?"true":"false")}else{b.setAttribute("tabindex","-1");b.removeAttribute("aria-expanded")}})}
    mode();if(mq.addEventListener)mq.addEventListener("change",mode);
  })();
})();
