/* ═══════════════════════════════════════════════════════════
   محرّك صفحة اليوم المؤرشف — يُستدعى من كل day-XX.html
   يقرأ نفس ملفات البيانات التي تستخدمها الصفحة المباشرة:
     ../content/camp-days.json      (رقم/تاريخ كل يوم)
     ../content/days-content.json   (أبرز اللحظات، الإعلانات، الطلاب، إلخ)
   لا حاجة لتعديل هذا الملف عند إضافة يوم جديد — فقط أضيفي
   يوم جديد إلى content/days-content.json وأنشئي day-XX.html
   بنفس القالب (انظر days/day-template.html).
═══════════════════════════════════════════════════════════ */
const AR_DAYNAMES=["الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة","السبت"];
const AR_MONTHS=["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
const AR_ORD=["","الأول","الثاني","الثالث","الرابع","الخامس","السادس","السابع","الثامن","التاسع","العاشر","الحادي عشر","الثاني عشر","الثالث عشر","الرابع عشر","الخامس عشر"];
const GRP_LABELS={
  girls_13:"بنات · ١٣–١٤ سنة", girls_15:"بنات · ١٥–١٧ سنة",
  boys_13:"أولاد · ١٣–١٤ سنة", boys_15:"أولاد · ١٥–١٧ سنة"
};
const TAG_LABEL={session:"حصة",activity:"نشاط",break:"استراحة",ceremony:"",challenge:"تحدٍّ",expert:"خبير",trip:"رحلة"};
const esc = s => String(s==null?'':s);

async function loadJSON(path){
  const res = await fetch(path+'?t='+Date.now(), {cache:'no-store'});
  if(!res.ok) throw new Error('fetch failed: '+path);
  return res.json();
}

async function renderDayPage(dayNum){
  const root = document.getElementById('dayRoot');
  let camp, content;
  try{
    [camp, content] = await Promise.all([
      loadJSON('../content/camp-days.json'),
      loadJSON('../content/days-content.json')
    ]);
  }catch(e){ showMissing(root); return; }

  const day = camp && camp.days ? camp.days.find(d=>d.n===dayNum) : null;
  if(!day){ showMissing(root); return; }

  const dt = new Date(day.date+'T00:00:00');
  const today = new Date(); today.setHours(0,0,0,0);
  if(dt.getTime() >= today.getTime()){
    // اليوم لم ينتهِ بعد — لا يُعرض كأرشيف
    showMissing(root, true);
    return;
  }

  const c = (content && content[day.date]) || {};
  document.title = `اليوم ${AR_ORD[day.n]||day.n} · أرشيف المخيم 2026`;

  const dateStr = `${AR_DAYNAMES[dt.getDay()]} · ${dt.getDate()} ${AR_MONTHS[dt.getMonth()]} ${dt.getFullYear()}`;
  const nn = String(day.n).padStart(2,'0');

  let html = `
  <header class="top">
    <div class="wrap">
      <div class="top-nav">
        <a href="index.html">← أرشيف الأيام</a>
        <a href="../index.html">اليوم المباشر ←</a>
      </div>
      <div class="finished-badge">✔ يوم منتهٍ</div>
      <h1>اليوم <span class="num en">${nn}</span> — ${AR_ORD[day.n]||day.n}</h1>
      <p class="meta">${dateStr}${day.weekAr?' · '+esc(day.weekAr):''}</p>
    </div>
  </header>`;

  html += renderHighlights(c);
  html += renderAttendance(c);
  html += renderSchedule(c);
  html += renderTip(c);
  html += renderGallery(c);
  html += renderFeedback(c);
  html += renderAnnouncements(c);

  html += `<footer>© 2026 المخيم الشبابي للأمن السيبراني — أرشيف اليوم ${nn}</footer>`;

  root.innerHTML = html;
  initLightbox(c);
}

function sectionShell(num, title, sub, inner){
  return `<section class="wrap">
    <div class="sec-head">
      <h2 class="sec-title">${title}${sub?`<span class="sub">${sub}</span>`:''}</h2>
      <span class="sec-line"></span>
    </div>
    ${inner}
  </section>`;
}

function renderHighlights(c){
  const list = c.highlights || [];
  if(!list.length) return '';
  const cards = list.map(h=>{
    const title = h.titleAr || h.title || '';
    const text = h.textAr || h.text || '';
    const media = h.image ? `<img src="${esc(h.image)}" alt="${esc(title)}" onerror="this.style.display='none'">` : '';
    return `<article class="hl">
      <div class="hl-media">${h.tag?`<span class="tag">${esc(h.tag)}</span>`:''}${media}</div>
      <div class="hl-body"><h3>${esc(title)}</h3><p>${esc(text)}</p></div>
    </article>`;
  }).join('');
  return sectionShell(1,'أبرز لحظات اليوم','', `<div class="hl-grid">${cards}</div>`);
}

function renderAttendance(c){
  const a = c.attendance;
  if(!a || ((+a.girls||0)===0 && (+a.boys||0)===0)) return '';
  const girls = +a.girls||0, boys = +a.boys||0, total = girls+boys;
  const inner = `<div class="att-stats">
    <div class="att-stat"><div class="n en">${girls}</div><div class="l">بنات</div></div>
    <div class="att-stat"><div class="n en">${boys}</div><div class="l">أولاد</div></div>
    <div class="att-stat"><div class="n en">${total}</div><div class="l">الإجمالي</div></div>
  </div>`;
  return sectionShell(0,'الحضور','', inner);
}

function renderSchedule(c){
  const sch = c.schedule; if(!sch) return '';
  const groups = ['girls_13','girls_15','boys_13','boys_15'].filter(k=>Array.isArray(sch[k]) && sch[k].length);
  if(!groups.length) return '';
  const blocks = groups.map(k=>{
    const rows = sch[k].map(s=>{
      const tag = TAG_LABEL[s.type]||'';
      return `<div class="sess">
        <span class="time en">${esc(s.time)}</span>
        ${tag?`<span class="tag">${tag}</span>`:'<span></span>'}
        <span class="ttl">${esc(s.title)}</span>
      </div>`;
    }).join('');
    return `<div class="grp-block"><h4>${GRP_LABELS[k]}</h4><div class="sess-list">${rows}</div></div>`;
  }).join('');
  return sectionShell(2,'جدول اليوم كاملاً','بجميع المجموعات', blocks);
}

function renderTip(c){
  const t = c.tip;
  const text = (t && (t.textAr||t.text)) || '';
  if(!text) return '';
  const lines = String(text).split(/\r?\n/).map(l=>l.trim().replace(/^-+\s*/,'')).filter(Boolean);
  const body = lines.length>1
    ? `<ul class="tip-list">${lines.map(l=>`<li>${esc(l)}</li>`).join('')}</ul>`
    : `<p>${esc(lines[0]||text)}</p>`;
  const inner = `<div class="tip-box"><img src="../images/robot01.png" alt="روبوت المعلومة"><div>${body}</div></div>`;
  return sectionShell(3.5,'معلومة اليوم','', inner);
}

function renderGallery(c){
  const photos = (c.gallery||[]).filter(p=>p && p.src);
  const inner = photos.length
    ? `<div class="gal" id="galGrid">${photos.map((p,i)=>`
        <figure class="${i===0?'feat':''}" data-i="${i}">
          <img src="${esc(p.src)}" alt="${esc(p.captionAr||p.caption||'')}" loading="lazy" onerror="this.closest('figure').style.display='none'">
        </figure>`).join('')}</div>
       <div class="lightbox" id="lightbox"><button class="lb-close" id="lbClose">✕</button><img id="lbImg" src="" alt=""></div>`
    : `<div class="gal-empty">📸 لم تُرفع صور لهذا اليوم</div>`;
  return sectionShell(3,'ألبوم اليوم','', inner);
}

function renderFeedback(c){
  const f = c.feedback; if(!f || !f.quoteAr) return '';
  const stars = '★'.repeat(Math.min(Math.max(f.stars||5,1),5));
  const inner = `<div class="fb">
    <div class="fb-photo">${f.photo?`<img src="${esc(f.photo)}" alt="" onerror="this.parentElement.style.display='none'">`:''}</div>
    <div><div class="stars">${stars}</div><p class="q">${esc(f.quoteAr)}</p><div class="who">${esc(f.studentAr||'')}</div></div>
  </div>`;
  return sectionShell(5,'رأي الطلاب','', inner);
}

function renderAnnouncements(c){
  const list = c.announcements || [];
  if(!list.length) return '';
  const rows = list.map(a=>{
    const title = a.titleAr || a.title || '';
    const text = a.textAr || a.text || '';
    return `<div class="note">
    <div class="ico">${esc(a.icon||'📢')}</div>
    <div><h4>${esc(title)}</h4><p>${esc(text)}</p></div>
  </div>`;
  }).join('');
  return sectionShell(6,'إعلانات ذلك اليوم','', `<div class="ann">${rows}</div>`);
}

function initLightbox(c){
  const grid = document.getElementById('galGrid');
  const lb = document.getElementById('lightbox');
  if(!grid || !lb) return;
  const photos = (c.gallery||[]).filter(p=>p && p.src);
  grid.querySelectorAll('figure').forEach(f=>{
    f.addEventListener('click', ()=>{
      const p = photos[+f.dataset.i];
      document.getElementById('lbImg').src = p.src;
      lb.classList.add('open');
    });
  });
  document.getElementById('lbClose').addEventListener('click', ()=>lb.classList.remove('open'));
  lb.addEventListener('click', e=>{ if(e.target===lb) lb.classList.remove('open'); });
}

function showMissing(root, notYet){
  root.innerHTML = `<div class="wrap"><div class="miss">
    <div class="ico">${notYet?'⏳':'🗂️'}</div>
    <h2>${notYet?'هذا اليوم لم ينتهِ بعد':'لا توجد بيانات لهذا اليوم'}</h2>
    <p>${notYet?'ستتوفّر صفحة هذا اليوم في الأرشيف بعد انتهائه مساءً.':'تعذّر العثور على بيانات محفوظة لهذا اليوم في content/days-content.json.'}</p>
    <a href="index.html">العودة إلى أرشيف الأيام ←</a>
  </div></div>`;
}
