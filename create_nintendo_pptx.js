const pptxgen = require('pptxgenjs');

const pptx = new pptxgen();

pptx.layout = 'LAYOUT_WIDE';

function addTitleSlide(title, subtitle) {
  const slide = pptx.addSlide();
  slide.addText(title, { x: 0.6, y: 1.5, w: 12, h: 1, fontSize: 40, bold: true, color: '111111' });
  slide.addText(subtitle, { x: 0.6, y: 2.6, w: 12, h: 0.6, fontSize: 20, color: '444444' });
}

function addBulletsSlide(title, bullets) {
  const slide = pptx.addSlide();
  slide.addText(title, { x: 0.6, y: 0.4, w: 12, h: 0.6, fontSize: 30, bold: true, color: '111111' });
  slide.addText(bullets.map(t => ({ text: t, options: { bullet: { indent: 18 } } })), {
    x: 0.8, y: 1.4, w: 12.2, h: 5.2, fontSize: 20, color: '222222',
  });
}

addTitleSlide('Nintendo Case Study: International Marketing', 'University level · [Name] · [Date]');

addBulletsSlide('Company Snapshot & Global Footprint', [
  'Founded: 1889 (Japan) → global entertainment leader',
  'Core offerings: hardware (Switch), first‑party IP (Mario, Zelda), licensing',
  'Regions: Japan, Americas, Europe, Asia‑Pacific',
  'Business model: platform + software + licensing',
]);

addBulletsSlide('International STP (Segmentation, Targeting, Positioning)', [
  'Segments: families, core gamers, casual players, kids/teens, nostalgia‑driven adults',
  'Targets: multi‑generational households; localized gamer communities',
  'Positioning: “fun for everyone,” accessible gameplay, iconic IP, family‑friendly brand',
]);

addBulletsSlide('Localization & Cultural Adaptation', [
  'Localized language, region ratings (CERO/ESRB/PEGI), market‑specific bundles',
  'Regional content policies and marketing tone',
  'Partnerships: retail + publishers by region',
  'Balancing Japan‑centric IP with global franchises',
]);

addBulletsSlide('Marketing Mix (4Ps) Across Markets', [
  'Product: hybrid console + evergreen franchises; region‑specific editions',
  'Price: premium core + value bundles; regional price sensitivity',
  'Place: strong retail presence + eShop digital distribution',
  'Promotion: IP‑led campaigns, creators/influencers, events (Nintendo Direct)',
]);

addBulletsSlide('International Campaigns & Community', [
  'Nintendo Direct as global announcement cadence',
  'Community building: events, demos, esports‑lite competitions',
  'Nostalgia + onboarding new audiences',
  'Cross‑media synergy (movies, merch, theme parks)',
]);

addBulletsSlide('Challenges, Risks & Lessons', [
  'Supply constraints impact global launches',
  'Currency volatility and regional pricing debates',
  'Competition from Sony/Microsoft + mobile gaming',
  'Lesson: strong IP + localized execution = resilient global demand',
]);

pptx.writeFile({ fileName: 'Nintendo_Case_Study_International_Marketing.pptx' });
