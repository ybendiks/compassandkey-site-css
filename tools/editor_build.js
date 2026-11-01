// Run inside the Lofty page editor for a town intro page opened via Areas > Edit. Expects window.__CFG = {city, slug, sha, h1, intro}
(async () => {
  const CFG = window.__CFG; const out = [];
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let v = document.querySelector('.button.block-btn'); while (!v.__vue__) v = v.parentElement; const LB = v.__vue__;
  const OB = [...document.querySelectorAll('*')].find(e => e.__vue__ && e.__vue__.$options.name === 'OperationButton').__vue__;
  const names = () => LB.blocks.map(b => b.name);
  function fieldComp(match) { for (const el of document.querySelectorAll('.tox.tox-tinymce')) { let x = el; while (x && !(x.__vue__ && typeof x.__vue__.triggerPreview === 'function' && x.__vue__.$props && 'moduleName' in x.__vue__.$props)) x = x.parentElement; if (x && match(String(x.__vue__.$props.value || ''))) return x.__vue__; } return null; }
  function openNth(idx) { const target = LB.blocks[idx].name; const fake = LB.blocks.map((b, i) => Object.assign({}, b, { name: (b.name === target && i !== idx) ? '__x' : b.name })); LB.$options.methods.openModule.call({ blocks: fake, $EventBus: LB.$EventBus, moduleName2open: '' }, target); }
  // 1. hero above map, then drop the top listings map
  let iN = names().indexOf('md-nbr-info'), iM = names().indexOf('md-map');
  if (iM > -1 && iM < iN) { OB.sortBlock(iN, iM); await sleep(2500); }
  iN = names().indexOf('md-nbr-info');
  if (LB.blocks[iN + 1] && LB.blocks[iN + 1].name === 'md-map' && !(LB.blocks[iN + 1].data || {}).title) {
    OB.deleteBlock(iN + 1); await sleep(1000);
    const yes = [...document.querySelectorAll('button')].find(b => b.innerText.trim() === 'Yes' && b.offsetParent); yes && yes.click(); await sleep(2500);
    out.push('map removed');
  }
  // 2. hero H1 + intro
  if (CFG.intro) {
    openNth(names().indexOf('md-nbr-info')); await sleep(2500);
    const c = fieldComp(() => true);
    if (c) { c.$emit('change', '<h1>' + CFG.h1 + '</h1>\n' + CFG.intro); try { c.triggerPreview() } catch (e) {} await sleep(1500); out.push('hero set'); } else out.push('HERO FIELD MISSING');
  }
  // 2b. only swap the H1 text (pages with owner-written intro copy)
  if (CFG.h1Only) {
    openNth(names().indexOf('md-nbr-info')); await sleep(2500);
    const c = fieldComp(() => true);
    if (c) { const nv = String(c.$props.value).replace(/<h1>[\s\S]*?<\/h1>/, '<h1>' + CFG.h1 + '</h1>'); c.$emit('change', nv); try { c.triggerPreview() } catch (e) {} await sleep(1500); out.push('h1 swapped'); } else out.push('HERO FIELD MISSING');
  }
  // 3. Title Case block titles
  const map = { 'LISTINGS': 'Listings', 'RECENTLY SOLD': 'Recently Sold', 'CONTACT US': 'Contact Us', 'MARKET TRENDS': 'Market Trends', 'TESTIMONIALS and REVIEWS': 'Testimonials and Reviews', 'GET MORE INFORMATION': 'Get More Information', 'demographics': CFG.city + ' Demographics' };
  for (let i = 0; i < LB.blocks.length; i++) {
    const t = (LB.blocks[i].data || {}).title; if (!t) continue; const txt = String(t).replace(/<[^>]+>/g, '').trim(); if (!map[txt]) continue;
    openNth(i); await sleep(2200);
    const c = fieldComp(s => s.replace(/<[^>]+>/g, '').trim() === txt);
    if (!c) { out.push('no title field: ' + txt); continue; }
    c.$emit('change', String(c.$props.value).split(txt).join(map[txt])); try { c.triggerPreview() } catch (e) {} await sleep(1000);
  }
  // 4. add Embed blocks
  const B = 'https://cdn.jsdelivr.net/gh/ybendiks/compassandkey-site-css@' + CFG.sha + '/blocks/';
  async function add(afterIdx, file) {
    const h = await fetch(B + file).then(r => r.text());
    if (!h || h.length < 200) { out.push('EMPTY ' + file); return; }
    const before = new Set([...document.querySelectorAll('*')].map(e => e.__vue__).filter(c => c && typeof c.setEditorValue === 'function'));
    document.querySelector('.button.block-btn').click(); await sleep(1000);
    localStorage.setItem('addBlockIndex_89033', String(afterIdx));
    const bt = [...new Set([...document.querySelectorAll('*')].map(e => e.__vue__).filter(Boolean))].find(c => typeof c.handleAddCurBlock === 'function');
    bt.handleAddCurBlock({}, { name: 'md-custom-code', theme: 'html-code' }); await sleep(3500);
    const eds = [...new Set([...document.querySelectorAll('*')].map(e => e.__vue__).filter(c => c && typeof c.setEditorValue === 'function'))];
    const ed = eds.find(c => !before.has(c)) || eds[eds.length - 1];
    ed.code = h; ed.setEditorValue(h); ed.changeValue(true); await sleep(2000); out.push('added ' + file + ' after ' + afterIdx);
  }
  const has = f => LB.blocks.some(b => b.name === 'md-custom-code' && JSON.stringify(b.data || {}).includes(f));
  if (!has('ckg-jump')) await add(names().indexOf('md-nbr-info'), CFG.slug + '-jump.html');
  if (!has('ckg-citysec ckg-white')) { const last = names().lastIndexOf('md-house'); await add(last, CFG.slug + '-living.html'); }
  if (!has('ckg-citysec ckg-cream')) { let i = names().indexOf('md-nbr-local'); if (i < 0) i = names().indexOf('md-testimonial'); if (i < 0) i = names().indexOf('md-nbr-form'); await add(i - 1, CFG.slug + '-faq.html'); }
  window.__OUT = out.concat([names().map((n, i) => i + ':' + n).join(' ')]);
})();
