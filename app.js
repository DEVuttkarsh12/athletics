gsap.registerPlugin(ScrollTrigger);

/* ---------- DATA ---------- */
const PRODUCTS = [
  {
    id:'thunder-pink', cat:'thunder', name:'THUNDER WAVE — PINK',
    price:7800, mrp:9200,
    img:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-40_c9297026-d577-4e68-bb60-83f0a89836c7.jpg?v=1759965061&width=800',
    alt:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-47_8124731f-0add-4158-8be2-49820bdac515.jpg?v=1759965061&width=800',
    badge:'BESTSELLER', badgeClass:'badge-hot', sizes:['S','M','L']
  },
  {
    id:'thunder-blue', cat:'thunder', name:'THUNDER WAVE — NEON BLUE',
    price:7800, mrp:9200,
    img:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-18.jpg?v=1759965888&width=800',
    alt:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-36.jpg?v=1759965888&width=800',
    badge:'LOW STOCK', badgeClass:'badge-soon', sizes:['S','M','L']
  },
  {
    id:'eclipse-red', cat:'eclipse', name:'ECLIPSE — RED / BLACK',
    price:7800, mrp:9200,
    img:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-04.jpg?v=1760169787&width=800',
    alt:'https://aureliusathletics.com/cdn/shop/files/Black_and_Red_Abstract_-Front.jpg?v=1760169787&width=800',
    badge:'CHAMP PICK', badgeClass:'badge-hot', sizes:['S','M','L']
  },
];
const REVIEWS = [
  {n:'Rohan M.', t:'Men’s Physique Competitor — Mumbai', c:'Fit is criminal. Waist looks 2 inches smaller on stage. The lock-waistband didn’t move once during my routine.', bg:'#C8102E'},
  {n:'Derek L.', t:'NPC Athlete — Texas', c:'I own every brand. Aurelius taper is different — quads pop, no flare, fabric eats light perfectly.', bg:'#1A1410'},
  {n:'Arjun S.', t:'First show, Top 3 — Delhi', c:'Ordered M, delivery in 4 days. Wore Eclipse red/black for finals. Judges literally complimented the shorts.', bg:'#8E0C1A'},
  {n:'Marcus T.', t:'Coach — 12 athletes', c:'Put my whole team in Thunder Wave. Stage photos look insane. This is the new standard, no debate.', bg:'#C8102E'},
  {n:'Kabir J.', t:'Men’s Physique — Pune', c:'Stretch + structure is unreal. Squat, twist, hit vacuum — zero ride, zero slip. Worth every rupee.', bg:'#1A1410'},
  {n:'J. Carter', t:'Regional Champ — Florida', c:'Buendia wasn’t lying. Best board short I’ve touched. Pink colorway under LEDs is electric.', bg:'#C8102E'},
];
const fmt = n => 'Rs. ' + n.toLocaleString('en-IN') + '.00';

/* ---------- SMOOTH SCROLL ---------- */
let lenis=null;
try{
  lenis = new Lenis({ lerp:0.09, smoothWheel:true });
  function raf(t){ lenis.raf(t); requestAnimationFrame(raf);} requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
}catch(e){}

/* anchor scroll via lenis */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    const id=a.getAttribute('href');
    if(id.length>1){
      const el=document.querySelector(id);
      if(el){ e.preventDefault(); closeMenu();
        if(lenis) lenis.scrollTo(el,{offset:-96,duration:1.4}); else el.scrollIntoView({behavior:'smooth'});
      }
    }
  });
});

/* ---------- CURSOR ---------- */
const dot=document.getElementById('cursorDot'), ring=document.getElementById('cursorRing');
let mx=innerWidth/2,my=innerHeight/2,rx=mx,ry=my;
addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
(function loop(){rx+=(mx-rx)*.16;ry+=(my-ry)*.16;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.serie-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>document.body.classList.add('link-hover'));
  el.addEventListener('mouseleave',()=>document.body.classList.remove('link-hover'));
});
document.querySelectorAll('[data-cursor]').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.querySelector('span').textContent=el.dataset.cursor;});
  el.addEventListener('mouseleave',()=>{ring.querySelector('span').textContent='VIEW';});
});

/* ---------- LOADER ---------- */
const loader=document.getElementById('loader'), bar=document.getElementById('loaderBar'),
      pct=document.getElementById('loaderPct'), status=document.getElementById('loaderStatus');
