/* v5: competitor-review additions + redundancy trims (runs after route renders) */
(function(){
var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return [].slice.call((r||document).querySelectorAll(s))};
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstElementChild}

/* ---------- 3. Booking tracking: keep ad source for the session, push a dataLayer event on booking clicks ---------- */
var UTM={};
try{var q=new URLSearchParams(location.search);['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'].forEach(function(k){if(q.get(k))UTM[k]=q.get(k)});
 if(Object.keys(UTM).length)sessionStorage.setItem('mwUtm',JSON.stringify(UTM));else UTM=JSON.parse(sessionStorage.getItem('mwUtm')||'{}')}catch(e){}
document.addEventListener('click',function(e){var a=e.target.closest('a[href*="janeapp.com"],[data-book]');if(!a)return;
 try{(window.dataLayer=window.dataLayer||[]).push(Object.assign({event:'book_click',page:location.hash||'#home',label:(a.textContent||'').trim().slice(0,60)},UTM))}catch(err){}},true);

/* ---------- 1. Homepage symptom chips ---------- */
var CHIPS=[["Low Energy","low-energy"],["Weight Loss","stubborn-fat"],["Feel Stronger","build-muscle"],["Think Sharper","brain-fog-cognition"],["Sleep Better","sleep-problems"],["Low Testosterone","hormone-decline"],["Hot Flashes","hot-flashes"],["Sexual Health","low-libido"],["Women's Fertility","fertility-prep"],["Men's Fertility","male-fertility"],["Heart Health","heart-health"],["Genetic Testing","genetic-risk"],["Joint Pain","joint-pain"],["Stress and Burnout","cortisol-stress"],["Skin Health","skin-quality"],["Lines and Wrinkles","facial-aging"],["Hair Loss","hair-loss"]];
function homeChips(){return;/* v9: concerns now live in search */var sec=$('#page-home #treatments');if(!sec||$('.v5-chips',sec))return;
 var anchor=$('.v3-tabs,[role=tablist]',sec)||$('.sec-head',sec);if(!anchor)return;
 var h='<div class="v5-chips"><p class="v5-chips-l">Tap what you\'re feeling</p><div class="v5-chip-row">'+CHIPS.map(function(c,i){return '<a class="v5-chip" style="--i:'+i+'" href="#g-'+c[1]+'">'+c[0]+'</a>'}).join('')+'</div></div>';
 (anchor.classList.contains('sec-head')?anchor:anchor).insertAdjacentElement(anchor.classList.contains('sec-head')?'afterend':'beforebegin',el(h))}

document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a.v5-chip');if(!a)return;e.preventDefault();var h=a.getAttribute('href');if(location.hash===h)window.dispatchEvent(new HashChangeEvent('hashchange'));else location.hash=h;window.scrollTo(0,0)},true);
/* ---------- treatment page additions ---------- */
var TESTFIRST={bhrt:"Start with testing. Your symptoms, history and hormone testing come before any decision about treatment."};
var FACTS={
 trt:{h:"Testosterone by the numbers",f:[["About 2%","of men aged 40 to 79 met the full definition of age-related low Testosterone (low levels plus symptoms) in a large European study.","Wu FCW et al. N Engl J Med 2010;363:123–35"],["1–2% a year","is roughly how much total Testosterone fell each year with age in the Massachusetts Male Aging Study.","Feldman HA et al. J Clin Endocrinol Metab 2002;87:589–98"],["2 tests","Diagnosis needs symptoms plus low morning Testosterone on at least two separate blood tests.","Morales A et al. CMAJ 2015;187(18):1369–77"]]},
 bhrt:{h:"Menopause by the numbers",f:[["51","is the average age of Menopause in Canada. Perimenopause usually begins in the 40s.","Society of Obstetricians and Gynaecologists of Canada (SOGC)"],["2–10 years","is how long Perimenopause typically lasts, as hormone levels rise and fall.","SOGC; UBC Women's Health Research Institute"],["7","symptoms, on average, were reported by Canadian women aged 40 to 60 in a national survey.","Menopause Foundation of Canada, The Silence and the Stigma (2022)"]]}};
