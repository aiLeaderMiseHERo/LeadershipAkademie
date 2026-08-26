/* =========================================================================
   Leadership Akademie — stav misí
   -------------------------------------------------------------------------
   Stav je záměrně jen v prohlížeči (localStorage). Trénink je jednorázový,
   stavy se nikde dál nevyhodnocují, takže se neposílají na server ani
   nesvazují s účtem v portálu.

   Klíč: leadership_akademie_mise_<x>_<y>  ->  'done' | 'failed'
   ========================================================================= */

const PROGRESS_PREFIX = 'leadership_akademie_mise_';

/* Privátní režim prohlížeče umí u localStorage vyhodit výjimku. Modul pak
   běží dál, jen si stav nepamatuje — což je lepší než rozbitá stránka. */
function safeStorage() {
  try {
    const probe = '__la_probe__';
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return window.localStorage;
  } catch (err) {
    return null;
  }
}

const STORAGE = safeStorage();

/** Vrátí 'done', 'failed', nebo null. */
function getMissionStatus(x, y) {
  if (!STORAGE) return null;
  const value = STORAGE.getItem(PROGRESS_PREFIX + x + '_' + y);
  return value === 'done' || value === 'failed' ? value : null;
}

/** Uloží stav mise; status === null stav smaže. */
function setMissionStatus(x, y, status) {
  if (!STORAGE) return;
  const key = PROGRESS_PREFIX + x + '_' + y;
  if (status === null) {
    STORAGE.removeItem(key);
  } else {
    STORAGE.setItem(key, status);
  }
}

/** Smaže stav všech misí. Vrátí počet smazaných záznamů. */
function resetAllMissions() {
  if (!STORAGE) return 0;
  const keys = [];
  for (let i = 0; i < STORAGE.length; i++) {
    const key = STORAGE.key(i);
    if (key && key.indexOf(PROGRESS_PREFIX) === 0) keys.push(key);
  }
  keys.forEach((key) => STORAGE.removeItem(key));
  return keys.length;
}

/** Kolik misí na šachovnici je označeno jako splněné. */
function countDoneMissions() {
  return boardMissions().filter((m) => getMissionStatus(m.x, m.y) === 'done').length;
}
