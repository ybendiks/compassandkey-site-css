// Run on cms.lofty.com/cmsnew/blog after capturing XHR headers into window.__H (hook setRequestHeader, click pagination).
// window.__PE = {sha, dry:true|false, mw:true|false}. Output in window.__PEOUT.
(async () => {
  const C = window.__PE, out = [];
  const B = 'https://cdn.jsdelivr.net/gh/ybendiks/compassandkey-site-css@' + C.sha + '/posts/';
  const h = Object.assign({}, window.__H); delete h['Content-Type'];
  const L = (await fetch('/api-blog/post/listV2?keywords=&status=1&pageNum=1&pageSize=200', { headers: h, credentials: 'include' }).then(r => r.json())).data.postList;
  const save = async p => {
    if (C.dry) return 'dry';
    const r = await fetch('/api-blog/post/task', { method: 'POST', headers: Object.assign({}, h, { 'Content-Type': 'application/json' }), credentials: 'include', body: JSON.stringify(p) }).then(r => r.json());
    return r.status && r.status.code;
  };
  const OLD = /https?:\/\/(www\.)?compassandkeygroup\.com\/blog\/homes-for-sale-i-65-corridor-ky|\/blog\/homes-for-sale-i-65-corridor-ky/gi;
  const GUIDE = '/blog/commuting-i65-corridor-louisville-elizabethtown';
  for (const p0 of L) {
    const p = JSON.parse(JSON.stringify(p0)); let changed = [];
    if (p.slug.startsWith('affordable-housing-solutions')) {
      p.content = await fetch(B + 'affordable-housing-solutions.html').then(r => r.text());
      p.title = 'Affordable Housing Solutions in Elizabethtown, KY: Local Programs and Resources';
      p.seoTitle = 'Affordable Housing in Elizabethtown, KY: Programs & Local Help';
      p.seoDescription = 'Affordable housing in Elizabethtown, KY: the housing authority, Section 8 vouchers, Habitat for Humanity, and KHC, USDA and VA home loans.';
      changed.push('refresh');
    } else if (p.slug === 'commuting-i65-corridor-louisville-elizabethtown') {
      const img = (p.content.match(/<img[^>]*>/) || [''])[0];
      p.content = (img ? '<div>' + img + '</div>\n' : '') + await fetch(B + 'commuting-i65-corridor-louisville-elizabethtown.html').then(r => r.text());
      p.title = 'Commuting on I-65 Between Louisville and Elizabethtown: Towns, Exits and Tips';
      p.seoTitle = 'Commuting I-65 Louisville to Elizabethtown: Towns & Exits';
      p.seoDescription = 'Living between Louisville and Elizabethtown: the I-65 exits, commuter towns like Shepherdsville and Mount Washington, and what to check before you buy.';
      changed.push('rewrite');
    } else if (OLD.test(p.content)) {
      OLD.lastIndex = 0; p.content = p.content.replace(OLD, GUIDE); changed.push('repoint I-65 link');
    }
    OLD.lastIndex = 0;
    if (C.mw && !/mount-washington-KY/i.test(p.content) && /\b(Mount|Mt\.) Washington\b/.test(p.content) && !p.slug.startsWith('commuting-i65')) {
      // link the first plain-text mention that is not inside a link or heading
      const d = document.createElement('div'); d.innerHTML = p.content;
      const w = document.createTreeWalker(d, NodeFilter.SHOW_TEXT); let n, done = false;
      while (!done && (n = w.nextNode())) {
        if (n.parentElement.closest('a,h1,h2,h3,h4,script')) continue;
        const m = n.data.match(/\b(Mount|Mt\.) Washington\b/); if (!m) continue;
        const after = n.splitText(m.index); after.data = after.data.slice(m[0].length);
        const a = document.createElement('a'); a.href = '/mount-washington-KY'; a.textContent = m[0]; n.after(a); done = true;
      }
      if (done) { p.content = d.innerHTML; changed.push('link MW'); }
    }
    if (changed.length) out.push(p.slug + ': ' + changed.join(', ') + ' -> ' + await save(p));
  }
  window.__PEOUT = out;
})();