const statuses=['LOADING FABRIC / CUT / FIT','CUTTING IN CRIMSON','POLISHING STAGE LIGHTS','LOCKING WAISTBAND'];
const loadObj={v:0};
const fill=document.getElementById('loaderFill');
let lastPhase=-1;
gsap.from('.loader-inner > *',{y:24,opacity:0,duration:.7,stagger:.07,ease:'power3.out'});
gsap.from('.loader-giant',{opacity:0,scale:1.06,duration:1.2,ease:'power2.out'});
gsap.to(loadObj,{v:100,duration:2.1,ease:'power2.inOut',
  onUpdate:()=>{
    bar.style.width=loadObj.v+'%';
    pct.textContent=String(Math.floor(loadObj.v)).padStart(3,'0');
    fill.style.clipPath='inset(0 '+(100-loadObj.v)+'% 0 0)';
    const ph=Math.min(statuses.length-1,Math.floor(loadObj.v/28));
    if(ph!==lastPhase){lastPhase=ph;status.textContent=statuses[ph];gsap.fromTo(status,{y:10,opacity:0},{y:0,opacity:1,duration:.35,ease:'power2.out'});}
  },
  onComplete:finishLoad});
function finishLoad(){
  const tl=gsap.timeline({onComplete:()=>{loader.style.display='none';document.body.dataset.loading='false';ScrollTrigger.refresh();}});
  tl.to('.loader-pct',{scale:1.12,opacity:0,duration:.45,ease:'power3.in'})
    .to('.loader-giant',{opacity:0,y:-40,duration:.6,ease:'power3.in'},'-=.4')
    .to('.loader-inner',{y:-30,opacity:0,duration:.55,ease:'power3.in'},'-=.3')
    .to('.curtain-1',{yPercent:-100,duration:.9,ease:'power4.inOut'},'-=.2')
    .add(()=>{heroIntro();},'-=.55')
    .to('.loader',{yPercent:-100,duration:.01});
  // crimson trailing curtain
  gsap.fromTo('.curtain-2',{scaleY:0},{scaleY:1,duration:.45,ease:'power3.in',delay:.55});
  gsap.to('.curtain-2',{scaleY:0,transformOrigin:'top',duration:.6,ease:'power3.out',delay:1});
}

/* ---------- HERO INTRO ---------- */
gsap.set('.nav',{y:-90,opacity:0});
gsap.set('.hero-atlas',{opacity:0,y:60});
gsap.set('.hero-lines i',{scaleY:0,transformOrigin:'top'});
gsap.set('.arch',{clipPath:'inset(100% 0% 0% 0% round 200px)'});
gsap.set(['.card-fabric','.card-seal','.hero-badge'],{scale:0,opacity:0});
gsap.set('.marquee-volt',{yPercent:120,opacity:0});
function heroIntro(){
  const tl=gsap.timeline({defaults:{ease:'power4.out'}});
  tl.fromTo('.hero',{filter:'blur(10px)'},{filter:'blur(0px)',duration:1.5,ease:'power2.out',clearProps:'filter'},0)
    .to('.nav',{y:0,opacity:1,duration:1},0)
    .to('.hero-atlas',{opacity:1,y:0,duration:1.6},0)
    .to('.hero-lines i',{scaleY:1,duration:1.4,stagger:.08},.1)
    .to('.hero-title .word',{y:0,duration:1.2,stagger:.12},.15)
    .fromTo('#heroImg',{scale:1.35},{scale:1.08,duration:2.4,ease:'power2.out'},.2)
    .to('.arch',{clipPath:'inset(0% 0% 0% 0% round 24px)',duration:1.4,ease:'power4.inOut'},.25)
    .from('.hero-sub',{y:30,opacity:0,duration:.9},.7)
    .from('.hero-ctas .btn',{y:26,opacity:0,duration:.8,stagger:.1},.8)
    .to('.card-fabric',{scale:1,opacity:1,duration:.9,ease:'back.out(1.6)'},1)
    .to('.card-seal',{scale:1,opacity:1,duration:.9,ease:'back.out(1.7)'},1.1)
    .to('.hero-badge',{scale:1,opacity:1,duration:.8,ease:'back.out(1.5)'},1.2)
    .to('.marquee-volt',{yPercent:0,opacity:1,duration:1},1)
    .from('.hero-side',{opacity:0,duration:1.2},1.2)
    .from(['.fig-num','.fig-cap','.tick'],{opacity:0,duration:.9,stagger:.07},1.15);
  return tl;
}
/* hero parallax on mouse + scroll (fine pointers only) */
const heroImg=document.getElementById('heroImg');
const finePointer=matchMedia('(hover:hover) and (pointer:fine)').matches;
if(finePointer){
addEventListener('mousemove',e=>{
  const x=(e.clientX/innerWidth-.5), y=(e.clientY/innerHeight-.5);
  gsap.to('.hero-content',{x:x*18,y:y*12,duration:.8,ease:'power2.out'});
  gsap.to('#heroImg',{x:x*-26,duration:1,ease:'power2.out'});
});
}
gsap.to('#heroImg',{yPercent:14,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});

