tellraw @s {"rawtext":[{"text":"§a── Vue detaillee ──§r\nHeure : §e"},{"score":{"name":"@s","objective":"realHours"}},{"text":"§6:§e"},{"score":{"name":"@s","objective":"realMinutes"}},{"text":"§6:§e"},{"score":{"name":"@s","objective":"realSeconds"}},{"text":"§r\nDecalage horaire : §e"},{"score":{"name":"@s","objective":"tzOffset"}},{"text":" §7min§r\nLangue : §e1 §7(Francais)§r\nTag <showClock>"}]}
execute if entity @s[tag=showClock] run tellraw @s {"rawtext":[{"text":"§a: OUI"}]}
execute unless entity @s[tag=showClock] run tellraw @s {"rawtext":[{"text":"§c: NON"}]}
tellraw @s {"rawtext":[{"text":"Tag <dataClock>"}]}
execute if entity @s[tag=dataClock] run tellraw @s {"rawtext":[{"text":"§a: OUI"}]}
execute unless entity @s[tag=dataClock] run tellraw @s {"rawtext":[{"text":"§c: NON"}]}