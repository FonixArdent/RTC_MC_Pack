import { ModalFormData, MessageFormData } from '@minecraft/server-ui';
import { system, world } from '@minecraft/server';

import { MSG } from '../__Languages__/clock_lang.js';

import { ui, text, hostOffset, offsetStr, timeStr, tzIndex, TZ_LABELS, TZ_VALUES } from './shared.js';



export function showTzSelector(player) {
  /** Temp: Debug */
  console.warn(`[RTC] ${player.name} opened timezone selector`);
  // End Temp //
  system.runTimeout(() => {
    const tz = world.scoreboard.getObjective('tzOffset');
    if (!tz) return;
    const t = ui(player);

    let cur = hostOffset();
    try { cur = tz.getScore(player) ?? cur; } catch (e) { /** Temp: Debug */ console.warn('[RTC] Error reading tzOffset: ' + e); /** End Temp */ }

    new ModalFormData()
      .title(t.title)
      .dropdown(t.select, TZ_LABELS, { defaultOptionIndex: tzIndex(cur) })
      .show(player)
      .then((r) => {
        if (r.canceled) return;
        const off = TZ_VALUES[r.formValues[0]];
        console.warn(`[RTC] ${player.name} selected ${offsetStr(off)}`);
        tz.setScore(player, off);
        player.sendMessage(MSG['clock.set'][text(player)].replace('%s', offsetStr(off)));
      })
      .catch((e) => /** Temp: Debug */ console.warn('[RTC] showTzSelector error: ' + e) /** End Temp */);
  }, 2);
}

export function showTimezoneConfirm(player) {
  console.warn(`[RTC] ${player.name} timezone confirm opened`);
  const tz = world.scoreboard.getObjective('tzOffset');
  if (!tz) return;
  const t = ui(player);

  let off = hostOffset();
  try { off = tz.getScore(player) ?? off; } catch (e) { /** Temp: Debug */ console.warn('[RTC] Error reading tzOffset: ' + e) /** End Temp */ }

  new MessageFormData()
    .title(t.title)
    .body(`§6─── ${t.title} ───§r\n${t.detected} §e${offsetStr(off)}§r\n${t.currentTime} §e${timeStr(off)}§r\n\n§f${t.correct}`)
    .button1(`§a${t.yes}`)
    .button2(`§c${t.no}`)
    .show(player)
    .then((r) => {
      if (r.canceled) return;
      if (r.selection === 0) {
        console.warn(`[RTC] ${player.name} confirmed ${offsetStr(off)}`);
        player.sendMessage(MSG['clock.set'][text(player)].replace('%s', offsetStr(off)));
      } else {
        console.warn(`[RTC] ${player.name} declined, opening selector`);
        system.runTimeout(() => showTzSelector(player), 2);
      }
    })
    .catch((e) => /** Temp: Debug */ console.warn('[RTC] showTimezoneConfirm error: ' + e) /** End Temp */);
}
