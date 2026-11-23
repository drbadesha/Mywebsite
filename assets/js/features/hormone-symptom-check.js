/* Hormone symptom check (men: TRT, women: BHRT). Runs in the browser only; nothing is stored or sent. */
(function(){
 const D={
  m:{label:"men",sym:[["libido","Lower sex drive"],["erections","Weaker or fewer erections, including morning erections"],["energy","Low energy or fatigue"],["muscle","Losing muscle or strength"],["fat","More body fat, especially around the belly"],["mood","Irritability or low mood"],["fog","Brain fog or poor concentration"],["sleep","Poor sleep"],["drive","Less motivation or drive"],["recovery","Slower recovery after exercise"],["sweats","Hot flushes or sweats"]],
     q:[["age","Your age",["Under 30","30–39","40–49","50 or over"]],["len","How long have you noticed these?",["Less than 3 months","3–12 months","Over a year"]],["impact","How much do they affect daily life?",["A little","Moderately","A lot"]]],
     flags:["A new lump in a testicle or breast","Chest pain, or shortness of breath at rest","Thoughts of harming yourself"],
     book:"t:trt",bookLabel:"Request a TRT consultation",first:"New TRT patients start with bloodwork at LifeLabs to measure Testosterone and related markers, then a Virtual Initial Consultation with our Medical Doctor or Nurse Practitioner to review the results.",
     links:[["#t-trt","About TRT"],["#c-functional-labs","Hormone Testing (DUTCH)"],["#protocol-mens-hormones","Men's Hormone Health Protocol"]]},
  w:{label:"women",sym:[["hot","Hot flashes"],["night","Night sweats"],["sleep","Trouble sleeping"],["mood","Mood swings or irritability"],["anx","Anxiety or low mood"],["fog","Brain fog or forgetfulness"],["energy","Fatigue"],["weight","Weight gain, especially around the middle"],["vaginal","Vaginal dryness or discomfort"],["libido","Lower sex drive"],["periods","Changes in your periods"],["joints","Joint aches"],["skin","Drier skin or thinning hair"]],
     q:[["age","Your age",["Under 35","35–44","45–54","55 or over"]],["cycle","Your periods",["Regular","Irregular or changing","None for 12 months or more","Not sure, or on hormonal birth control"]],["impact","How much do these affect daily life?",["A little","Moderately","A lot"]]],
     flags:["Any bleeding after Menopause (12 months without a period)","Very heavy bleeding, or bleeding between periods","A new breast lump","Thoughts of harming yourself"],
     book:"t:bhrt",bookLabel:"Request a hormone consultation",first:"Hormone care starts with an Initial Naturopathic Consultation, with testing where it helps, so options are based on your results and history.",
     links:[["#t-bhrt","About Bioidentical Hormones (BHRT)"],["#c-functional-labs","Hormone Testing (DUTCH)"],["#g-hot-flashes","Hot flashes"],["#protocol-womens-hormones","Women's Hormone Health Protocol"]]}
 };
 const esc=x=>String(x).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 let who="m",st={sym:new Set(),ans:{},flag:false};
 const card=()=>document.getElementById("hcCard");
 function render(){const c=card();if(!c)return;const d=D[who];
  c.innerHTML=`<p class="hc-step">Step 1 of 2 · Symptoms you've noticed</p><div class="hc-grid">${d.sym.map(([k,t])=>`<button type="button" class="hc-sym" data-k="${k}" aria-pressed="${st.sym.has(k)}"><span class="hc-tick" aria-hidden="true"></span>${esc(t)}</button>`).join("")}</div>
  <p class="hc-step" style="margin-top:28px">Step 2 of 2 · A little about you</p>${d.q.map(([k,t,o])=>`<fieldset class="hc-q"><legend>${esc(t)}</legend><div>${o.map((x,i)=>`<button type="button" class="hc-opt" data-q="${k}" data-i="${i}" aria-pressed="${st.ans[k]===i}">${esc(x)}</button>`).join("")}</div></fieldset>`).join("")}
  <fieldset class="hc-q hc-flags"><legend>Do any of these apply right now?</legend><ul>${d.flags.map(f=>`<li>${esc(f)}</li>`).join("")}</ul><div><button type="button" class="hc-opt" data-flag="1" aria-pressed="${st.flag===true}">Yes</button><button type="button" class="hc-opt" data-flag="0" aria-pressed="${st.flag===false&&st.flagSet===true}">No</button></div></fieldset>
  <div class="hc-actions"><button type="button" class="btn btn-primary" id="hcGo">See my result <span class="arr">→</span></button><button type="button" class="link hc-reset" id="hcReset">Start again</button></div>`}
 function result(){const d=D[who],n=st.sym.size,c=card();
  if(st.flag===true){c.innerHTML=`<div class="hc-res hc-urgent"><p class="eyebrow">Please don't wait</p><h2>Speak to a doctor promptly</h2><p>One or more of the things you ticked should be checked by your family doctor, a walk-in clinic or urgent care before any hormone treatment is considered. If you have chest pain or thoughts of harming yourself, call 911 or go to the nearest emergency department. In BC you can also call 811 to speak with a nurse, any time.</p><button type="button" class="link hc-reset" id="hcReset">Start again</button></div>`;return}
  const imp=st.ans.impact??0,lenOk=(st.ans.len??1)>=1;
  const tier=n>=6||(n>=4&&imp===2)?3:n>=3?2:n>=1?1:0;
  const head=["You didn't tick any symptoms","A few symptoms","Several symptoms that often go together","Many symptoms that often go together"][tier];
  const body=[`If something is still bothering you, an Initial Naturopathic Consultation can look at all the possible causes.`,
   `You ticked ${n} symptom${n>1?"s":""}. On ${n>1?"their":"its"} own ${n>1?"these":"this"} can have many causes, such as sleep, stress, iron or thyroid. If ${n>1?"they persist":"it persists"}, a consultation can help find the cause.`,
   `You ticked ${n} symptoms. Together, these are often seen with hormone changes${who==="m"?", such as lower testosterone":", such as Perimenopause or Menopause"}, although other causes, including thyroid, iron, sleep and stress, can look similar. Testing is a reasonable next step.`,
   `You ticked ${n} symptoms${imp===2?" that affect your daily life a lot":""}. This pattern is often seen with hormone changes${who==="m"?", such as lower testosterone":", such as Perimenopause or Menopause"}. Other causes can look similar, so testing and a full assessment are the right next step.`][tier];
  const extra=who==="w"&&st.ans.cycle===2?"<p>Because your periods have stopped for 12 months or more, your clinician will also talk with you about bone and heart health.</p>":who==="w"&&st.ans.cycle===1?"<p>Changing or irregular periods are common in Perimenopause, which can start in your late 30s or 40s.</p>":who==="m"&&(st.ans.age??0)===0&&tier>=2?"<p>Low Testosterone is less common under 30, so your clinician will look carefully at other causes too.</p>":"";
  c.innerHTML=`<div class="hc-res"><p class="eyebrow">Your result · not a diagnosis</p><h2>${head}</h2><p>${body}</p>${extra}${!lenOk&&tier>=2?"<p>Symptoms that started recently can settle on their own; if they last more than a few weeks, it's worth checking.</p>":""}
   <div class="hc-next"><p class="eyebrow">Suggested next step</p><p>${tier>=2?esc(d.first):"An Initial Naturopathic Consultation looks at your health as a whole, including hormones where relevant."}</p>
   <div class="hc-ctas"><button type="button" class="btn btn-primary" data-book="${tier>=2?d.book:"t:naturopathic-consultation"}">${tier>=2?d.bookLabel:"Request a consultation"} <span class="arr">→</span></button><a class="btn btn-ghost" href="tel:+16046305813">Call (604) 630-5813</a></div>
   <p class="hc-links">${d.links.map(([h,t])=>`<a class="link" href="${h}">${esc(t)} →</a>`).join("")}</p></div>
   <p class="hc-note">This check is general information to help you decide on a next step. It does not diagnose any condition, and your answers are not saved or sent.</p>
   <button type="button" class="link hc-reset" id="hcReset">Start again</button></div>`;
  c.scrollIntoView({behavior:"smooth",block:"start"})}
 document.addEventListener("click",e=>{
  const t=e.target.closest("#hormone-check .hc-tab");if(t){who=t.dataset.hc;st={sym:new Set(),ans:{},flag:false};document.querySelectorAll("#hormone-check .hc-tab").forEach(x=>x.setAttribute("aria-selected",String(x===t)));render();return}
  const sy=e.target.closest("#hcCard .hc-sym");if(sy){const k=sy.dataset.k;st.sym.has(k)?st.sym.delete(k):st.sym.add(k);sy.setAttribute("aria-pressed",String(st.sym.has(k)));return}
  const op=e.target.closest("#hcCard .hc-opt");if(op){if(op.dataset.flag!==undefined){st.flag=op.dataset.flag==="1";st.flagSet=true}else st.ans[op.dataset.q]=+op.dataset.i;op.parentNode.querySelectorAll(".hc-opt").forEach(x=>x.setAttribute("aria-pressed",String(x===op)));return}
  if(e.target.closest("#hcGo")){result();return}
  if(e.target.closest("#hcReset")){st={sym:new Set(),ans:{},flag:false};render();card().scrollIntoView({block:"start"});return}
  const pre=e.target.closest("[data-hc-open]");if(pre){who=pre.dataset.hcOpen;st={sym:new Set(),ans:{},flag:false};setTimeout(()=>{document.querySelectorAll("#hormone-check .hc-tab").forEach(x=>x.setAttribute("aria-selected",String(x.dataset.hc===who)));render()},60)}
 });
 render();
})();
