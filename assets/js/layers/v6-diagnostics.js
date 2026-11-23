(function(){
var G={fit:['#F2848F','#9B2F55'],body:['#5EC3C0','#1F6F7A'],age:['#86AEEA','#2B4C8F'],gen:['#7491F5','#2E3E9E'],blood:['#E77A7A','#8E2A3A'],fx:['#E8AE7E','#9A5A36']};
var CATS=[
 ['Fitness & body','How your heart, lungs, muscle and bone are doing, measured in clinic.','#c-cardio-fitness','Explore fitness testing',[
  ['fit','VO₂ Max Testing','How fit are your heart and lungs, really?','#t-vo2-max','With Resting Metabolic Rate'],
  ['body','Styku 3D Body Scan','Is your weight changing as fat or as muscle?','#t-styku-scan','In clinic'],
  ['body','DEXA Scan','How strong are your muscles and bones?','#t-dexa-scan','Partner clinic'],
  ['fit','Arterial Stiffness Index','How flexible are your arteries?','#t-arterial-stiffness','In clinic']]],
 ['Biological age & genetics','What your cells and genes can, and can’t, tell you about how you are ageing.','#c-longevity-testing','Explore longevity testing',[
  ['age','TruAge + TruHealth','What can your biological age tell you, and what can’t it?','#t-truage','Finger-prick'],
  ['age','GlycanAge','Is low-grade inflammation ageing you faster?','#t-glycanage','Finger-prick'],
  ['gen','totalPower DNA Test','Which genetic risks are worth acting on?','#t-genomics','Cheek swab'],
  ['gen','SelfDecode Whole Genome','Your genome, read alongside your labs and reviewed by your ND.','#t-selfdecode','Cheek swab'],
  ['gen','DNA-Personalized Supplements','Which supplements suit your genes?','#t-dna-supplements','Cheek swab']]],
 ['Bloodwork & labs','From routine LifeLabs bloodwork to specialty panels, ordered only when they will change your plan.','#lab-tests','Search all lab tests',[
  ['blood','Foundation Zoomer','How are your heart, metabolism, hormones and immune system doing together?','#lt-vw-foundation','Vibrant Wellness · blood'],
  ['blood','Conventional Labs (LifeLabs)','What does your routine bloodwork actually say?','#t-lifelabs-testing','LifeLabs'],
  ['fx','Comprehensive Hormone Testing','Are your hormones behind how you feel?','#c-functional-labs','Including DUTCH'],
  ['blood','Insulin Resistance (HOMA-IR)','Is Insulin Resistance starting before your blood sugar rises?','#t-homa-ir','Fasting blood test'],
  ['fx','Functional Lab Testing','What’s behind symptoms your normal labs don’t explain?','#t-functional-lab-testing','Gut, nutrients, toxins and more']]]
];
var BOOK='https://mediworks.janeapp.com';
var PK=[
 ['','The Mediworks Baseline','Where you stand today. Every package starts here.','#baseline',[
  ['Initial Naturopathic Consultation',''],
  ['Bloodwork through LifeLabs, including HOMA-IR','Markers chosen for your history and goals'],
  ['VO₂ Max with Resting Metabolic Rate',''],
  ['Styku 3D Body Scan and Arterial Stiffness Index',''],
  ['Vitals, including grip strength',''],
  ['Results visit and a written plan','']]],
 ['','Core Assessment','A much deeper look at your blood, body and hormones.','',[
  ['Everything in the Baseline',''],
  ['Foundation Zoomer blood panel','Vibrant Wellness. Includes APOE, discussed with you first'],
  ['DEXA Scan','At our partner clinic, BodyComp Imaging'],
  ['Comprehensive Hormone Testing, where useful','Including DUTCH'],
  ['Results visit and a written plan','']]],
 ['mid','Complete Assessment','Our most complete look at how you are ageing, down to your cells and genes.','',[
  ['Everything in the Core Assessment',''],
  ['TruAge + TruHealth epigenetic test',''],['GlycanAge',''],
  ['totalPower DNA Test','APOE reported only with your consent, explained in person'],
  ['Two results visits','One for bloodwork and fitness, one when your age and genetic reports arrive']]]
];
var Y='<span class="v6-y" aria-label="Included">✓</span>',N='<span class="v6-n" aria-label="Not included">–</span>';
var CMP=[
 ['Consultation and results',[
  ['Initial Naturopathic Consultation',[Y,Y,Y]],
  ['Results visit and written plan',[Y,Y,'Two visits']],
  ['Results tracked in the Mediworks app',[Y,Y,Y]]]],
 ['Bloodwork',[
  ['LifeLabs bloodwork, including HOMA-IR',[Y,Y,Y]],
  ['Biological age estimate from bloodwork (PhenoAge)',[Y,Y,Y]],
  ['Foundation Zoomer blood panel',[N,Y,Y]],
  ['Comprehensive Hormone Testing',[N,'Where useful','Where useful']]]],
 ['In-clinic assessment',[
  ['VO₂ Max with Resting Metabolic Rate',[Y,Y,Y]],
  ['Styku 3D Body Scan',[Y,Y,Y]],
  ['Arterial Stiffness Index',[Y,Y,Y]],
  ['Vitals, including grip strength',[Y,Y,Y]],
  ['DEXA Scan (partner clinic)',['If recommended',Y,Y]]]],
 ['Ageing and genetics',[
  ['TruAge + TruHealth',[N,N,Y]],
  ['GlycanAge',[N,N,Y]],
  ['totalPower DNA Test',[N,N,Y]]]]
];
function cmp(open){
 var h='<details class="v6-cmp"'+(open?' open':'')+'><summary>Compare the three packages</summary><div class="v6-cmpw"><table><thead><tr><th scope="col"><span class="vh">Included</span></th>'+PK.map(function(p){return '<th scope="col" class="'+p[0]+'">'+p[1].replace('The Mediworks ','').replace(' Assessment','')+'</th>'}).join('')+'</tr></thead><tbody>';
 CMP.forEach(function(g){h+='<tr class="g"><th colspan="4" scope="colgroup">'+g[0]+'</th></tr>';g[1].forEach(function(r){h+='<tr><th scope="row">'+r[0]+'</th>'+r[1].map(function(c,i){return '<td class="'+PK[i][0]+'">'+c+'</td>'}).join('')+'</tr>'})});
 return h+'</tbody></table></div></details>';
}
function esc(s){return s}
function dx(){
 var h='<section id="dx6"><div class="wrap"><div class="v6-head"><p class="eyebrow">Diagnostics</p><h2>Testing is the start. Knowing what to do with it is the care.</h2><p class="lede">Every test answers a question about your health. Your clinician recommends only the ones that will change your plan, then explains what your results mean and what to do first.</p></div>';
 CATS.forEach(function(c){h+='<div class="v6-cat"><div class="v6-ch"><div><h3>'+c[0]+'</h3><p>'+c[1]+'</p></div><a href="'+c[2]+'">'+c[3]+' →</a></div><div class="v6-row">';
  c[4].forEach(function(t){var g=G[t[0]];h+='<a class="v6-t" href="'+t[3]+'" style="background:linear-gradient(155deg,'+g[0]+' 0%,'+g[1]+' 100%)"><small>'+t[4]+'</small><i aria-hidden="true">→</i><div><b>'+t[1]+'</b><span>'+t[2]+'</span></div></a>'});
  h+='</div></div>'});
 return h+'</div></section>';
}
function pk(id,open){
 var h='<section id="'+id+'" class="v6-pks"><div class="wrap"><div class="v6-head"><p class="eyebrow">Testing packages</p><h2>Three testing packages, three levels of depth.</h2><p class="lede">The Baseline is where everyone starts. The Core Assessment looks deeper, and the Complete Assessment goes deepest. Every package includes a consultation, a results visit with a written plan, and re-testing tracked over time. If a test isn’t useful for you, we’ll tell you before anything is ordered.</p></div><div class="v6-pk">';
 PK.forEach(function(p,i){h+='<div class="v6-p '+p[0]+'"><small class="n">'+(i==0?'Start here':i==1?'Deeper':'Most complete')+'</small><h3>'+p[1]+'</h3><p class="s">'+p[2]+'</p><ul>'+p[4].map(function(x){return '<li>'+x[0]+(x[1]?'<em>'+x[1]+'</em>':'')+'</li>'}).join('')+'</ul><p class="f">Fees are shown when you book online. Your clinician goes over costs before anything is ordered.</p><div class="v6-pb"><a class="btn '+(p[0]?'btn-primary':'btn-ghost')+'" href="'+BOOK+'" target="_blank" rel="noopener">Book online</a>'+(p[3]&&id!=='pk6b'?'<a class="link" href="'+p[3]+'">What’s included →</a>':'')+'</div></div>'});
 return h+'</div>'+cmp(open)+'<p class="v6-note">Other specialty labs can be added when your clinician thinks they will help. Looking for ongoing care with treatment and follow-ups? See our <a class="link" href="#protocols">Protocols</a>.</p></div></section>';
}
var LEAVE={ 'weight-loss':'A written plan for your track, Slimworks or GLP-1, with your check-in schedule and when we re-scan.',
 'womens-hormones':'A written plan: whether BHRT or non-hormonal options suit you, and what we will re-test and when.',
 'mens-hormones':'A clear answer on whether Testosterone Therapy suits you and, if it does, your monitoring schedule in writing.'};
function run(){
 var home=document.getElementById('page-home'),num=document.getElementById('numbers');
 if(home&&num&&!document.getElementById('dx6')){num.insertAdjacentHTML('beforebegin',dx()+pk('pk6',false))}
 if(num&&!num.dataset.v6){var e=num.querySelector('.eyebrow'),h=num.querySelector('h2'),l=num.querySelector('.lede');
  if(h){num.dataset.v6=1;if(e)e.textContent='Patient app';h.textContent='Your results, explained. Your next steps, in one place.';h.className='';if(l)l.textContent='Your clinician walks you through every result. Then your plan, next steps and re-tests live in the Mediworks app.';
   var b=num.querySelector('.nk-ctas .btn');if(b)b.setAttribute('href','#dx6'),b.textContent='See all testing'}}
 Object.keys(LEAVE).forEach(function(k){var s=document.getElementById('protocol-'+k);if(!s||s.querySelector('.v6-leave'))return;var f=s.querySelector('.pp-facts');if(!f)return;f.insertAdjacentHTML('afterend','<div class="v6-leave"><small>What you leave with</small><p>'+LEAVE[k]+'</p></div>')});
}
function base(){
 if(location.hash==='#protocol-baseline'){location.replace('#baseline');return}
 document.querySelectorAll('a.pt-tile[href="#protocol-baseline"],#pr-baseline').forEach(function(e){e.remove()});
 document.querySelectorAll('table').forEach(function(t){var hs=[].slice.call(t.querySelectorAll('thead th'));var i=hs.findIndex(function(th){return th.querySelector('a[href="#protocol-baseline"]')});if(i<0)return;t.querySelectorAll('tr').forEach(function(r){var c=r.children[i];if(c)c.remove()})});
 document.querySelectorAll('a[href="#protocol-baseline"]').forEach(function(a){a.setAttribute('href','#baseline');if(/This Protocol|the Protocol/i.test(a.textContent))a.textContent='See the Baseline →'});
 var pg=document.getElementById('page-x-baseline');
 if(pg&&!document.getElementById('pk6b')){var eb=pg.querySelector('.eyebrow');if(eb&&/assessment/i.test(eb.textContent))eb.textContent='Testing package 1 of 3 · Start here';
  var anchors=[].slice.call(pg.querySelectorAll('h2'));var wi=anchors.find(function(h){return /One assessment, one plan/i.test(h.textContent)});
  var host=wi?(wi.closest('section')||wi.parentElement):null;
  if(host)host.insertAdjacentHTML('afterend',pk('pk6b',true))}
}
function go(){try{base()}catch(e){}try{run()}catch(e){}}
if(document.readyState!=='loading')go();else document.addEventListener('DOMContentLoaded',go);
window.addEventListener('load',function(){go();setTimeout(go,700);setTimeout(go,2200);setTimeout(go,4000)});
window.addEventListener('hashchange',function(){setTimeout(go,300);setTimeout(go,1200)});
})();
