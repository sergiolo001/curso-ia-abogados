/* =====================================================================
   DESCARGA DE LA PRESENTACIÓN AL TERMINAR LA ACTIVIDAD
   Al entregar, aparece un botón para descargar materiales/modulo-N.pdf
   (N = número de la actividad). Si el PDF todavía no está subido,
   el botón no aparece. Para agregar un módulo, solo sube su PDF a la
   carpeta materiales/ con el nombre modulo-2.pdf, modulo-3.pdf, etc.
   ===================================================================== */
(function(){
  const m = location.pathname.match(/actividad-(\d+)/); if(!m) return;
  const n = m[1], url = '../materiales/modulo-' + n + '.pdf';
  const TITULOS = {
    '1':'Uso responsable de IA en el ejercicio jurídico',
    '2':'Ingeniería de prompts jurídicos',
    '3':'Redacción y revisión contractual',
    '4':'Análisis de expedientes y documentación voluminosa'
  };
  const st = document.createElement('style');
  st.textContent = '.mat-dl{display:inline-flex;align-items:center;gap:10px;margin-top:14px;min-height:46px;padding:11px 18px;border-radius:10px;background:var(--cyan,#14B8D8);color:var(--navy,#0B2747) !important;text-decoration:none;font-weight:900;font-size:15px}.mat-dl:hover{background:#3FC9E4}.mat-dl small{display:block;font-weight:400;font-size:12px}';
  document.head.appendChild(st);
  let existe = null;
  fetch(url, {method:'HEAD', cache:'no-store'}).then(r => { existe = r.ok; }).catch(() => { existe = false; });
  const t = setInterval(() => {
    const res = document.getElementById('scrResult'), send = document.getElementById('sendStatus');
    if (!res || !send || res.classList.contains('hidden') || existe === null) return;
    clearInterval(t);
    if (!existe || document.querySelector('.mat-dl')) return;
    const a = document.createElement('a');
    a.className = 'mat-dl'; a.href = url;
    a.setAttribute('download', 'Modulo-' + n + '-IA-generativa-derecho.pdf');
    a.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></svg><span>Descargar la presentación del Módulo ' + n + '<small>PDF · ' + (TITULOS[n] || '') + '</small></span>';
    send.insertAdjacentElement('afterend', a);
  }, 600);
})();
