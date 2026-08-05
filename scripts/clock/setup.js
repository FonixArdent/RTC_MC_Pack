import { system, world } from '@minecraft/server';

import { MSG } from '../__Languages__/clock_lang.js';

import { ensureObjectives, hostOffset, langToOffset, updateClockScores, text } from './shared.js';

import { showTimezoneConfirm } from './ui.js';



world.afterEvents.playerSpawn.subscribe((e) => {
  if (!e.initialSpawn) return;
  const p = e.player;

  ensureObjectives();
  if (!p.hasTag('showClock')) p.addTag('showClock');

  let lc = '';
  try { lc = p.languageCode || ''; } catch { }
  const loc = p.clientSystemInfo?.locale || lc || '?';
  // world.sendMessage(MSG['clock.join'][text(p)].replace('%u', p.name).replace('%s', loc));
  console.log(`[RTC] ${p.name} joined — locale: ${loc}, lang: ${text(p)}`);

  const tz = world.scoreboard.getObjective('tzOffset');
  if (!tz) return;

  let has = false;
  try { has = tz.getScore(p) !== undefined; } catch { }
  if (!has) {
    const off = langToOffset(lc);
    tz.setScore(p, off);
    updateClockScores(p, off, lc);
    system.runTimeout(() => showTimezoneConfirm(p), 80);
    return;
  }

  const off = tz.getScore(p) ?? hostOffset();
  updateClockScores(p, off, lc);
});

system.runInterval(() => {
  ensureObjectives();

  const objTz = world.scoreboard.getObjective('tzOffset');
  for (const p of world.getAllPlayers()) {
    let off = hostOffset();
    try { const s = objTz.getScore(p); if (s !== undefined) off = s; } catch { }
    let lang = '';
    try { lang = p.languageCode || ''; } catch { }
    updateClockScores(p, off, lang);
  }
}, 20);