/* ---------- PARTICLES ---------- */
const cv=document.getElementById('particles'), ctx=cv.getContext('2d');
let pts=[];
function sizeCv(){cv.width=cv.offsetWidth;cv.height=cv.offsetHeight;}
sizeCv(); addEventListener('resize',sizeCv);
for(let i=0;i<(innerWidth<640?28:60);i++){const pick=Math.random();pts.push({x:Math.random(),y:Math.random(),r:Math.random()*1.6+.4,s:Math.random()*.0007+.00015,o:Math.random()*.28+.12,c:pick>.75?'200,16,46':pick>.4?'142,12,26':'26,20,16'});}
(function draw(){
  ctx.clearRect(0,0,cv.width,cv.height);
  pts.forEach(pt=>{pt.y-=pt.s;if(pt.y<0)pt.y=1;
    ctx.beginPath();ctx.arc(pt.x*cv.width,pt.y*cv.height,pt.r,0,7);
    ctx.fillStyle=`rgba(${pt.c},${pt.o})`;ctx.fill();});
  requestAnimationFrame(draw);
})();

/* ---------- NAV / MENU / SEARCH / CART ---------- */
const nav=document.getElementById('nav');
addEventListener('scroll',()=>{nav.classList.toggle('scrolled',scrollY>40);
  const h=document.documentElement.scrollHeight-innerHeight;
  document.getElementById('progressBar').style.width=(scrollY/h*100)+'%';
},{passive:true});
const overlay=document.getElementById('menuOverlay');
document.getElementById('menuBtn').onclick=()=>overlay.classList.add('open');
function closeMenu(){overlay.classList.remove('open');}
document.getElementById('menuClose').onclick=closeMenu;
const sOverlay=document.getElementById('searchOverlay');
document.getElementById('searchBtn').onclick=()=>sOverlay.classList.add('open');
document.getElementById('searchClose').onclick=()=>sOverlay.classList.remove('open');
document.querySelectorAll('.search-tags button').forEach(b=>b.onclick=()=>{document.getElementById('searchInput').value=b.textContent;doSearch(b.textContent);});
document.getElementById('searchInput').addEventListener('input',e=>doSearch(e.target.value));
function doSearch(q){
  q=q.trim().toLowerCase(); if(!q) return renderProducts('all',true);
  renderProducts(q.includes('eclipse')?'eclipse':q.includes('thunder')||q.includes('pink')||q.includes('blue')?'thunder':'all',true);
  sOverlay.classList.remove('open');
  document.getElementById('shop').scrollIntoView({behavior:'smooth'});
}

/* cart state */
let cart=[];
const drawer=document.getElementById('cartDrawer'), scrim=document.getElementById('cartScrim');
document.getElementById('cartBtn').onclick=()=>{drawer.classList.add('open');scrim.classList.add('show');};
document.getElementById('cartClose').onclick=closeCart;
scrim.onclick=closeCart;
document.getElementById('cartShopBtn')?.addEventListener('click',closeCart);
function closeCart(){drawer.classList.remove('open');scrim.classList.remove('show');}
function addToCart(id,size){
  const prod=PRODUCTS.find(p=>p.id===id);
  const key=id+'-'+size;
  const ex=cart.find(c=>c.key===key);
  if(ex) ex.qty++; else cart.push({key,...prod,size,qty:1});
  renderCart(); toast(`${prod.name} (${size}) — added ✓`);
  drawer.classList.add('open');scrim.classList.add('show');
}
function renderCart(){
  const n=cart.reduce((a,c)=>a+c.qty,0);
  document.getElementById('cartCount').textContent=n;
  document.getElementById('cartCount2').textContent=n;
  const box=document.getElementById('cartItems');
  if(!cart.length){box.innerHTML=`<div class="cart-empty"><p class="big">EMPTY.</p><p>Your stage kit is waiting. Add some thunder.</p><a href="#shop" class="btn btn-volt" onclick="document.getElementById('cartDrawer').classList.remove('open');document.getElementById('cartScrim').classList.remove('show')"><span>SHOP THE DROP</span></a></div>`;}
  else box.innerHTML=cart.map((c,i)=>`
    <div class="cart-item"><img src="${c.img}"/>
      <div style="flex:1"><h4>${c.name}</h4><small>Size ${c.size} — ${fmt(c.price)}</small>
      <div class="row"><div class="qty"><button onclick="chQty(${i},-1)">−</button><b>${c.qty}</b><button onclick="chQty(${i},1)">+</button></div>
      <button onclick="rmItem(${i})" style="background:none;border:0;color:#ff6b6b;font-size:.75rem;font-weight:800">REMOVE</button></div>
      </div></div>`).join('');
  document.getElementById('cartTotal').textContent=fmt(cart.reduce((a,c)=>a+c.price*c.qty,0));
}
window.chQty=(i,d)=>{cart[i].qty+=d;if(cart[i].qty<=0)cart.splice(i,1);renderCart();};
window.rmItem=i=>{cart.splice(i,1);renderCart();};
let toastT;
function toast(msg){const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('show'),2400);}

