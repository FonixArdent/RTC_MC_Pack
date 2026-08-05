import { syncWorldTime } from './shared.js';
import { system } from '@minecraft/server';

system.runInterval(() => {
  syncWorldTime();
}, 20);