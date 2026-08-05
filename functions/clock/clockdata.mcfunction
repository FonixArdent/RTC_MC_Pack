# Toggle dataClock tag
scoreboard players set @s showClockToggle 1
execute as @s[tag=dataClock] run scoreboard players set @s showClockToggle 0
execute as @s[scores={showClockToggle=1}] run tag @s add dataClock
execute as @s[scores={showClockToggle=0}] run tag @s remove dataClock
# Language routing
execute as @s[scores={lang=1}] if entity @s[tag=dataClock] run function clock/LANG/FR_RAW_FCT_cd_on
execute as @s[scores={lang=1}] unless entity @s[tag=dataClock] run function clock/LANG/FR_RAW_FCT_cd_off
execute unless score @s lang matches 1 if entity @s[tag=dataClock] run function clock/LANG/EN_RAW_FCT_cd_on
execute unless score @s lang matches 1 unless entity @s[tag=dataClock] run function clock/LANG/EN_RAW_FCT_cd_off