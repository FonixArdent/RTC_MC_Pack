import { world, system } from '@minecraft/server'

// ── Locale helpers (copie locale, pas d'import depuis clock/) ── //

function getPlayerLocale(player) {
  if (!player) return null;
  try {
    const locale = player.clientSystemInfo?.locale;
    if (locale) return locale;
    const legacyCode = player.languageCode;
    if (legacyCode) return legacyCode;
  } catch (e){ return e; }
}


function text(player) {
  return getPlayerLocale(player).startsWith('fr') ? 'FR' : 'EN';
}


// ── Toggle ── //

function getProp() {
  return world.getDynamicProperty('timeSyncEnabled');
}

export function isSyncEnabled() {
  return getProp() === true;
}

export function toggleSync() {
  const next = !isSyncEnabled();
  world.setDynamicProperty('timeSyncEnabled', next);
  const msg = next
    ? '§a[RTC] (Global) Sun sync §aON§r — the sun follows real time'
    : '§c[RTC] (Global) Sun sync §cOFF';
  world.sendMessage(msg);
  if (next) syncWorldTime();
}

// ── Average offset ── //

export function averageOffset() {
  const objTz = world.scoreboard.getObjective('tzOffset');
  if (!objTz) return null;
  const players = world.getAllPlayers();
  if (players.length === 0) return null;
  let sum = 0, count = 0;
  for (const p of players) {
    try {
      const s = objTz.getScore(p);
      if (s !== undefined) { sum += s; count++; }
    } catch {}
  }
  return count > 0 ? Math.round(sum / count) : null;
}

// ── Sync ── //

export function syncWorldTime() {
  if (!isSyncEnabled()) return;
  const avg = averageOffset();
  if (avg === null) return;
  const now = new Date();
  const utcMin = now.getUTCHours() * 60 + now.getUTCMinutes();
  const totalMin = ((utcMin + avg) % 1440 + 1440) % 1440;
  world.setTimeOfDay(Math.floor(totalMin * (24000 / 1440)));
}