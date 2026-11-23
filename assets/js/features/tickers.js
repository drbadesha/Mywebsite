/* Tickers: auto-scroll that people can also swipe or drag through (phone, iPad and desktop) */
(function(){
 const RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
 function init(t){
  if(t.dataset.tk)return;const tr=t.querySelector(".ticker-track");if(!tr||!t.offsetWidth)return;
  t.dataset.tk=1;t.classList.add("tk-js");
  let pause=0,last=performance.now(),pos=0,dragging=false,sx=0,sl=0,moved=false;
  const half=()=>tr.scrollWidth/2;
  const speed=()=>half()/55; // px per second, same pace as before
  function wrap(){const h=half();if(h>0){if(t.scrollLeft>=h)t.scrollLeft-=h;else if(t.scrollLeft<=0&&pos>0)t.scrollLeft+=h}}
  function tick(n){const dt=Math.min(100,n-last);last=n;
   if(t.isConnected&&t.offsetParent&&!RM&&!dragging&&n>pause){pos=t.scrollLeft+speed()*dt/1000;t.scrollLeft=pos;wrap();pos=t.scrollLeft}
   requestAnimationFrame(tick)}
  const hold=(ms)=>{pause=performance.now()+ms};
  t.addEventListener("touchstart",()=>hold(1e9),{passive:true});
  t.addEventListener("touchend",()=>hold(2500),{passive:true});
  t.addEventListener("scroll",()=>{if(performance.now()<pause)wrap()},{passive:true});
  t.addEventListener("wheel",()=>hold(2500),{passive:true});
  t.addEventListener("mouseenter",()=>hold(1e9));t.addEventListener("mouseleave",()=>{if(!dragging)hold(800)});
  t.addEventListener("pointerdown",e=>{if(e.pointerType!=="mouse")return;dragging=true;moved=false;sx=e.clientX;sl=t.scrollLeft;t.classList.add("tk-drag")});
  addEventListener("pointermove",e=>{if(!dragging)return;const d=e.clientX-sx;if(Math.abs(d)>4)moved=true;t.scrollLeft=sl-d;wrap()});
  addEventListener("pointerup",()=>{if(!dragging)return;dragging=false;t.classList.remove("tk-drag");hold(1500)});
  t.addEventListener("click",e=>{if(moved){e.preventDefault();e.stopPropagation();moved=false}},true);
  requestAnimationFrame(tick);
 }
 const scan=()=>document.querySelectorAll(".ticker").forEach(init);
 scan();addEventListener("hashchange",()=>[100,600,1500].forEach(t=>setTimeout(scan,t)));addEventListener("load",scan);setTimeout(scan,1500);
})();
