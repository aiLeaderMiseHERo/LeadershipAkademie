/* =========================================================================
   Leadership Akademie — šachovnice misí
   -------------------------------------------------------------------------
   Skládá mřížku z dat v missions.js a drží stav z progress.js.

   Přístupnost: přední strana dlaždice je <button>, takže je dosažitelná
   z klávesnice. Odvrácená strana je vždy `inert`, aby se do ní tabulátorem
   nedalo dostat, dokud je otočená pryč.
   ========================================================================= */

const STATUS_ICON = { done: '✓', failed: '✕' };
const STATUS_TEXT = {
  done: 'Splněno',
  failed: 'Nesplněno',
  null: 'Bez označení',
};

function statusText(status) {
  return STATUS_TEXT[status] || STATUS_TEXT.null;
}

/* ---------------------------------------------------------------- dlaždice */

function createTile(mission) {
  const { id, x, y, bonus } = mission;
  const backId = 'tile-back-' + x + '-' + y;

  const wrapper = document.createElement('div');
  wrapper.className = 'tile-wrapper';

  const tile = document.createElement('div');
  tile.className = 'tile';

  const inner = document.createElement('div');
  inner.className = 'tile-inner';

  /* --- přední strana --- */

  const front = document.createElement('button');
  front.type = 'button';
  front.className = 'tile-face tile-front';
  front.setAttribute('aria-expanded', 'false');
  front.setAttribute('aria-controls', backId);

  const coordLabel = document.createElement('span');
  coordLabel.className = 'coord-label';
  coordLabel.textContent = 'Mise ' + id;

  const coordSub = document.createElement('span');
  coordSub.className = 'coord-sub';
  coordSub.textContent = 'Klikni pro odhalení';

  /* Stav se kreslí rámečkem a pozadím přímo na přední straně dlaždice, ne
     přes vloženou vrstvu — méně elementů a barva se vykreslí spolehlivě. */
  const statusIcon = document.createElement('span');
  statusIcon.className = 'tile-status-icon';
  statusIcon.setAttribute('aria-hidden', 'true');

  /* Stav je vidět barvou, takže pro čtečku obrazovky musí být i textem. */
  const srStatus = document.createElement('span');
  srStatus.className = 'sr-only';

  front.append(coordLabel, coordSub, statusIcon, srStatus);

  /* --- zadní strana --- */

  const back = document.createElement('div');
  back.className = 'tile-face tile-back';
  back.id = backId;
  back.inert = true;

  const backTop = document.createElement('div');
  backTop.className = 'tile-back-top';

  const badge = document.createElement('span');
  badge.className = 'badge';
  badge.textContent = 'Mise ' + id;
  backTop.appendChild(badge);

  if (bonus) {
    const bonusPill = document.createElement('span');
    bonusPill.className = 'pill pill-bonus';
    bonusPill.textContent = 'Bonus';
    backTop.appendChild(bonusPill);
  }

  const qrBox = document.createElement('div');
  qrBox.className = 'qr-box';

  const qrImg = document.createElement('img');
  qrImg.src = 'img/qr-mise-' + x + '-' + y + '.png';
  qrImg.alt = 'QR kód na misi ' + id;
  qrImg.loading = 'lazy';
  qrImg.decoding = 'async';
  qrBox.appendChild(qrImg);

  const actions = document.createElement('div');
  actions.className = 'tile-back-actions';

  const openBtn = document.createElement('a');
  openBtn.className = 'btn btn-primary';
  openBtn.href = 'mise-' + x + '-' + y + '.html';
  openBtn.textContent = 'Otevřít misi';

  const closeBtn = document.createElement('button');
  closeBtn.type = 'button';
  closeBtn.className = 'btn btn-ghost';
  closeBtn.textContent = 'Zavřít';

  actions.append(openBtn, closeBtn);
  back.append(backTop, qrBox, actions);

  inner.append(front, back);
  tile.appendChild(inner);
  wrapper.appendChild(tile);

  /* --- otáčení --- */

  function setFlipped(flipped) {
    tile.classList.toggle('flipped', flipped);
    front.setAttribute('aria-expanded', String(flipped));
    front.inert = flipped;
    back.inert = !flipped;
  }

  const api = { wrapper, front, srStatus, statusIcon, mission, setFlipped };

  front.addEventListener('click', () => {
    /* Otevřená je vždy jen jedna dlaždice, aby byl na obrazovce právě jeden
       QR kód a nedalo se naskenovat cizí misi. */
    closeOtherTiles(api);
    setFlipped(true);
    openBtn.focus();
  });

  closeBtn.addEventListener('click', () => {
    setFlipped(false);
    front.focus();
  });

  /* Escape zavře otočenou dlaždici, stejně jako se čeká u dialogů. */
  back.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setFlipped(false);
      front.focus();
    }
  });

  return api;
}

/* ------------------------------------------------------------------ render */

const tiles = [];

/** Vrátí všechny dlaždice kromě zadané do výchozí polohy. */
function closeOtherTiles(except) {
  tiles.forEach((tile) => {
    if (tile !== except) tile.setFlipped(false);
  });
}

function renderBoard() {
  const board = document.getElementById('board');
  boardMissions().forEach((mission) => {
    const tile = createTile(mission);
    tiles.push(tile);
    board.appendChild(tile.wrapper);
  });
}

function refreshStatuses() {
  tiles.forEach(({ mission, front, statusIcon, srStatus }) => {
    const status = getMissionStatus(mission.x, mission.y);
    front.classList.toggle('done', status === 'done');
    front.classList.toggle('failed', status === 'failed');
    statusIcon.textContent = STATUS_ICON[status] || '';
    srStatus.textContent = 'Stav: ' + statusText(status);
  });

  const total = boardMissions().length;
  const done = countDoneMissions();
  document.getElementById('progressText').textContent =
    done + ' / ' + total + ' dokončených';
  document.getElementById('progressFill').style.width =
    Math.round((done / total) * 100) + '%';
  document
    .getElementById('progressBar')
    .setAttribute('aria-valuenow', String(done));
}

/* ------------------------------------------------------------------- reset */

function initReset() {
  const btnReset = document.getElementById('btnReset');
  const announcer = document.getElementById('boardAnnouncer');

  btnReset.addEventListener('click', () => {
    const ok = window.confirm(
      'Opravdu smazat označení u všech misí? Šachovnice se vrátí na 0 / ' +
        boardMissions().length +
        ' a začne se od začátku.'
    );
    if (!ok) return;

    resetAllMissions();
    refreshStatuses();
    announcer.textContent = 'Stav všech misí byl smazán.';
  });
}

/* -------------------------------------------------------------------- init */

document.addEventListener('DOMContentLoaded', () => {
  renderBoard();
  refreshStatuses();
  initReset();
});

/* Stav se mohl změnit na stránce mise ve druhé kartě, nebo návratem přes
   tlačítko Zpět, kdy prohlížeč obnoví stránku z cache. */
window.addEventListener('storage', refreshStatuses);
window.addEventListener('pageshow', refreshStatuses);