/* ---------- PRODUCTS ---------- */
const grid=document.getElementById('products');
let selected={};
function renderProducts(filter='all',instant=false){
  grid.innerHTML=PRODUCTS.filter(p=>filter==='all'||p.cat===filter).map(p=>`
    <article class="product" data-id="${p.id}">
      <div class="p-media">
        <div class="p-badges"><span class="badge-soon">LAUNCHING SOON</span><span class="${p.badgeClass}">${p.badge}</span></div>
        <button class="p-wish" onclick="wish(this)">♡</button>
        <img class="main" src="${p.img}" alt="${p.name}" loading="lazy"/>
        <img class="alt" src="${p.alt}" alt="${p.name} alternate" loading="lazy"/>
      </div>
      <div class="p-body">
        <span class="tag ${p.cat==='thunder'?'tag-blue':'tag-red'}">${p.cat==='thunder'?'THUNDER WAVE':'ECLIPSE'} SERIES</span>
        <h3>${p.name}</h3>
        <div class="p-price"><b>${fmt(p.price)}</b><s>${fmt(p.mrp)}</s><i>SAVE 15%</i></div>
        <div class="p-spec">4-WAY STRETCH ✦ NPC-CUT ✦ SWEAT-PROOF</div>
        <div class="sizes">${p.sizes.map((s,i)=>`<button class="${(selected[p.id]||'M')===s?'sel':''}" onclick="pickSize('${p.id}','${s}',this)">${s}</button>`).join('')}</div>
        <button class="p-guide" data-size>SIZE GUIDE ∎ — STAGE CUT</button>
        <button class="p-add" onclick="addToCart('${p.id}','${selected[p.id]||'M'}')">ADD TO KIT →</button>
      </div>
    </article>`).join('');
  if(instant){gsap.from('.product',{y:40,opacity:0,duration:.7,stagger:.1,ease:'power3.out'});}
  else animateProducts();
  bindWishCursor();
  if(typeof ScrollTrigger!=='undefined') ScrollTrigger.refresh();
}
window.pickSize=(id,s,btn)=>{selected[id]=s;btn.parentElement.querySelectorAll('button').forEach(b=>b.classList.remove('sel'));btn.classList.add('sel');};
window.wish=btn=>{btn.classList.toggle('active');btn.textContent=btn.classList.contains('active')?'♥':'♡';toast(btn.classList.contains('active')?'Saved to wishlist ♥':'Removed from wishlist');};
function bindWishCursor(){}
renderProducts();
document.querySelectorAll('#filters button').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#filters button').forEach(x=>x.classList.remove('active'));
  b.classList.add('active'); renderProducts(b.dataset.filter,true);
});
/* series cards jump straight into a filtered shop */
document.querySelectorAll('.serie-card:not(.end-card) .btn').forEach((btn,idx)=>{
  btn.addEventListener('click',()=>{
    const f=idx<2?'thunder':'eclipse';
    document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('active',x.dataset.filter===f));
    renderProducts(f,true);
  });
});

/* ---------- COUNTDOWN (evergreen 9d) ---------- */
const target=Date.now()+ (9*24*3600+14*3600+22*60)*1000;
setInterval(()=>{
  let d=Math.max(0,target-Date.now())/1000;
  const dd=Math.floor(d/86400);d%=86400;const hh=Math.floor(d/3600);d%=3600;const mm=Math.floor(d/60);const ss=Math.floor(d%60);
  set('dd',dd);set('hh',hh);set('mm',mm);set('ss',ss);
},1000);
function set(id,v){document.getElementById(id).textContent=String(v).padStart(2,'0');}

/* ---------- FORMS ---------- */
document.getElementById('dropForm').addEventListener('submit',e=>{e.preventDefault();toast('You’re on the list — check your inbox ⚡');e.target.reset();});
document.getElementById('accessForm').addEventListener('submit',e=>{e.preventDefault();toast('Spot claimed — welcome to the arsenal ⚡');e.target.reset();});

/* ---------- REVIEWS ---------- */
document.getElementById('reviewTrack').innerHTML=[...REVIEWS,...REVIEWS].map(r=>`
  <div class="review-card"><div class="stars">★★★★★</div><p>“${r.c}”</p>
  <div><i style="background:${r.bg}">${r.n[0]}</i><span><b>${r.n}</b><small>${r.t}</small></span></div></div>`).join('');

