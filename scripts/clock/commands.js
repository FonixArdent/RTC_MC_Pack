import { system, world } from '@minecraft/server';

import { MSG } from '../__Languages__/clock_lang.js';
import { SYS_MSG } from '../__Languages__/lang_sys.js';

import { ensureObjectives, hostOffset, langToOffset, updateClockScores, text } from './shared.js';

import { showTimezoneConfirm } from './ui.js';


function resetAll(fromName) {
  ensureObjectives();
  const tz = world.scoreboard.getObjective('tzOffset');
  if (!tz) return;

  for (const p of world.getAllPlayers()) {
    const t = text(p);
    p.sendMessage(SYS_MSG['rest_cmd'].name);
    p.sendMessage(((t === 'FR' ? SYS_MSG['rest_cmd'].description.FR : SYS_MSG['rest_cmd'].description.EN), (fromName || '§e server §r')));
    /** Temp */
    // world.sendMessage(`§a[RTC] Reset ${p.name}: cmdPerm=${p.commandPermissionLevel} playerPerm=${p.playerPermissionLevel} locale=${p.clientSystemInfo?.locale || p.languageCode || '?'}`);
    // Temp End //
    let lc = '';
    let off = hostOffset();
    try {
      lc = p.languageCode || '';
      const g = langToOffset(lc);
      if (g !== undefined) off = g;
    } catch { }

    tz.setScore(p, off);
    updateClockScores(p, off, lc);
    system.runTimeout(() => showTimezoneConfirm(p), 40);
  }

  for (const p of world.getAllPlayers()) {
    p.sendMessage('§7' + (text(p) === 'FR' ? SYS_MSG['reset_msg'].message.FR : SYS_MSG['reset_msg'].message.EN));
  }
}

system.beforeEvents.startup.subscribe((event) => {
  const reg = event.customCommandRegistry;

  reg.registerCommand({
    name: 'clock:reset',
    description: 'Reset the real time clock for all players',
    permissionLevel: 2,
  }, (origin) => {
    const p = origin.sourceEntity;
    if (!p) return;
    if ((p.commandPermissionLevel ?? 0) < 2) {
      p.sendMessage(MSG['clock.rest.err'][text(p)]);
      return;
    }
    world.sendMessage(`§a[RTC] ${p.name} used reset`);
    system.run(() => resetAll(p.name));
  });

  reg.registerCommand({
    name: 'clock:data',
    description: 'Toggle clock display',
    permissionLevel: 0,
  }, (origin) => {
    const p = origin.sourceEntity;
    if (p) system.run(() => p.runCommand('function clock/clockdata'));
  });

  reg.registerCommand({
    name: 'clock:show',
    description: 'Show your clock',
    permissionLevel: 0,
  }, (origin) => {
    const p = origin.sourceEntity;
    if (p) system.run(() => p.runCommand('function clock/show'));
  });

  reg.registerCommand({
    name: 'clock:hide',
    description: 'Hide your clock',
    permissionLevel: 0,
  }, (origin) => {
    const p = origin.sourceEntity;
    if (p) system.run(() => p.runCommand('function clock/hide'));
  });
});

/** Temp: Debug */
// system.runTimeout(() => {
//   world.sendMessage('§a[RTC] Auto-reset at startup');
//   resetAll();
// }, 40);
// End Temp //