/* =========================================================================
   Leadership Akademie — data misí
   -------------------------------------------------------------------------
   Jediné místo, kde se edituje obsah misí. Stránky mise-X-Y.html i šachovnice
   si odsud berou název, zadání, tip a ID avatara. Přidání mise = nový záznam
   zde + nový soubor mise-X-Y.html podle stávající šablony.

   embed = ID avatara na https://embed.liveavatar.com/v1/<embed>
   ========================================================================= */

const BOARD_ROWS = 4;
const BOARD_COLS = 4;

const MISSIONS = [
  {
    id: '0.0', x: 0, y: 0,
    title: "Rozpoznej úroveň kmenového vůdcovství a živel tvého učitele.",
    theme: "Kmenové vůdcovství & živly",
    goal: "Vyslechni zadání od AI avatara, chovej se k němu jako k učiteli z vaší školy a pojmenuj jeho aktuální úroveň kmenového vůdcovství a dominující živel. Připrav si krátkou reflexi, kterou můžeš sdílet v diskusi s ostatními.",
    tip: "Všímej si slovníku, energie a typických reakcí daného učitele. Jaký dopad má jeho a tvůj styl na spolupráci?",
    embed: '9ae9bb2e-2de0-4ec1-8b82-4432e1dded08',
  },
  {
    id: '1.1', x: 1, y: 1,
    title: "Rozpoznej úroveň kmenového vůdcovství a živel tvého učitele.",
    theme: "Kmenové vůdcovství & živly",
    goal: "Vyslechni zadání od AI avatara, chovej se k němu jako k učiteli z vaší školy a pojmenuj jeho aktuální úroveň kmenového vůdcovství a dominující živel. Připrav si krátkou reflexi, kterou můžeš sdílet v diskusi s ostatními.",
    tip: "Všímej si slovníku, energie a typických reakcí daného učitele. Jaký dopad má jeho a tvůj styl na spolupráci?",
    embed: 'c6c5d0c8-d501-4024-a10f-45095021e507',
  },
  {
    id: '1.2', x: 1, y: 2,
    title: "Rozpoznej úroveň kmenového vůdcovství a živel tvého učitele.",
    theme: "Kmenové vůdcovství & živly",
    goal: "Vyslechni zadání od AI avatara, chovej se k němu jako k učiteli z vaší školy a pojmenuj jeho aktuální úroveň kmenového vůdcovství a dominující živel. Připrav si krátkou reflexi, kterou můžeš sdílet v diskusi s ostatními.",
    tip: "Všímej si slovníku, energie a typických reakcí daného učitele. Jaký dopad má jeho a tvůj styl na spolupráci?",
    embed: 'c7c52976-1587-4784-a967-5d74ab4d7ef3',
  },
  {
    id: '1.3', x: 1, y: 3,
    title: "Rozpoznej úroveň kmenového vůdcovství a živel tvého učitele.",
    theme: "Kmenové vůdcovství & živly",
    goal: "Vyslechni zadání od AI avatara, chovej se k němu jako k učiteli z vaší školy a pojmenuj jeho aktuální úroveň kmenového vůdcovství a dominující živel. Připrav si krátkou reflexi, kterou můžeš sdílet v diskusi s ostatními.",
    tip: "Všímej si slovníku, energie a typických reakcí daného učitele. Jaký dopad má jeho a tvůj styl na spolupráci?",
    embed: 'ec639319-9583-4419-ad91-e9b082e38748',
  },
  {
    id: '1.4', x: 1, y: 4,
    title: "Rozpoznej úroveň kmenového vůdcovství a živel tvého učitele.",
    theme: "Kmenové vůdcovství & živly",
    goal: "Vyslechni zadání od AI avatara, chovej se k němu jako k učiteli z vaší školy a pojmenuj jeho aktuální úroveň kmenového vůdcovství a dominující živel. Připrav si krátkou reflexi, kterou můžeš sdílet v diskusi s ostatními.",
    tip: "Všímej si slovníku, energie a typických reakcí daného učitele. Jaký dopad má jeho a tvůj styl na spolupráci?",
    embed: 'dbefda4c-a191-41d9-bc10-2c6b8572794c',
  },
  {
    id: '2.1', x: 2, y: 1,
    title: "Zadej požadavek na učitele Přikazováním.",
    theme: "Situační vedení – přikazování a instruování",
    goal: "Připrav si konkrétní požadavek na učitele ze své praxe. Přikaž jej co nejkonkrétněji učiteli, jako by byl z tvé školy. Připrav si krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně používat přikazování v rámci situačního vedení a připrav si požadavek, který je k tomu vhodný.",
    embed: '204e21e1-5001-4294-9e6d-86475d7996a4',
  },
  {
    id: '2.2', x: 2, y: 2,
    title: "Zadej požadavek na učitele Instruováním.",
    theme: "Situační vedení – přikazování a instruování",
    goal: "Připrav si konkrétní požadavek na učitele ze své praxe. Instruuj učitele tímto konkrétním požadavkem, jako by byl z tvé školy. Připrav si krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně používat instruování v rámci situačního vedení a připrav si požadavek, který je k tomu vhodný.",
    embed: '7d312faa-0e08-41bc-8c84-88134afac521',
  },
  {
    id: '2.3', x: 2, y: 3,
    title: "Zadej požadavek na učitele Přikazováním.",
    theme: "Situační vedení – přikazování a instruování",
    goal: "Připrav si konkrétní požadavek na učitele ze své praxe. Přikaž jej co nejkonkrétněji učiteli, jako by byl z tvé školy. Připrav si krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně používat přikazování v rámci situačního vedení a připrav si požadavek, který je k tomu vhodný.",
    embed: '81a56df3-9d85-40d0-9a1b-b9aa5f72280c',
  },
  {
    id: '2.4', x: 2, y: 4,
    title: "Zadej požadavek na učitele Instruováním.",
    theme: "Situační vedení – přikazování a instruování",
    goal: "Připrav si konkrétní požadavek na učitele ze své praxe. Instruuj učitele tímto konkrétním požadavkem, jako by byl z tvé školy. Připrav si krátkou reflexi, kterou můžeš sdílet v diskusi nebo supervizi.",
    tip: "Připomeň si, jak správně používat instruování v rámci situačního vedení a připrav si požadavek, který je k tomu vhodný.",
    embed: 'f2822bbf-84df-429e-924c-d891fcf9e8cb',
  },
  {
    id: '3.1', x: 3, y: 1,
    title: "Koučuj učitele.",
    theme: "Situační vedení – koučování a delegování",
    goal: "Připrav se, že budeš koučovat učitele, který přijde za tebou. Připrav si krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně používat koučování v rámci situačního vedení. Vytvoř bezpečné prostředí a buď svému učiteli průvodcem.",
    embed: '176f190e-4aa6-4a4b-983d-30993705cab5',
  },
  {
    id: '3.2', x: 3, y: 2,
    title: "Koučuj učitele.",
    theme: "Situační vedení – koučování a delegování",
    goal: "Připrav se, že budeš koučovat učitele, který přijde za tebou. Připrav si krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně používat koučování v rámci situačního vedení. Vytvoř bezpečné prostředí a buď svému učiteli průvodcem.",
    embed: 'ca8558e5-7c08-40bd-8079-078fcf7cc26b',
  },
  {
    id: '3.3', x: 3, y: 3,
    title: "Deleguj na učitele.",
    theme: "Situační vedení – koučování a delegování",
    goal: "Připrav se, že budeš delegovat na učitele, kterého sis pozval, protože je schopný. Po skončení rozhovoru si připrav krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně delegovat v rámci situačního vedení a připrav si téma ze své praxe, které je k tomu vhodné.",
    embed: '0803258b-d62e-4c21-abd3-7dbf5d607258',
  },
  {
    id: '3.4', x: 3, y: 4,
    title: "Deleguj na učitele.",
    theme: "Situační vedení – koučování a delegování",
    goal: "Připrav se, že budeš delegovat na učitele, kterého sis pozval, i když není moc schopný. Po skončení rozhovoru si připrav krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně delegovat v rámci situačního vedení a připrav si téma ze své praxe, které je k tomu vhodné.",
    embed: '76f92744-d26f-4046-874c-298e3dd3944c',
  },
  {
    id: '4.1', x: 4, y: 1,
    title: "Posouvej učitele na úroveň 4.",
    theme: "Posouvání učitele a školy",
    goal: "Vyzkoušej jak posunout učitele z úrovně 3 na 4. Po skončení rozhovoru si připrav krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, co pomáhá posouvat z úrovně 3 na vyšší úroveň v rámci kmenového vůdcovství.",
    embed: '901df7fa-b13f-4afe-bf48-266f487adcad',
  },
  {
    id: '4.2', x: 4, y: 2,
    title: "Deleguj na učitele.",
    theme: "Posouvání učitele a školy",
    goal: "Připrav se, že budeš delegovat na učitele, kterého sis pozval, protože je schopný. Po skončení rozhovoru si připrav krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak správně delegovat v rámci situačního vedení a připrav si téma ze své praxe, které je k tomu vhodné.",
    embed: '53b7ce77-793d-4f4a-8a99-b9210d310c2b',
  },
  {
    id: '4.3', x: 4, y: 3,
    bonus: true,
    title: "Posouvej učitele a školu ke hvězdám.",
    theme: "Posouvání učitele a školy",
    goal: "Vyzkoušej jak posunout učitele a celou školu z úrovně 4 na 5. Po skončení rozhovoru si připrav krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, jak vypadá úroveň 5 v rámci kmenového vůdcovství.",
    embed: 'e439ffc9-b5ec-4639-b91a-a10bd7d60819',
  },
  {
    id: '4.4', x: 4, y: 4,
    title: "Posouvej učitele na úroveň 3.",
    theme: "Posouvání učitele a školy",
    goal: "Vyzkoušej jak posunout učitele z úrovně 2 na 3. Po skončení rozhovoru si připrav krátkou reflexi, kterou můžeš sdílet.",
    tip: "Připomeň si, co pomáhá posouvat z úrovně 2 na vyšší úroveň v rámci kmenového vůdcovství.",
    embed: '4d6f53de-9425-4cb0-8694-b81b75242662',
  },
];

/** Mise podle souřadnice, např. missionById('2.3'). */
function missionById(id) {
  return MISSIONS.find((m) => m.id === id) || null;
}

/** Mise, které tvoří šachovnici (bez ukázkové mise 0.0). */
function boardMissions() {
  return MISSIONS.filter((m) => m.x >= 1 && m.y >= 1);
}
