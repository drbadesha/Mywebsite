/* Levine PhenoAge calculator. Runs in the browser only: no storage, no network requests, nothing put in the URL. */
(function(){
 const $=id=>document.getElementById(id);
 const num=id=>{const v=($("pa-"+id)||{}).value;if(v==null)return NaN;const t=String(v).trim().replace(",",".").replace(/^[<>≤≥]\s*/,"");return t===""?NaN:Number(t)};
 const unit=id=>{const u=$("pa-"+id+"-u");return u?+u.value:0};
 function read(){
  const e=[];const age=num("age");if(!(age>=20&&age<=100))e.push("Age must be between 20 and 100.");
  let alb=num("alb");if(unit("alb")===1)alb*=10;                 // g/dL -> g/L
  let cr=num("cr");if(unit("cr")===1)cr*=88.42;                   // mg/dL -> umol/L
  let glu=num("glu");if(unit("glu")===1)glu/=18.016;              // mg/dL -> mmol/L
  let crp=num("crp");if(unit("crp")===0)crp/=10;                  // mg/L -> mg/dL
  const wbc=num("wbc");let lym=num("lym");if(unit("lym")===1)lym=wbc>0?lym/wbc*100:NaN; // absolute -> %
  const mcv=num("mcv"),rdw=num("rdw"),alp=num("alp");
  const chk=[["Albumin",alb,10,70],["Creatinine",cr,20,1000],["Glucose",glu,1.5,40],["CRP",crp,0,50],["Lymphocytes",lym,1,90],["MCV",mcv,50,130],["RDW",rdw,8,30],["ALP",alp,10,1000],["White blood cells",wbc,0.5,50]];
  chk.forEach(([n,v,lo,hi])=>{if(!isFinite(v))e.push(n+" is missing or not a number.");else if(v<lo||v>hi)e.push(n+" looks outside the expected range. Please check the value and unit.")});
  return {e,v:{age,alb,cr,glu,crp:Math.max(crp,0.01),lym,mcv,rdw,alp,wbc}};
 }
 function pheno(v){
  const xb=-19.9067-0.0336*v.alb+0.0095*v.cr+0.1953*v.glu+0.0954*Math.log(v.crp)-0.0120*v.lym+0.0268*v.mcv+0.3306*v.rdw+0.00188*v.alp+0.0554*v.wbc+0.0804*v.age;
  const g=0.0076927,M=1-Math.exp(-Math.exp(xb)*(Math.exp(120*g)-1)/g);
  return M>=1?NaN:141.50225+Math.log(-0.00553*Math.log(1-M))/0.090165;
 }
 function go(){
  const r=read(),err=$("paErr"),res=$("paRes");
  if(r.e.length){err.innerHTML=r.e.map(x=>"• "+x).join("<br>");err.hidden=false;res.hidden=true;return}
  err.hidden=true;const pa=pheno(r.v);
  if(!isFinite(pa)){err.textContent="These values fall outside what the model can estimate. Please check them, or talk to your clinician.";err.hidden=false;return}
  const d=pa-r.v.age,ad=Math.abs(d).toFixed(1);
  const line=Math.abs(d)<1?"about the same as your age in years":d<0?ad+" years lower than your age in years":ad+" years higher than your age in years";
  res.innerHTML=`<p class="eyebrow">Your estimate · educational only</p><div class="pa-nums"><div><small>Estimated PhenoAge</small><b>${pa.toFixed(1)}</b></div><div><small>Age in years</small><b>${r.v.age.toFixed(0)}</b></div></div>
   <p>Your estimated PhenoAge is <b>${line}</b>.</p>
   <p class="pa-note">A single result can vary with a recent illness, infection, hard exercise, dehydration or medications, and the model is less certain for some ages and backgrounds. It is most useful as one trend among many, reviewed with your clinician. This is not a diagnosis.</p>`;
  res.hidden=false;res.scrollIntoView({behavior:"smooth",block:"nearest"});
 }
 function clear(){document.querySelectorAll("#paForm input").forEach(i=>i.value="");document.querySelectorAll("#paForm select").forEach(s=>s.selectedIndex=0);$("paRes").hidden=true;$("paRes").innerHTML="";$("paErr").hidden=true}
 document.addEventListener("click",e=>{if(e.target.closest("#paGo")){e.preventDefault();go()}else if(e.target.closest("#paClear"))clear()});
 document.addEventListener("submit",e=>{if(e.target.id==="paForm"){e.preventDefault();go()}});
 addEventListener("hashchange",()=>{if(location.hash!=="#biological-age-calculator")clear()});
})();
