/* v15: IV treatment pages book through Drip Lounge */
(function(){var IV=["myers-cocktail","nad-iv","pc-iv","glutathione-iv"];
function fix(){var h=location.hash.slice(1);if(h.indexOf("t-")!==0||IV.indexOf(h.slice(2))<0)return;
 var pg=document.getElementById("page-treatment");if(!pg)return;
 pg.querySelectorAll(".hero-ctas .btn-primary, .book-card .btn-primary").forEach(function(b){if(b.dataset.dl)return;
  var a=document.createElement("a");a.className=b.className;a.href="https://driplounge.ca";a.target="_blank";a.rel="noopener";a.dataset.dl="1";
  a.innerHTML='Book Your IV at Drip Lounge <span class="arr">↗</span>';b.replaceWith(a)});
 var bc=pg.querySelector(".book-card h3");if(bc&&!bc.dataset.dl){bc.dataset.dl="1";bc.textContent="Book at Drip Lounge, inside Mediworks"}}
function run(){var n=0;(function t(){fix();if(n++<12)setTimeout(t,120)})()}
addEventListener("hashchange",run);run()})();
