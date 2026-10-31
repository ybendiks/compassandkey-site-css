/* compassandkeygroup.com site script, loaded by the Lofty Script field after ckg.css. */
(function(){
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
  var PHONE=/(\+?1[\s.-]?)?\(\d{3}\)\s?\d{3}[\s.-]\d{4}|(\+?1[\s.-])?\b\d{3}[.-]\d{3}[.-]\d{4}\b/g;
  function telOf(s){var d=s.replace(/\D/g,'');if(d.length===11&&d[0]==='1')d=d.slice(1);return d.length===10?'tel:+1'+d:null;}
  function phones(){
    var root=document.body;if(!root)return;
    document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
      if(OLD.test(a.getAttribute('href'))||/7353897/.test(a.getAttribute('href').replace(/\D/g,''))){a.setAttribute('href',NEWTEL);}
      OLD.lastIndex=0;
      if(OLD.test(a.textContent)){OLD.lastIndex=0;a.textContent=a.textContent.replace(OLD,NEW);}
      OLD.lastIndex=0;
    });
    var w=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      var p=n.parentElement;if(!p)return NodeFilter.FILTER_REJECT;
      if(p.closest('script,style,noscript,textarea,input,select,option,a,button,[contenteditable],.md-header .header-container'))return NodeFilter.FILTER_REJECT;
      PHONE.lastIndex=0;OLD.lastIndex=0;
      return (PHONE.test(n.nodeValue)||OLD.test(n.nodeValue))?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});
    var nodes=[];while(w.nextNode())nodes.push(w.currentNode);
    nodes.forEach(function(n){
      OLD.lastIndex=0;var txt=n.nodeValue.replace(OLD,NEW);PHONE.lastIndex=0;
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
