tag @s add showClock
execute as @s[scores={lang=1}] run function clock/LANG/FR_RAW_FCT_show
execute unless score @s lang matches 1 run function clock/LANG/EN_RAW_FCT_show
