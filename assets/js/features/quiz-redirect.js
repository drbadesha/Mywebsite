(function(){
  /* the quiz is now part of "What brings you in?" */
  function q(){if(location.hash==="#quiz")location.replace("#finder")}
  q();addEventListener("hashchange",q);
  /* "from" prices on protocol tiles and protocol pages */
  function prices(){
    document.querySelectorAll('a.pt-tile[href^="#protocol-"]').forEach(function(a){if(a.querySelector(".pt-from"))return;var id=a.getAttribute("href").slice(1),f=window.__mwFrom(id);if(!f)return;
      var go=a.querySelector(".pt-go"),sp=document.createElement("span");sp.className="pt-from";sp.innerHTML="From "+f;if(go)go.before(sp);else a.appendChild(sp)});
    document.querySelectorAll('section.pp[id^="protocol-"] .pp-facts').forEach(function(dl){if(dl.querySelector(".pp-from"))return;var id=dl.closest("section").id,f=window.__mwFrom(id);if(!f)return;
      var d=document.createElement("div");d.className="pp-from";d.innerHTML="<dt>Investment</dt><dd>From "+f+"</dd>";dl.appendChild(d)});
  }
  prices();setTimeout(prices,600);setTimeout(prices,2000);addEventListener("hashchange",function(){setTimeout(prices,50)});
})();
