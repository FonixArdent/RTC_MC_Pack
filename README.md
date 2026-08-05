# Clock & Time Sync Add-On (Minecraft Bedrock)

## 📌 Overview
A complete Minecraft Bedrock add-on providing a dynamic clock system, a time synchronization module (*Time Sync*), an interactive User Interface (UI), and full bilingual support (French / English).

---

## 🛠️ Features & Additions

### 1. ⏰ Clock System (`clock`)
- **Dynamic HUD Display**: Show (`show.mcfunction`) or hide (`hide.mcfunction`) the clock on screen.
- **Countdown / Cooldown Management**: Support for countdown toggle modes (`cd_on`, `cd_off`).
- **Real-Time Update**: Optimized tick execution loop via `tick.json` and `tick.mcfunction`.
- **Interactive UI**: In-game control panel managed by `scripts/clock/ui.js`.
- **Data Storage**: Clock data handling via `clockdata.mcfunction` and `shared.js`.

### 2. 🔄 Time Sync (`time_sync`)
- **Dedicated Module**: Precise synchronization of world time or third-party scripts.
- **Commands & Setup**: Managed via `commands.js`, `setup.js`, and `shared.js`.

### 3. 🌐 Native Multilingual Support (`__Languages__` / `texts`)
- **Bilingual Support**: Fully integrated in **French (`fr_FR`)** and **English (`en_US`)**.
- **Dynamic Language Engine**: Powered by `lang_sys.js`, `clock_lang.js`, and `time_sync_clock.js`.
- **Conditional Execution**: `.mcfunction` files tailored per language (`FR_RAW_FCT_*` / `EN_RAW_FCT_*`).

### 4. 💻 Technical Architecture (Script API)
- **Bedrock Script API (JavaScript)**: Core engine located under `scripts/main.js` combined with `.mcfunction` files.
- **Modularity**: Clean isolation of scripts (`clock`, `time_sync`, `info.js`).

---

## 📂 File Structure

| Directory / File | Description |
| :--- | :--- |
| `manifest.json - Dot MC Pack` | Pack declaration and Script API dependencies |
| `pack_icon.png | Dot MC Pack` | Pack thumbnail |
| `scripts/clock/` | Clock JavaScript logic (commands, UI, configuration) |
| `scripts/time_sync/` | Time synchronization JavaScript logic |
| `scripts/__Languages__/` | Translation engine and language dictionaries |
| `functions/clock/` | `.mcfunction` scripts for HUD display and tick management |
| `functions/clock/LANG/` | Raw executions specific to each language (FR/EN) |
| `texts/` | Minecraft localization files (`en_US.lang`, `fr_FR.lang`) |

---

## 🚀 Installation

1. Download the `.mcpack` file into Minecraft Berdrock you will find it on curse forge
2. And Enjoy

## ✴️ Curse Forge Pack :

* **[Curseforge - RTC](<https://www.curseforge.com/minecraft-bedrock/addons/real-time-clock-rtc>)**