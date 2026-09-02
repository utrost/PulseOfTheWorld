# Metriken — Pulse of the World

Letzter Abgleich: 2026-09-02. Dieses Dokument wird aus `data/metrics.json` gepflegt; die frühere Kandidatenliste mit `⏳`-Platzhaltern ist erledigt.

## Status

- **57 Metriken** in 6 Kategorien sind im Datensatz enthalten.
- Jede Metrik hat `sourceUrl`, `ratePerSecond`, `pulseUnit`, Kategorie, Farbe und Label.
- Quellen sind öffentlich verlinkt; einige Primärquellen blocken Bot-Checks mit 403 oder benötigen manuelle Browserprüfung, bleiben aber als prüfbare URLs im Datensatz.
- Bewusst geschätzte/Fun-Metriken sind unten markiert; sie sind für die Stimmung brauchbar, aber nicht als harte Statistik zu lesen.

## Skalierungskonzept

Nicht jede Metrik pulsiert bei jedem einzelnen Ereignis. `pulseUnit` skaliert sehr schnelle Ereignisse so, dass der visuelle Puls meist im wahrnehmbaren Bereich liegt. Beispiel: `pulseUnit: 1000000` bei E-Mails bedeutet: ein Puls steht für eine Million gesendete E-Mails.

## 🫀 Leben und Sterben (12)