/* ---------- SCROLL ANIMATIONS ---------- */
/* hero exit parallax */
gsap.to('.hero-grid',{y:-90,opacity:.25,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.hero-atlas',{yPercent:34,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.fig-num',{yPercent:70,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
gsap.to('.arch-wrap',{yPercent:-5,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:true}});
/* nav hide on scroll down */
let lastY=0;
addEventListener('scroll',()=>{
  const y=scrollY;
  nav.classList.toggle('hide',y>500&&y>lastY);
  lastY=y;
},{passive:true});
/* section heads: masked rise + index pop */
gsap.utils.toArray('[data-count]').forEach(el=>{
  const end=+el.dataset.count;
  ScrollTrigger.create({trigger:el,start:'top 90%',once:true,onEnter:()=>{
    gsap.fromTo(el,{innerText:0},{innerText:end,duration:1.8,snap:{innerText:1},ease:'power2.out'});
  }});
});
gsap.utils.toArray('.split').forEach(el=>{
  if(el.closest('.statement')||el.closest('.access')) return;
  gsap.from(el,{yPercent:60,opacity:0,duration:1.2,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 87%'}});
});
gsap.utils.toArray('.section-head .index').forEach(el=>{
  gsap.from(el,{scale:.7,opacity:0,duration:.7,ease:'back.out(1.8)',scrollTrigger:{trigger:el,start:'top 88%'}});
});
/* statement: word-by-word gold scrub */
document.querySelectorAll('.statement p').forEach(p=>{
  const frag=document.createDocumentFragment();
  p.childNodes.forEach(node=>{
    if(node.nodeType===3){
      node.textContent.split(/\s+/).filter(Boolean).forEach(w=>{
        const s=document.createElement('span');s.className='w';s.textContent=w;frag.appendChild(s);frag.appendChild(document.createTextNode(' '));
      });
    }else if(node.tagName==='EM'){
      node.textContent.split(/\s+/).filter(Boolean).forEach(w=>{
        const s=document.createElement('span');s.className='w gold';s.textContent=w;frag.appendChild(s);frag.appendChild(document.createTextNode(' '));
      });
    }else frag.appendChild(node.cloneNode(true));
  });
  p.innerHTML='';p.appendChild(frag);
  gsap.to(p.querySelectorAll('.w'),{opacity:1,y:0,stagger:.05,ease:'none',
    scrollTrigger:{trigger:p,start:'top 80%',end:'bottom 45%',scrub:.6}});
});
/* drop cards: 3D rise + inner image parallax */
gsap.set('.drop-card',{transformPerspective:1000});
gsap.utils.toArray('.drop-card').forEach((card,i)=>{
  gsap.from(card,{y:90,opacity:0,rotate:i%2?2:-2,rotationX:-14,duration:1.1,ease:'power4.out',
    scrollTrigger:{trigger:card,start:'top 88%'}});
});
gsap.utils.toArray('.drop-img img').forEach(img=>{
  gsap.fromTo(img,{yPercent:-8},{yPercent:8,ease:'none',scrollTrigger:{trigger:img,start:'top bottom',end:'bottom top',scrub:true}});
});
gsap.from('.drop-timer',{y:70,opacity:0,scale:.96,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.drop-timer',start:'top 88%'}});
/* serie cards: single robust entrance (no fragile container triggers) + guarded pin */
const track=document.getElementById('hscrollTrack');
if(innerWidth>900){
  const getX=()=>Math.min(0,-(track.scrollWidth-innerWidth+80));
  gsap.to(track,{x:getX,ease:'none',
    scrollTrigger:{trigger:'.series',start:'top top',end:'+=1400',pin:true,scrub:1,invalidateOnRefresh:true}});
}
gsap.set('.serie-card',{transformPerspective:1000});
gsap.fromTo('.serie-card',{y:70,opacity:0,rotationX:-12},{y:0,opacity:1,rotationX:0,duration:1,stagger:.12,ease:'power4.out',
  scrollTrigger:{trigger:'.hscroll',start:'top 82%',once:true}});
gsap.utils.toArray('.serie-card img').forEach(img=>{
  gsap.fromTo(img,{scale:1.15},{scale:1,ease:'none',scrollTrigger:{trigger:'.series',start:'top bottom',end:'bottom top',scrub:true}});
});
/* products: batch entrance with a whisper of rotation */
function animateProducts(){
  gsap.set('.product',{y:60,opacity:0,rotate:1,rotationX:-12,transformPerspective:900});
  ScrollTrigger.batch('.product',{start:'top 92%',
    onEnter:els=>gsap.to(els,{y:0,opacity:1,rotate:0,rotationX:0,duration:.9,stagger:.12,ease:'power4.out',overwrite:true})});
}
/* craft: media clip reveal + list stagger + stats */
gsap.fromTo('.craft-media',{clipPath:'inset(12% 8% 12% 8% round 24px)'},{clipPath:'inset(0% 0% 0% 0% round 24px)',ease:'none',
  scrollTrigger:{trigger:'.craft',start:'top 80%',end:'top 30%',scrub:true}});
gsap.utils.toArray('.craft-list li').forEach((li,i)=>{
  gsap.from(li,{x:60,opacity:0,duration:.8,delay:(i%4)*.05,ease:'power3.out',scrollTrigger:{trigger:li,start:'top 90%'}});
});
/* athlete: photo wipe + quote */
gsap.fromTo('.athlete-photo',{clipPath:'inset(0% 0% 100% 0% round 24px)'},{clipPath:'inset(0% 0% 0% 0% round 24px)',duration:1.3,ease:'power4.inOut',
  scrollTrigger:{trigger:'.athlete-photo',start:'top 80%'}});
gsap.from('.athlete-copy blockquote',{x:50,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:'.athlete-copy',start:'top 75%'}});
gsap.from('.champ-pick',{y:36,opacity:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.athlete-copy',start:'top 65%'}});
const sticky=document.getElementById('stickyShop');
if(sticky){
  ScrollTrigger.create({trigger:'#drop',start:'top 85%',onEnter:()=>sticky.classList.add('show'),onLeaveBack:()=>sticky.classList.remove('show')});
  /* keep the sticky bar off the ticket + footer so it never covers them */
  ['#access','.footer'].forEach(sel=>{
    const el=document.querySelector(sel);
    if(el) ScrollTrigger.create({trigger:el,start:'top 88%',end:'bottom top',
      onEnter:()=>sticky.classList.add('hide'),onEnterBack:()=>sticky.classList.add('hide'),
      onLeaveBack:()=>sticky.classList.remove('hide'),onLeave:()=>sticky.classList.remove('hide')});
  });
}
/* athlete bg drift */
gsap.to('.athlete-bg',{xPercent:-12,ease:'none',scrollTrigger:{trigger:'.athlete',start:'top bottom',end:'bottom top',scrub:true}});
/* reviews: drift + velocity skew on all marquees */
gsap.utils.toArray('.review-card').forEach((card,i)=>{
  gsap.from(card,{y:40,opacity:0,duration:.7,delay:(i%3)*.06,ease:'power3.out',scrollTrigger:{trigger:'.reviews',start:'top 80%'}});
});
let skewClamp=gsap.utils.clamp(-8,8), curSkew=0;
ScrollTrigger.create({onUpdate:self=>{
  const v=skewClamp(self.getVelocity()/-300);
  if(Math.abs(v)>Math.abs(curSkew)){curSkew=v;gsap.to('.marquee',{skewX:curSkew,duration:.4,overwrite:true,onComplete:()=>gsap.to('.marquee',{skewX:0,duration:.6})});}
}});
/* access + footer */
gsap.from('.foot-cta > *',{y:44,opacity:0,duration:.9,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:'.foot-cta',start:'top 86%'}});
gsap.from('.foot-top > div',{y:36,opacity:0,duration:.8,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'.foot-top',start:'top 88%'}});
gsap.from('.pay-row',{opacity:0,y:20,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.pay-row',start:'top 92%'}});
gsap.from('.rule-strip',{opacity:0,y:20,duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.rule-strip',start:'top 92%'}});
gsap.from('.perks div',{y:50,opacity:0,duration:.9,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:'.perks',start:'top 88%'}});
gsap.from('.faq-item',{y:40,opacity:0,duration:.8,stagger:.08,ease:'power3.out',clearProps:'transform,opacity',scrollTrigger:{trigger:'.faq-list',start:'top 88%',once:true}});
/* access: char-split headline (owns the h2 — no competing tweens) + group rise */
document.querySelectorAll('.access-inner h2').forEach(h2=>{
  const frag=document.createDocumentFragment();
  const walk=(node,parent)=>{
    node.childNodes.forEach(n=>{
      if(n.nodeType===3){
        /* group chars per word so lines wrap between words, never mid-word */
        n.textContent.split(/(\s+)/).forEach(part=>{
          if(!part) return;
          if(/^\s+$/.test(part)){parent.appendChild(document.createTextNode(' '));}
          else{
            const w=document.createElement('span');w.className='wd';
            [...part].forEach(c=>{const s=document.createElement('span');s.className='ch';s.textContent=c;w.appendChild(s);});
            parent.appendChild(w);
          }
        });
      }else if(n.tagName==='BR'){parent.appendChild(document.createElement('br'));}
      else{const clone=n.cloneNode(false);parent.appendChild(clone);walk(n,clone);}
    });
  };
  walk(h2,frag);h2.innerHTML='';h2.appendChild(frag);
  gsap.from(h2.querySelectorAll('.ch'),{y:46,opacity:0,rotate:8,duration:.7,stagger:.018,ease:'back.out(1.6)',
    scrollTrigger:{trigger:h2,start:'top 86%'}});
});
gsap.from('.access-copy > :not(h2), .ticket, .access-inner > .fine',{y:50,opacity:0,duration:.9,stagger:.09,ease:'power3.out',scrollTrigger:{trigger:'.access',start:'top 72%'}});
/* pass serial */
document.getElementById('passSerial').textContent='N° AA-2026-'+Math.floor(1000+Math.random()*9000);
document.querySelectorAll('.foot-giant').forEach(el=>{
  el.innerHTML=el.textContent.split('').map(c=>`<span class="fl">${c}</span>`).join('');
  gsap.from(el.querySelectorAll('.fl'),{y:90,opacity:0,rotate:4,duration:.9,stagger:.05,ease:'power4.out',scrollTrigger:{trigger:'.footer',start:'top 82%'}});
});

/* ---------- MODALS + QUIZ + FAQ ---------- */
const mScrim=document.getElementById('modalScrim');
function openModal(id){
  closeMenu(); closeCart();
  document.getElementById(id).classList.add('open'); mScrim.classList.add('show');
  document.body.style.overflow='hidden'; if(lenis) lenis.stop();
}
function closeModals(){
  document.querySelectorAll('.modal.open').forEach(m=>m.classList.remove('open'));
  mScrim.classList.remove('show'); document.body.style.overflow='';
  if(lenis) lenis.start();
}
mScrim.addEventListener('click',closeModals);
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModals();}});
document.addEventListener('click',e=>{
  const q=e.target.closest('[data-quiz]'); if(q){e.preventDefault();startQuiz();openModal('quizModal');return;}
  const s=e.target.closest('[data-size]'); if(s){e.preventDefault();openModal('sizeModal');return;}
  const f=e.target.closest('[data-flash]'); if(f){flashShop(f.dataset.flash);return;}
  if(e.target.closest('[data-close]')) closeModals();
});
/* quiz */
const QUIZ=[
  {q:'Where\u2019s your waist 1" below the navel?',opts:['28–30"','31–33"','34–36"+'],key:'waist'},
  {q:'When do you step on stage?',opts:['4+ weeks out','Under 4 weeks','Off-season / training'],key:'show'},
  {q:'Which federation?',opts:['NPC','WNBF','IFBB','First show — unsure'],key:'fed'},
];
let quizStep=0, quizAns={};
function startQuiz(){
  quizStep=0; quizAns={};
  document.getElementById('quizBack').style.visibility='visible';
  renderQuiz();
}
function renderQuiz(){
  const step=QUIZ[quizStep];
  document.getElementById('quizQ').textContent=step.q;
  document.getElementById('quizOpts').innerHTML=step.opts.map(o=>`<button data-opt="${o}">${o}</button>`).join('');
  document.getElementById('quizBar').style.width=(quizStep/QUIZ.length*100)+'%';
  document.getElementById('quizBack').style.visibility=quizStep===0?'hidden':'visible';
}
document.getElementById('quizOpts').addEventListener('click',e=>{
  const b=e.target.closest('[data-opt]'); if(!b) return;
  quizAns[QUIZ[quizStep].key]=b.dataset.opt; quizStep++;
  if(quizStep<QUIZ.length) renderQuiz(); else renderQuizResult();
});
document.getElementById('quizBack').addEventListener('click',()=>{if(quizStep>0){quizStep--;renderQuiz();}});
function renderQuizResult(){
  const size=quizAns.waist.startsWith('28')?'S':quizAns.waist.startsWith('31')?'M':'L';
  const fed={'NPC':'NPC §2 checked — 2" above the knee, tapered, number-tab ready.',
    'WNBF':'WNBF checked — inside the 6–11" inseam window.',
    'IFBB':'IFBB checked — opaque, loose, geometric print legal.',
    'First show — unsure':'All three federations checked — legal on any stage.'}[quizAns.fed];
  const urg=quizAns.show==='Under 4 weeks'?'Order this week — 24–48h dispatch, then rehearse your turns in them.':'Train in them now — stage shorts should feel invisible by show day.';
  document.getElementById('quizQ').textContent='YOUR STAGE SIZE IS';
  document.getElementById('quizBar').style.width='100%';
  document.getElementById('quizBack').style.visibility='hidden';
  document.getElementById('quizOpts').innerHTML=`
    <div class="quiz-result"><b>${size}</b><p>${fed}<br>${urg}</p></div>
    ${PRODUCTS.map(p=>`<button onclick="addToCart('${p.id}','${size}');closeModals();">ADD ${p.name.split('—')[1]||p.name} (${size}) →</button>`).join('')}`;
}
/* faq — class-only toggle (CSS grid 0fr/1fr handles height, no scrollHeight math) */
(function initFaq(){
  const items=[...document.querySelectorAll('.faq-item')];
  if(!items.length) return;
  // ensure one open by default (matches HTML)
  if(!items.some(it=>it.classList.contains('open'))) items[0].classList.add('open');
  items.forEach(it=>{
    const btn=it.querySelector('.faq-q');
    btn.setAttribute('aria-expanded', it.classList.contains('open') ? 'true' : 'false');
  });
  document.querySelector('.faq-list').addEventListener('click',e=>{
    const btn=e.target.closest('.faq-q');
    if(!btn) return;
    const item=btn.closest('.faq-item');
    const wasOpen=item.classList.contains('open');
    items.forEach(it=>{
      it.classList.remove('open');
      it.querySelector('.faq-q').setAttribute('aria-expanded','false');
    });
    if(!wasOpen){
      item.classList.add('open');
      btn.setAttribute('aria-expanded','true');
    }
    if(typeof ScrollTrigger!=='undefined') setTimeout(()=>ScrollTrigger.refresh(),550);
  });
})();

/* ---------- MAGNETIC + TILT (fine pointers only) ---------- */
if(finePointer){
document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove',e=>{const r=el.getBoundingClientRect();
    gsap.to(el,{x:(e.clientX-r.left-r.width/2)*.25,y:(e.clientY-r.top-r.height/2)*.25,duration:.4});});
  el.addEventListener('mouseleave',()=>gsap.to(el,{x:0,y:0,duration:.5,ease:'elastic.out(1,.4)'}));
});
document.querySelectorAll('[data-tilt]').forEach(card=>{
  card.addEventListener('mousemove',e=>{const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) translateY(-4px)`;});
  card.addEventListener('mouseleave',()=>card.style.transform='perspective(900px) rotateY(0) rotateX(0)');
});
}

/* ---------- HERO LOOK SWITCHER ---------- */
const LOOKS=[
  {img:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-47_8124731f-0add-4158-8be2-49820bdac515.jpg?v=1759965061&width=1000',name:'THUNDER WAVE — PINK',short:'THUNDER WAVE',look:'01',pid:'thunder-pink'},
  {img:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-36.jpg?v=1759965888&width=1000',name:'THUNDER WAVE — NEON BLUE',short:'THUNDER WAVE',look:'02',pid:'thunder-blue'},
  {img:'https://aureliusathletics.com/cdn/shop/files/20251006SSM-04.jpg?v=1760169787&width=1000',name:'ECLIPSE — RED / BLACK',short:'ECLIPSE',look:'03',pid:'eclipse-red'},
];
LOOKS.forEach(l=>{const im=new Image();im.src=l.img;});
let curLook=1;
function setLook(i){
  i=(i+LOOKS.length)%LOOKS.length; if(i===curLook) return; curLook=i;
  document.querySelectorAll('.fig-thumbs [data-look]').forEach(b=>b.classList.toggle('active',+b.dataset.look===i));
  gsap.to('#heroImg',{opacity:0,duration:.22,ease:'power2.in',onComplete:()=>{
    document.getElementById('heroImg').src=LOOKS[i].img;
    document.getElementById('archTop').textContent=LOOKS[i].name;
    document.getElementById('lookNum').textContent=LOOKS[i].look;
    document.getElementById('lookName').textContent=LOOKS[i].short;
    document.getElementById('archPrice').dataset.pid=LOOKS[i].pid;
    document.querySelector('.fig-num').textContent=LOOKS[i].look;
    gsap.to('#heroImg',{opacity:1,duration:.5,ease:'power2.out'});
  }});
}
const thumbsBox=document.querySelector('.fig-thumbs');
/* arrows live in HTML (robust without JS injection); delegation below handles clicks */
document.addEventListener('click',e=>{
  const t=e.target.closest('.fig-thumbs [data-look]');
  if(t){setLook(+t.dataset.look);return;}
  const st=e.target.closest('.fig-thumbs [data-step]');
  if(st){setLook(curLook+parseInt(st.dataset.step,10));}
});

/* hero price jumps to the exact product card */
function flashShop(pid){
  const prod=PRODUCTS.find(p=>p.id===pid); if(!prod) return;
  document.querySelectorAll('#filters button').forEach(x=>x.classList.toggle('active',x.dataset.filter===prod.cat));
  renderProducts(prod.cat,true);
  const shop=document.getElementById('shop');
  if(lenis) lenis.scrollTo(shop,{offset:-96,duration:1.4}); else shop.scrollIntoView({behavior:'smooth'});
  setTimeout(()=>{
    const card=document.querySelector('.product[data-id="'+pid+'"]');
    if(card){card.classList.add('flash');setTimeout(()=>card.classList.remove('flash'),3000);}
  },900);
}
document.getElementById('archPrice').addEventListener('click',()=>flashShop(document.getElementById('archPrice').dataset.pid));

document.getElementById('toTop').onclick=e=>{e.preventDefault();if(lenis)lenis.scrollTo(0,{duration:1.4});else scrollTo({top:0,behavior:'smooth'});};
renderCart();
