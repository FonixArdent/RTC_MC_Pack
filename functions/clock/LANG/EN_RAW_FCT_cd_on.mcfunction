tellraw @s {"rawtext":[{"text":"§a── Detailed View ──§r\nTime: §e"},{"score":{"name":"@s","objective":"realHours"}},{"text":"§6:§e"},{"score":{"name":"@s","objective":"realMinutes"}},{"text":"§6:§e"},{"score":{"name":"@s","objective":"realSeconds"}},{"text":"§r\nTimezone offset: §e"},{"score":{"name":"@s","objective":"tzOffset"}},{"text":" §7min§r\nLanguage: §e0 §7(English)§r\nTag <showClock>"}]}
execute if entity @s[tag=showClock] run tellraw @s {"rawtext":[{"text":"§a: YES"}]}
execute unless entity @s[tag=showClock] run tellraw @s {"rawtext":[{"text":"§c: NO"}]}
tellraw @s {"rawtext":[{"text":"Tag <dataClock>"}]}
execute if entity @s[tag=dataClock] run tellraw @s {"rawtext":[{"text":"§a: YES"}]}
execute unless entity @s[tag=dataClock] run tellraw @s {"rawtext":[{"text":"§c: NO"}]}