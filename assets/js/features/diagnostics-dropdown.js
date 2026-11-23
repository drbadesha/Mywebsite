/* desktop Diagnostics dropdown: each category with its test count and tests, like the Treatments menu */
(function(){function build(){var ul=document.getElementById("subLabs"),A=window.__mwArt&&window.__mwArt();if(!ul||!A||ul.children.length)return;
 var M=A.CAT,cats=Object.keys(M).filter(function(k){return M[k].menu==="labs"});
 var order=["bloodwork","functional-labs","body-composition","cardio-fitness","genetics","longevity-testing"];cats.sort(function(a,b){return order.indexOf(a)-order.indexOf(b)});
 ul.innerHTML='<li><a href="#baseline"><b>The Mediworks Baseline</b><small>Fitness, Body Composition and key biomarkers in one assessment</small></a></li>'+cats.map(function(k){var c=M[k],names=(c.items||[]).map(function(i){return Array.isArray(i)?i[1]:((A.TX[i]||{}).n||i)});
  return '<li><a href="#c-'+k+'"><b><i class="dot"></i>'+c.name+'</b><small>'+(k==="bloodwork"?'29 LifeLabs panels and HOMA-IR':k==="functional-labs"?'58 tests: DUTCH hormones, Organic Acids (OAT), gut, nutrient, toxin and more':names.length+' tests · '+names.slice(0,4).join(", ")+(names.length>4?" and more":""))+'</small></a></li>'}).join("")+
  '<li><a href="#lab-tests"><b><i class="dot"></i>Lab test catalogue</b><small>Every lab test your clinician may consider</small></a></li><li class="sub-all"><a href="#m-labs">View all diagnostics →</a></li>'}
 build();if(!document.getElementById("subLabs")||!document.getElementById("subLabs").children.length)addEventListener("load",build)})();
