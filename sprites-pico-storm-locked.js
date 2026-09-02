window.__PICO_SPRITES = window.__PICO_SPRITES || {};
(function(){
  function load(u){var x=new XMLHttpRequest();x.open('GET',u,false);x.send();return x.responseText;}
  var s='';
  for(var i=0;i<7;i++) s+=load('sprites-pico-storm-locked-p'+i+'.js');
  eval(s);
})();
