/* compassandkeygroup.com site script, loaded by the Lofty Script field after ckg.css. */
(function(){
  /* Redirects for pages Lofty won't let us delete (system pages). Google follows JS redirects; the URL is also no-indexed in Lofty SEO > Indexing. */
  var REDIRECTS={'/house-listing':'/listing'};
  var here=location.pathname.replace(/\/+$/,'')||'/';
  if(REDIRECTS[here]){location.replace(REDIRECTS[here]+location.search+location.hash);return;}
  /* Site-wide: phone number in the header, before Register / Sign In (desktop) */
  function headerPhone(){
    var ul=document.querySelector('.md-header .right-menu .head-account');
    if(!ul||document.querySelector('.md-header .ckg-phone'))return;
    /* no 'menu-item' class: Lofty's getCache() maps .menu-item widths to its menu list by index */
    var li=document.createElement('li');li.className='ckg-phone';
    li.innerHTML='<a href="tel:+12704913450">(270) 491-3450</a>';
    ul.parentElement.insertBefore(li,ul);
    ul.parentElement.classList.add('ckg-ph');
  }
  /* Lofty splits the nav (and fills its "More" menu) from measurements taken at mount, often before ckg.css arrives. Re-run its own calculation once our CSS is in. */
  function relayoutNav(){
    var hc=document.querySelector('.md-header .header-container');
    var c=hc&&hc.__vueParentComponent&&hc.__vueParentComponent.ctx;
    if(!c||typeof c.calculateSlice!=='function'||c.isMobileSize)return;
    try{c.setDefaultSlice();setTimeout(function(){try{c.getCache();c.calculateSlice();}catch(e){}},60);}catch(e){}
  }
  /* Phones: every number on the site is a tel: link, and the old 735-3897 (stale Lofty agent snapshot) shows as the real number (270) 491-3450. */
  var OLD=/(\+?1\s*)?\(?270\)?[\s.-]*735[\s.-]*3897/g,NEW='(270) 491-3450',NEWTEL='tel:+12704913450';
  /* Display: every variant of the main number (+1(270) 491-3450, 270-491-3450, ...) and the old one reads exactly as on the Google profile: (270) 491-3450 */
  var OURS=/(\+?1[\s.-]*)?\(?270\)?[\s.-]*(?:735[\s.-]*3897|491[\s.-]*3450)/g;
  var PHONE=/(\+?1[\s.-]?)?\(\d{3}\)\s?\d{3}[\s.-]\d{4}|(\+?1[\s.-])?\b\d{3}[.-]\d{3}[.-]\d{4}\b/g;
  function telOf(s){var d=s.replace(/\D/g,'');if(d.length===11&&d[0]==='1')d=d.slice(1);return d.length===10?'tel:+1'+d:null;}
  function phones(){
    var root=document.body;if(!root)return;
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
      if(OLD.test(a.getAttribute('href'))||/7353897/.test(a.getAttribute('href').replace(/\D/g,''))){a.setAttribute('href',NEWTEL);}
      OLD.lastIndex=0;
      OLD.lastIndex=0;
      if(/4913450$/.test(a.getAttribute('href').replace(/\D/g,'')))a.setAttribute('href',NEWTEL);
      OURS.lastIndex=0;if(OURS.test(a.textContent)){OURS.lastIndex=0;var nt=a.textContent.replace(OURS,NEW);if(nt!==a.textContent)a.textContent=nt;}
      OURS.lastIndex=0;
    });
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;
      if(p.closest('script,style,noscript,textarea,input,select,option,a,button,[contenteditable],.md-header .header-container'))return NodeFilter.FILTER_REJECT;
      PHONE.lastIndex=0;OLD.lastIndex=0;
      return (PHONE.test(n.nodeValue)||OLD.test(n.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
    var nodes=[];while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(function(n){
      OURS.lastIndex=0;var txt=n.nodeValue.replace(OURS,NEW);PHONE.lastIndex=0;
      var frag=document.createDocumentFragment(),last=0,m;
      while((m=PHONE.exec(txt))){var tel=telOf(m[0]);if(!tel)continue;
        frag.appendChild(document.createTextNode(txt.slice(last,m.index)));
        var a=document.createElement('a');a.href=tel;a.className='ckg-tel';a.textContent=m[0];frag.appendChild(a);last=m.index+m[0].length;}
      if(last===0){if(txt!==n.nodeValue)n.nodeValue=txt;return;}
      frag.appendChild(document.createTextNode(txt.slice(last)));n.parentNode.replaceChild(frag,n);
    });
    document.querySelectorAll('script[type="application/ld+json"]').forEach(function(s){OLD.lastIndex=0;if(OLD.test(s.textContent)){OLD.lastIndex=0;s.textContent=s.textContent.replace(OLD,'+1(270) 491-3450');}OLD.lastIndex=0;});
  }
  /* Maps: the Google Business Profile (not an address pin) is the map and the address link everywhere. Footer map on every page except /contact (which has its own). */
  var GBP='https://www.google.com/maps?cid=4625508582504720054';
  var DIR='https://www.google.com/maps/dir/?api=1&destination=Compass+and+Key+Group+-+Real+Broker%2C+617+N+Mulberry+St+%23105B%2C+Elizabethtown%2C+KY+42701';
  var EMB='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3156.803705090403!2d-85.8521225!3d37.7008088!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x291f420f3c5b3461%3A0x40311b8c7db6e6b6!2sCompass%20and%20Key%20Group%20-%20Real%20Broker!5e0!3m2!1sen!2sus!4v1793412938143!5m2!1sen!2sus';
  function linkAddr(el){if(!el||el.querySelector('a'))return;var t=el.textContent.trim();if(!t)return;var a=document.createElement('a');a.href=GBP;a.target='_blank';a.rel='noopener';a.className='ckg-addr';a.textContent=t;el.textContent='';el.appendChild(a);}
  function maps(){
    linkAddr(document.querySelector('.md-footer .detail-addr'));
    if(document.body.classList.contains('contact'))linkAddr(document.querySelector('.md-form .info-agent .concat p:nth-child(3) span'));
    var lc=document.querySelector('.md-footer .left-content');
    if(lc&&!document.body.classList.contains('contact')&&!lc.querySelector('.ckg-footmap')){
      var d=document.createElement('div');d.className='ckg-footmap';
      d.innerHTML='<iframe src="'+EMB+'" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="Compass and Key Group - Real Broker on Google Maps"></iframe><a class="ckg-footdir" href="'+DIR+'" target="_blank" rel="noopener">Get Directions &rarr;</a>';
      lc.appendChild(d);
    }
  }
  /* City pages: Lofty renders the city name as a second <h1> (h1.nbr-name) above the real H1 in the intro copy. Keep one H1 per page. */
  function cityH1(){
    if(!document.body.classList.contains('featured-area-intro'))return;
    document.querySelectorAll('h1.nbr-name').forEach(function(h){var box=h.parentNode;if(!box||!box.querySelector('.nbr-desc h1'))return;var p=document.createElement('p');p.className=h.className;p.innerHTML=h.innerHTML;h.parentNode.replaceChild(p,h);});
    document.querySelectorAll('.md-content.richtext p').forEach(function(p){if(!p.textContent.replace(/\u00a0/g,'').trim()&&!p.querySelector('img,iframe,a'))p.classList.add('ckg-empty');});
  }
  cityH1();setTimeout(cityH1,1500);
  maps();setTimeout(maps,1500);setTimeout(maps,4000);
  phones();setTimeout(phones,1500);setTimeout(phones,4000);window.addEventListener('load',function(){setTimeout(phones,300);});
  headerPhone();var ht=0,hiv=setInterval(function(){headerPhone();if(++ht>20)clearInterval(hiv);},250);
  var css=document.getElementById('ckg-css-head')||document.getElementById('ckg-css');
  if(css&&!css.sheet)css.addEventListener('load',relayoutNav);else relayoutNav();
  setTimeout(relayoutNav,1500);window.addEventListener('load',function(){setTimeout(relayoutNav,200);});
})();
(function(){
  if(!document.body||!document.body.classList.contains('home'))return;
  var PH='Enter an address, city, or ZIP code';
  function heroButtons(){
    var box=document.querySelector('.md-hero .media-content-box');
    if(!box||box.querySelector('.ckg-hero-btns'))return;
    var d=document.createElement('div');d.className='ckg-hero-btns';
    d.innerHTML='<a class="ckg-btn ckg-btn-gold" href="/listing">Buy a Home</a><a class="ckg-btn ckg-btn-outline" href="/sell">Sell Your Home</a>';
    box.appendChild(d);box.classList.add('ckg-btns-in');
  }
  function placeholder(){var i=document.querySelector('.md-hero .search-input');if(i&&i.getAttribute('placeholder')!==PH)i.setAttribute('placeholder',PH);}
  var reviewsFiltered=false;
  function filterReviews(){
    /* Show only 5-star reviews with written text. Lofty has no rating filter; trim its data in place so the carousel rebuilds. */
    if(reviewsFiltered)return;
    var el=document.querySelector('.md-testimonial .swiper');if(!el)return;
    var c=el.__vueParentComponent;
    while(c&&!(c.ctx&&Array.isArray(c.ctx.testimonials)))c=c.parent;
    if(!c)return;
    var arr=c.ctx.testimonials;
    for(var i=arr.length-1;i>=0;i--){var r=arr[i];if(!(Number(r.reviewRate)>=5&&String(r.reviewContent||'').trim().length>0))arr.splice(i,1);}
    reviewsFiltered=true;
  }
  function reviews(){
    var el=document.querySelector('.reviews-wrap .swiper');if(!el||!el.swiper)return;
    var sw=el.swiper,n=window.innerWidth>=768?3:1;
    if(sw.params.slidesPerView===n)return;
    sw.params.slidesPerView=n;sw.params.spaceBetween=n>1?32:16;sw.params.autoHeight=n===1;
    if(n>1){var w=el.querySelector('.swiper-wrapper');if(w)w.style.height='auto';}
    if(sw.params.virtual&&sw.params.virtual.enabled&&sw.virtual&&sw.virtual.update)sw.virtual.update(true);
    sw.update();sw.slideTo(0,0);if(n===1&&sw.updateAutoHeight)sw.updateAutoHeight();
  }
  function viewAll(){
    var h=document.querySelector('.md-house');if(!h||h.querySelector('.ckg-more'))return;
    var d=document.createElement('div');d.className='ckg-more';
    d.innerHTML='<a class="ckg-textlink" href="/listing">View All Properties <span aria-hidden="true">&rarr;</span></a>';
    (h.querySelector('.template6-slider-wrapper')||h).appendChild(d);
  }
  function all(){heroButtons();placeholder();filterReviews();reviews();viewAll();}
  all();var t=0,iv=setInterval(function(){all();if(++t>40)clearInterval(iv);},250);
  window.addEventListener('resize',reviews);
  var hero=document.querySelector('.md-hero');
  if(hero&&window.MutationObserver)new MutationObserver(function(){heroButtons();placeholder();}).observe(hero,{subtree:true,childList:true,attributes:true,attributeFilter:['placeholder']});
})();
/* City pages (body.featured-area-intro, all Lofty area intro pages): hero contact buttons + office line, on-page table of contents, agent card, RealEstateAgent schema with the city as areaServed. City name comes from the URL (/vine-grove-KY -> Vine Grove). */
(function(){
  var b=document.body;if(!b||!b.classList.contains('featured-area-intro'))return;
  var m=location.pathname.match(/^\/([A-Za-z-]+)-KY\/?$/);if(!m)return;
  var CITY=m[1].split('-').map(function(w){return w.charAt(0).toUpperCase()+w.slice(1).toLowerCase();}).join(' ');
  var ETOWN=CITY==='Elizabethtown';
  var GBP='https://www.google.com/maps?cid=4625508582504720054';
  var DIR='https://www.google.com/maps/dir/?api=1&destination=Compass+and+Key+Group+-+Real+Broker%2C+617+N+Mulberry+St+%23105B%2C+Elizabethtown%2C+KY+42701';
  var me=document.getElementById('ckg-js');var BASE=me&&me.src?me.src.replace(/ckg\.js(\?.*)?$/,''):'https://cdn.jsdelivr.net/gh/ybendiks/compassandkey-site-css/';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function hero(){
    var box=document.querySelector('.md-nbr-info .md-nbr-info__box');if(!box||box.querySelector('.ckg-city-cta'))return;
    var d=document.createElement('div');d.className='ckg-city-cta';
    d.innerHTML='<div class="ckg-city-btns"><a class="ckg-btn ckg-btn-gold" href="/contact">Talk to '+(/^[AEIOU]/.test(CITY)?'an ':'a ')+esc(CITY)+' Agent</a><a class="ckg-btn ckg-btn-outline" href="tel:+12704913450">Call (270) 491-3450</a></div>'+
      '<p class="ckg-office">'+(ETOWN?'Our office':'Serving '+esc(CITY)+' from our Elizabethtown office')+': <a href="'+GBP+'" target="_blank" rel="noopener">617 N Mulberry St #105B, Elizabethtown, KY 42701</a> &middot; <a href="'+DIR+'" target="_blank" rel="noopener">Get directions</a></p>';
    var desc=box.querySelector('.nbr-desc'),num=box.querySelector('.md-nbr-info__number');
    if(desc&&desc.nextSibling)box.insertBefore(d,desc.nextSibling);else if(num)box.insertBefore(d,num);else box.appendChild(d);
  }
  var LABELS=[['md-house','Homes for Sale'],['md-market-trends','Market Trends'],['md-testimonial','Reviews'],['md-form','Contact Us']];
  /* Short TOC labels for long section headings */
  function short(t){t=t.replace(/\s+/g,' ');var r=[[/^why (choose|work with) .*/i,'Why Choose Us'],[/services/i,'Our Services'],[/market (insights|update|report|trends)/i,'Market Insights'],[/process/i,'Our Process'],[/(faq|frequently asked)/i,'FAQ'],[/neighbo(u)?rhoods?/i,'Neighborhoods'],[/schools?/i,'Schools']];for(var i=0;i<r.length;i++)if(r[i][0].test(t))return r[i][1];return t.length>32?t.slice(0,30).replace(/\s\S*$/,'')+'\u2026':t;}
  function slug(s){return s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,48);}
  function toc(){
    var box=document.querySelector('.md-nbr-info .md-nbr-info__box');var pc=document.querySelector('.page-content');if(!box||!pc||box.querySelector('.ckg-toc'))return;
    var items=[],used={};
    Array.prototype.forEach.call(pc.children,function(sec){
      var cls=sec.className||'',label=null;
      if(/\bmd-(content|custom-code)\b/.test(cls)){var h=sec.querySelector('h2');label=h&&short(h.textContent.trim());}
      else{for(var i=0;i<LABELS.length;i++){if(new RegExp('\\b'+LABELS[i][0]+'\\b').test(cls)){label=LABELS[i][1];break;}}}
      if(!label||used[label])return;used[label]=1;
      if(!sec.id)sec.id='ckg-'+slug(label);sec.classList.add('ckg-anchor');
      items.push('<a href="#'+sec.id+'">'+esc(label)+'</a>');
    });
    var agent=document.querySelector('.ckg-agent');if(agent)items.splice(Math.min(2,items.length),0,'<a href="#ckg-agent">Meet Your Agent</a>');
    if(items.length<2)return;
    var n=document.createElement('nav');n.className='ckg-toc';n.setAttribute('aria-label','On this page');
    n.innerHTML='<span class="ckg-toc-label">On this page</span><div class="ckg-toc-links">'+items.join('')+'</div>';
    box.appendChild(n);
  }
  function agent(){
    if(document.querySelector('.ckg-agent'))return;
    var host=document.querySelector('.page-content>.md-content.richtext .mg-container')||document.querySelector('.page-content>.md-house .mg-container');if(!host)return;
    var d=document.createElement('aside');d.className='ckg-agent';d.id='ckg-agent';
    d.innerHTML='<img src="'+BASE+'img/team/austin-kutz.webp" width="160" height="160" alt="Austin Kutz, Owner / Realtor, Compass and Key Group" loading="lazy">'+
      '<div class="ckg-agent-body"><p class="ckg-agent-kicker">Your '+esc(CITY)+' Realtor</p><p class="ckg-agent-name">Austin Kutz</p>'+
      '<p class="ckg-agent-role">Owner / Realtor &middot; U.S. Marine Corps veteran &middot; KY Real Estate License #277797</p>'+
      '<p class="ckg-agent-text">Austin founded Compass and Key Group to bring the values of his military service (integrity, accountability and putting others first) to every home sale and purchase in '+esc(CITY)+' and across Central Kentucky.</p>'+
      '<div class="ckg-agent-links"><a class="ckg-btn ckg-btn-gold" href="/contact">Contact Austin</a><a class="ckg-textlink" href="/about">Meet the team &rarr;</a></div></div>';
    host.appendChild(d);
  }
  function schema(){
    if(document.getElementById('ckg-city-schema'))return;
    var s=document.createElement('script');s.type='application/ld+json';s.id='ckg-city-schema';
    s.textContent=JSON.stringify({'@context':'https://schema.org','@type':'RealEstateAgent','@id':'https://compassandkeygroup.com/#agency','name':'Compass and Key Group','alternateName':'Compass and Key Group - Real Broker','url':'https://compassandkeygroup.com/','telephone':'+1-270-491-3450','image':BASE+'img/team/austin-kutz.webp',
      'address':{'@type':'PostalAddress','streetAddress':'617 N Mulberry St #105B','addressLocality':'Elizabethtown','addressRegion':'KY','postalCode':'42701','addressCountry':'US'},
      'geo':{'@type':'GeoCoordinates','latitude':37.7008088,'longitude':-85.8521225},'hasMap':GBP,'sameAs':[GBP],
      'areaServed':{'@type':'City','name':CITY+', KY'},
      'founder':{'@type':'Person','name':'Austin Kutz','jobTitle':'Owner / Realtor'},
      'mainEntityOfPage':location.origin+location.pathname});
    document.head.appendChild(s);
  }
  function all(){hero();agent();toc();schema();}
  all();var t=0,iv=setInterval(function(){all();if(++t>16)clearInterval(iv);},250);
})();
