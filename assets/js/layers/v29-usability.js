/* v29: booking links, treatment shortcuts, Back position, focus handling */
(function(){
var JANE="https://mediworks.janeapp.com";
/* Optional deep links into Jane, e.g. {"t:neuromodulators":"https://mediworks.janeapp.com/#/discipline/1/treatment/2","pr:Dr. Navi Badesha":"https://mediworks.janeapp.com/#/staff_member/1"} */
var JANE_LINKS={};
window.MW_VISIT={/* "weight-loss":{fee:"$000",len:"60 min"} */};
function janeFor(ctx){ctx=ctx||"";if(JANE_LINKS[ctx])return JANE_LINKS[ctx];var parts=ctx.replace(/^pr:/,"pr:").split("|");
 for(var i=0;i<parts.length;i++){var k=parts[i];if(i>0&&!/^[a-z]+:/.test(k))k="t:"+k;if(JANE_LINKS[k])return JANE_LINKS[k];if(i===0&&ctx.indexOf("pr:")===0){var pr="pr:"+ctx.slice(3).split("|")[0];if(JANE_LINKS[pr])return JANE_LINKS[pr]}}
 if(!ctx){var h=location.hash.slice(1);if(h.indexOf("t-")===0&&JANE_LINKS["t:"+h.slice(2)])return JANE_LINKS["t:"+h.slice(2)]}
 return JANE}
var ENQ=/help me choose|request help|waitlist|review with|re-test|follow-up|^change$/i;
function relabel(node,from,to){var w=document.createTreeWalker(node,NodeFilter.SHOW_TEXT);var t;while(t=w.nextNode()){if(from.test(t.nodeValue)){t.nodeValue=t.nodeValue.replace(from,to);return true}}return false}
function pass(root){
 (root||document).querySelectorAll("[data-book]:not([data-mwb])").forEach(function(b){
  b.setAttribute("data-mwb","1");
  if(b.closest("#booking,#page-portal,.hd-add"))return;
  var ctx=b.getAttribute("data-book")||"",txt=(b.textContent||"").trim();
  if(ctx==="g:unsure"||ENQ.test(txt)){ if(ctx==="g:unsure")relabel(b,/Book a Consultation/i,"Help Me Choose"); return }
  var a=document.createElement("a");a.className=b.className;a.href=janeFor(ctx);a.target="_blank";a.rel="noopener";a.setAttribute("data-bookonline",ctx);
  if(b.id)a.id=b.id;if(b.title)a.title=b.title;if(b.getAttribute("style"))a.setAttribute("style",b.getAttribute("style"));
  a.innerHTML=b.innerHTML;
  if(!relabel(a,/Book a Consultation/i,"Book online")&&!relabel(a,/^(\s*)Book with /,"$1Book online with "))relabel(a,/^(\s*)Request( a consultation)?/i,"$1Book online");
  if(!/book online/i.test(a.textContent))a.setAttribute("aria-label","Book online with "+txt.replace(/\s+/g," "));
  b.replaceWith(a)});
 (root||document).querySelectorAll('a[href^="https://mediworks.janeapp.com"]:not([data-mwj])').forEach(function(a){a.setAttribute("data-mwj","1");relabel(a,/Book a Consultation/i,"Book online")});
 var V=window.MW_VISIT||{};document.querySelectorAll("[data-mw-fee]").forEach(function(d){var v=V[d.getAttribute("data-mw-fee")];if(v&&v.fee)d.textContent=v.fee});document.querySelectorAll("[data-mw-len]").forEach(function(d){var v=V[d.getAttribute("data-mw-len")];if(v&&v.len)d.textContent=v.len});
}
var q=false;function sched(){if(q)return;q=true;requestAnimationFrame(function(){q=false;pass()})}
new MutationObserver(sched).observe(document.body,{childList:true,subtree:true});pass();

/* treatment pages: compact shortcuts on phones and tablets */
var SC=[["t-about","Overview"],["t-fit","Suitability"],["t-risks","Risks"],["t-prep","Preparation"],["t-fees","Fees"],["t-faq","FAQs"],["t-book","Book"]];
function shortcuts(){var pg=document.getElementById("page-treatment");if(!pg||pg.hidden||pg.querySelector(".mw-tsc"))return;
 var bk=pg.querySelector("#t-book");if(bk&&!pg.querySelector("#t-fees")){var f=document.createElement("div");f.className="t-fees-box";f.id="t-fees";f.innerHTML='<b>Fees</b>The fee for this appointment is shown when you book online. Your clinician confirms any treatment costs with you before treatment begins.';var h=bk.querySelector("h2");if(h&&h.parentNode)h.parentNode.insertBefore(f,h.nextSibling);else bk.prepend(f)}
 var items=SC.filter(function(x){return pg.querySelector("#"+x[0])});if(items.length<3)return;
 var nav=document.createElement("nav");nav.className="mw-tsc";nav.setAttribute("data-nosp","");nav.setAttribute("data-sp","1");nav.setAttribute("aria-label","On this page");
 nav.innerHTML="<ul>"+items.map(function(x){return '<li><a href="#'+x[0]+'" data-mwsc="'+x[0]+'"'+(x[0]==="t-book"?' class="mw-tsc-book"':"")+'>'+x[1]+'</a></li>'}).join("")+"</ul>";
 var hero=pg.querySelector(".t-hero,section");if(hero)hero.after(nav);else pg.prepend(nav);setTimeout(function(){nav.removeAttribute("style")},60);setTimeout(function(){nav.removeAttribute("style")},500)}
document.addEventListener("click",function(e){var a=e.target.closest("[data-mwsc]");if(!a)return;e.preventDefault();var t=document.getElementById(a.getAttribute("data-mwsc"));if(!t)return;
 var bar=document.querySelector(".mw-tsc"),off=(parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hh"))||64)+(bar?bar.getBoundingClientRect().height:0)+12;window.scrollTo({top:t.getBoundingClientRect().top+scrollY-off,behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"});
 t.setAttribute("tabindex","-1");t.focus({preventScroll:true})});

/* Back and Forward return to where you were */
try{history.scrollRestoration="manual"}catch(e){}
function save(){try{var st=Object.assign({},history.state||{},{mwY:scrollY,mwQ:window.mwAtQ?window.mwAtQ():""});history.replaceState(st,"")}catch(e){}}
var sv=null;addEventListener("scroll",function(){clearTimeout(sv);sv=setTimeout(save,120)},{passive:true});
document.addEventListener("click",function(e){if(e.target.closest("a[href^='#']"))save()},true);
addEventListener("popstate",function(e){var st=e.state;if(st&&typeof st.mwY==="number")window.__mwRestore={y:st.mwY,q:st.mwQ||""}});

/* new page: announce it and move focus to its heading */
var first=true;
function announce(){
 var main=[...document.querySelectorAll("main,section.pp,section.pr-page,section.bl-page,#page-treatment,#page-category,#page-all,#page-menu,#page-goal,#page-goals,#page-about,#page-labtests")].filter(function(m){return !m.hidden&&m.offsetParent!==null});
 var h=null;for(var i=0;i<main.length&&!h;i++){h=[...main[i].querySelectorAll("h1")].find(function(x){return x.offsetParent})}
 if(!h)h=[...document.querySelectorAll("h1")].find(function(x){return x.offsetParent});
 var live=document.getElementById("mwLive");if(live){live.textContent="";setTimeout(function(){live.textContent=document.title},50)}
 if(h&&!document.querySelector(".sp.on,#srch:not([hidden]),#booking:not([hidden])")){h.setAttribute("tabindex","-1");h.style.outline="none";h.focus({preventScroll:true})}}
addEventListener("hashchange",function(){setTimeout(shortcuts,80);setTimeout(shortcuts,400);if(!/^#(t-(about|fit|risks|prep|fees|faq|book|tests|team|how|expect|mech|helps|results|res|alt|evidence|approach|program))$/.test(location.hash))setTimeout(announce,160)});
setTimeout(shortcuts,400);

/* keep Tab inside open overlays */
function openOverlay(){var o=[document.querySelector("#booking:not([hidden]) .bk-card"),document.querySelector("#srch:not([hidden])"),document.querySelector(".sp.on"),document.querySelector("#askPanel:not([hidden])"),document.querySelector("dialog[open]")];for(var i=0;i<o.length;i++)if(o[i])return o[i];return null}
document.addEventListener("keydown",function(e){if(e.key!=="Tab")return;var o=openOverlay();if(!o)return;
 var f=[...o.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])')].filter(function(x){return x.offsetParent!==null||x===document.activeElement});
 if(!f.length)return;var a=f[0],z=f[f.length-1];
 if(!o.contains(document.activeElement)){e.preventDefault();(e.shiftKey?z:a).focus();return}
 if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});
})();
