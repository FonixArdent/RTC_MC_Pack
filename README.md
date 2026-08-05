# Clock & Time Sync Add-On (Minecraft Bedrock)

## 📌 Overview
A complete Minecraft Bedrock add-on providing a dynamic clock system, a time synchronization module (*Time Sync*), an interactive User Interface (UI), and full bilingual support (French / English)[cite: 1].

---

## 🛠️ Features & Additions

### 1. ⏰ Clock System (`clock`)
- **Dynamic HUD Display**: Show (`show.mcfunction`) or hide (`hide.mcfunction`) the clock on screen[cite: 1].
- **Countdown / Cooldown Management**: Support for countdown toggle modes (`cd_on`, `cd_off`)[cite: 1].
- **Real-Time Update**: Optimized tick execution loop via `tick.json` and `tick.mcfunction`[cite: 1].
- **Interactive UI**: In-game control panel managed by `scripts/clock/ui.js`[cite: 1].
- **Data Storage**: Clock data handling via `clockdata.mcfunction` and `shared.js`[cite: 1].

### 2. 🔄 Time Sync (`time_sync`)
- **Dedicated Module**: Precise synchronization of world time or third-party scripts[cite: 1].
- **Commands & Setup**: Managed via `commands.js`, `setup.js`, and `shared.js`[cite: 1].

### 3. 🌐 Native Multilingual Support (`__Languages__` / `texts`)
- **Bilingual Support**: Fully integrated in **French (`fr_FR`)** and **English (`en_US`)**[cite: 1].
- **Dynamic Language Engine**: Powered by `lang_sys.js`, `clock_lang.js`, and `time_sync_clock.js`[cite: 1].
- **Conditional Execution**: `.mcfunction` files tailored per language (`FR_RAW_FCT_*` / `EN_RAW_FCT_*`)[cite: 1].

### 4. 💻 Technical Architecture (Script API)
- **Bedrock Script API (JavaScript)**: Core engine located under `scripts/main.js` combined with `.mcfunction` files[cite: 1].
- **Modularity**: Clean isolation of scripts (`clock`, `time_sync`, `info.js`)[cite: 1].

---

## 📂 File Structure

| Directory / File | Description |
| :--- | :--- |
| `manifest.json` | Pack declaration and Script API dependencies[cite: 1] |
| `pack_icon.png` | Pack thumbnail[cite: 1] |
| `scripts/clock/` | Clock JavaScript logic (commands, UI, configuration)[cite: 1] |
| `scripts/time_sync/` | Time synchronization JavaScript logic[cite: 1] |
| `scripts/__Languages__/` | Translation engine and language dictionaries[cite: 1] |
| `functions/clock/` | `.mcfunction` scripts for HUD display and tick management[cite: 1] |
| `functions/clock/LANG/` | Raw executions specific to each language (FR/EN)[cite: 1] |
| `texts/` | Minecraft localization files (`en_US.lang`, `fr_FR.lang`)[cite: 1] |

---

## 🚀 Installation

1. Download and import the `.mcpack` file into Minecraft Bedrock[cite: 1].
2. Enable the **Behavior Pack** in your world settings[cite: 1].
3. **Required**: Enable **Beta APIs / Beta Features** in your world's experimental settings[cite: 1].
