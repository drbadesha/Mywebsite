/* Orbit the philosophy portraits around the centre of the section */
(function(){const st=document.querySelector(".philo-stage");if(!st)return;const orbs=[...st.querySelectorAll(".ph-orb")];if(!orbs.length)return;
 const still=matchMedia("(prefers-reduced-motion: reduce)").matches;let vis=true,t0=performance.now(),off=0;
 function place(a){const w=st.clientWidth,h=st.clientHeight,mob=innerWidth<=760;
  const sz0=orbs[0].offsetWidth,rx=mob?w*0.43:Math.min(w*0.42,500),ry=h*0.5-sz0/2-6,cx=w/2,cy=h/2;
  orbs.forEach((o,i)=>{const th=a+i*2*Math.PI/orbs.length,sz=o.offsetWidth;
   o.style.transform=`translate(${cx+rx*Math.cos(th)-sz/2}px,${cy+ry*Math.sin(th)-sz/2}px)`})}
 function tick(now){if(vis){place(-Math.PI/2+(now-t0)/1000*(2*Math.PI/60))}requestAnimationFrame(tick)}
 if(still){place(-Math.PI/2);addEventListener("resize",()=>place(-Math.PI/2));}
 else{new IntersectionObserver(e=>{vis=e[0].isIntersecting},{rootMargin:"100px"}).observe(st);requestAnimationFrame(tick)}
})();