| Metrik | Rate | Puls-Einheit | Puls-Intervall | Quelle | Validierungsnotiz |
|---|---:|---:|---:|---|---|
| Geburten | 4.2/s | 1 | 238 ms | [UN WPP 2024](https://ourworldindata.org/births-and-deaths) | URL im Bot-Check erreichbar |
| Todesfälle | 2/s | 1 | 500 ms | [Our World in Data](https://ourworldindata.org/births-and-deaths) | URL im Bot-Check erreichbar |
| Kinder unter 5 | 0.15/s | 1 | 6.7 s | [UNICEF 2024](https://data.unicef.org/resources/levels-and-trends-in-child-mortality-2024/) | URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |
| Bäume gefällt | 475/s | 100 | 211 ms | [Earth.org](https://earth.org/statistics-deforestation/) | URL im Bot-Check erreichbar |
| Wald verloren | 0.24/s | 1 | 4.2 s | [Global Forest Watch](https://www.globalforestwatch.org/dashboards/global/) | URL im Bot-Check erreichbar |
| Herzschläge weltweit | 10.64 Mrd./s | 1 Mrd. | 94 ms | [WHO / AHA](https://www.who.int/health-topics/cardiovascular-diseases) | URL im Bot-Check erreichbar |
| Atemzüge weltweit | 2.13 Mrd./s | 100 Mio. | 47 ms | [Schätzung (16/min × 8 Mrd.)](https://en.wikipedia.org/wiki/Respiratory_rate) | derived estimate: respiratory-rate reference plus population assumption |
| Trinkwasser verbraucht | 137.000/s | 1k | 7 ms | [UN Water 2024](https://www.unwater.org/) | URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |
| Blütenbesuche von Bienen | 3.00 Mio./s | 100k | 33 ms | [FAO / Bee Research](https://www.fao.org/pollination/en/) | URL im Bot-Check erreichbar |
| Blutspenden | 3.75/s | 1 | 267 ms | [WHO 2024](https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability) | URL im Bot-Check erreichbar |
| Eheschließungen | 1.04/s | 1 | 962 ms | [Eurostat / UN extrapoliert](https://ec.europa.eu/eurostat/statistics-explained/index.php/Marriage_and_divorce_statistics) | EU source extrapolated globally; keep as approximate |
| Mikrobeben | 0.1/s | 1 | 10.0 s | [USGS](https://www.usgs.gov/faqs/why-are-we-having-so-many-or-so-few-earthquakes-has-naturally-occurring-earthquake-activity) | URL vorhanden, lokaler TLS-Check scheitert; Browserprüfung nötig |

## 💡 Technologie (12)

| Metrik | Rate | Puls-Einheit | Puls-Intervall | Quelle | Validierungsnotiz |
|---|---:|---:|---:|---|---|
| Google-Suchen | 158.500/s | 100k | 631 ms | [Search Engine Land](https://searchengineland.com/google-5-trillion-searches-per-year-452928) | URL im Bot-Check erreichbar |
| E-Mails gesendet | 4.18 Mio./s | 1 Mio. | 239 ms | [Radicati Group 2024](https://www.radicati.com/wp/wp-content/uploads/2024/10/Email-Statistics-Report-2024-2028-Executive-Summary.pdf) | Quelle benannt, DNS/Host im Bot-Check nicht erreichbar; bei nächster Datenpflege ersetzen |
| WhatsApp-Nachrichten | 1.74 Mio./s | 1 Mio. | 575 ms | [Infobip](https://www.infobip.com/blog/whatsapp-statistics) | URL im Bot-Check erreichbar |
| Smartphones produziert | 39/s | 10 | 256 ms | [IDC 2024](https://www.eenewseurope.com/en/idc-finds-worldwide-smartphone-growth-hits-6-4-percent-in-2024/) | URL im Bot-Check erreichbar |
| Wikipedia-Edits | 5.45/s | 1 | 183 ms | [Wikipedia:Statistics](https://en.wikipedia.org/wiki/Wikipedia:Statistics) | URL im Bot-Check erreichbar |
| TikTok-Videos hochgeladen | 273/s | 1 | 4 ms | [TikTok / SocialInsider 2024](https://www.socialinsider.io/blog/tiktok-statistics/) | URL im Bot-Check erreichbar |
| Instagram-Posts | 1.390/s | 1 | 1 ms | [Meta / Statista 2024](https://www.statista.com/topics/1882/instagram/) | URL im Bot-Check erreichbar |
| Spam-E-Mails | 1.90 Mio./s | 10k | 5 ms | [Cisco Talos / Statista 2024](https://www.statista.com/statistics/420391/spam-email-traffic-share/) | URL im Bot-Check erreichbar |
| Posts auf X | 6.000/s | 100 | 17 ms | [X / Statista 2024](https://www.statista.com/topics/737/twitter/) | URL im Bot-Check erreichbar |
| Passwort-Angriffe | 4.000/s | 100 | 25 ms | [Microsoft Digital Defense Report 2024](https://www.microsoft.com/en-us/security/security-insider/intelligence-reports/microsoft-digital-defense-report-2024) | Microsoft report URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |
| Domain-Registrierungen | 1.36/s | 1 | 735 ms | [DNIB Q4 2025](https://www.dnib.com/articles/the-domain-name-industry-brief-q4-2025) | URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |
| PCs verkauft | 8.33/s | 1 | 120 ms | [IDC / Gartner 2024](https://www.gartner.com/en/newsroom/press-releases/2025-01-15-gartner-says-worldwide-pc-shipments-increased-1-point-4-percent-in-fourth-quarter-of-2024) | URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |

## 🎲 Fun (11)

| Metrik | Rate | Puls-Einheit | Puls-Intervall | Quelle | Validierungsnotiz |
|---|---:|---:|---:|---|---|
| Blitze | 11/s | 10 | 909 ms | [NOAA / NLDN](https://www.weather.gov/fgz/Lightning) | URL im Bot-Check erreichbar |
| Lego-Steine | 1.140/s | 1k | 877 ms | [Wikipedia: Lego](https://en.wikipedia.org/wiki/Lego) | URL im Bot-Check erreichbar |
| Tassen Kaffee | 26.000/s | 10k | 385 ms | [Visual Capitalist](https://www.visualcapitalist.com/ranked-which-country-consumes-the-most-coffee/) | URL im Bot-Check erreichbar |
| Songs gestreamt | 151.800/s | 100k | 659 ms | [Luminate](https://www.musicbusinessworldwide.com/global-audio-streams-jumped-14-in-2024-to-4-8-trillion-as-pop-music-was-the-fastest-growing-genre-in-the-us/) | URL im Bot-Check erreichbar |
| Fotos gemacht | 61.400/s | 10k | 163 ms | [Photutorial](https://photutorial.com/photos-statistics/) | URL im Bot-Check erreichbar |
| Meteore treffen die Atmosphäre | 289/s | 1 | 3 ms | [NASA](https://science.nasa.gov/solar-system/meteors-meteorites/facts/) | URL im Bot-Check erreichbar |
| Erddrehung am Äquator | 465/s | 100 | 215 ms | [NASA](https://en.wikipedia.org/wiki/Earth%27s_rotation) | physical constant, Wikipedia reference is acceptable but not primary NASA |
| Erde um die Sonne | 29.780/s | 1k | 34 ms | [NASA](https://en.wikipedia.org/wiki/Earth%27s_orbit) | physical constant, Wikipedia reference is acceptable but not primary NASA |
| Schokolade gegessen | 317/s | 10 | 32 ms | [ICCO / Statista 2024](https://www.icco.org/) | URL im Bot-Check erreichbar |
| Sterne entstanden im Universum | 4.800/s | 100 | 21 ms | [ESA / Conselice et al.](https://en.wikipedia.org/wiki/Star_formation) | URL im Bot-Check erreichbar |
| Babys weinen gerade | 11.00 Mio./s | 1 Mio. | 91 ms | [Schätzung (10% der 0-1-Jährigen)](https://en.wikipedia.org/wiki/Baby_colic) | deliberate fun estimate, not a measured global counter |

## 💰 Wirtschaft (9)

| Metrik | Rate | Puls-Einheit | Puls-Intervall | Quelle | Validierungsnotiz |
|---|---:|---:|---:|---|---|
| Barrel Öl | 1.191/s | 1k | 840 ms | [IEA 2024](https://www.iea.org/reports/oil-market-report-september-2024) | URL im Bot-Check erreichbar |
| CO₂ emittiert | 1.319/s | 1k | 758 ms | [Global Carbon Budget](https://globalcarbonbudget.org/fossil-fuel-co2-emissions-increase-again-in-2024/) | URL im Bot-Check erreichbar |
| Amazon-Bestellungen | 199/s | 100 | 503 ms | [Capital One Shopping](https://capitaloneshopping.com/research/amazon-orders-per-day/) | URL im Bot-Check erreichbar |
| Plastikflaschen | 20.000/s | 10k | 500 ms | [UNDP](https://www.undp.org/popping-the-bottle) | URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |
| Lebensmittel verschwendet | 41.200/s | 10k | 243 ms | [FAO](https://www.zerow-project.eu/facts-about-flw) | URL im Bot-Check erreichbar |
| Elektroschrott | 2.130/s | 1k | 469 ms | [Global E-waste Monitor 2024](https://ewastemonitor.info/the-global-e-waste-monitor-2024/) | URL im Bot-Check erreichbar |
| Pakete versendet | 5.787/s | 100 | 17 ms | [Pitney Bowes Parcel Index 2024](https://www.pitneybowes.com/us/shipping-index.html) | URL im Bot-Check erreichbar |
| Solarstrom erzeugt | 48.600/s | 1k | 21 ms | [IEA 2024](https://www.iea.org/energy-system/renewables/solar-pv) | URL im Bot-Check erreichbar |
| Militärausgaben | 76.400/s | 10k | 131 ms | [SIPRI 2024](https://www.sipri.org/research/armament-and-disarmament/arms-and-military-expenditure/military-expenditure) | URL im Bot-Check erreichbar |

## 🎭 Kultur (4)

| Metrik | Rate | Puls-Einheit | Puls-Intervall | Quelle | Validierungsnotiz |
|---|---:|---:|---:|---|---|
| Bücher veröffentlicht | 0.13/s | 1 | 7.7 s | [UNESCO](https://courier.unesco.org/en/articles/spotlight-world-books-5000-books-year) | URL im Bot-Check erreichbar |
| Netflix gestreamt | 3.000/s | 1k | 333 ms | [Netflix IR](https://ir.netflix.net/) | URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |
| Neue Songs hochgeladen | 1.2/s | 1 | 833 ms | [Luminate (Schätzung)](https://www.musicbusinessworldwide.com/) | industry estimate; source is broad MBW index, not a primary dataset |
| YouTube-Stunden geschaut | 277.778/s | 10k | 36 ms | [YouTube / Alphabet 2024](https://www.youtube.com/about/press/) | URL im Bot-Check erreichbar |

## 🚚 Verkehr (9)

| Metrik | Rate | Puls-Einheit | Puls-Intervall | Quelle | Validierungsnotiz |
|---|---:|---:|---:|---|---|
| Flüge | 1.15/s | 1 | 870 ms | [IATA / Globetrender 2024](https://globetrender.com/2025/01/16/2024-record-breaking-year-global-aviation-history/) | URL im Bot-Check erreichbar |
| Autos produziert | 2.91/s | 1 | 344 ms | [OICA 2024](https://www.visualcapitalist.com/mapped-global-vehicle-production-by-country/) | URL im Bot-Check erreichbar |
| Verkehrstote | 0.041/s | 1 | 24.4 s | [WHO Global Status Report 2024](https://www.who.int/publications/i/item/9789241565684) | URL im Bot-Check erreichbar |
| Uber-Fahrten | 358/s | 100 | 279 ms | [Uber Annual Report 2024](https://www.demandsage.com/uber-statistics/) | URL im Bot-Check erreichbar |
| Pakete verschickt | 5.787/s | 1k | 173 ms | [Pitney Bowes Parcel Index 2024](https://www.pitneybowes.com/us/shipping-index.html) | URL im Bot-Check erreichbar |
| Fahrräder produziert | 6.12/s | 1 | 163 ms | [World Bicycle Industry Report 2022](https://www.statspanda.com/live-counters/bicycles-produced-this-year) | live-counter/secondary source; should be replaced if this becomes prominent |
| Öl verbraucht | 188.674/s | 10k | 53 ms | [EIA / Worldometers 2024](https://www.worldometers.info/oil/) | URL im Bot-Check erreichbar |
| Container verschifft | 5.8/s | 1 | 172 ms | [Drewry / Container Trade Statistics 2024](https://hz-containers.com/en/news/how-many-shipping-containers-are-in-motion-around-the-world-every-day/) | secondary article quoting Drewry/CTS; acceptable for prototype, not ideal |
| Hafenanläufe | 2.05/s | 1 | 488 ms | [UNCTAD 2023](https://unctad.org/news/shipping-data-unctad-releases-new-seaborne-trade-statistics) | URL vorhanden, Bot-Check 403/geschützt; manuell im Browser prüfen |

## Nächste Datenpflege

- Sekundäre oder bot-geschützte Quellen bei Gelegenheit priorisiert ersetzen/prüfen: `emails`, `passwords`, `bicycles`, `containers`, `marriages`, `new-songs`.
- Fun-Schätzungen (`babies-crying`, `breaths`) sichtbar als Approximation behandeln, falls später Detailansichten dazukommen.
