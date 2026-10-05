/**
 * Registro de notas · Curso IA para abogados
 * Cada actividad escribe en su propia pestaña de esta hoja.
 * Pega este código en Extensiones > Apps Script y publícalo como
 * "Aplicación web" (ver README.md, paso 2).
 */

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents);
    const nombreHoja = String(d.hoja || 'Entregas').replace(/[\[\]\*\?\/\\:]/g, '').slice(0, 90);
    const datos = d.datos || {};
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(nombreHoja);
    if (!sh) sh = ss.insertSheet(nombreHoja);

    // Encabezados: se crean la primera vez y se agregan columnas nuevas si hacen falta.
    let headers = sh.getLastRow() === 0 ? [] : sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0];
    if (headers.length === 0) headers = ['Fecha y hora'];
    Object.keys(datos).forEach(function (k) { if (headers.indexOf(k) === -1) headers.push(k); });
    sh.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
    sh.setFrozenRows(1);

    const fila = headers.map(function (h) {
      if (h === 'Fecha y hora') return new Date();
      return limpiar(datos[h]);
    });
    sh.appendRow(fila);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput('El registro de notas está activo.');
}

// Números se guardan como números; textos que empiezan con = + - @ no se interpretan como fórmula.
function limpiar(v) {
  if (v === null || v === undefined) return '';
  if (typeof v === 'number') return isFinite(v) ? v : '';
  const s = String(v).slice(0, 2000);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}
