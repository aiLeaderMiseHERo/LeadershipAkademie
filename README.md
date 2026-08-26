# Leadership Akademie — modul avatara

Gamifikovaná šachovnice 16 misí, kde ředitel školy trénuje vedení v rozhovoru
s AI avatarem. Statické HTML/CSS/JS, žádný build — soubory se nasazují tak, jak
leží v repu.

Grafika přebírá design systém portálu [JAKpoint](https://jakpoint.cz)
(paleta, Montserrat, radiusy, stíny), aby modul působil jako jeho součást.

## Struktura

| Soubor | Role |
|---|---|
| `index.html` | šachovnice — mřížka 4×4, progres, reset |
| `mise-X-Y.html` | stránka jedné mise; jen obálka, obsah bere z `missions.js` podle `data-mission` |
| `missions.js` | **jediné místo, kde se edituje obsah misí** — název, zadání, tip, ID avatara |
| `progress.js` | stav misí v `localStorage` (uložení, čtení, reset) |
| `board.js` | vykreslení a chování šachovnice |
| `mission.js` | vykreslení a chování stránky mise |
| `style.css` | design tokeny a styly |
| `img/qr-mise-X-Y.png` | QR kódy na jednotlivé mise |
| `img/jakpoint-logo.png` | logo portálu v hlavičce |
| `tools/gen-qr.mjs` | generátor QR kódů |

## Úprava obsahu mise

Texty se needitují v HTML, ale v `missions.js`:

```js
{
  id: '2.1', x: 2, y: 1,
  title: 'Zadej požadavek na učitele.',
  theme: 'Situační vedení – přikazování a instruování',
  goal: 'Připrav si konkrétní požadavek…',
  tip: 'Připomeň si, jak správně používat přikazování…',
  embed: '204e21e1-5001-4294-9e6d-86475d7996a4',
},
```

`embed` je ID avatara na `https://embed.liveavatar.com/v1/<embed>`.

Přidání mise = nový záznam v `missions.js` + kopie kteréhokoli
`mise-X-Y.html` se změněným `data-mission`.

## QR kódy

QR nese **absolutní URL**, takže se musí přegenerovat při každé změně adresy,
kde modul běží. Jinak vedou na starý web.

```bash
npm install
npm run qr:test    # https://aileadermisehero.github.io/LeadershipAkademie/
npm run qr:prod    # https://jakpoint.cz/ProMilana/
```

Nebo přímo s vlastní base URL:

```bash
node tools/gen-qr.mjs https://example.cz/nekde/
```

## Stav misí

Stav (`splněno` / `nesplněno`) je záměrně jen v `localStorage` prohlížeče —
trénink je jednorázový a stavy se nikde dál nevyhodnocují, takže se neposílají
na server ani nesvazují s účtem v portálu. Důsledky:

- postup se nepřenáší mezi zařízeními ani prohlížeči,
- v anonymním okně se po zavření zapomene,
- tlačítko **Začít od začátku** na šachovnici stav všech misí smaže.

## Lokální náhled

```bash
npx http-server . -p 4173 -c-1
```

## Nasazení

- **Test:** GitHub Pages z `main`, root → https://aileadermisehero.github.io/LeadershipAkademie/
- **Produkce:** `public/ProMilana/` v repu portálu → https://jakpoint.cz/ProMilana/

Při nasazení do portálu je nutné přegenerovat QR (`npm run qr:prod`).
