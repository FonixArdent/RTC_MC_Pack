import { world } from '@minecraft/server';

import { UI, MSG } from '../__Languages__/clock_lang';


export const LANG_TZ = {
  'en_US': -300, 'en_GB': 0, 'en_AU': 600, 'en_CA': -300, 'en_NZ': 720,
  'fr_FR': 60, 'fr_CA': -300, 'de_DE': 60, 'es_ES': 60, 'es_MX': -360,
  'es_AR': -180, 'it_IT': 60, 'pt_BR': -180, 'pt_PT': 0, 'ru_RU': 180,
  'zh_CN': 480, 'zh_TW': 480, 'ja_JP': 540, 'ko_KR': 540, 'nl_NL': 60,
  'pl_PL': 60, 'tr_TR': 180, 'ar_SA': 180, 'sv_SE': 60, 'da_DK': 60,
  'nb_NO': 60, 'fi_FI': 120, 'cs_CZ': 60, 'hu_HU': 60, 'ro_RO': 120,
  'uk_UA': 120, 'el_GR': 120, 'he_IL': 120, 'th_TH': 420, 'vi_VN': 420,
  'id_ID': 420, 'ms_MY': 480, 'fil_PH': 480, 'hi_IN': 330, 'ta_IN': 330,
  'bn_BD': 360, 'ur_PK': 300, 'fa_IR': 210, 'af_ZA': 120, 'hr_HR': 60,
  'sk_SK': 60, 'sl_SI': 60, 'bg_BG': 120, 'sr_SP': 60, 'lt_LT': 120,
  'lv_LV': 120, 'et_EE': 120, 'ka_GE': 240, 'hy_AM': 240, 'az_AZ': 240,
};

export const TZ_LABELS = [
  'UTC-12', 'UTC-11', 'UTC-10', 'UTC-9', 'UTC-8', 'UTC-7', 'UTC-6', 'UTC-5',
  'UTC-4', 'UTC-3', 'UTC-2', 'UTC-1', 'UTC+0',
  'UTC+1', 'UTC+2', 'UTC+3', 'UTC+4', 'UTC+5', 'UTC+6', 'UTC+7', 'UTC+8',
  'UTC+9', 'UTC+10', 'UTC+11', 'UTC+12', 'UTC+13', 'UTC+14',
  'UTC+3:30', 'UTC+4:30', 'UTC+5:30', 'UTC+5:45', 'UTC+6:30',
  'UTC+8:45', 'UTC+9:30', 'UTC+10:30', 'UTC+12:45',
];

export const TZ_VALUES = [
  -720, -660, -600, -540, -480, -420, -360, -300,
  -240, -180, -120, -60, 0,
  60, 120, 180, 240, 300, 360, 420, 480,
  540, 600, 660, 720, 780, 840,
  210, 270, 330, 345, 390,
  525, 570, 630, 765,
];

function getPlayerLocale(player) {
  if (!player) return '';

  try {
    const locale = player.clientSystemInfo?.locale;
    if (locale) {
      return locale;
    }

    const legacyCode = player.languageCode;
    if (legacyCode) {
      return legacyCode;
    }
  } catch (error) {
    // world.sendMessage(`§c[RTC] getPlayerLocale error: ${error}`);
    console.error(`[RTC] getPlayerLocale error: ${error}`);
  }

  return '';
}

export function ui(player) {
  const c = getPlayerLocale(player);
  if (c.startsWith('fr')) return UI.FR;
  return UI.EN;
}

export function text(player) {
  return getPlayerLocale(player).startsWith('fr') ? "FR" : "EN";
}

export function hostOffset() {
  return -new Date().getTimezoneOffset();
}

export function langToOffset(lang) {
  return LANG_TZ[lang] !== undefined ? LANG_TZ[lang] : hostOffset();
}

export function offsetStr(ms) {
  const h = ms / 60;
  const sign = h >= 0 ? '+' : '';
  if (ms % 60 === 0) return `UTC${sign}${h}`;
  const m = Math.abs(ms % 60);
  return `UTC${sign}${Math.floor(h)}:${String(m).padStart(2, '0')}`;
}

export function tzIndex(ms) {
  const idx = TZ_VALUES.indexOf(ms);
  if (idx >= 0) return idx;
  for (let i = 0; i < TZ_VALUES.length; i++) {
    if (Math.abs(TZ_VALUES[i] - ms) <= 30) return i;
  }
  return 12;
}

export function timeStr(offsetMinutes) {
  const now = new Date();
  const utc = now.getUTCHours() * 60 + now.getUTCMinutes();
  const total = ((utc + offsetMinutes) % 1440 + 1440) % 1440;
  const h = String(Math.floor(total / 60)).padStart(2, '0');
  const m = String(Math.floor(total % 60)).padStart(2, '0');
  const s = String(now.getUTCSeconds()).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function ensureObjectives() {
  const sb = world.scoreboard;
  for (const n of ['realHours', 'realMinutes', 'realSeconds', 'tzOffset', 'lang', 'showClockToggle']) {
    if (!sb.getObjective(n)) sb.addObjective(n, n);
  }
}

export function updateClockScores(player, off, langCode = '') {
  const sb = world.scoreboard;
  const now = new Date();
  const utcH = now.getUTCHours();
  const utcM = now.getUTCMinutes();
  const utcS = now.getUTCSeconds();
  const total = ((utcH * 60 + utcM + off) % 1440 + 1440) % 1440;

  sb.getObjective('realHours').setScore(player, Math.floor(total / 60));
  sb.getObjective('realMinutes').setScore(player, Math.floor(total % 60));
  sb.getObjective('realSeconds').setScore(player, utcS);

  const lc = langCode || getPlayerLocale(player);
  const langVal = lc.startsWith('fr') ? 1 : 0;
  sb.getObjective('lang').setScore(player, langVal);
}
