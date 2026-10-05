# Curso IA para abogados · Actividades

Actividades prácticas publicadas con GitHub Pages. Las notas de los estudiantes llegan a una hoja de Google Sheets del docente, con una pestaña por actividad.

| Carpeta / archivo | Contenido |
|---|---|
| `index.html` | Portada del curso con enlaces a cada actividad (el enlace que compartes con los estudiantes). |
| `actividad-1/` | Módulo 1 · Anonimización antes de usar IA (marcar datos en un memorial). |
| `actividad-2/` | Módulo 2 · Buen prompt o mal prompt (arrastrar y soltar 12 prompts). |
| `config.js` | Configuración común: aquí va la URL del registro de notas. |
| `apps-script/Code.gs` | Script que recibe las notas en Google Sheets. |

## Paso 1 · Subir a GitHub y publicar

1. En GitHub, haz clic en **New repository**. Nombre sugerido: `curso-ia-abogados`. Déjalo **Public** y haz clic en **Create repository**.
2. Haz clic en **uploading an existing file**, arrastra **todo el contenido** de esta carpeta (los archivos y las carpetas `actividad-1`, `actividad-2` y `apps-script`) y haz clic en **Commit changes**.
3. Ve a **Settings** › **Pages**. En **Source** elige **Deploy from a branch**, en **Branch** elige `main` y `/ (root)`, y haz clic en **Save**.
4. En 1 o 2 minutos aparece el enlace: `https://TU-USUARIO.github.io/curso-ia-abogados/`. Esa es la portada para los estudiantes.

## Paso 2 · Registro de notas en Google Sheets

1. Entra a [sheets.new](https://sheets.new) y ponle nombre a la hoja, por ejemplo `Notas · Curso IA para abogados`.
2. Menú **Extensiones** › **Apps Script**. Borra el código que aparece, pega todo `apps-script/Code.gs` y guarda.
3. Haz clic en **Implementar** › **Nueva implementación** › engranaje › **Aplicación web**.
4. **Ejecutar como**: `Yo`. **Quién tiene acceso**: `Cualquier usuario`. Haz clic en **Implementar**.
5. Autoriza: **Autorizar acceso** › tu cuenta › **Configuración avanzada** › **Ir a (proyecto)** › **Permitir**.
6. Copia la **URL de la aplicación web** (termina en `/exec`).

Cada actividad crea sola su pestaña la primera vez que alguien entrega: **Actividad 1 · Anonimización** y **Actividad 2 · Prompts**. La hoja sigue siendo privada; "Cualquier usuario" solo permite enviar notas.

> Si ya habías instalado el script de la Actividad 1 por separado, reemplázalo por este código y haz **Implementar** › **Gestionar implementaciones** › lápiz › **Versión: nueva versión** › **Implementar**. La URL no cambia.

## Paso 3 · Conectar las actividades

1. En GitHub abre `config.js` y haz clic en el lápiz (**Edit this file**).
2. Pega tu URL entre las comillas: `SHEETS_URL: 'https://script.google.com/macros/s/XXXX/exec',`
3. **Commit changes**. Espera 1 o 2 minutos y haz una entrega de prueba en cada actividad; luego borra esas filas.

## Cómo se califica

**Actividad 1.** 43 datos clave con peso según dificultad (2, 3 o 5 puntos). Anonimizar el dato completo da el 80 % de su puntaje, a medias el 40 %, y elegir una categoría correcta suma el 20 % restante. Restan: −3 por cada trampa marcada, −1 por cada marca sin datos sensibles y −1 por cada 10 palabras de relleno marcadas.

**Actividad 2.** 12 prompts (6 buenos y 6 malos) en orden aleatorio para cada estudiante. Cada acierto vale lo mismo; la nota es aciertos / 12 × 100. La corrección muestra qué elementos tiene o le faltan a cada prompt (rol, contexto y país, tarea, formato, límites, datos protegidos) y una versión mejorada de los malos.

Para editar los contenidos: en la Actividad 1, las constantes `DOC`, `ITEMS`, `TRAPS` y `NEUTRALS`; en la Actividad 2, la constante `PROMPTS`.

## Limitaciones

- Todo corre en el navegador: alguien con conocimientos técnicos podría ver las respuestas en el código fuente.
- Cada navegador permite una entrega por actividad. Una entrega desde otro navegador aparece como otra fila (revisa la columna **Intento** y la hora).
- Sin `SHEETS_URL`, las actividades funcionan y muestran la nota, pero no la registran.

*Casos, documentos y datos ficticios con fines educativos.*
