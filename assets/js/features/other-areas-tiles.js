/* Other areas of care: same colour tile + symbol as the area cards */
(function(){
 function run(){
  document.querySelectorAll(".ao2-card .rel2-img:not(.ao2-tiled)").forEach(function(box){
   var a=box.closest(".ao2-card"),h=a&&a.getAttribute("href");if(!h)return;
   var src=document.querySelector('#cats a[href="'+h+'"] .v3-tile');if(!src)return;
   box.innerHTML="";var t=src.cloneNode(true);t.classList.remove("v3-tile-card");box.appendChild(t);box.classList.add("ao2-tiled");
  });
 }
 new MutationObserver(function(){run()}).observe(document.documentElement,{childList:true,subtree:true});
 addEventListener("hashchange",function(){setTimeout(run,50)});setTimeout(run,800);
})();
