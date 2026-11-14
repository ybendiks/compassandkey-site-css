// Run on cms.lofty.com/cmsnew/blog after capturing XHR headers into window.__H. window.__PE14={dry:true|false, map:{slug:target}}. Output: window.__PE14OUT
// Repoints in-post links to the Nov 14 consolidated posts to their town page; drops the "living in Shepherdsville" aside from the I-65 commuter guide.
(async () => {
  const C = window.__PE14, out = [];
  const h = Object.assign({}, window.__H); delete h['Content-Type'];
  const L = (await fetch('/api-blog/post/listV2?keywords=&status=1&pageNum=1&pageSize=200', { headers: h, credentials: 'include' }).then(r => r.json())).data.postList;
  for (const p0 of L) {
    if (C.map[p0.slug]) continue;
    const p = JSON.parse(JSON.stringify(p0)); let n = 0;
    for (const [sl, to] of Object.entries(C.map)) {
      const re = new RegExp('(href=["\'])(https?://(www\\.)?compassandkeygroup\\.com)?/blog/' + sl.replace(/[-]/g, '\\-') + '/?(?=["\'#?])', 'gi');
      p.content = p.content.replace(re, (m, a) => { n++; return a + to; });
    }
    if (p.slug === 'commuting-i65-corridor-louisville-elizabethtown') {
      const before = p.content; p.content = p.content.replace(/ and <a href="\/shepherdsville-KY">living in Shepherdsville and Bullitt County<\/a>/, '');
      if (p.content !== before) n++;
    }
    if (!n) continue;
    let res = 'dry';
    if (!C.dry) { const r = await fetch('/api-blog/post/task', { method: 'POST', headers: Object.assign({}, h, { 'Content-Type': 'application/json' }), credentials: 'include', body: JSON.stringify(p) }).then(r => r.json()); res = r.status && r.status.code; }
    out.push(p.slug + ': ' + n + ' -> ' + res);
  }
  window.__PE14OUT = out;
})();
