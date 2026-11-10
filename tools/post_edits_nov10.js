// Run on cms.lofty.com/cmsnew/blog after capturing XHR headers into window.__H. window.__PE10={dry:true|false}. Output: window.__PE10OUT
(async () => {
  const C = window.__PE10, out = [];
  const h = Object.assign({}, window.__H); delete h['Content-Type'];
  const L = (await fetch('/api-blog/post/listV2?keywords=&status=1&pageNum=1&pageSize=200', { headers: h, credentials: 'include' }).then(r => r.json())).data.postList;
  const MAP = [[/(https?:\/\/(www\.)?compassandkeygroup\.com)?\/blog\/i65-corridor-home-prices(?=["'#?])/gi, '/blog/commuting-i65-corridor-louisville-elizabethtown']];
  for (const p0 of L) {
    const p = JSON.parse(JSON.stringify(p0)); let n = 0;
    for (const [re, to] of MAP) { p.content = p.content.replace(re, () => { n++; return to; }); }
    if (!n) continue;
    let res = 'dry';
    if (!C.dry) { const r = await fetch('/api-blog/post/task', { method: 'POST', headers: Object.assign({}, h, { 'Content-Type': 'application/json' }), credentials: 'include', body: JSON.stringify(p) }).then(r => r.json()); res = r.status && r.status.code; }
    out.push(p.slug + ': ' + n + ' link(s) -> ' + res);
  }
  window.__PE10OUT = out;
})();
