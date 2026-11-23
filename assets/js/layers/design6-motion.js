(function(){
var RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
function vis(el,cb){if(RM||!("IntersectionObserver" in window)){cb();return}var io=new IntersectionObserver(function(e){if(e[0].isIntersecting){cb();io.disconnect()}},{threshold:.35});io.observe(el)}
var TTL='<svg viewBox="0 0 360 128" role="img" aria-label="Test, treat and re-test, repeated over time"><path class="ln" pathLength="1" d="M40 46H320"/><path class="lp" pathLength="1" d="M320 58C320 112 40 112 40 60"/><path class="ar" d="M40 60l-5 9h10z"/>'+
'<g class="nd f n1"><circle cx="40" cy="46" r="15"/></g><g class="nd n2"><circle cx="180" cy="46" r="15"/></g><g class="nd n3"><circle cx="320" cy="46" r="15"/></g>'+
'<text class="tn w" x="40" y="49.5" text-anchor="middle">01</text><text class="tn" x="180" y="49.5" text-anchor="middle">02</text><text class="tn" x="320" y="49.5" text-anchor="middle">03</text>'+
'<text class="tl" x="40" y="14" text-anchor="middle">Test</text><text class="tl" x="180" y="14" text-anchor="middle">Treat</text><text class="tl" x="320" y="14" text-anchor="middle">Re-test</text>'+
'<text class="ts" x="180" y="122" text-anchor="middle">Repeated over time</text></svg>';
var CUT='<svg viewBox="0 0 360 128" role="img" aria-label="Timeline: early changes, then symptoms, then disease. Longevity care measures early; routine check-ups often find changes later.">'+
'<defs><linearGradient id="cutG" gradientUnits="userSpaceOnUse" x1="10" y1="0" x2="350" y2="0"><stop offset="0" stop-color="#A7D3C7"/><stop offset=".6" stop-color="#5E8FA3"/><stop offset="1" stop-color="#B8949A"/></linearGradient></defs>'+
'<path class="bar" pathLength="1" d="M10 64H350"/>'+
'<line class="tk" x1="10" y1="56" x2="10" y2="72"/><line class="tk" x1="180" y1="56" x2="180" y2="72"/><line class="tk" x1="350" y1="56" x2="350" y2="72"/>'+
'<text x="10" y="90">First changes</text><text x="180" y="90" text-anchor="middle">Symptoms</text><text x="350" y="90" text-anchor="end">Disease</text>'+
'<circle class="pl" cx="70" cy="64" r="7"/><circle class="m1" cx="70" cy="64" r="7"/>'+
'<circle class="m2" cx="292" cy="64" r="7"/>'+
'<text class="cb" x="70" y="30" text-anchor="middle">We measure here</text><line class="tk" x1="70" y1="36" x2="70" y2="54"/>'+
'<text class="cs" x="292" y="30" text-anchor="middle">Often found here</text><line class="tk" x1="292" y1="36" x2="292" y2="54"/></svg>';
function run(){
 // 1 count-up
 document.querySelectorAll(".hero-proof b").forEach(function(b){if(b.dataset.cu)return;var m=b.textContent.trim().match(/^(\d+)(k\+|\+)?$/);if(!m)return;b.dataset.cu=1;var n=+m[1],suf=m[2]||"";vis(b,function(){if(RM)return;var t0=performance.now();b.textContent="0"+suf;(function f(t){var k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,3);b.textContent=Math.round(n*e)+suf;if(k<1)requestAnimationFrame(f)})(t0);setTimeout(function(){b.textContent=n+suf},1700)})});
 // 2 loop
 var fl=document.querySelector("#numbers .feat-list");if(fl&&!document.querySelector("#numbers .ttl")){var d=document.createElement("div");d.className="ttl";d.innerHTML=TTL;fl.parentNode.insertBefore(d,fl);vis(d,function(){d.classList.add("on")})}
 // 4 dial
 document.querySelectorAll(".bl2-chart").forEach(function(f){if(f.dataset.bd)return;f.dataset.bd=1;vis(f,function(){f.classList.add("bd-on")})});
 // 6 timeline
 var c=document.querySelector("#longevity .lg-cmp-wrap .lg-band-p");if(c&&!document.querySelector(".cut")){var t=document.createElement("div");t.className="cut";t.innerHTML=CUT;c.insertAdjacentElement("afterend",t);vis(t,function(){t.classList.add("on")})}
}
[300,1200,2500].forEach(function(x){setTimeout(run,x)});addEventListener("hashchange",function(){[150,800].forEach(function(x){setTimeout(run,x)})});
})();
