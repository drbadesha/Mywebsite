/* ===== Goal → Protocol links and Protocol "from" prices (Nov 2026) =====
   PRICES: replace each placeholder with your real starting price, e.g. "$2,400". */
window.MW_PROTO_PRICES={
  "protocol-baseline":"$X,XXX",
  "protocol-weight-loss":"$X,XXX",
  "protocol-mens-hormones":"$X,XXX", "protocol-womens-hormones":"$X,XXX",
  "protocol-longevity":"$X,XXX"
};
window.MW_PROTOS={
  "protocol-weight-loss":["Weight Loss Protocol","6 months: a 5-day Prolon reset, weekly check-ins and monthly Body Composition scans."],
  "protocol-mens-hormones":["Men's Hormone Health Protocol","Testosterone Therapy that starts with your bloodwork, monitored on a fixed schedule."], "protocol-womens-hormones":["Women's Hormone Health Protocol","Perimenopause and Menopause care, with BHRT where appropriate or non-hormonal options."],
  "protocol-longevity":["Mediworks Longevity Protocol","Our 12-month flagship: test, treat and re-test five pillars of your health."],
  "protocol-baseline":["The Mediworks Baseline","Measure fitness, Body Composition and key biomarkers before next steps."]
};
window.MW_GOAL_PROTO={
  "stubborn-fat":"protocol-weight-loss","glp1-medication":"protocol-weight-loss","midlife-weight":"protocol-weight-loss","protect-muscle":"protocol-weight-loss","keep-it-off":"protocol-weight-loss","metabolic-hormones":"protocol-weight-loss","metabolic-health":"protocol-weight-loss",
  "hot-flashes":"protocol-womens-hormones","irregular-periods":"protocol-womens-hormones","low-libido":["protocol-mens-hormones","protocol-womens-hormones"],"hormone-decline":["protocol-mens-hormones","protocol-womens-hormones"],"imbalance-symptoms":["protocol-mens-hormones","protocol-womens-hormones"],"hormone-levels-test":["protocol-mens-hormones","protocol-womens-hormones"],"estrogen-balance":"protocol-womens-hormones",
  "cellular-aging":"protocol-longevity","inflammaging":"protocol-longevity","brain-health":"protocol-longevity","heart-vascular":"protocol-longevity","biological-age":"protocol-longevity","low-energy":"protocol-longevity","full-checkup":"protocol-longevity","heart-health":"protocol-longevity","genetic-risk":"protocol-longevity",
  "improve-endurance":"protocol-baseline","training-zones":"protocol-baseline","build-muscle":"protocol-baseline","body-composition-goal":"protocol-baseline"
};
window.__mwFrom=function(id){var p=(window.MW_PROTO_PRICES||{})[id];if(!p||/X/.test(p))return "";return p};
window.__mwProtoLi=function(slug){var id=window.MW_GOAL_PROTO[slug];if(Array.isArray(id)){var o=window.MW_GOAL_PROTO;return id.map(function(x){window.MW_GOAL_PROTO=Object.assign({},o,{__t:x});var r=window.__mwProtoLi('__t');window.MW_GOAL_PROTO=o;return r}).join('')}var p=id&&window.MW_PROTOS[id];if(!p)return "";
  return '<li class="rx-proto"><a href="#'+id+'"><span class="n"><small>Protocol</small>'+p[0]+'</span><span class="d">'+p[1]+(window.__mwFrom(id)?' From '+window.__mwFrom(id)+'.':' First visit details on the Protocol page.')+'</span><span class="go" aria-hidden="true">→</span></a></li>'};
window.__mwProtoBlock=function(slug){var id=window.MW_GOAL_PROTO[slug];if(Array.isArray(id)){return '<div class="hc-cta mw-gp" style="margin-top:24px"><div><p class="eyebrow">Structured care for this goal</p><p><b>Hormone Health Protocols</b>: separate Protocols for men and for women, each starting with your bloodwork.</p></div><div style="display:flex;flex-wrap:wrap;gap:10px">'+id.map(function(x){var q=window.MW_PROTOS[x];return q?'<a class="btn btn-ghost" href="#'+x+'">'+q[0].replace(' Hormone Health Protocol','\'s Protocol').replace("'s's","'s")+' <span class="arr">→</span></a>':''}).join('')+'</div></div>'}var p=id&&window.MW_PROTOS[id];if(!p)return "";
  return '<div class="hc-cta mw-gp" style="margin-top:24px"><div><p class="eyebrow">Structured care for this goal</p><p><b>'+p[0]+'</b>: '+p[1]+(window.__mwFrom(id)?' From '+window.__mwFrom(id)+'.':'')+'</p></div><a class="btn btn-primary" href="#'+id+'">See the Protocol <span class="arr">→</span></a></div>'};
