/* =====================================================================
   HORARIO DE APERTURA DE LAS ACTIVIDADES
   Cada actividad queda bloqueada hasta la fecha y hora indicadas
   (formato: AAAA-MM-DDTHH:MM:SS-04:00 = hora de Bolivia).
   Para abrir una actividad de inmediato, borra su línea o pon una fecha pasada.
   ===================================================================== */
window.CURSO_HORARIO = {
  'actividad-2': '2026-10-08T20:00:00-04:00',
  'actividad-3': '2026-10-13T20:00:00-04:00',
  'actividad-4': '2026-10-15T20:00:00-04:00',
};

/* ---- No hace falta tocar nada debajo de esta línea ---- */
(function(){
  // Usa la hora del servidor (GitHub) para que cambiar el reloj de la computadora no sirva de nada.
  let desfase = 0, listo = null;
  function sincronizar(){
    if (listo) return listo;
    listo = fetch(location.href.split('#')[0], {method:'HEAD', cache:'no-store'})
      .then(r => { const d = r.headers.get('Date'); if (d) { const t = Date.parse(d); if (!isNaN(t)) desfase = t - Date.now(); } })
      .catch(() => {});
    return listo;
  }
  function ahora(){ return Date.now() + desfase; }
  function apertura(id){ const s = (window.CURSO_HORARIO||{})[id]; return s ? Date.parse(s) : null; }
  function bloqueada(id){ const t = apertura(id); return !!t && ahora() < t; }
  function textoApertura(id){
    const t = apertura(id); if (!t) return '';
    const f = new Date(t);
    const opts = {timeZone:'America/La_Paz'};
    const dia = f.toLocaleDateString('es-BO', Object.assign({weekday:'long', day:'numeric', month:'long'}, opts));
    const hora = f.toLocaleTimeString('es-BO', Object.assign({hour:'2-digit', minute:'2-digit', hour12:false}, opts));
    return dia + ' a las ' + hora;
  }
  function faltan(id){
    const ms = Math.max(0, apertura(id) - ahora());
    const d = Math.floor(ms/86400000), h = Math.floor(ms%86400000/3600000), m = Math.ceil(ms%3600000/60000);
    if (d > 0) return d + (d===1?' día ':' días ') + h + (h===1?' hora':' horas');
    if (h > 0) return h + (h===1?' hora ':' horas ') + m + ' min';
    return m + ' min';
  }
  window.CursoHorario = { sincronizar, bloqueada, textoApertura, faltan };
})();
