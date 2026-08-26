/* =========================================================================
   Generátor QR kódů pro mise
   -------------------------------------------------------------------------
   QR kód nese absolutní URL, takže se musí přegenerovat při každé změně
   adresy, kde modul běží. Proto je base URL parametrem, ne konstantou.

   Použití:
     npm install qrcode
     node tools/gen-qr.mjs <base-url>

   Příklady:
     node tools/gen-qr.mjs https://aileadermisehero.github.io/LeadershipAkademie/
     node tools/gen-qr.mjs https://jakpoint.cz/ProMilana/

   Výstup: img/qr-mise-X-Y.png pro všechny mise na šachovnici.
   ========================================================================= */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = path.join(ROOT, 'img');

const baseUrl = process.argv[2];
if (!baseUrl) {
  console.error('Chybí base URL.\nPoužití: node tools/gen-qr.mjs https://jakpoint.cz/ProMilana/');
  process.exit(1);
}
if (!/^https?:\/\//.test(baseUrl)) {
  console.error('Base URL musí začínat http:// nebo https://');
  process.exit(1);
}

/* missions.js je prostý skript pro prohlížeč, ne modul. Načtení přes eval je
   tady záměrné — drží data na jednom místě bez build stepu a bez duplikace
   seznamu misí v tomto skriptu. */
const missionsSrc = fs.readFileSync(path.join(ROOT, 'missions.js'), 'utf8');
const MISSIONS = new Function(`${missionsSrc}; return MISSIONS;`)();

/* Šachovnice, tedy bez ukázkové mise 0.0, na kterou QR neexistuje. */
const boardMissions = MISSIONS.filter((m) => m.x >= 1 && m.y >= 1);

const base = baseUrl.endsWith('/') ? baseUrl : baseUrl + '/';

const QR_OPTIONS = {
  width: 640,
  margin: 2,
  errorCorrectionLevel: 'M',
  /* Tmavá z palety JAKpoint místo čisté černé. Světlá zůstává bílá — barevné
     pozadí by zbytečně snižovalo kontrast pro čtečky QR. */
  color: { dark: '#2b2826ff', light: '#ffffffff' },
};

fs.mkdirSync(OUT_DIR, { recursive: true });

let total = 0;
for (const m of boardMissions) {
  const url = `${base}mise-${m.x}-${m.y}.html`;
  const file = path.join(OUT_DIR, `qr-mise-${m.x}-${m.y}.png`);
  await QRCode.toFile(file, url, QR_OPTIONS);
  const kb = (fs.statSync(file).size / 1024).toFixed(1);
  console.log(`${path.basename(file).padEnd(20)} ${String(kb).padStart(6)} kB  ${url}`);
  total++;
}

console.log(`\nHotovo: ${total} QR kódů v img/ pro base ${base}`);
