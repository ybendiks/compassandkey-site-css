// Run on cms.lofty.com/cmsnew/areas. window.__TM = {city, slug, sha}. Sets intro-page meta (title/keywords/description), index ON, then opens the editor.
(async () => {
  const C = window.__TM, sleep = ms => new Promise(r => setTimeout(r, ms));
  const m = await fetch('https://cdn.jsdelivr.net/gh/ybendiks/compassandkey-site-css@' + C.sha + '/blocks/' + C.slug + '-meta.json').then(r => r.json());
  const find = () => [...document.querySelectorAll('.area-item__header')].find(e => e.innerText.split('\n')[0].trim() === C.city);
  let h = find();
  if (!h) { const li = [...document.querySelectorAll('li')].find(l => l.innerText.trim() === '2'); li && li.click(); await sleep(3000); h = find(); }
  if (!h) { window.__TMOUT = 'NOT FOUND'; return; }
  h.click(); await sleep(1500);
  h.parentElement.querySelector('.area-item__detail-link-item .icon-settings').click(); await sleep(2500);
  const d = [...document.querySelectorAll('.el-dialog')].find(e => e.offsetParent);
  const ce = [...d.querySelectorAll('.ie-content')];
  const vals = [m.title, C.city + ' KY real estate, homes for sale ' + C.city + ' KY, realtors', m.description];
  for (let i = 0; i < 3; i++) { const e = ce[i]; e.focus(); const r = document.createRange(); r.selectNodeContents(e); const s = getSelection(); s.removeAllRanges(); s.addRange(r); document.execCommand('insertText', false, vals[i]); await sleep(300); }
  const sw = d.querySelector('.el-switch'); if (sw && !sw.className.includes('is-checked')) sw.click(); await sleep(400);
  const counts = [...d.querySelectorAll('*')].filter(e => /^\d+ \/ \d+$/.test(e.textContent.trim()) && e.children.length === 0).map(e => e.textContent.trim());
  [...d.querySelectorAll('button')].find(b => b.innerText.trim() === 'Save').click(); await sleep(2500);
  const still = !![...document.querySelectorAll('.el-dialog')].find(e => e.offsetParent);
  window.__TMOUT = JSON.stringify({ counts, saved: !still, idx: sw ? d.querySelector('.el-switch').className.includes('is-checked') : null, h1: m.h1 });
  window.__TMCFG = { city: C.city, slug: C.slug, sha: C.sha, h1: m.h1, intro: m.intro };
  if (!still) { await sleep(500); h.parentElement.querySelector('.area-item__detail-link-item .icon-edit1').click(); }
})();
