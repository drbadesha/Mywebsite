/* ARRC: real bed photo in the treatment hero */
(function(){function f(){if(location.hash!=="#t-red-light-therapy")return;var t=document.querySelector("#page-treatment .t-hero .v3-tile-hero");if(!t||t.querySelector(".arrc-hero-img"))return;t.classList.add("arrc-on");var i=new Image();i.className="arrc-hero-img";i.src="assets/images/content/arrc-bed.webp";i.alt="The ARRC LED red light bed at Mediworks";i.width=680;i.height=445;t.appendChild(i)}
addEventListener("hashchange",function(){[60,400,1200].forEach(function(d){setTimeout(f,d)})});[300,1000,2200].forEach(function(d){setTimeout(f,d)});
new MutationObserver(function(){if(location.hash==="#t-red-light-therapy")f()}).observe(document.documentElement,{childList:true,subtree:true})})();
