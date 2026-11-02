// Run inside the Lofty page editor. window.__PU = {sha, updates:[{key,file}], add:[{afterKey,file,key}]}
// key = substring that identifies an existing md-custom-code block's HTML. Sets window.__PUOUT.
(async () => {
  const C = window.__PU, out = [];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let v = document.querySelector('.button.block-btn'); while (v && !v.__vue__) v = v.parentElement; const LB = v.__vue__;
  const B = 'https://cdn.jsdelivr.net/gh/ybendiks/compassandkey-site-css@' + C.sha + '/blocks/';
  const eds = () => [...new Set([...document.querySelectorAll('*')].map(e => e.__vue__).filter(c => c && typeof c.setEditorValue === 'function'))];
  const find = k => LB.blocks.findIndex(b => b.name === 'md-custom-code' && JSON.stringify(b.data || {}).includes(k));
  function openNth(idx) { const target = LB.blocks[idx].name; const fake = LB.blocks.map((b, i) => Object.assign({}, b, { name: (b.name === target && i !== idx) ? '__x' : b.name })); LB.$options.methods.openModule.call({ blocks: fake, $EventBus: LB.$EventBus, moduleName2open: '' }, target); }
  for (const u of (C.updates || [])) {
    const i = find(u.key); if (i < 0) { out.push('MISSING ' + u.key); continue; }
    const h = await fetch(B + u.file).then(r => r.text()); if (!h || h.length < 100) { out.push('EMPTY ' + u.file); continue; }
    openNth(i); await sleep(2500);
    const e = eds(); if (e.length !== 1) { out.push('EDITORS ' + e.length + ' ' + u.key); continue; }
    e[0].code = h; e[0].setEditorValue(h); e[0].changeValue(true); await sleep(2000);
    out.push('updated ' + u.file);
  }
  for (const a of (C.add || [])) {
    if (find(a.key) > -1) { out.push('exists ' + a.key); continue; }
    const i = find(a.afterKey); if (i < 0) { out.push('NO ANCHOR ' + a.afterKey); continue; }
    const h = await fetch(B + a.file).then(r => r.text());
    const before = new Set(eds());
    document.querySelector('.button.block-btn').click(); await sleep(1000);
    localStorage.setItem('addBlockIndex_89033', String(i));
    const bt = [...new Set([...document.querySelectorAll('*')].map(e => e.__vue__).filter(Boolean))].find(c => typeof c.handleAddCurBlock === 'function');
    bt.handleAddCurBlock({}, { name: 'md-custom-code', theme: 'html-code' }); await sleep(3500);
    const e = eds(); const ed = e.find(c => !before.has(c)) || e[e.length - 1];
    ed.code = h; ed.setEditorValue(h); ed.changeValue(true); await sleep(2000);
    out.push('added ' + a.file + ' after ' + i);
  }
  window.__PUOUT = out.concat([LB.blocks.map((b, i) => i + ':' + b.name).join(' ')]);
})();
