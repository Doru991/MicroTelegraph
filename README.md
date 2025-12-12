## About
MicroTelegraph is a simplistic Morse code learning and playback tool for the BBC Micro:bit family of educational development boards.

If you happen to have one of these laying around, why not use it to learn Morse code?
## Usage
The program is controlled using only the device's face buttons.
* **A** - Telegraph Input
* **B** - Cycle Modes
## Modes
* Input mode: Initial mode. Use the **A** button to input symbols via Morse code. `>` will flash on the screen when Input mode is active.
* Display mode: Displays the current buffer.
* Playback mode: Plays back the recorded buffer as Morse code, both via the LED display and audio through the pin interface.
## Input mode guide
In input mode, rows on the LED will fill up as you hold the **A** button.
- 1 Led (# .  .  .  . ) - Morse code dot
- 2-4 Leds (# # .  .  . ) .. (# # # # . ) - Morse code dash
- 5 Leds (# # # # #) - Special control
- 
Once you start inputting, the character will automatically be evaluated after a short period of no input.

After you enter a character, the screen will display:
* The character itself (for normal Morse code)
* `?` for invalid input
* `<` for backspace and `|_|` for space

Special controls:
* 1x full row: Spacebar
* 2x full rows: Backspace
### Todo
- [ ] Force skipping modes (currently, when trying to cycle modes in Playback and Display modes, the action will be postponed until the current display cycle finishes.
- [ ] Tidy up the code (It works but it's very unpolished)

## Compiling
Simply open the official Micro:bit online editor, copy the contents of `morse.ts` into the Javascript editor and hit download to obtain the hex file. Afterwards, flash it as usual.
