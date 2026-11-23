/* Nov 16: mobile Find bottom sheet */
(function(){
 var root=document.documentElement,fs=document.getElementById("fs"),back=document.getElementById("fsBack"),list=document.getElementById("fsList");
 if(!fs)return;
 var mq=matchMedia("(max-width:1080px)"),RM=matchMedia("(prefers-reduced-motion:reduce)").matches,opener=null,open=false;
 function build(){
  if(list.childElementCount)return;
  var cards=[].slice.call(document.querySelectorAll("#cats a[href^='#m-']")),html="";
  cards.forEach(function(a,i){
   var btn=a.querySelector(".vc-btn"),k=a.querySelector(".vc-k");
   var name=btn?btn.textContent.replace(/^\s*Explore\s+/i,"").replace(/[→\s]+$/,""):a.textContent.trim().slice(0,40);
   html+='<li><a href="'+a.getAttribute("href")+'" style="--i:'+i+'"><b></b><small></small><span class="ch" aria-hidden="true">›</span></a></li>';
  });
  list.innerHTML=html;
  [].slice.call(list.querySelectorAll("a")).forEach(function(el,i){
   var a=cards[i],btn=a.querySelector(".vc-btn"),k=a.querySelector(".vc-k");
   el.querySelector("b").textContent=btn?btn.textContent.replace(/^\s*Explore\s+/i,"").replace(/[→\s]+$/,""):"";
   el.querySelector("small").textContent=k?k.textContent:"";
  });
 }
 function show(e){
  if(!mq.matches)return;
  e&&e.preventDefault();build();opener=document.activeElement;open=true;
  fs.hidden=back.hidden=false;root.classList.add("fs-lock","modal-open");
  requestAnimationFrame(function(){requestAnimationFrame(function(){root.classList.add("fs-on")})});
  setTimeout(function(){var f=document.getElementById("fsX");f&&f.focus({preventScroll:true})},RM?0:250);
 }
 function hide(){
  if(!open)return;open=false;root.classList.remove("fs-on");fs.style.transform="";
  setTimeout(function(){if(!open){fs.hidden=back.hidden=true;root.classList.remove("fs-lock","modal-open")}},RM?0:420);
  if(opener&&opener.focus)opener.focus({preventScroll:true});
 }
 document.addEventListener("click",function(e){
  var f=e.target.closest&&e.target.closest("#mcta .mcta-find");if(f)return show(e);
  if(open&&e.target.closest("#fs a"))hide();
 },true);
 back.addEventListener("click",hide);document.getElementById("fsX").addEventListener("click",hide);
 document.addEventListener("keydown",function(e){if(open&&e.key==="Escape")hide()});
 addEventListener("hashchange",function(){if(open)hide()});
 /* drag down to dismiss */
 var y0=null,dy=0;
 [fs.querySelector(".fs-grab"),fs.querySelector(".fs-top")].forEach(function(h){
  h.addEventListener("pointerdown",function(e){if(e.target.closest("button"))return;y0=e.clientY;dy=0;fs.style.transition="none";h.setPointerCapture&&h.setPointerCapture(e.pointerId)});
  h.addEventListener("pointermove",function(e){if(y0===null)return;dy=Math.max(0,e.clientY-y0);fs.style.transform="translateY("+dy+"px)"});
  function end(){if(y0===null)return;y0=null;fs.style.transition="";if(dy>90)hide();else fs.style.transform=""}
  h.addEventListener("pointerup",end);h.addEventListener("pointercancel",end);
 });
})();
