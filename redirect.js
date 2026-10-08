/* MIT · SHIN. Fixed-origin legacy route bridge; no user-supplied redirect targets. */
function destination(input) {
  const u=new URL(input), prefix='/amazon-seller-university-transcripts';
  if(u.pathname!==prefix && !u.pathname.startsWith(prefix+'/')) return null;
  const path=u.pathname.slice(prefix.length).replace(/^\//,'');
  const base='https://haloshin.github.io/seller-university/';
  let target;
  if(!path || path==='index.html') target=base;
  else if(/^(courses|translations)\/[0-9a-f-]{36}\/(en_US|zh_CN)\/(transcript\.(md|txt)|captions\.vtt|course\.json|translation\.(md|txt|json)|校注\.md)$/.test(decodeURI(path))) target=base+'amazon/'+path;
  else if(['学习导航.md','LEARNING_GUIDE.md','课程目录.md','catalog.json','release.json'].includes(decodeURI(path))) target=base+'amazon/'+path;
  else return null;
  return target+u.search+u.hash;
}
if(typeof module!=='undefined') module.exports={destination};
if(typeof window!=='undefined') {
  let target=null;
  try {target=destination(location.href);} catch {}
  if(target) {document.getElementById('continue').href=target;location.replace(target);}
}
