(function(){
  var P=[
    ["sc1","skin","Vitamin C Antioxidant Serum","Daytime serum to pair with daily SPF.",120,"<mark class=ph>Brand</mark>"],
    ["sc2","skin","Retinol Night Treatment","Evening treatment, introduced gradually.",98,"<mark class=ph>Brand</mark>"],
    ["sc3","skin","Mineral SPF 50","Broad-spectrum, tinted daily sunscreen.",62,"<mark class=ph>Brand</mark>"],
    ["sc4","skin","Barrier Recovery Balm","Gentle care after in-clinic treatments.",54,"<mark class=ph>Brand</mark>"],
    ["dv1","device","At-Home LED Face Mask","Red and near-infrared light for home use.",395,"<mark class=ph>Brand</mark>"],
    ["dv2","device","Blood Pressure Monitor","Upper-arm cuff for home tracking.",89,"<mark class=ph>Brand</mark>"],
    ["su1","supply","Post-Treatment Recovery Kit","Cooling pads, gentle cleanser and aftercare card.",45,"Mediworks"],
    ["mw1","mw","Mediworks Travel Kit","Minis of our clinician-favourite essentials.",75,"Mediworks"]
  ];
  var grid=document.getElementById("stGrid");if(!grid)return;
  var fmt=function(n){return "$"+n.toFixed(2)};
  var K="mw-cart",cart={};
  try{cart=JSON.parse(localStorage.getItem(K)||"{}")||{}}catch(e){cart={}}
  function save(){try{localStorage.setItem(K,JSON.stringify(cart))}catch(e){}}
  function byId(id){for(var i=0;i<P.length;i++)if(P[i][0]===id)return P[i]}
  var cats={skin:"Skincare",device:"Health Device",supply:"Medical Supply",mw:"Mediworks"};
  grid.innerHTML=P.map(function(p){
    return '<article class="st-card" data-cat="'+p[1]+'"><div class="st-img" aria-hidden="true">Photo</div><div class="st-body"><small>'+cats[p[1]]+' · '+p[5]+'</small><h3>'+p[2]+'</h3><p>'+p[3]+'</p><div class="st-foot"><b><mark class=ph>'+fmt(p[4])+'</mark></b><button type="button" class="st-add" data-add="'+p[0]+'">Add to cart</button></div></div></article>';
  }).join("");
  [].forEach.call(document.querySelectorAll(".st-tabs button"),function(b){
    b.addEventListener("click",function(){
      [].forEach.call(document.querySelectorAll(".st-tabs button"),function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});
      var c=b.dataset.cat;[].forEach.call(grid.children,function(card){card.hidden=!(c==="all"||card.dataset.cat===c)});
    });
  });
  var dr=document.getElementById("stDr"),list=document.getElementById("stList"),fab=document.getElementById("stFab");
  function count(){var n=0;for(var k in cart)n+=cart[k];return n}
  function render(){
    var n=count(),sub=0,h="";
    for(var k in cart){var p=byId(k);if(!p){delete cart[k];continue}sub+=p[4]*cart[k];
      h+='<li><b>'+p[2]+'</b><span>'+fmt(p[4]*cart[k])+'</span><span class="st-qty"><button type="button" data-q="'+k+'" data-d="-1" aria-label="Decrease quantity">−</button><output>'+cart[k]+'</output><button type="button" data-q="'+k+'" data-d="1" aria-label="Increase quantity">+</button></span><button type="button" class="st-rm" data-rm="'+k+'">Remove</button></li>'}
    list.innerHTML=h||'<li class="st-empty" style="display:block;border:0">Your cart is empty.</li>';
    document.getElementById("stSub").textContent=fmt(sub);
    document.getElementById("stCo").disabled=!n;
    document.getElementById("stFabN").textContent=n;
    var onShop=!document.getElementById("shop").closest("[hidden]")&&document.getElementById("shop").offsetParent!==null;
    fab.classList.toggle("on",n>0&&onShop);
    [].forEach.call(document.querySelectorAll(".cart-btn"),function(a){
      var s=a.querySelector(".st-count");if(!s){s=document.createElement("span");s.className="st-count";a.appendChild(s)}
      s.textContent=n;s.hidden=!n;
    });
    save();
  }
  function open(){dr.classList.add("on");document.documentElement.style.overflow="hidden";dr.querySelector(".st-dr-x").focus()}
  function close(){dr.classList.remove("on");document.documentElement.style.overflow="";document.getElementById("stMsg").hidden=true}
  grid.addEventListener("click",function(e){var b=e.target.closest("[data-add]");if(!b)return;
    var id=b.dataset.add;cart[id]=(cart[id]||0)+1;render();
    b.textContent="Added ✓";b.classList.add("done");setTimeout(function(){b.textContent="Add to cart";b.classList.remove("done")},1400);});
  list.addEventListener("click",function(e){var q=e.target.closest("[data-q]"),r=e.target.closest("[data-rm]");
    if(q){var k=q.dataset.q;cart[k]+=+q.dataset.d;if(cart[k]<1)delete cart[k];render()}
    if(r){delete cart[r.dataset.rm];render()}});
  fab.addEventListener("click",open);
  dr.addEventListener("click",function(e){if(e.target.closest("[data-close]"))close()});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&dr.classList.contains("on"))close()});
  document.getElementById("stCo").addEventListener("click",function(){document.getElementById("stMsg").hidden=false});
  document.addEventListener("click",function(e){var a=e.target.closest(".cart-btn");if(a&&count()>0){e.preventDefault();location.hash="shop";setTimeout(open,60)}});
  window.addEventListener("hashchange",function(){setTimeout(render,80)});
  render();
})();
