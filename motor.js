/* =====================================================================
   MOTOR DE ACTIVIDADES DE CLASIFICACIÓN (Actividades 3 y 4)
   Cada página define window.ACT con su contenido y carga este archivo.
   Incluye: candado por horario, nombre del estudiante, clasificación,
   corrección con explicaciones, envío de la nota y botón de dudas.
   ===================================================================== */
(function(){
  const A = window.ACT; if(!A) return;
  const CURSO = 'IA generativa para profesionales del derecho';
  const SHEETS_URL = (window.CURSO_CONFIG||{}).SHEETS_URL || '';
  const KEY = 'curso-' + A.id + '-v1';
  const OPT = Object.fromEntries(A.opciones.map(o=>[o.k,o]));
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- Estilos ---------- */
  const css = `
  .hidden{display:none !important}
  .topbar{position:sticky;top:0;z-index:20;background:var(--paper)}
  .topbar-in{max-width:1280px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;gap:16px;flex-wrap:wrap}
  .back{display:inline-flex;align-items:center;justify-content:center;width:40px;height:40px;border-radius:8px;border:1px solid var(--line);color:var(--ink);text-decoration:none;font-size:18px}
  .brand{font-weight:700;font-size:15px}.brand small{display:block;font-weight:400;color:var(--ink-3);font-size:12px}
  .spacer{flex:1}
  .pill{display:inline-flex;align-items:center;border:1px solid var(--line);border-radius:999px;padding:4px 12px;font-size:14px;color:var(--ink-2);background:var(--paper)}
  .btn{border:1px solid var(--line);background:var(--paper);color:var(--ink);border-radius:8px;padding:10px 18px;font:inherit;font-weight:700;min-height:44px;cursor:pointer}
  .btn-primary{color:#fff}
  main.m{max-width:1280px;margin:0 auto;padding:24px 16px 40px}
  .intro{max-width:780px;margin:24px auto;background:var(--paper);border:1px solid var(--line);padding:36px}
  @media (max-width:600px){.intro{padding:24px 20px}}
  .kicker{font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase}
  .intro h1{font-size:34px;margin:8px 0 12px;line-height:1.15}
  .intro p,.intro li{color:var(--ink-2)}
  .intro ol{padding-left:20px}
  .legend{display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:8px;margin:14px 0 18px}
  .legend div{border-radius:8px;padding:9px 12px;font-size:13px;color:var(--ink-2)}
  .legend b{display:block;font-size:14px}
  .field{display:flex;flex-direction:column;gap:6px;margin:20px 0 8px}
  .field label{font-weight:700;font-size:14px}
  .field input{font:inherit;padding:12px 14px;border:1px solid var(--line);border-radius:8px;min-height:44px}
  .field input:focus{outline:2px solid var(--cyan);outline-offset:1px}
  .err{color:var(--red);font-size:14px;min-height:20px}
  .work{display:grid;grid-template-columns:minmax(0,5fr) minmax(0,6fr);gap:24px;align-items:start}
  @media (max-width:980px){.work{grid-template-columns:1fr}.ctx{position:static !important;max-height:none !important}}
  .ctx{position:sticky;top:84px;max-height:calc(100vh - 100px);overflow:auto;background:var(--paper);border:1px solid var(--line);border-radius:12px;padding:22px}
  .ctx h2{margin:0 0 6px;font-size:18px}
  .ctx .sub{color:var(--ink-3);font-size:14px;margin:0 0 14px}
  .doc{border:1px solid var(--line);border-radius:10px;padding:14px 16px;margin:0 0 12px;background:#FBFCFE}
  .doc h3{margin:0 0 6px;font-size:13px;text-transform:uppercase;letter-spacing:.05em;color:var(--cyan)}
  .doc p{margin:0 0 6px;font-family:"Source Serif 4",Georgia,serif;font-size:15px;line-height:1.6;color:#1a2533}
  .doc p:last-child{margin:0}
  .items{display:flex;flex-direction:column;gap:14px}
  .items-h{display:flex;justify-content:space-between;align-items:baseline;gap:8px;flex-wrap:wrap}
  .items-h h2{margin:0;font-size:18px}
  .items-h p{margin:0;color:var(--ink-3);font-size:14px}
  .it{background:var(--paper);border:1px solid var(--line);border-left:4px solid var(--line);border-radius:12px;padding:16px 18px;margin:0}
  .it.done{border-left-color:var(--cyan)}
  .it legend{padding:0;font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-3);margin-bottom:6px}
  .it .t{font-family:"Source Serif 4",Georgia,serif;font-size:16px;line-height:1.6;margin:0 0 12px;color:#1a2533}
  .opts{display:flex;flex-wrap:wrap;gap:8px}
  .opt{position:relative}
  .opt input{position:absolute;opacity:0;width:1px;height:1px}
  .opt span{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:8px 14px;border:1.5px solid var(--line);border-radius:999px;font-size:14px;font-weight:700;color:var(--ink-2);background:#fff;cursor:pointer;user-select:none}
  .opt span::before{content:"";width:10px;height:10px;border-radius:50%;border:2px solid currentColor;opacity:.5}
  .opt input:focus-visible + span{outline:3px solid var(--cyan);outline-offset:2px}
  .opt input:checked + span{color:#fff;border-color:transparent}
  .opt input:checked + span::before{background:#fff;border-color:#fff;opacity:1}
  .modal-bg{position:fixed;inset:0;background:rgba(11,39,71,.5);z-index:60;display:flex;align-items:center;justify-content:center;padding:16px}
  .modal{background:var(--paper);max-width:440px;width:100%;padding:24px}
  .modal h3{margin:0 0 8px}.modal p{color:var(--ink-2);margin:0 0 18px}
  .modal .acts{display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap}
  .score-head{display:grid;grid-template-columns:auto 1fr;gap:28px;align-items:center;background:var(--paper);border:1px solid var(--line);padding:24px 28px;margin-bottom:20px}
  @media (max-width:700px){.score-head{grid-template-columns:1fr}}
  .score{font-size:72px;line-height:1}.score small{font-size:24px;color:var(--ink-3)}
  .score-head h2{margin:0 0 4px;font-size:22px}
  .stats{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
  .stat{border-radius:8px;padding:8px 12px;font-size:13px;font-weight:700}.stat b{font-size:18px;display:block}
  .send{font-size:13px;color:var(--ink-3);margin-top:10px}.send.ok{color:var(--green)}.send.bad{color:var(--red)}
  .filter{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:12px}
  .filter button{border:1px solid var(--line);background:var(--paper);border-radius:6px;padding:6px 12px;font:inherit;font-size:14px;min-height:40px;cursor:pointer;color:var(--ink)}
  .filter button[aria-pressed="true"]{border-color:var(--navy);font-weight:700}
  .res-list{display:grid;grid-template-columns:repeat(auto-fill,minmax(480px,1fr));gap:16px}
  @media (max-width:560px){.res-list{grid-template-columns:1fr}}
  .res{background:var(--paper);border:1px solid var(--line);border-top:5px solid;padding:16px 18px}
  .res.hit{border-top-color:var(--green)}.res.miss{border-top-color:var(--red)}
  .res .h{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:8px}
  .res .st{font-size:12px;font-weight:700;border-radius:4px;padding:2px 8px;text-transform:uppercase;letter-spacing:.05em}
  .res.hit .st{background:var(--green-soft);color:var(--green)}.res.miss .st{background:var(--red-soft);color:var(--red)}
  .res .ref{font-size:12px;font-weight:700;color:var(--ink-3);text-transform:uppercase;letter-spacing:.05em}
  .res .q{font-family:"Source Serif 4",Georgia,serif;font-size:15px;background:var(--ground);border-radius:8px;padding:10px 12px;margin:6px 0 10px;line-height:1.55}
  .res .ans{font-size:14px;color:var(--ink-2);margin-bottom:8px}
  .tag{display:inline-block;border-radius:999px;padding:1px 10px;font-size:13px;font-weight:700;color:#fff}
  .res .why{margin:0 0 10px;font-size:15px}
  .sug{border-left:3px solid var(--green);background:var(--green-soft);border-radius:0 8px 8px 0;padding:10px 12px;font-size:14px}
  .sug b{display:block;font-size:12px;color:var(--green);text-transform:uppercase;letter-spacing:.05em;margin-bottom:4px}
  .lock{position:fixed;inset:0;z-index:1000;background:var(--ground);display:flex;align-items:center;justify-content:center;padding:16px;border-top:6px solid var(--cyan)}
  .lock-box{background:var(--paper);border:1px solid var(--line);max-width:520px;width:100%;padding:36px 32px;text-align:center}
  .lock-ico{width:64px;height:64px;border-radius:50%;background:var(--cyan-soft);color:var(--navy);display:inline-flex;align-items:center;justify-content:center;margin-bottom:16px}
  .lock-box h1{font-size:28px;margin:0 0 8px;line-height:1.2}.lock-box p{color:var(--ink-2);margin:0 0 8px}
  .lock-when{font-weight:700;color:var(--navy) !important;font-size:18px;margin:14px 0 4px !important}
  .lock-left{font-size:14px;color:var(--ink-3) !important;margin-bottom:24px !important}
  .lock-box a{display:inline-flex;align-items:center;justify-content:center;min-height:44px;padding:10px 18px;border-radius:8px;background:var(--navy);color:#fff;text-decoration:none;font-weight:700}
  body.locked{overflow:hidden}`;
  const st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);
  const color = k => 'var(--'+OPT[k].c+')', soft = k => 'var(--'+OPT[k].c+'-soft)';

  /* ---------- Estructura ---------- */
  const LOCK_SVG='<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
  document.body.insertAdjacentHTML('afterbegin', `
  <div class="lock" id="lock" role="dialog" aria-modal="true" aria-labelledby="lockT"><div class="lock-box">
    <span class="lock-ico">${LOCK_SVG}</span><h1 id="lockT">${esc(A.corto)} todavía cerrada</h1>
    <p id="lockMsg">Verificando el horario de apertura...</p><p class="lock-when" id="lockWhen"></p><p class="lock-left" id="lockLeft"></p>
    <a href="../">Volver a la portada del curso</a></div></div>
  <header class="topbar"><div class="topbar-in">
    <a class="back" href="../" aria-label="Volver a la portada del curso">&larr;</a>
    <div class="brand">${esc(A.titulo)}<small>${esc(CURSO)} · ${esc(A.actividad)}</small></div>
    <div class="spacer"></div>
    <span class="pill hidden" id="whoPill"></span><span class="pill hidden" id="countPill"></span>
    <button class="btn btn-primary hidden" id="submitBtn" type="button">Entregar</button>
  </div></header>
  <main class="m">
    <section id="scrStart" class="intro">
      <div class="kicker">${esc(A.actividad)}</div>
      <h1>${esc(A.pregunta)}</h1>
      ${A.intro}
      <ol>${A.pasos.map(p=>'<li>'+p+'</li>').join('')}</ol>
      <div class="legend">${A.opciones.map(o=>`<div style="background:${soft(o.k)}"><b style="color:${color(o.k)}">${esc(o.label)}</b>${esc(o.desc)}</div>`).join('')}</div>
      <div class="field"><label for="nameInput">Nombre completo</label><input id="nameInput" autocomplete="name" placeholder="Ej.: Ana Pérez Gutiérrez"></div>
      <div class="err" id="nameErr" role="alert"></div>
      <button class="btn btn-primary" id="startBtn" type="button">Comenzar actividad</button>
    </section>
    <section id="scrWork" class="work hidden">
      <aside class="ctx" aria-label="${esc(A.contexto.titulo)}"><h2>${esc(A.contexto.titulo)}</h2><p class="sub">${A.contexto.sub}</p>${A.contexto.html}</aside>
      <div>
        <div class="items-h"><h2>${esc(A.itemsTitulo)}</h2><p>Elige una opción en cada una.</p></div>
        <div class="items" id="items" style="margin-top:12px"></div>
      </div>
    </section>
    <section id="scrResult" class="hidden">
      <div class="score-head"><div class="score" id="scoreNum"></div><div><h2 id="scoreTitle"></h2><div id="scoreMsg" style="color:var(--ink-2)"></div><div class="stats" id="stats"></div><div class="send" id="sendStatus"></div></div></div>
      <div class="filter" id="filter"></div><div class="res-list" id="resList"></div>
    </section>
  </main>
  <footer class="pie-curso"><span><b>${esc(CURSO)}</b> · Docente: Sergio Alcázar</span><span>${esc(A.pie||'Casos y documentos ficticios con fines educativos.')}</span></footer>
  <div class="modal-bg hidden" id="modal"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="modalT"><h3 id="modalT"></h3><p id="modalP"></p><div class="acts" id="modalA"></div></div></div>`);
  const $ = id => document.getElementById(id);

  /* ---------- Candado ---------- */
  (function(){
    document.body.classList.add('locked');
    const lock=$('lock');
    function abrir(){ lock.remove(); document.body.classList.remove('locked'); }
    if(!window.CursoHorario){ abrir(); return; }
    CursoHorario.sincronizar().then(function revisar(){
      if(!CursoHorario.bloqueada(A.id)){ abrir(); return; }
      $('lockMsg').textContent='Esta actividad se habilita el';
      $('lockWhen').textContent=CursoHorario.textoApertura(A.id);
      $('lockLeft').textContent='Faltan '+CursoHorario.faltan(A.id)+'. La página se abrirá sola cuando llegue la hora.';
      setTimeout(revisar,30000);
    });
  })();

  /* ---------- Estado ---------- */
  let state={name:'',started:0,ans:{},submitted:null,attempts:0};
  function save(){ try{ localStorage.setItem(KEY, JSON.stringify(state)); }catch(e){} }
  try{ const s=JSON.parse(localStorage.getItem(KEY)||'null'); if(s&&typeof s==='object') state=Object.assign(state,s); }catch(e){}

  /* ---------- Trabajo ---------- */
  function renderItems(){
    const box=$('items'); box.innerHTML='';
    A.items.forEach((it,i)=>{
      const f=document.createElement('fieldset'); f.className='it'+(state.ans[it.id]?' done':'');
      f.innerHTML=`<legend>${esc(it.ref)}</legend><p class="t">${esc(it.text)}</p><div class="opts">${A.opciones.map(o=>`<label class="opt"><input type="radio" name="${it.id}" value="${o.k}"${state.ans[it.id]===o.k?' checked':''}><span>${esc(o.label)}</span></label>`).join('')}</div>`;
      f.querySelectorAll('input').forEach(inp=>{
        const sp=inp.nextElementSibling; const paint=()=>{ sp.style.background=inp.checked?color(inp.value):''; sp.style.color=inp.checked?'#fff':color(inp.value); };
        paint();
        inp.addEventListener('change',()=>{ state.ans[it.id]=inp.value; save(); f.classList.add('done'); f.querySelectorAll('input').forEach(x=>{ const s2=x.nextElementSibling; s2.style.background=x.checked?color(x.value):''; s2.style.color=x.checked?'#fff':color(x.value); }); count(); });
      });
      box.appendChild(f);
    });
    count();
  }
  function count(){ const n=A.items.filter(it=>state.ans[it.id]).length; $('countPill').textContent=n+' de '+A.items.length+' respondidas'; }

  function modal(title,text,actions){
    $('modalT').textContent=title; $('modalP').textContent=text; const a=$('modalA'); a.innerHTML='';
    actions.forEach(([l,p,fn])=>{ const b=document.createElement('button'); b.type='button'; b.className='btn'+(p?' btn-primary':''); b.textContent=l; b.onclick=()=>{ $('modal').classList.add('hidden'); fn&&fn(); }; a.appendChild(b); });
    $('modal').classList.remove('hidden'); a.lastChild.focus();
  }

  /* ---------- Calificación ---------- */
  function grade(){
    const res=A.items.map(it=>({it, ans:state.ans[it.id], hit:it.ok.includes(state.ans[it.id])}));
    const hits=res.filter(r=>r.hit).length;
    return {res,hits,total:res.length,score:Math.round(hits/res.length*100)};
  }
  let G=null, mode='errores';
  function showResults(g){
    G=g;
    ['scrStart','scrWork','submitBtn','countPill'].forEach(id=>$(id).classList.add('hidden'));
    $('scrResult').classList.remove('hidden'); $('whoPill').textContent=state.name; $('whoPill').classList.remove('hidden');
    const first=state.name.split(' ')[0];
    $('scoreNum').innerHTML=g.score+'<small>/100</small>';
    $('scoreTitle').textContent= g.score>=90?'Excelente criterio, '+first : g.score>=70?'Buen trabajo, '+first+', revisa tus errores':'Repasemos juntos, '+first;
    $('scoreMsg').textContent='Acertaste '+g.hits+' de '+g.total+'. '+(A.resultadoTip||'');
    $('stats').innerHTML=[['Aciertos',g.hits+'/'+g.total,'green'],['Errores',g.total-g.hits,'red']].concat(
      A.opciones.map(o=>{ const tot=A.items.filter(it=>it.ok[0]===o.k); const ok=tot.filter(it=>state.ans[it.id]&&it.ok.includes(state.ans[it.id])).length; return [o.label, ok+'/'+tot.length, o.c]; }))
      .map(([l,v,c])=>`<div class="stat" style="background:var(--${c}-soft);color:var(--${c})"><b>${v}</b>${esc(l)}</div>`).join('');
    renderRes(); window.scrollTo({top:0,behavior:'smooth'});
  }
  function renderRes(){
    const f=$('filter'); f.innerHTML=[['errores','Mis errores'],['todos','Todos']].map(([k,l])=>`<button type="button" aria-pressed="${mode===k}" data-f="${k}">${l}</button>`).join('');
    f.querySelectorAll('button').forEach(b=>b.onclick=()=>{ mode=b.dataset.f; renderRes(); });
    const list=G.res.filter(r=>mode==='todos'||!r.hit); const box=$('resList'); box.innerHTML='';
    if(!list.length){ box.innerHTML='<div class="res hit"><p class="why" style="margin:0">No tienes errores. Mira "Todos" para leer las explicaciones.</p></div>'; return; }
    list.forEach(r=>{
      const it=r.it, d=document.createElement('article'); d.className='res '+(r.hit?'hit':'miss');
      const tag=k=>k?`<span class="tag" style="background:${color(k)}">${esc(OPT[k].label)}</span>`:'<b>sin respuesta</b>';
      d.innerHTML=`<div class="h"><span class="st">${r.hit?'Correcto':'Incorrecto'}</span><span class="ref">${esc(it.ref)}</span></div>
        <div class="q">${esc(it.text)}</div>
        <div class="ans">Tu respuesta: ${tag(r.ans)} · Correcta: ${it.ok.map(tag).join(' o ')}</div>
        <p class="why">${esc(it.e)}</p>${it.s?`<div class="sug"><b>${esc(A.sugLabel||'Sugerencia')}</b>${esc(it.s)}</div>`:''}`;
      box.appendChild(d);
    });
  }
  async function send(g){
    const st=$('sendStatus');
    if(!SHEETS_URL){ st.textContent='Registro de notas no configurado: muestra esta pantalla a tu docente.'; return; }
    st.textContent='Enviando tu resultado al docente...';
    try{
      await fetch(SHEETS_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify({hoja:A.hoja,datos:{
        'Nombre':state.name,'Nota (/100)':g.score,'Intento':state.attempts,'Minutos':Math.round((Date.now()-state.started)/60000),
        'Aciertos':g.hits,'Total':g.total,'Fallados':g.res.filter(r=>!r.hit).map(r=>r.it.ref).join(' | '),'Navegador':navigator.userAgent.slice(0,120)}})});
      st.className='send ok'; st.textContent='Resultado enviado al docente.';
    }catch(e){ st.className='send bad'; st.textContent='No se pudo enviar el resultado. Toma una captura de esta pantalla y envíala a tu docente.'; }
  }

  /* ---------- Flujo ---------- */
  if(state.name) $('nameInput').value=state.name;
  $('startBtn').onclick=()=>{
    const n=$('nameInput').value.trim().replace(/\s+/g,' ');
    if(n.split(' ').length<2){ $('nameErr').textContent='Escribe tu nombre y al menos un apellido, para que tu docente pueda identificar tu entrega.'; $('nameInput').focus(); return; }
    if(state.name!==n){ state.ans={}; state.submitted=null; }
    state.name=n; state.started=state.started||Date.now(); save();
    $('scrStart').classList.add('hidden'); $('scrWork').classList.remove('hidden');
    $('whoPill').textContent=n; ['whoPill','countPill','submitBtn'].forEach(id=>$(id).classList.remove('hidden'));
    renderItems(); window.scrollTo(0,0);
  };
  $('nameInput').addEventListener('keydown',e=>{ if(e.key==='Enter') $('startBtn').click(); });
  $('submitBtn').onclick=()=>{
    const left=A.items.filter(it=>!state.ans[it.id]);
    if(left.length){ modal('Te faltan '+left.length+(left.length===1?' respuesta':' respuestas'),'Responde todas antes de entregar. La primera pendiente es: '+left[0].ref+'.',[['Ir a la pendiente',true,()=>{ const el=document.querySelector('input[name="'+left[0].id+'"]'); el&&el.closest('fieldset').scrollIntoView({behavior:'smooth',block:'center'}); }]]); return; }
    modal('¿Entregar la actividad?','Después de entregar verás la corrección y ya no podrás cambiar tus respuestas.',[['Seguir revisando',false],['Entregar',true,()=>{ state.attempts=(state.attempts||0)+1; const g=grade(); state.submitted={score:g.score}; save(); showResults(g); send(g); }]]);
  };
  if(state.name && state.submitted){ showResults(grade()); $('sendStatus').textContent='Esta actividad ya fue entregada desde este navegador.'; }
})();
