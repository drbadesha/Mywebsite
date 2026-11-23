/* v6: old protocol URLs now live on the consolidated protocol pages */
(function(){var R={"protocol-slimworks":"protocol-weight-loss","protocol-glp1":"protocol-weight-loss","protocol-fasting":"protocol-weight-loss","protocol-trt":"protocol-mens-hormones","protocol-hormones":"protocols","protocol-mito":"protocol-longevity"};
function fix(){var h=location.hash.slice(1);if(R[h])try{history.replaceState(null,"","#"+R[h])}catch(e){location.hash=R[h]}}fix();addEventListener("hashchange",fix)})();
