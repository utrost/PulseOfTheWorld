# Metriken — Pulse of the World

Kandidaten für pulsierende Zellen. Pro Kategorie 10 Metriken.

> ⚠️ **Status: Erster Recherche-Durchlauf.** Zahlen plausibel aber nicht verifiziert.
> Uwe prüft die Quellen händisch. Nicht-verifizierte Werte mit `⏳` markiert.

## Skalierungskonzept

Nicht jede Metrik pulsiert bei jedem einzelnen Ereignis. Stattdessen:
**Ein Puls = eine sinnvolle Einheit**, sodass alle Zellen im wahrnehmbaren Bereich pulsieren (~0.2–5 Sekunden pro Puls).

| Einheit auf dem Label | Bedeutung |
|---|---|
| „1 Geburt" | Jeder Puls = 1 Ereignis |
| „1.000 E-Mails" | Jeder Puls = 1.000 Ereignisse |
| „1M Songs gestreamt" | Jeder Puls = 1.000.000 Ereignisse |

Die Zelle zeigt die Einheit an, z.B.:
```
  ● E-Mails gesendet
    je 1 Million
```

**Ziel-Pulsbereich:** 0.2sec – 5sec pro Puls (langsam genug zum Wahrnehmen, schnell genug zum Spüren)

---

## 🫀 Leben und Sterben

