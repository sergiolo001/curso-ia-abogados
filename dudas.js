/* =====================================================================
   DUDAS PARA EL DOCENTE
   - En la portada: <div id="dudas-seccion"></div> muestra el formulario.
   - En las actividades: aparece un botón flotante "Tengo una duda".
   Las dudas llegan a la pestaña "Dudas" de la hoja de Google del curso
   (usa la misma SHEETS_URL de config.js).
   ===================================================================== */
(function(){
  const TEMAS = ['General del curso','Módulo 1 · Uso responsable de IA','Actividad 1 · Anonimización','Módulo 2 · Ingeniería de prompts','Actividad 2 · Buen prompt o mal prompt','Módulo 3 · Redacción y revisión contractual','Módulo 4 · Análisis de expedientes'];
  const AVISO = 'Las dudas se responderán al final de la clase.';
  const KEY = 'curso-ia-abogados-nombre';

  const css = `
  .dd-card{background:var(--paper,#fff);border:1px solid var(--line,#D5DAE0);border-radius:16px;padding:28px;color:var(--ink,#1B2430);font-family:inherit}
  .dd-head{display:flex;gap:14px;align-items:flex-start;margin-bottom:18px}
  .dd-ico{flex:none;width:44px;height:44px;border-radius:12px;background:var(--brand-soft,#E3ECF5);color:var(--brand,#1F4E79);display:inline-flex;align-items:center;justify-content:center}
  .dd-card h2{margin:0 0 4px;font-size:22px;line-height:1.2}
  .dd-card .dd-sub{margin:0;color:var(--ink-2,#4A5563);font-size:15px}
  .dd-aviso{display:flex;gap:10px;align-items:center;background:var(--brand-soft,#E3ECF5);color:var(--ink,#1B2430);border-radius:10px;padding:10px 14px;font-size:14px;font-weight:600;margin:0 0 18px}
  .dd-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  @media (max-width:640px){.dd-grid{grid-template-columns:1fr}.dd-card{padding:22px 18px}}
  .dd-f{display:flex;flex-direction:column;gap:6px}
  .dd-f.full{grid-column:1/-1}
  .dd-f label{font-size:14px;font-weight:600}
  .dd-f input,.dd-f select,.dd-f textarea{font:inherit;font-size:15px;padding:11px 12px;border:1px solid var(--line,#D5DAE0);border-radius:8px;background:#fff;color:inherit;min-height:44px;width:100%}
  .dd-f textarea{min-height:110px;resize:vertical}
  .dd-f input:focus,.dd-f select:focus,.dd-f textarea:focus{outline:2px solid var(--brand,#1F4E79);outline-offset:1px}
  .dd-act{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:14px}
  .dd-btn{border:0;background:var(--brand,#1F4E79);color:#fff;border-radius:8px;padding:11px 20px;font:inherit;font-weight:700;min-height:44px;cursor:pointer}
  .dd-btn:disabled{opacity:.6;cursor:wait}
  .dd-msg{font-size:14px}
  .dd-msg.ok{color:#2E7D46}.dd-msg.bad{color:#B42323}
  .dd-fab{position:fixed;left:20px;bottom:20px;z-index:900;display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;background:var(--brand,#1F4E79);color:#fff;font:inherit;font-weight:700;font-size:15px;padding:12px 18px;min-height:48px;box-shadow:0 8px 24px rgba(15,25,40,.25);cursor:pointer}
  .dd-modal{position:fixed;inset:0;z-index:950;background:rgba(15,22,32,.5);display:flex;align-items:center;justify-content:center;padding:16px}
  .dd-modal .dd-card{max-width:560px;width:100%;max-height:calc(100vh - 32px);overflow:auto;position:relative}
  .dd-x{position:absolute;top:12px;right:12px;width:40px;height:40px;border-radius:8px;border:1px solid var(--line,#D5DAE0);background:#fff;font-size:20px;line-height:1;cursor:pointer;color:inherit}
  @media print{.dd-fab{display:none}}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  const ICON = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M9.5 9.5a2.5 2.5 0 0 1 4.8 1c0 1.7-2.3 2-2.3 3.5"/><path d="M12 17h.01"/></svg>';
  const CLOCK = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
  let n = 0;

  function formHTML(temaDefecto){
    const id = 'dd' + (++n);
    return `
      <div class="dd-head"><span class="dd-ico">${ICON}</span><div><h2 id="${id}-t">¿Tienes una duda?</h2><p class="dd-sub">Escríbela aquí y le llegará a tu docente.</p></div></div>
      <p class="dd-aviso">${CLOCK}<span>${AVISO}</span></p>
      <form novalidate>
        <div class="dd-grid">
          <div class="dd-f"><label for="${id}-n">Nombre completo</label><input id="${id}-n" name="nombre" autocomplete="name" required></div>
          <div class="dd-f"><label for="${id}-s">Tema</label><select id="${id}-s" name="tema">${TEMAS.map(t => `<option${t===temaDefecto?' selected':''}>${esc(t)}</option>`).join('')}</select></div>
          <div class="dd-f full"><label for="${id}-d">Tu duda</label><textarea id="${id}-d" name="duda" maxlength="1500" required placeholder="Ej.: ¿Un número de expediente siempre debe anonimizarse?"></textarea></div>
        </div>
        <div class="dd-act"><button class="dd-btn" type="submit">Enviar duda</button><span class="dd-msg" role="status" aria-live="polite"></span></div>
      </form>`;
  }

  function wire(root){
    const f = root.querySelector('form'), msg = root.querySelector('.dd-msg'), btn = root.querySelector('.dd-btn');
    const nIn = f.elements.nombre;
    try { nIn.value = localStorage.getItem(KEY) || ''; } catch(e) {}
    f.addEventListener('submit', async e => {
      e.preventDefault();
      const nombre = nIn.value.trim().replace(/\s+/g,' '), duda = f.elements.duda.value.trim(), tema = f.elements.tema.value;
      if (nombre.split(' ').length < 2) { msg.className='dd-msg bad'; msg.textContent='Escribe tu nombre y al menos un apellido.'; nIn.focus(); return; }
      if (duda.length < 5) { msg.className='dd-msg bad'; msg.textContent='Escribe tu duda antes de enviarla.'; f.elements.duda.focus(); return; }
      try { localStorage.setItem(KEY, nombre); } catch(e) {}
      const url = (window.CURSO_CONFIG || {}).SHEETS_URL;
      if (!url) { msg.className='dd-msg bad'; msg.textContent='El registro de dudas no está configurado. Hazle la pregunta a tu docente en clase.'; return; }
      btn.disabled = true; msg.className='dd-msg'; msg.textContent='Enviando...';
      try {
        await fetch(url, {method:'POST', mode:'no-cors', headers:{'Content-Type':'text/plain;charset=utf-8'},
          body: JSON.stringify({hoja:'Dudas', datos:{'Nombre':nombre, 'Tema':tema, 'Duda':duda, 'Enviada desde':document.title, 'Estado':'Pendiente'}})});
        f.elements.duda.value = '';
        msg.className='dd-msg ok'; msg.textContent='Duda enviada. ' + AVISO;
      } catch(err) {
        msg.className='dd-msg bad'; msg.textContent='No se pudo enviar. Revisa tu conexión e inténtalo de nuevo.';
      } finally { btn.disabled = false; }
    });
  }

  function init(){
    const sec = document.getElementById('dudas-seccion');
    if (sec) { sec.classList.add('dd-card'); sec.innerHTML = formHTML(TEMAS[0]); sec.setAttribute('aria-labelledby', sec.querySelector('h2').id); wire(sec); return; }
    // Botón flotante en las actividades
    const tema = document.body.dataset.tema || TEMAS[0];
    const fab = document.createElement('button'); fab.type='button'; fab.className='dd-fab'; fab.innerHTML = ICON + 'Tengo una duda';
    document.body.appendChild(fab);
    let modal = null;
    function cerrar(){ if (modal) { modal.remove(); modal = null; fab.focus(); } }
    fab.addEventListener('click', () => {
      modal = document.createElement('div'); modal.className='dd-modal';
      modal.innerHTML = `<div class="dd-card" role="dialog" aria-modal="true"><button class="dd-x" type="button" aria-label="Cerrar">&times;</button>${formHTML(tema)}</div>`;
      document.body.appendChild(modal);
      const card = modal.querySelector('.dd-card'); card.setAttribute('aria-labelledby', card.querySelector('h2').id);
      wire(card);
      modal.querySelector('.dd-x').onclick = cerrar;
      modal.addEventListener('mousedown', e => { if (e.target === modal) cerrar(); });
      const nIn = card.querySelector('input[name=nombre]');
      (nIn.value ? card.querySelector('textarea') : nIn).focus();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrar(); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
