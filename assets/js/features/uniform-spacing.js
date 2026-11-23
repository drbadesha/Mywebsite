/* Uniform spacing, site-wide.
   One rhythm value S. Between two blocks on the same background the content gap is S.
   Inside a coloured band, content sits S from the band's top and bottom edges.
   Heroes, full-bleed photo bands, sticky bars and tickers are left as they are. */
(function(){
 const SKIP=/(^|\s)(hero|hero-full|t-banner|ph-hero|at-hero|ab-hero|at-bar|ab-bar|crumbs|ticker|qtiles|scroll-bar)(\s|$)/;
 const S=()=>Math.round(Math.min(112,Math.max(64,innerWidth*0.08)));
 const isBg=e=>{const c=getComputedStyle(e);return !(c.backgroundColor==="rgba(0, 0, 0, 0)"||c.backgroundColor==="transparent")||c.backgroundImage!=="none"};
 function edges(el){ // top/bottom of real content inside el, relative to el's border box (layout, ignores transforms)
  const R=el.getBoundingClientRect();let t=1e9,b=-1e9;
  const walk=n=>{for(const c of n.children){if(c.matches("script,style,template,[hidden],.sr-only,.visually-hidden"))continue;const cs=getComputedStyle(c);
    if(cs.display==="none"||cs.position==="fixed"||cs.position==="absolute"||cs.visibility==="hidden")continue;
    const r=c.getBoundingClientRect();if(r.height<1||r.width<1)continue;
    const box=isBg(c)||parseFloat(cs.borderTopWidth)>0||parseFloat(cs.borderBottomWidth)>0||c.matches("img,video,canvas,svg,iframe,picture,figure,button,input,select,textarea,table,hr,details,summary")||!c.children.length||[...c.children].some(k=>{const p=getComputedStyle(k).position;return p==="absolute"&&k.offsetHeight>0});
    if(box){t=Math.min(t,r.top);b=Math.max(b,r.bottom)}else walk(c)}};
  walk(el);if(t>b)return null;return{top:Math.round(t-R.top),bot:Math.round(R.bottom-b)}}
 function px(v){return parseFloat(v)||0}
 function norm(){
  const main=[...document.querySelectorAll("main")].find(m=>!m.hidden&&m.offsetHeight>0);if(!main)return;
  document.documentElement.classList.add("sp-measure");try{
  const kids=[...main.children].filter(e=>e.offsetHeight>0&&getComputedStyle(e).position!=="fixed"&&getComputedStyle(e).position!=="absolute");
  kids.forEach(e=>{if(e.dataset.sp){e.style.removeProperty("padding-top");e.style.removeProperty("padding-bottom");e.style.removeProperty("margin-top");e.style.removeProperty("margin-bottom");delete e.dataset.sp}});
  const s=S(),half=Math.round(s/2);
  const info=kids.map(e=>({e,skip:SKIP.test(e.className||"")||e.matches("[data-nosp]"),bg:isBg(e)}));
  const plan=info.map((x,i)=>{if(x.skip)return null;const ed=edges(x.e);if(!ed)return null;
   if(x.bg&&(ed.top<4||ed.bot<4))return null; // full-bleed photo band: leave
   const prev=info[i-1],next=info[i+1];
   const wantTop=x.bg||!prev||prev.bg||prev.skip?(x.bg||(prev&&(prev.bg||prev.skip))?s:half):half;
   const wantBot=x.bg||!next||next.bg||next.skip?(x.bg||(next&&(next.bg||next.skip))?s:half):half;
   const cs=getComputedStyle(x.e);
   return{e:x.e,pt:Math.max(0,px(cs.paddingTop)+(wantTop-ed.top)),pb:Math.max(0,px(cs.paddingBottom)+(wantBot-ed.bot))}});
  plan.forEach(p=>{if(!p)return;const st=p.e.style;st.setProperty("margin-top","0px","important");st.setProperty("margin-bottom","0px","important");st.setProperty("padding-top",p.pt+"px","important");st.setProperty("padding-bottom",p.pb+"px","important");p.e.dataset.sp="1"});
 }finally{document.documentElement.classList.remove("sp-measure")}}
 let tm;const later=d=>{clearTimeout(tm);tm=setTimeout(norm,d)};
 const run=()=>{[60,450,1100,2200].forEach(t=>setTimeout(norm,t))};
 addEventListener("hashchange",run);addEventListener("load",run);addEventListener("resize",()=>later(150));
 document.addEventListener("toggle",()=>later(30),true);run();
 window.mwSpacing=norm;
})();