| # | Metrik | Rate/sec | Einheit | Puls | Quelle |
|---|---|---|---|---|---|
| 1 | Geburten | 4.2 | 1 Geburt | 238ms | [UN WPP 2024](https://ourworldindata.org/births-and-deaths) · ~132 Mio./Jahr |
| 2 | Todesfälle | 2.0 | 1 Tod | 500ms | [Our World in Data](https://ourworldindata.org/births-and-deaths) · ~63 Mio./Jahr |
| 3 | Kinder unter 5 gestorben | 0.15 | 1 Kind | 6.6sec | [UNICEF 2024](https://data.unicef.org/resources/levels-and-trends-in-child-mortality-2024/) · 4.8 Mio./Jahr |
| 4 | Impfungen verabreicht | ⏳ | 100 | ⏳ | Noch zu recherchieren (WHO) |
| 5 | Herzinfarkte | ⏳ | 1 | ⏳ | Noch zu recherchieren (WHO CVD) |
| 6 | Organtransplantationen | 0.005 | 1 OP | ~200sec | [WHO](https://www.who.int/health-topics/transplantation) · ~157.000/Jahr |
| 7 | Bäume gefällt | 475 | 100 Bäume | 211ms | [Earth.org](https://earth.org/statistics-deforestation/) · 15 Mrd./Jahr |
| 8 | Bäume gepflanzt | ⏳ | 100 Bäume | ⏳ | Noch zu recherchieren (UN Decade on Restoration) |
| 9 | Tierarten ausgestorben | ~0.00005 | 1 Art | ~5.5h | ⏳ Schätzung, kontrovers |
| 10 | Hektar Wald verloren | 0.24 | 1 Hektar | 4.2sec | [Global Forest Watch](https://www.globalforestwatch.org/dashboards/global/) · 7.5 Mio. ha/Jahr |

---

## 💡 Technologie

| # | Metrik | Rate/sec | Einheit | Puls | Quelle |
|---|---|---|---|---|---|
| 1 | Google-Suchanfragen | 158.500 | 100K Suchen | 631ms | [Search Engine Land](https://searchengineland.com/google-5-trillion-searches-per-year-452928) · 5 Bio./Jahr |
| 2 | E-Mails gesendet | 4.18 Mio. | 1M E-Mails | 239ms | [Radicati 2024](https://www.radicati.com/wp/wp-content/uploads/2024/10/Email-Statistics-Report-2024-2028-Executive-Summary.pdf) · 361 Mrd./Tag |
| 3 | WhatsApp-Nachrichten | 1.74 Mio. | 1M Nachrichten | 575ms | [Infobip](https://www.infobip.com/blog/whatsapp-statistics) · 150 Mrd./Tag |
| 4 | Instagram-Uploads | 1.100 | 1K Uploads | 909ms | [Keywordseverywhere](https://keywordseverywhere.com/blog/instagram-stats/) · ~95 Mio./Tag |
| 5 | Fotos gemacht (alle Geräte) | 61.400 | 10K Fotos | 163ms | [Photutorial](https://photutorial.com/photos-statistics/) · 1.9 Bio./Jahr |
| 6 | Smartphones produziert | 39 | 10 Phones | 256ms | [IDC 2024](https://www.eenewseurope.com/en/idc-finds-worldwide-smartphone-growth-hits-6-4-percent-in-2024/) · 1.24 Mrd./Jahr |
| 7 | Elektroschrott erzeugt | 2.130 kg | 1 Tonne | 469ms | [Global E-waste Monitor 2024](https://ewastemonitor.info/the-global-e-waste-monitor-2024/) · 67.2 Mio. t/Jahr |
| 8 | Wikipedia-Edits | 5.7 | 1 Edit | 175ms | [Wikipedia:Statistics](https://en.wikipedia.org/wiki/Wikipedia:Statistics) · 180 Mio./Jahr |
| 9 | Bitcoin-Transaktionen | 3–7 | 1 Transaktion | 143–333ms | [Wikipedia](https://en.wikipedia.org/wiki/Bitcoin_scalability_problem) |
| 10 | YouTube-Stunden angesehen | ⏳ | 1K Stunden | ⏳ | Noch zu recherchieren (Alphabet Earnings) |

---

## 🎲 Fun

| # | Metrik | Rate/sec | Einheit | Puls | Quelle |
|---|---|---|---|---|---|
| 1 | Blitze auf der Erde | 44 | 10 Blitze | 227ms | [NASA](https://www.earthdata.nasa.gov/topics/atmosphere/lightning) · 44±5/sec |
| 2 | Lego-Steine produziert | 1.140 | 1K Steine | 877ms | [Wikipedia: Lego](https://en.wikipedia.org/wiki/Lego) · ~36 Mrd./Jahr |
| 3 | Tassen Kaffee getrunken | 26.000 | 10K Tassen | 385ms | [Visual Capitalist](https://www.visualcapitalist.com/ranked-which-country-consumes-the-most-coffee/) · 2.25 Mrd./Tag |
| 4 | Pizzen gegessen | ⏳ | 100 Pizzen | ⏳ | Noch zu recherchieren |
| 5 | Flugzeuge gerade in der Luft | ~10.000 | — | konstant | ⏳ Kein Puls, sondern stehende Zahl |
| 6 | Niesen weltweit | ⏳ | 1K Nieser | ⏳ | Schwer belegbar — Fun-Schätzung |
| 7 | Küsse | ⏳ | 1K Küsse | ⏳ | Schwer belegbar — Fun-Schätzung |
| 8 | Songs gestreamt (global) | 151.800 | 100K Songs | 659ms | [Luminate](https://www.musicbusinessworldwide.com/global-audio-streams-jumped-14-in-2024-to-4-8-trillion-as-pop-music-was-the-fastest-growing-genre-in-the-us/) · 4.8 Bio./Jahr |
| 9 | Hot Dogs gegessen (USA) | ⏳ | 100 Hot Dogs | ⏳ | Noch zu recherchieren (NHDSC) |
| 10 | Emojis gesendet | ⏳ | 1M Emojis | ⏳ | Noch zu recherchieren |

---

## 💰 Wirtschaft

| # | Metrik | Rate/sec | Einheit | Puls | Quelle |
|---|---|---|---|---|---|
| 1 | Barrel Öl verbraucht | 1.191 | 1K Barrel | 840ms | [IEA 2024](https://www.iea.org/reports/oil-market-report-september-2024) · 102.9 Mio. bbl/Tag |
| 2 | Tonnen CO₂ emittiert | 1.319 | 1K Tonnen | 758ms | [Global Carbon Budget](https://globalcarbonbudget.org/fossil-fuel-co2-emissions-increase-again-in-2024/) · 41.6 Gt/Jahr |
| 3 | Amazon-Bestellungen | 199 | 100 Bestellungen | 503ms | [Capital One](https://capitaloneshopping.com/research/amazon-orders-per-day/) · 17.2 Mio./Tag |
| 4 | Plastikflaschen produziert | 20.000 | 10K Flaschen | 500ms | [UNDP](https://www.undp.org/popping-the-bottle) · ~500 Mrd./Jahr |
| 5 | Lebensmittel verschwendet | 41.200 kg | 10 Tonnen | 243ms | [FAO](https://www.zerow-project.eu/facts-about-flw) · 1.3 Mrd. t/Jahr |
| 6 | Container verschifft (TEU) | ⏳ | 10 TEU | ⏳ | Noch zu recherchieren (UNCTAD) |
| 7 | Neue Unternehmen gegründet | ⏳ | 1 Firma | ⏳ | Noch zu recherchieren (World Bank) |
| 8 | US-Dollar an Börsen gehandelt | ⏳ | 1 Mrd. $ | ⏳ | Noch zu recherchieren (BIS) |
| 9 | Pakete ausgeliefert | ⏳ | 1K Pakete | ⏳ | Noch zu recherchieren |
| 10 | Strom erzeugt (MWh) | ⏳ | 1K MWh | ⏳ | Noch zu recherchieren (IEA) |

---

## 🎭 Kultur

| # | Metrik | Rate/sec | Einheit | Puls | Quelle |
|---|---|---|---|---|---|
| 1 | Bücher veröffentlicht | 0.13 | 1 Buch | 7.9sec | [UNESCO](https://courier.unesco.org/en/articles/spotlight-world-books-5000-books-year) · ~4 Mio. Titel/Jahr |
| 2 | Wikipedia-Edits | 5.7 | 1 Edit | 175ms | [Wikipedia:Statistics](https://en.wikipedia.org/wiki/Wikipedia:Statistics) |
| 3 | Netflix-Stunden gestreamt | ~3.000 | 1K Stunden | 333ms | [Netflix IR](https://ir.netflix.net/) · ~7.89 Mrd. h/Monat (H2 2023) |
| 4 | Neue Songs auf Plattformen | ~1.2 | 1 Song | 833ms | ⏳ Schätzung: ~100.000/Tag |
| 5 | Museumsbesuche | ⏳ | 100 Besuche | ⏳ | Noch zu recherchieren (ICOM) |
| 6 | Kinotickets verkauft | ⏳ | 100 Tickets | ⏳ | Noch zu recherchieren (Comscore) |
| 7 | Briefe/Postkarten verschickt | ⏳ | 1K Briefe | ⏳ | Noch zu recherchieren (UPU) |
| 8 | Podcasts veröffentlicht | ⏳ | 1 Podcast | ⏳ | Noch zu recherchieren |
| 9 | TikTok-Videos hochgeladen | ⏳ | 1K Videos | ⏳ | Noch zu recherchieren |
| 10 | Worte in Romanen geschrieben | ⏳ | 1M Worte | ⏳ | Schwer belegbar |

---

## Design-Implikationen

### Pulsbereich
Mit der Einheiten-Skalierung liegen fast alle belegten Metriken im Bereich **150ms–900ms** pro Puls.
Das ist perfekt: schnell genug um „lebendig" zu wirken, langsam genug um Unterschiede zu spüren.

Ausnahmen:
- **Kinder unter 5** (6.6sec) und **Bücher** (7.9sec) → bewusst langsam, wirkt nachdenklich
- **Organtransplantationen** (~200sec) → sehr selten, könnte als „seltenes Aufleuchten" dargestellt werden
- **Flugzeuge in der Luft** → kein Puls, konstante Zahl/Glow

### Label-Design pro Zelle
```
┌──────────────────────┐
│  ● ● ● ●            │  ← Puls-Animation
│                      │
│  E-Mails gesendet    │
│  je 1 Million        │  ← Einheit klar sichtbar
└──────────────────────┘
```

### Stärkste Kontraste (Paar-Zellen)
- Geburten (238ms) ↔ Todesfälle (500ms)
- Bäume gefällt (211ms) ↔ Bäume gepflanzt (?)
- Plastikflaschen (500ms) ↔ Flaschen recycelt (?)
- CO₂ emittiert (758ms) ↔ CO₂ absorbiert (?)

---

## Quellen-Index

| Kürzel | Vollständige Quelle |
|---|---|
| UN WPP | UN World Population Prospects 2024 |
| OWID | Our World in Data (ourworldindata.org) |
| UNICEF | UN Inter-Agency Group for Child Mortality Estimation |
| FAO | UN Food and Agriculture Organization |
| IEA | International Energy Agency |
| IDC | International Data Corporation |
| GCB | Global Carbon Budget / Carbon Brief |
| NASA | NASA Earth Data |
| Radicati | Radicati Group Email Statistics Report 2024–2028 |
| Luminate | Luminate / Music Business Worldwide |
| GEwM | Global E-waste Monitor 2024 (UNITAR) |
