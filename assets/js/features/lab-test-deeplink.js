/* v13: open a specific lab test from a menu link */
(function(){function go(){var h=location.hash.slice(1);if(h.indexOf("lt-")!==0)return;var n=0;(function t(){var d=document.getElementById(h);
 if(!d){if(n++<30)return setTimeout(t,100);return}
 d.open=true;var top=d.getBoundingClientRect().top+scrollY-((parseInt(getComputedStyle(document.documentElement).getPropertyValue("--hh"))||76)+24);
 scrollTo({top:top,behavior:"auto"})})()}
addEventListener("hashchange",function(){setTimeout(go,60)});setTimeout(go,300)})();
