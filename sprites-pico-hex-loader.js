(function(){
function hexToDataUri(hex){
  hex=String(hex||"").toLowerCase().replace(/[^0-9a-f]/g,"");
  if(!hex||hex.length%2)return "";
  var n=hex.length/2, bytes=new Uint8Array(n), i, o, bin="", step=8192;
  for(i=0;i<n;i++) bytes[i]=parseInt(hex.substr(i*2,2),16);
  for(o=0;o<n;o+=step){
    bin+=String.fromCharCode.apply(null, bytes.subarray(o, Math.min(n,o+step)));
  }
  return "data:image/png;base64,"+btoa(bin);
}
function install(name){
  var hex=window["__PICO_HEX_"+name]||"";
  if(!hex)return;
  window["__PICO_PARTS_"+name]=[hexToDataUri(hex)];
}
["whisk_happy","nimbrix_happy","flick_happy","drakember_happy","infernyx_happy","cephy_happy","cephling_happy","abyssal_ceph_happy","zap_happy","spark_happy","storm_happy"].forEach(install);
})();
