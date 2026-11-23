/* v30: tickers drift on their own; visitors can swipe, drag or scroll through them faster */
(function(){
var reduce=matchMedia("(prefers-reduced-motion: reduce)").matches,SPEED=32;/* px per second */
function setup(box){if(box.dataset.mwtk)return;var tr=box.querySelector(".ticker-track,.v3-ht-track");if(!tr||!tr.children.length)return;box.dataset.mwtk="1";
 var pos=box.scrollLeft,resumeAt=0,hover=false,vis=true,drag=null,last=0;
 function half(){return tr.scrollWidth/2}
 function wrap(){var h=half();if(h<=box.clientWidth)return;if(box.scrollLeft>=h)box.scrollLeft-=h;else if(box.scrollLeft<=0)box.scrollLeft+=h;pos=box.scrollLeft}
 function hold(ms){resumeAt=performance.now()+(ms||2500)}
 box.addEventListener("scroll",function(){if(Math.abs(box.scrollLeft-pos)>1.5){hold();wrap()}},{passive:true});
 box.addEventListener("touchstart",function(){hold(4000)},{passive:true});
 box.addEventListener("wheel",function(){hold()},{passive:true});
 box.addEventListener("mouseenter",function(){hover=true});box.addEventListener("mouseleave",function(){hover=false;hold(800)});
 box.addEventListener("focusin",function(){hold(6000)});
 box.addEventListener("pointerdown",function(e){if(e.pointerType!=="mouse"||e.button!==0)return;drag={x:e.clientX,sl:box.scrollLeft,moved:false};hold(4000)});
 addEventListener("pointermove",function(e){if(!drag)return;var dx=e.clientX-drag.x;if(Math.abs(dx)>4){drag.moved=true;box.classList.add("mw-drag")}if(drag.moved){box.scrollLeft=drag.sl-dx;wrap();drag.sl=box.scrollLeft+dx;hold(3000)}});
 addEventListener("pointerup",function(){if(!drag)return;var m=drag.moved;drag=null;setTimeout(function(){box.classList.remove("mw-drag")},m?60:0)});
 if("IntersectionObserver" in window)new IntersectionObserver(function(es){vis=es[0].isIntersecting}).observe(box);
 function tick(t){var dt=last?Math.min(t-last,64):16;last=t;
  if(!reduce&&vis&&!hover&&!drag&&!document.hidden&&box.offsetParent&&t>resumeAt){pos+=SPEED*dt/1000;var h=half();if(h>box.clientWidth&&pos>=h)pos-=h;box.scrollLeft=pos}
  else pos=box.scrollLeft;
  requestAnimationFrame(tick)}
 requestAnimationFrame(tick)}
function scan(){document.querySelectorAll(".ticker,.v3-hticker").forEach(setup)}
scan();setTimeout(scan,800);setTimeout(scan,2500);addEventListener("hashchange",function(){setTimeout(scan,300);setTimeout(scan,1200)});
})();
