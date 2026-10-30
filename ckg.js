/* compassandkeygroup.com site script, loaded by the Lofty Script field after ckg.css. */
(function(){
  if(!document.body||!document.body.classList.contains('home'))return;
  var PH='Enter an address, city, or ZIP code';
  function heroButtons(){
    var box=document.querySelector('.md-hero .media-content-box');
    if(!box||box.querySelector('.ckg-hero-btns'))return;
    var d=document.createElement('div');d.className='ckg-hero-btns';
    d.innerHTML='<a class="ckg-btn ckg-btn-gold" href="/listing">Buy a Home</a><a class="ckg-btn ckg-btn-outline" href="/sell">Sell Your Home</a>';
    box.appendChild(d);
  }
  function placeholder(){var i=document.querySelector('.md-hero .search-input');if(i&&i.getAttribute('placeholder')!==PH)i.setAttribute('placeholder',PH);}
  function reviews(){
    var el=document.querySelector('.reviews-wrap .swiper');if(!el||!el.swiper)return;
    var sw=el.swiper,n=window.innerWidth>=768?3:1;
    if(sw.params.slidesPerView===n)return;
    sw.params.slidesPerView=n;sw.params.spaceBetween=n>1?32:16;sw.params.autoHeight=n===1;
    if(n>1){var w=el.querySelector('.swiper-wrapper');if(w)w.style.height='auto';}
    if(sw.params.virtual&&sw.params.virtual.enabled&&sw.virtual)sw.virtual.update(true);
    sw.update();sw.slideTo(0,0);if(n===1&&sw.updateAutoHeight)sw.updateAutoHeight();
  }
  function viewAll(){
    var h=document.querySelector('.md-house');if(!h||h.querySelector('.ckg-more'))return;
    var d=document.createElement('div');d.className='ckg-more';
    d.innerHTML='<a class="ckg-textlink" href="/listing">View All Properties <span aria-hidden="true">&rarr;</span></a>';
    (h.querySelector('.template6-slider-wrapper')||h).appendChild(d);
  }
  function all(){heroButtons();placeholder();reviews();viewAll();}
  all();var t=0,iv=setInterval(function(){all();if(++t>40)clearInterval(iv);},250);
  window.addEventListener('resize',reviews);
  var hero=document.querySelector('.md-hero');
  if(hero&&window.MutationObserver)new MutationObserver(function(){heroButtons();placeholder();}).observe(hero,{subtree:true,childList:true,attributes:true,attributeFilter:['placeholder']});
})();
