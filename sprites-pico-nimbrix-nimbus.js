window.__PICO_SPRITES = window.__PICO_SPRITES || {};
(function(){
  function load(u){var x=new XMLHttpRequest();x.open('GET',u,false);x.send();return x.responseText;}
  var s='';
  for(var i=0;i<14;i++) s+=load('sprites-pico-nimbrix-nimbus-p'+i+'.js');
  eval(s);
})();
