window.MW_TILE_GRAD={labs:"linear-gradient(160deg,#5E8FA3 0%,#2C5B70 55%,#14262E 100%)",longevity:"linear-gradient(160deg,#A7B39A 0%,#66755B 55%,#2A3326 100%)",naturopathic:"linear-gradient(160deg,#9AABB8 0%,#5C6E7C 55%,#27323B 100%)"};
window.mwTileArea=function(s){var A=window.__mwArt&&window.__mwArt();if(!A||!A.TX[s])return null;var c=A.CAT[A.TX[s].c];return c&&window.MW_TILE_GRAD[c.menu]?c.menu:null};
window.mwTileSvg=function(key){var A=window.__mwArt&&window.__mwArt();return A?(A.MOTIF[key]||A.MOTIF.leaf):""};
window.mwTile=function(s,cls){var a=window.mwTileArea(s);if(!a)return null;var A=window.__mwArt();
  return '<span class="v3-tile'+(cls?" "+cls:"")+'" style="background:'+window.MW_TILE_GRAD[a]+'"><svg class="v3-tile-ic" viewBox="0 0 100 100" aria-hidden="true">'+window.mwTileSvg(A.TXM[s])+'</svg></span>'};
