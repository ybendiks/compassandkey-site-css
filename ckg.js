/* compassandkeygroup.com site script, loaded by the Lofty Script field after ckg.css. */
(function(){
  /* Site-wide: phone number in the header, before Register / Sign In (desktop) */
  function headerPhone(){
    var ul=document.querySelector('.md-header .right-menu .head-account');
    if(!ul||document.querySelector('.md-header .ckg-phone'))return;
    /* no 'menu-item' class: Lofty's getCache() maps .menu-item widths to its menu list by index */
    var li=document.createElement('li');li.className='ckg-phone';
    li.innerHTML='<a href="tel:+12707353897">(270) 735-3897</a>';
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
