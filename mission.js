/* =========================================================================
   Leadership Akademie — stránka jedné mise
   -------------------------------------------------------------------------
   Každý soubor mise-X-Y.html je jen tenká obálka: v <body data-mission="X.Y">
   řekne, kterou misi vykreslit, o zbytek se stará tento skript nad daty
   z missions.js. Obsah misí se tedy needituje v 17 souborech, ale na jednom
   místě.
   ========================================================================= */

const MISSION_ID = document.body.dataset.mission;
const MISSION = missionById(MISSION_ID);

if (!MISSION) {
  /* Nastane jen při chybě v šabloně — data-mission neodpovídá žádné misi
     v missions.js. Radši hlasitě než prázdná stránka bez vysvětlení. */
  throw new Error('Mise "' + MISSION_ID + '" není v missions.js.');
}

const STATUS_MESSAGE = {
  done: 'Mise je označena jako splněná.',
  failed: 'Mise je označena jako nesplněná.',
  null: 'Mise zatím není označena.',
};

/* ------------------------------------------------------------------ obsah */

function renderMission() {
  document.title = 'Mise ' + MISSION.id + ' – Leadership Akademie';

  /* Souřadnice mise nese podtitul a název, takže v záhlaví už nemá pilulku. */
  setText('brandSubtitle', 'Mise ' + MISSION.id + ' – ' + MISSION.theme);
  setText('missionName', 'Mise ' + MISSION.id + ': ' + MISSION.title);
  setText('missionGoal', MISSION.goal);
  setText('missionTip', MISSION.tip);
  setText('footerMission', 'Mise ' + MISSION.id + ' · ' + MISSION.theme);
  setText(
    'statusInfo',
    'Po označení výsledku se stav mise uloží v tomto prohlížeči. Po návratu na ' +
      'šachovnici bude pole ' +
      MISSION.id +
      ' zvýrazněno zeleně (splněno) nebo červeně (nesplněno).'
  );

  if (MISSION.bonus) {
    document.getElementById('bonusPill').hidden = false;
  }

  const frame = document.getElementById('avatarFrame');
  frame.src = 'https://embed.liveavatar.com/v1/' + MISSION.embed;
  frame.title = 'AI avatar pro misi ' + MISSION.id;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

/* ------------------------------------------------------------------- stav */

const btnDone = document.getElementById('btnDone');
const btnFailed = document.getElementById('btnFailed');
const statusDot = document.getElementById('statusDot');
const statusText = document.getElementById('statusText');

function applyStatus(status) {
  btnDone.setAttribute('aria-pressed', String(status === 'done'));
  btnFailed.setAttribute('aria-pressed', String(status === 'failed'));

  statusDot.classList.toggle('done', status === 'done');
  statusDot.classList.toggle('failed', status === 'failed');

  statusText.textContent = STATUS_MESSAGE[status] || STATUS_MESSAGE.null;
}

/* Druhý klik na už aktivní tlačítko označení zruší — bez toho by se špatně
   trefené označení nedalo na stránce mise vzít zpět. */
function toggleStatus(status) {
  const current = getMissionStatus(MISSION.x, MISSION.y);
  const next = current === status ? null : status;
  setMissionStatus(MISSION.x, MISSION.y, next);
  applyStatus(next);
}

/* -------------------------------------------------------------------- init */

renderMission();
applyStatus(getMissionStatus(MISSION.x, MISSION.y));

btnDone.addEventListener('click', () => toggleStatus('done'));
btnFailed.addEventListener('click', () => toggleStatus('failed'));