var COVER='<div class="v5-cover"><b>What\'s covered</b><p>Mediworks is private pay. Many extended health plans cover Naturopathic visits, and we direct bill where your plan allows. Lab tests ordered by a Naturopathic Doctor are paid privately, and some plans reimburse lab fees. Your clinician explains costs before anything is ordered.</p></div>';
var COVER_TRT='<div class="v5-cover"><b>What\'s covered</b><p>Most TRT bloodwork is covered by MSP. At your first bloodwork, Bioavailable Testosterone, Vitamin D and PSA are not covered, and you pay LifeLabs directly for those. Follow-up bloodwork is covered by MSP, except PSA, which is checked every 6 months and paid directly to LifeLabs. The TRT protocol fee is not eligible for extended health reimbursement, although your prescription may be.</p></div>';
var APPROP='Treatments are offered only when clinically appropriate, after an individual assessment. Individual results vary.';
var REASSURE='A consultation is a conversation, not a commitment.';
var HIDE={'glp1-support':'t-how',trt:'t-expect'};
var SLEEP_NOTE='<p class="v5-flag"><b>If sleep is your goal:</b> loud snoring, gasping at night or heavy daytime sleepiness can be signs of sleep apnea. We screen for it first and refer you for a sleep study when needed.</p>';

function treatment(){var pg=$('#page-treatment');if(!pg||pg.hidden)return;
 var slug=(location.hash.match(/^#t-([a-z0-9-]+)/)||[])[1];if(!slug||!$('#t-book',pg))return;
 // 6. start with testing
 if(TESTFIRST[slug]){var cta=$('.t-hero .hero-ctas',pg);if(cta&&!$('.v5-start',pg))cta.insertAdjacentElement('beforebegin',el('<p class="v5-start">'+TESTFIRST[slug]+'</p>'))}
 // 8. cited facts
 if(FACTS[slug]&&!$('.v5-facts',pg)){var F=FACTS[slug],ab=$('#t-about',pg);if(ab)ab.appendChild(el('<div class="v5-facts"><p class="eyebrow">'+F.h+'</p><div class="v5-fgrid">'+F.f.map(function(x){return '<div><b>'+x[0]+'</b><p>'+x[1]+'</p><small>'+x[2]+'</small></div>'}).join('')+'</div></div>'))}
 // 7. what's covered (lab + hormone pages = any page listing tests)
 var tt=$('#t-tests',pg);if(tt&&!$('.v5-cover',tt))tt.appendChild(el(slug==='trt'?COVER_TRT:COVER));
 // 13. sleep apnea first
 if(slug==='red-light-therapy'){var hp=$('#t-helps',pg);if(hp&&!$('.v5-flag',hp))hp.appendChild(el(SLEEP_NOTE))}
 // 12. hair: check first + maintenance
 if(slug==='prp-hair-restoration'&&!$('.v5-flag',pg)){var ap=$('#t-approach',pg)||$('#t-about',pg);if(ap)ap.appendChild(el('<p class="v5-flag"><b>What we check first:</b> iron, thyroid and hormone levels, recent illness or stress, and medications, since some causes of thinning can be corrected. Gains from PRP are usually kept with periodic maintenance sessions. <a class="link" href="#t-hair-consultation">About the Hair Consultation →</a></p>'))}
 // 9 + 4. appropriateness + reassurance under booking
 var bc=$('#t-book .book-card',pg)||$('#t-book',pg);if(bc&&!$('.v5-approp',bc))bc.appendChild(el('<p class="v5-approp">'+REASSURE+' '+APPROP+'</p>'));
 // one coverage question per page (some pages get a specific one added later)
 var cq=$$('#t-faq details',pg).filter(function(d){var q=($('summary',d)||{}).textContent||'';return /insur/i.test(q)&&!/insurer see/i.test(q)});
 if(cq.length>1)cq.forEach(function(d){if(/^Is it covered by insurance\?$/.test(($('summary',d)||{}).textContent.trim()))d.remove()});
 // trims: redundant process/timeline on two pages
 if(HIDE[slug]){var hs=$('#'+HIDE[slug],pg);if(hs){var ht=($('h2',hs)||{}).textContent;hs.hidden=true;$$('nav.toc button',pg).forEach(function(b){if(ht&&b.textContent.trim().toLowerCase()===ht.trim().toLowerCase())b.hidden=true})}}
}

/* ---------- 13. sleep goal page ---------- */
function goal(){var pg=$('#page-goal');if(!pg||pg.hidden)return;
 if(location.hash==='#g-sleep-problems'&&!$('.v5-flag',pg)){var box=$('.g-about-in',pg)||$('.g-about .wrap',pg);if(box)box.appendChild(el(SLEEP_NOTE.replace('If sleep is your goal:','First step:')))}}

/* ---------- 14. biomarker glossary on the lab catalogue ---------- */
var GL=[
 ["Blood and iron",[["Ferritin","Your body's iron stores. Low ferritin can explain fatigue and hair shedding before anaemia shows up."],["Hemoglobin","The protein in red blood cells that carries oxygen. Low levels mean anaemia."],["CBC (complete blood count)","Counts red cells, white cells and platelets, a basic check for anaemia, infection and blood disorders."]]],
 ["Thyroid",[["TSH","The pituitary's signal to the thyroid. A high TSH usually means the thyroid is underactive; a low TSH, overactive."],["Free T4 and Free T3","The thyroid hormones themselves, in the form your cells can use."],["TPO antibodies","Antibodies against the thyroid. Raised levels point to autoimmune thyroid disease such as Hashimoto's."]]],
 ["Hormones",[["Total Testosterone","All the Testosterone in your blood. Measured in the morning, when it is highest."],["Free Testosterone","The small share not bound to proteins, which tissues can use directly."],["SHBG","A protein that binds sex hormones. High or low SHBG changes how much hormone is available."],["Estradiol","The main estrogen before Menopause. It falls and fluctuates through Perimenopause."],["Progesterone","Rises after ovulation. Low levels in the second half of the cycle can relate to cycle symptoms."],["FSH and LH","Brain signals that drive the ovaries and testes. FSH rises as the ovaries slow down near Menopause."],["Prolactin","A pituitary hormone. High levels can affect cycles, libido and Testosterone."],["DHEA-S","An adrenal hormone used to make other hormones. It declines gradually with age."],["Cortisol","The main stress hormone. It should be highest after waking and fall through the day."],["IGF-1","Made in the liver in response to Growth Hormone. Used as a steady measure of Growth Hormone activity."],["IGFBP-3","The main protein that carries IGF-1 in the blood. Read alongside IGF-1."]]],
 ["Blood sugar",[["Fasting glucose","Blood sugar after an overnight fast."],["HbA1c","Average blood sugar over the past two to three months."],["Fasting insulin","How much insulin it takes to hold glucose steady. It often rises years before glucose does."],["HOMA-IR","A score from fasting insulin and glucose that estimates Insulin Resistance."]]],
 ["Heart and inflammation",[["LDL cholesterol","Cholesterol carried in particles that can build up in artery walls."],["ApoB","Counts the particles that carry cholesterol into arteries. Often a sharper risk marker than LDL alone."],["HDL cholesterol","Cholesterol carried away from the arteries."],["Triglycerides","Fats in the blood. Often high with Insulin Resistance."],["Lp(a)","A largely inherited cholesterol particle linked to heart risk. Usually tested once."],["ApoA-1","The main protein in HDL particles. Low levels are linked to higher heart risk."],["Lp-PLA2 (PLAC test)","An enzyme made by inflammatory cells in artery walls. Higher activity is linked to plaque that is more likely to rupture."],["ESR","How quickly red blood cells settle in a tube. A general, non-specific sign of inflammation."],["hs-CRP","A sensitive marker of low-grade inflammation."],["Homocysteine","An amino acid. High levels can relate to low B12 or folate and to vascular risk."]]],
 ["Nutrients and organs",[["Vitamin D (25-OH)","The storage form of vitamin D, the best measure of your levels."],["Vitamin B12","Needed for nerves and red blood cells. Low levels can cause fatigue and tingling."],["ALT","A liver enzyme. Raised levels can signal liver stress, including fatty liver."],["eGFR and creatinine","Estimates of how well the kidneys filter blood."],["PSA","A prostate protein, used with your clinician's advice for prostate screening and monitoring."]]]];
function glossary(){var pg=$('#page-labtests');if(!pg||pg.hidden||$('.v5-gloss',pg))return;var w=$('.lc-cat .wrap',pg);if(!w)return;
 var n=GL.reduce(function(a,g){return a+g[1].length},0);
 var h='<section class="v5-gloss" id="glossary"><p class="eyebrow">Biomarker glossary</p><h2>What the markers <em>mean</em></h2><p class="lede">'+n+' common markers in plain language. Type to find one.</p><input class="v5-gq" type="search" placeholder="Search markers, e.g. ferritin" aria-label="Search the biomarker glossary"><div class="v5-gg">'+GL.map(function(g){return '<div class="v5-gcat"><p class="v5-gch">'+g[0]+'</p><dl>'+g[1].map(function(m){return '<div class="v5-gi"><dt>'+m[0]+'</dt><dd>'+m[1]+'</dd></div>'}).join('')+'</dl></div>'}).join('')+'</div><p class="v5-gnone" hidden>No match. Try another name.</p><p class="v5-gsrc">Definitions are general information. Sources: <a class="link" href="https://medlineplus.gov/lab-tests/" target="_blank" rel="noopener">MedlinePlus Lab Tests (U.S. National Library of Medicine) ↗</a>. Your clinician interprets results in the context of your health.</p>'+COVER+'</section>';
 w.appendChild(el(h));var cnt=$('#lcCount',pg);if(cnt&&!$('.v5-gjump',pg)){var j=el('<button type="button" class="v5-gjump link">What do the markers mean? Open the glossary ↓</button>');cnt.insertAdjacentElement('afterend',j);j.addEventListener('click',function(){$('.v5-gloss',pg).scrollIntoView({behavior:'smooth',block:'start'})})}var inp=$('.v5-gq',pg);inp.addEventListener('input',function(){var v=inp.value.trim().toLowerCase(),any=false;$$('.v5-gcat',pg).forEach(function(c){var vis=0;$$('.v5-gi',c).forEach(function(i){var m=!v||i.textContent.toLowerCase().indexOf(v)>-1;i.hidden=!m;if(m)vis++});c.hidden=!vis;if(vis)any=true});$('.v5-gnone',pg).hidden=any})}

/* ---------- Longevity Testing category: conventional + functional longevity panels ---------- */
function longevityCat(){if(location.hash!=='#c-longevity-testing')return;var pg=$('#page-cat')||$('main:not([hidden])');if(!pg||$('.v5-ltests',pg)||!window.__mwLT)return;
 var L=window.__mwLT.all().filter(function(t){return t.group==='longevity'});if(!L.length)return;
 var conv=L.filter(function(t){return t.lab==='LifeLabs'}),func=L.filter(function(t){return t.lab!=='LifeLabs'});
 var tx=$$('.wrap',pg).filter(function(w){return /longevity testing/i.test((w.querySelector('h2,h3')||{}).textContent||'')&&w.querySelector('a[href^="#t-"]')})[0]||$$('.wrap',pg).filter(function(w){return w.querySelector('a[href="#t-truage"]')})[0];if(!tx)return;
 var blk=function(h,sub,list,id){return list.length?'<div class="v5-lsub" id="'+id+'"><p class="eyebrow">'+h+'</p><p class="v5-lsub-l">'+sub+'</p>'+list.map(window.__mwLT.row).join('')+'</div>':''};
 var h='<div class="wrap v5-ltests" id="longevity-tests"><div class="t-tests"><h2>Longevity blood tests</h2><p class="lede">Conventional bloodwork through LifeLabs, and functional longevity panels through '+window.__mwLT.labs(func)+'. Tap a test to see what it measures. Your clinician recommends which test, if any, suits you.</p>'+blk('Conventional · LifeLabs','',conv,'lt-conv')+blk('Functional','Specialty labs that look deeper at cellular and healthy-ageing markers.',func,'lt-func')+'<p style="margin-top:22px"><a class="link" href="#lab-tests">Search and compare all '+window.__mwLT.all().length+' tests →</a></p></div></div>';
 tx.insertAdjacentElement('afterend',el(h));ltJump();
 var eb=$('.c-hero .eyebrow',pg);if(eb&&/tests?$/i.test(eb.textContent.trim()))eb.textContent=eb.textContent.replace(/\d+\s+tests?/i,($$('a.pc,a.v5t',pg).filter(function(a){return /^#t-/.test(a.getAttribute('href'))}).length+L.length)+' tests')}

/* menu: longevity blood tests under Longevity Testing (phone + desktop) */
var LT_TARGET=null;
function ltJump(){if(!LT_TARGET)return;var t=document.getElementById(LT_TARGET);if(!t)return;LT_TARGET=null;setTimeout(function(){window.scrollTo({top:t.getBoundingClientRect().top+scrollY-140,behavior:'smooth'})},250)}
function ltMenus(){
 $$('ul.sp-list').forEach(function(u){if(u.querySelector('.v5-lm')||!u.querySelector('a[href="#t-glycanage"]'))return;
  u.insertAdjacentHTML('beforeend','<li class="v5-lm"><a href="#c-longevity-testing" data-lt="lt-conv">Conventional Longevity Tests</a></li><li class="v5-lm"><a href="#c-longevity-testing" data-lt="lt-func">Functional Longevity Tests</a></li>')});
 var d=$('#subLabs a[href="#c-longevity-testing"] small');if(d&&!d.dataset.v5){d.dataset.v5='1';d.textContent='TruAge + TruHealth, GlycanAge, and conventional and functional longevity blood tests'}}
document.addEventListener('click',function(e){var a=e.target.closest('[data-lt]');if(!a)return;LT_TARGET=a.dataset.lt;if(location.hash==='#c-longevity-testing'){setTimeout(ltJump,350)}},true);

function subnavActive(){$$('nav.subnav').forEach(function(n){var a=n.querySelector('a[aria-current]');if(!a||n.dataset.v5s===location.hash)return;n.dataset.v5s=location.hash;var s=a.parentElement;while(s&&s!==n&&s.scrollWidth<=s.clientWidth)s=s.parentElement;if(!s)return;var x=a.getBoundingClientRect().left-s.getBoundingClientRect().left+s.scrollLeft-(s.clientWidth-a.offsetWidth)/2;s.scrollLeft=Math.max(0,x)})}

/* ---------- Treatment cards as coloured tiles (photos stay in treatment heroes) ---------- */
var PAL={injectables:['#3AA7E6','#0B4A75'],'regenerative-skin':['#E39A93','#8A3E52'],skincare:['#E8AE7E','#9A5A36'],hair:['#D2A85E','#7A5420'],
 'joint-arthritis':['#63B98E','#23654A'],'muscle-soft-tissue':['#53ADA6','#1D5E5A'],'recovery-support':['#7DB07A','#2F5E35'],'sports-injury':['#7DB07A','#2F5E35'],
 hormones:['#C474AA','#5E2A57'],'weight-metabolic':['#F2A766','#A8521F'],'iv-cellular':['#9486F2','#3D2F8F'],'recovery-performance':['#4FBCDD','#135E7A'],
 'longevity-testing':['#86AEEA','#2B4C8F'],naturopathic:['#93BA9E','#3F6150'],bloodwork:['#E77A7A','#8E2A3A'],'body-composition':['#5EC3C0','#1F6F7A'],
 'cardio-fitness':['#F2848F','#9B2F55'],genetics:['#7491F5','#2E3E9E']};
function hx2hsl(h){var r=parseInt(h.substr(1,2),16)/255,g=parseInt(h.substr(3,2),16)/255,b=parseInt(h.substr(5,2),16)/255,M=Math.max(r,g,b),m=Math.min(r,g,b),l=(M+m)/2,s=0,H=0,d=M-m;if(d){s=l>.5?d/(2-M-m):d/(M+m);H=M===r?((g-b)/d+(g<b?6:0)):M===g?(b-r)/d+2:(r-g)/d+4;H*=60}return [H,s*100,l*100]}
function shade(hex,k,dl){var a=hx2hsl(hex);var h=(a[0]+k*12+360)%360,l=a[2]-(dl||0);if(h>150&&h<200)l-=6;return 'hsl('+h.toFixed(0)+' '+Math.min(a[1],72).toFixed(0)+'% '+l.toFixed(0)+'%)'}
function hsh(s){var h=0;for(var i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return Math.abs(h)}
function tileCards(){if(!window.__mwArt||!window.mwTileSvg)return;var cards=$$('a.pc:not(.v5t),a.rel2-card:not(.v5t)');if(!cards.length)return;var A=window.__mwArt();
 cards.forEach(function(a){var lt=(a.getAttribute('href')||'').match(/^#lt-([a-z0-9-]+)/);if(lt&&a.classList.contains('pc')){var g=function(sel){var e=a.querySelector(sel);return e?e.textContent.trim():''};var tg=g('.pc-tag'),conv=/lifelabs/i.test(tg),fc=A.TX['functional-lab-testing'],pp=conv?PAL.bloodwork:(PAL[fc&&fc.c]||PAL.naturopathic);var ic=a.querySelector('.v3-tile-ic'),k2=(hsh(lt[1])%5)-2;a.classList.add('v5t');a.style.setProperty('--c1',shade(pp[0],k2,7));a.style.setProperty('--c2',shade(pp[1],k2,2));var nm=g('.pc-n'),ds=g('.pc-d'),ft=g('.pc-f span').split(',')[0];a.innerHTML='<span class="v5t-tag">'+tg+'</span>'+(ic?'<svg class="v5t-ic" viewBox="0 0 100 100" aria-hidden="true">'+ic.innerHTML+'</svg>':'')+'<span class="v5t-b"><b class="v5t-n">'+nm+'</b>'+(ds?'<span class="v5t-d">'+ds+'</span>':'')+'<span class="v5t-f"><span>'+ft+'</span><span class="v5t-go" aria-hidden="true">→</span></span></span>';return}var m=(a.getAttribute('href')||'').match(/^#t-([a-z0-9-]+)/);if(!m||!A.TX[m[1]])return;var s=m[1],t=A.TX[s],c=A.CAT[t.c]||{},p=PAL[t.c]||['#3AA7E6','#0B4A75'];
  var q=function(sel){var e=a.querySelector(sel);return e?e.textContent.trim():''};
  var name=q('.pc-n')||q('.rel2-body b')||t.n,desc=q('.pc-d')||q('.rel2-body small')||t.s||'',foot=q('.pc-f span')||(t.f&&t.f[0])||'',tag=q('.pc-tag')||c.name||'';
  var key=(A.TXM&&A.TXM[s])||(window.__v3Icon&&window.__v3Icon[c.k])||'';var svg='';try{svg=key?window.mwTileSvg(key):''}catch(e){}
  var k=(hsh(s)%5)-2;a.classList.add('v5t');a.style.setProperty('--c1',shade(p[0],k,7));a.style.setProperty('--c2',shade(p[1],k,2));
  a.innerHTML='<span class="v5t-tag">'+tag+'</span>'+(svg?'<svg class="v5t-ic" viewBox="0 0 100 100" aria-hidden="true">'+svg+'</svg>':'')+'<span class="v5t-b"><b class="v5t-n">'+name+'</b>'+(desc?'<span class="v5t-d">'+desc+'</span>':'')+'<span class="v5t-f"><span>'+foot+'</span><span class="v5t-go" aria-hidden="true">→</span></span></span>'})}

function noVasper(){if(location.hash==='#t-vasper')return;$$('a[href="#t-vasper"]').forEach(function(a){var c=a.closest('.rel2-card,.alt-card,li')||a;if(c&&!c.hidden){c.hidden=true;c.style.display='none'}})}
function run(){try{noVasper()}catch(e){}try{tileCards()}catch(e){}try{subnavActive()}catch(e){}try{ltMenus()}catch(e){}try{longevityCat()}catch(e){}try{homeChips()}catch(e){}try{treatment()}catch(e){}try{goal()}catch(e){}try{glossary()}catch(e){}}
var t=0;function sched(){if(t)return;t=setTimeout(function(){t=0;run()},80)}
window.addEventListener('hashchange',sched);document.addEventListener('DOMContentLoaded',sched);sched();
new MutationObserver(sched).observe(document.documentElement,{childList:true,subtree:true});
})();
