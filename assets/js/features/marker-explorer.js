/* Nov 19: marker explorer */
(function(){
 document.addEventListener("click",function(e){
  var t=e.target.closest&&e.target.closest(".mx-tab");
  if(t){var box=t.closest(".mx-box");box.querySelectorAll(".mx-tab").forEach(function(b){var on=b===t;b.setAttribute("aria-selected",on);b.tabIndex=on?0:-1;var pn=document.getElementById(b.getAttribute("aria-controls"));if(pn)pn.hidden=!on});return}
  var c=e.target.closest&&e.target.closest(".mx-chip");
  if(c){var pane=c.closest(".mx-pane");pane.querySelectorAll(".mx-chip").forEach(function(b){b.setAttribute("aria-pressed",b===c)});pane.querySelectorAll(".mx-card").forEach(function(k){k.hidden=k.dataset.m!==c.dataset.m})}
 });
 document.addEventListener("keydown",function(e){
  var t=e.target.closest&&e.target.closest(".mx-tab");if(!t||!/^Arrow(Left|Right)$|^Home$|^End$/.test(e.key))return;
  var L=[].slice.call(t.parentNode.querySelectorAll(".mx-tab")),i=L.indexOf(t);
  i=e.key==="ArrowRight"?(i+1)%L.length:e.key==="ArrowLeft"?(i-1+L.length)%L.length:e.key==="Home"?0:L.length-1;
  e.preventDefault();L[i].focus();L[i].click();
 });
})();
