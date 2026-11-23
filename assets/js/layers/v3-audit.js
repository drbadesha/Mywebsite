/* ===================== V3: audit changes (Nov 2026) ===================== */
(function(){
  var $=function(s,r){return (r||document).querySelector(s)};
  function el(tag,cls,html){var e=document.createElement(tag);if(cls)e.className=cls;if(html!=null)e.innerHTML=html;return e}

  /* ---- desktop Treatments menu: by area, then by concern ---- */
  (function(){
    var tx=$("#subTx"),gl=$("#subGoals");if(!tx||!gl)return;
    function merge(){if(tx.dataset.v3||!gl.querySelector(".sg-areas a")||!tx.children.length)return;tx.dataset.v3="1";
      var links=[].slice.call(gl.querySelectorAll(".sg-areas a")).map(function(a){return '<a href="#goals" data-goalgroup="'+a.dataset.goalgroup+'">'+a.querySelector("b").textContent.trim()+'</a>'}).join("");
      tx.appendChild(el("li","sub-lbl","Or start from a concern"));
      tx.appendChild(el("li","sub-concern",links+'<a class="sc-all" href="#goals">All concerns →</a>'));}
    merge();if(!tx.dataset.v3){var mo=new MutationObserver(function(){merge();if(tx.dataset.v3)mo.disconnect()});mo.observe(gl,{childList:true});mo.observe(tx,{childList:true})}
  })();


  /* ---- protocol-style tiles: homepage area cards + treatment page banners ---- */
  (function(){
    var ICON={aesthetics:"face",hair:"hair",pain:"knee",hormones:"steroid",weight:"body",labs:"rack",longevity:"ivbag",naturopathic:"leaf"};
    var CARD_GRAD={aesthetics:"linear-gradient(160deg,#C4A08F 0%,#8A6253 55%,#3A2722 100%)",hair:"linear-gradient(160deg,#AE9BB3 0%,#6E5C78 55%,#2D2433 100%)",pain:"linear-gradient(160deg,#7F95B5 0%,#3C5274 55%,#141D2E 100%)",hormones:"linear-gradient(160deg,#B89AA6 0%,#7A5566 55%,#2E1F26 100%)",weight:"linear-gradient(160deg,#B7AE8E 0%,#7A7154 55%,#2F2B1F 100%)"};
    function grad(a){return window.MW_TILE_GRAD[a]||CARD_GRAD[a]}
    window.__v3Grad=grad;window.__v3Icon=ICON;
    function tileHtml(area,key,cls){return '<span class="v3-tile '+(cls||"")+'" style="background:'+grad(area)+'"><svg class="v3-tile-ic" viewBox="0 0 100 100" aria-hidden="true">'+window.mwTileSvg(key)+'</svg></span>'}
    function cards(){document.querySelectorAll("#cats .vcard[data-area]").forEach(function(c){var a=c.dataset.area,m=c.querySelector(".vc-media");if(!m||m.dataset.v3||!grad(a))return;m.dataset.v3="1";m.innerHTML=tileHtml(a,ICON[a],"v3-tile-card");c.classList.add("v3-tiled")})}
    cards();var cv=document.getElementById("cats");if(cv)new MutationObserver(cards).observe(cv,{childList:true});
    function hero(){var pg=document.getElementById("page-treatment");if(!pg||pg.hidden)return;var slug=(location.hash.match(/^#t-([a-z0-9-]+)/)||[])[1];if(!slug)return;
      var a=window.mwTileArea(slug),tb=pg.querySelector(".t-banner .tb-media");if(!a||!tb||tb.dataset.v3)return;var A=window.__mwArt();
      tb.dataset.v3="1";tb.innerHTML=tileHtml(a,A.TXM[slug],"v3-tile-hero");pg.querySelector(".t-banner").classList.add("v3-tiled")}
    var tp=document.getElementById("page-treatment");if(tp)new MutationObserver(hero).observe(tp,{childList:true,attributes:true,attributeFilter:["hidden"]});
    addEventListener("hashchange",function(){setTimeout(hero,0)});hero();
  })();

  /* ---- biological age goal page: compare the two finger-prick tests ---- */
  (function(){
    function cmp(){var pg=document.getElementById("page-goal");if(!pg||pg.hidden||location.hash!=="#g-biological-age"||pg.querySelector(".v3-bacmp"))return;
      var at=pg.querySelector(".g-about");if(!at)return;
      var w=el("section","v3-bacmp",'<div class="wrap"><div class="v3-cmp"><p class="eyebrow">Biological age tests</p><h2>Two tests, <em>two views</em></h2><div class="v3-cmp-scroll"><table><thead><tr><th scope="col"></th><th scope="col"><a href="#t-truage">TruAge + TruHealth</a></th><th scope="col"><a href="#t-glycanage">GlycanAge</a></th></tr></thead><tbody>'+
        '<tr><th scope="row">What it reads</th><td>DNA methylation: chemical tags on your DNA that change over time</td><td>Glycans: sugar molecules on your IgG antibodies, linked to inflammation</td></tr>'+
        '<tr><th scope="row">What you receive</th><td>Estimated biological age and pace of aging, plus TruHealth estimates</td><td>An estimated biological age linked to inflammaging</td></tr>'+
        '<tr><th scope="row">Sample</th><td>Finger prick</td><td>Finger prick</td></tr>'+
        '<tr><th scope="row">Useful for</th><td>A broad picture of how you are ageing</td><td>Tracking inflammation as you make changes</td></tr>'+
        '<tr><th scope="row">Re-testing</th><td>Often every 6–12 months, with the same test</td><td>Can be repeated to track change</td></tr>'+
        '</tbody></table></div><p class="v3-cmp-note">Both give estimates, not diagnoses. Your clinician can help you choose one, or use both. Individual results vary.</p></div></div>');
      w.querySelector("table").style.minWidth="560px";at.after(w)}
    var gp=document.getElementById("page-goal");if(gp)new MutationObserver(function(){setTimeout(cmp,0)}).observe(gp,{childList:true,subtree:false,attributes:true,attributeFilter:["hidden"]});
    addEventListener("hashchange",function(){setTimeout(cmp,30)});setTimeout(cmp,30);
  })();

  /* ---- homepage protocols row: arrows + progress bar, like the area cards ---- */
  (function(){
    var box=document.getElementById("ptHome");if(!box||box.dataset.v3nav)return;box.dataset.v3nav="1";
    var nav=el("div","vnav v3-ptnav",'<button type="button" class="vbtn vprev" aria-label="Previous protocol">\u2039</button><div class="vbar" aria-hidden="true"><span></span></div><button type="button" class="vbtn vnext" aria-label="Next protocol">\u203a</button>');
    box.after(nav);
    var bar=nav.querySelector(".vbar span"),pv=nav.querySelector(".vprev"),nx=nav.querySelector(".vnext");
    function upd(){var w=box.scrollWidth,c=box.clientWidth,l=box.scrollLeft;if(w<=c+2){nav.classList.add("vnav-off");return}nav.classList.remove("vnav-off");
      bar.style.width=(c/w*100)+"%";bar.style.left=(l/w*100)+"%";pv.disabled=l<4;nx.disabled=l+c>=w-4}
    function step(d){var card=box.firstElementChild,g=parseFloat(getComputedStyle(box).columnGap)||0;box.scrollBy({left:d*((card?card.offsetWidth:box.clientWidth)+g),behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})}
    pv.addEventListener("click",function(){step(-1)});nx.addEventListener("click",function(){step(1)});
    box.addEventListener("scroll",upd,{passive:true});addEventListener("resize",upd);requestAnimationFrame(upd);setTimeout(upd,600);
  })();

  /* ---- hero: trust stats move below the banner; transparent treatment ticker inside it ---- */
  (function(){
    var hero=document.querySelector("#page-home .hero"),proof=hero&&hero.querySelector(".hero-proof");if(!hero||hero.dataset.v3t)return;hero.dataset.v3t="1";
    if(proof){var st=el("section","v3-trust");st.setAttribute("aria-label","Why Mediworks");st.setAttribute("data-nosp","");var w=el("div","wrap");w.appendChild(proof);st.appendChild(w);hero.after(st)}
    var A=window.__mwArt&&window.__mwArt();if(!A)return;
    var T=[["neuromodulators","Neuromodulators","face"],["dermal-fillers","Dermal fillers","lips"],["skin-boosters","Skin boosters","drops"],["prp-hair-restoration","PRP hair restoration","hair"],["ultrasound-guided-prp","Ultrasound-guided PRP","knee"],["nad-iv","NAD+ IV","ivbag"],["glp1-support","GLP-1 support","body"],["bhrt","Hormone therapy","steroid"],["vo2-max","VO2 max testing","pulse"],["truage","Longevity testing","helix"],["red-light-therapy","Red light therapy","rays"],["liveo2","LiveO2","bubbles"]];
    function item(t){return '<a class="v3-ht-i" href="#t-'+t[0]+'"><svg viewBox="0 0 100 100" aria-hidden="true">'+(A.MOTIF[t[2]]||A.MOTIF.leaf)+'</svg><span>'+t[1]+'</span></a>'}
    var once=T.map(item).join("");
    var tk=el("div","v3-hticker",'<div class="v3-ht-track">'+once+'<span class="v3-ht-dup" aria-hidden="true">'+once.replace(/<a /g,'<a tabindex="-1" ')+'</span></div>');
    tk.setAttribute("aria-label","Featured treatments");hero.appendChild(tk);
  })();

  /* ---- consistent imagery: area, category and all-treatments banners use the area gradient + line icon ---- */
  (function(){
    var NEUTRAL="linear-gradient(160deg,#5B6670 0%,#2E353D 55%,#121519 100%)";
    function tile(bgc,svgKey,cls){return '<span class="v3-tile '+cls+'" style="background:'+bgc+'">'+(svgKey?'<svg class="v3-tile-ic" viewBox="0 0 100 100" aria-hidden="true">'+window.mwTileSvg(svgKey)+'</svg>':'')+'</span>'}
    function run(){
      if(!window.__v3Grad)return;
      ["#page-menu","#page-all"].forEach(function(id){var pg=document.querySelector(id);if(!pg||pg.hidden)return;
        var h=pg.querySelector(".at-hero"),bg=h&&h.querySelector(".at-hero-bg");if(!bg||bg.dataset.v3)return;bg.dataset.v3="1";
        var a=h.dataset.area,g=a&&window.__v3Grad(a);
        bg.innerHTML=tile(g||NEUTRAL,g?window.__v3Icon[a]:null,"v3-tile-hero");bg.classList.add("v3-tiled-bg");h.classList.add("v3-tiled")});
      var cp=document.getElementById("page-category");
      if(cp&&!cp.hidden){var fig=cp.querySelector(".c-hero figure .photo"),slug=(location.hash.match(/^#c-([a-z0-9-]+)/)||[])[1];
        if(fig&&!fig.dataset.v3&&slug){var A=window.__mwArt(),c=A.CAT[slug];if(c){var a=c.menu,first=(c.items||[])[0];first=Array.isArray(first)?first[0]:first;
          fig.dataset.v3="1";fig.innerHTML=tile(window.__v3Grad(a)||NEUTRAL,A.TXM[first]||window.__v3Icon[a],"v3-tile-cat");fig.classList.add("v3-tiled-fig")}}}
    }
    ["page-menu","page-all","page-category"].forEach(function(id){var e=document.getElementById(id);if(e)new MutationObserver(function(){setTimeout(run,0)}).observe(e,{childList:true,attributes:true,attributeFilter:["hidden"]})});
    addEventListener("hashchange",function(){setTimeout(run,30)});setTimeout(run,30);
  })();
  var home=$("#page-home");if(!home)return;

  /* ---- 1. one entry point: "What brings you in?" with By concern / By area ---- */
  (function(){
    var tr=$("#treatments"),fd=$("#finder");if(!tr||!fd)return;
    var head=tr.querySelector(".sec-head"),grid=fd.querySelector(".finder-grid"),cats=$("#cats"),nav=tr.querySelector(".vnav");
    if(!head||!grid||!cats)return;
    head.querySelector(".eyebrow").textContent="Start here";
    head.querySelector("h2").innerHTML='What brings you <em>in?</em>';
    var lede=head.querySelector(".lede");if(lede)lede.textContent="Start with a concern, or browse our eight areas of care.";
    var tabs=el("div","v3-tabs",'<button type="button" role="tab" aria-selected="true" data-v3tab="c">By concern</button><button type="button" role="tab" aria-selected="false" data-v3tab="a">By area</button>');
    tabs.setAttribute("role","tablist");tabs.setAttribute("aria-label","Find the right treatment");
    var pc=el("div","v3-panel v3-pc"),pa=el("div","v3-panel v3-pa");pa.hidden=true;
    var fh=grid.querySelector(":scope > div:first-child");
    if(fh){[].slice.call(fh.querySelectorAll(":scope > .eyebrow, :scope > h2, :scope > .lede")).forEach(function(n){n.remove()})}
    pc.appendChild(grid);pa.appendChild(cats);if(nav)pa.appendChild(nav);
    var hs=el("button","v6-hsrch",'<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg><span>Search a concern or treatment</span>');
    hs.type="button";hs.setAttribute("aria-label","Search treatments, concerns or goals");hs.addEventListener("click",function(){var b=document.getElementById("srchBtn");if(b)b.click()});
    head.after(hs);hs.after(tabs);tabs.after(pc);pc.after(pa);
    fd.hidden=true;fd.id="finder-old";tr.id="treatments";
    var anchor=el("span","v3-anchor");anchor.id="finder";tr.prepend(anchor);
    tabs.addEventListener("click",function(e){var b=e.target.closest("[data-v3tab]");if(!b)return;
      tabs.querySelectorAll("button").forEach(function(x){x.setAttribute("aria-selected",x===b?"true":"false")});
      pc.hidden=b.dataset.v3tab!=="c";pa.hidden=b.dataset.v3tab!=="a";
      if(!pa.hidden){dispatchEvent(new Event("resize"));cats.dispatchEvent(new Event("scroll"))}});
  })();

  /* ---- 2. approach: Assess, plan, measure + the six first-visit steps on demand ---- */
  (function(){
    var ph=$("#philosophy"),fv=$("#first-visit");if(!ph)return;
    var steps=fv&&fv.querySelector(".mw2-steps");
    var box=el("div","wrap v3-appr",
      '<p class="eyebrow">Our approach</p>'+
      '<h2 id="philoH">How you look, feel and think, <em>treated as one.</em></h2>'+
      '<ol class="v3-apm">'+
        '<li><span>01</span><b>Assess</b><p>A consultation about your goals and health history, with baseline testing where it helps, so we know where you are starting from.</p></li>'+
        '<li><span>02</span><b>Plan</b><p>Clear options, what each involves and what it costs. You only start what you\'re comfortable with.</p></li>'+
        '<li><span>03</span><b>Measure</b><p>We compare your progress with that baseline and adjust your plan, so you can see what\'s changing.</p></li>'+
      '</ol>'+
      '<details class="v3-steps"><summary>Your first visit, step by step</summary></details>'+
      '<div class="v3-appr-acts"><a class="btn btn-primary" href="https://mediworks.janeapp.com" target="_blank" rel="noopener">Book a Consultation <span class="arr">→</span></a><a class="link" href="#about">About Mediworks →</a></div>');
    ph.innerHTML="";ph.appendChild(box);ph.classList.add("v3-ph");
    if(steps)box.querySelector(".v3-steps").appendChild(steps);
    if(fv){fv.hidden=true;fv.id="first-visit-old"}
    ph.id="first-visit";
    var tr=document.getElementById("treatments");if(tr&&tr.parentNode===ph.parentNode)tr.after(ph);
    function openSteps(){if(location.hash==="#first-visit"){var d=box.querySelector(".v3-steps");if(d)d.open=true}}
    addEventListener("hashchange",openSteps);openSteps();
  })();

  /* ---- 3. drop the treatment chips row under the hero ---- */
  [".ticker",".qtiles"].forEach(function(q){var n=home.querySelector(q);if(n)n.hidden=true});

  /* ---- 4. Measure section: one screen, full app preview on demand ---- */
  (function(){
    var app=home.querySelector("#numbers .nk-app");if(!app)return;
    var h=$("#nkH");if(h)h.innerHTML='Measure what <em>matters.</em> See your <b>progress.</b>';
    app.classList.add("v3-clip");
    var b=el("button","btn btn-ghost v3-more",'See the full app preview <span class="arr">↓</span>');b.type="button";b.setAttribute("aria-expanded","false");
    app.after(b);
    b.addEventListener("click",function(){var o=app.classList.toggle("v3-open");b.setAttribute("aria-expanded",o?"true":"false");
      b.innerHTML=o?'Show less <span class="arr">↑</span>':'See the full app preview <span class="arr">↓</span>';if(!o)app.scrollIntoView({block:"center"})});
  })();

  /* ---- 5. closing block: four FAQs, visit details and the final call to action read as one ---- */
  (function(){
    var f=$("#home-faq");if(!f)return;
    var n=0;[].slice.call(f.querySelectorAll(".faq details")).forEach(function(d){var q=(d.querySelector("summary")||{}).textContent||"";if(/which appointment to request/i.test(q)||n>=4)d.hidden=true;else n++});
    ["home-faq","visit-strip"].forEach(function(id){var n=document.getElementById(id);if(n)n.classList.add("v3-close")});
    var cta=home.querySelector(".cta-band");if(cta)cta.classList.add("v3-close");
  })();

  /* ---- Protocols page: side-by-side comparison ---- */
  (function(){
    var row=$("#ptPage"),det=$("#ptDetails");if(!row||!det||$(".v3-cmp"))return;
    function dd(card,label){var r=null;card.querySelectorAll("dl > div").forEach(function(d){var t=d.querySelector("dt");if(t&&t.textContent.trim().toLowerCase().indexOf(label)===0)r=d.querySelector("dd")});return r?r.textContent.trim():"—"}
    var rows=[].slice.call(det.querySelectorAll("article.pr-card")).map(function(c){
      var id=c.id.replace(/^pr-/,""),pp=document.getElementById("protocol-"+id),fmt="—";
      if(pp)pp.querySelectorAll(".pp-facts > div").forEach(function(d){var t=d.querySelector("dt");if(t&&/format/i.test(t.textContent))fmt=d.querySelector("dd").textContent.trim()});
      return {id:id,n:(c.querySelector("h3")||{}).textContent||id,suit:dd(c,"who it may suit"),as:dd(c,"assessments"),first:dd(c,"first appointment"),fmt:fmt}});
    if(!rows.length)return;
    var w=el("div","v3-cmp",'<p class="eyebrow">Compare</p><h2>Protocols <em>side by side</em></h2><div class="v3-cmp-scroll"><table><thead><tr><th scope="col">Protocol</th><th scope="col">Who it may suit</th><th scope="col">Assessments that may be considered</th><th scope="col">First appointment</th><th scope="col">Format</th></tr></thead><tbody>'+
      rows.map(function(r){return '<tr><th scope="row"><a href="#protocol-'+r.id+'">'+r.n+'</a></th><td>'+r.suit+'</td><td>'+r.as+'</td><td>'+r.first+'</td><td>'+r.fmt+'</td></tr>'}).join("")+
      '</tbody></table></div><p class="v3-cmp-note">Your clinician\'s assessment decides what is recommended for you.</p>');
    row.after(w);
  })();
})();
