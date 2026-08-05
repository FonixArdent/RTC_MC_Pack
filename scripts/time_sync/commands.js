import { system, world } from '@minecraft/server';
import { toggleSync } from './shared.js';
import { CMD_MSG } from '../__Languages__/time_sync_clock.js';
import { text } from '../clock/shared.js';

system.beforeEvents.startup.subscribe((event) => {
    const reg = event.customCommandRegistry;

    reg.registerCommand({
        name: 'clock:time_sync',
        description: 'Toggle real-time sun sync',
        permissionLevel: 2,
    }, (origin) => {
        const p = origin.sourceEntity;
        if (!p) return;
        if ((p.commandPermissionLevel ?? 0) < 2) {
            p.sendMessage(CMD_MSG[text(p)]);
            return;
        }
        system.run(() => toggleSync());
    });
});