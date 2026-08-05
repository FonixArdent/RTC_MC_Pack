import { world, system } from '@minecraft/server';

import './clock/setup.js';
import './clock/commands.js';
import './time_sync/setup.js';
import './time_sync/commands.js';

import { MSG } from './__Languages__/clock_lang.js';

import { PACK_NAME, OWNER } from './info.js';

import { updateClockScores, ui, text } from './clock/shared.js';

import { showTzSelector, showTimezoneConfirm } from './clock/ui.js';



function verifyModules() {
  const checks = [
    ['shared.updateClockScores', updateClockScores],

    ['ui.showTzSelector', showTzSelector],
    ['ui.showTimezoneConfirm', showTimezoneConfirm]
  ];

  for (const [name, fn] of checks) {
    if (typeof fn !== 'function') {
      throw new Error(`RTC bootstrap failed: ${name} is not available`);
    }
  }
}

system.beforeEvents.startup.subscribe(() => {
  try {
    verifyModules();
    world.sendMessage('§a[RTC] Modules loaded');
  } catch (e) {
    world.sendMessage('§c[RTC] Bootstrap error: ' + e);
  }
});

world.afterEvents.playerSpawn.subscribe((e) => {
  if (!e.initialSpawn) return;
  try {
    verifyModules();
    const lang = text(e.player);
    e.player.sendMessage(MSG['clock.welcome'][lang] + " " + OWNER);
    // world.sendMessage(`§a[RTC] ${e.player.name} joined (lang: ${lang})`);
  } catch (e2) {
    console.error('§c[RTC] Welcome error: ' + e2);
    e.player.sendMessage('§c[RTC] Error While Loading' + " " + PACK_NAME);
  }
});
