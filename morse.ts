const alphabet: { [key: string]: string } = {
    "01": "A",
    "1000": "B",
    "1010": "C",
    "100": "D",
    "0": "E",
    "0010": "F",
    "110": "G",
    "0000": "H",
    "00": "I",
    "0111": "J",
    "101": "K",
    "0100": "L",
    "11": "M",
    "10": "N",
    "111": "O",
    "0110": "P",
    "1101": "Q",
    "010": "R",
    "000": "S",
    "1": "T",
    "001": "U",
    "0001": "V",
    "011": "W",
    "1001": "X",
    "1011": "Y",
    "1100": "Z",
    "2": " ",
    "22": "<",
    "11111": "0",
    "01111": "1",
    "00111": "2",
    "00011": "3",
    "00001": "4",
    "00000": "5",
    "10000": "6",
    "11000": "7",
    "11100": "8",
    "11110": "9",
}
declare var buff: string;
declare var buff_raw: string;
declare var quit: boolean;
declare var quit_hold: boolean;
buff = "";
quit = false;
quit_hold = false;
buff_raw = "";
function inputLoop() {
    let key_in: string;
    let char_index: number;
    let on: boolean;
    let timer: number;
    let timeout: boolean;
    let last_time: number;
    let startquit : boolean = false;
    basic.showString(">")
    while (true) {
        basic.clearScreen();
        key_in = "";
        char_index = -1;
        on = false;
        timer = 0;
        timeout = false;
        while (char_index < 5) {
            if (input.buttonIsPressed(Button.B)) {
                startquit = true;
            }
            else {if(startquit) return;}
            if (input.buttonIsPressed(Button.A)) {
                if (!on) {
                    on = true;
                    timeout = false;
                    char_index += 1;
                    last_time = input.runningTime();
                    timer = 0;
                }

                timer += input.runningTime() - last_time;
                last_time = input.runningTime();
                led.plot(timer / 100 - 1, char_index);
                if (timer > 800) {
                    on = false;
                    key_in += Math.idiv(timer, 300);
                    timer = 0;
                }
            } else {
                if (on == true) {
                    key_in += Math.idiv(timer, 250);
                    on = false;
                    timeout = true;
                    last_time = input.runningTime();
                    timer = 0;
                }

                if (timeout) {
                    timer += input.runningTime() - last_time
                    last_time = input.runningTime()
                    if (timer > 600) {
                        break
                    }

                }

            }

        }
        let letter = alphabet[key_in];
        if (letter) {
            if (letter == " ")
                basic.showLeds(`
                . . . . .
                . . . . .
                . . . . .
                # . . . #
                # # # # #
                `);
            else {
                basic.showString(letter)
                if (letter == "<") {
                    buff = buff.slice(0, -1);
                    buff_raw = buff_raw.slice(0, -1);
                    while (buff_raw.length > 0 && buff_raw[buff_raw.length - 1] != "-") {
                        buff_raw = buff_raw.slice(0, -1);
                    }
                    continue;
                }
            }
            buff += alphabet[key_in];
            buff_raw += key_in;
            buff_raw += "-";
        }
        else basic.showString("?");
    }
}

function display() {
    basic.pause(200);
    quit = false;
    while (!quit)
        basic.showString(buff);
    quit = false;
}

function beep(time: string) {
    if (time == "2") {
        basic.pause(700);
        return;
    }
    if (time == "-") {
        basic.pause(300);
        return;
    }
    basic.plotLeds(`
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    # # # # #
    `);
    let toneDuration;
    if (time == "0") toneDuration = 100;
    if (time == "1") toneDuration = 300;
    music.play(music.tonePlayable(Note.C, toneDuration), music.PlaybackMode.UntilDone);
    basic.clearScreen();
    basic.pause(100);
}
function playback() {
    basic.pause(100);
    while (!quit) {
        for (let i = 0; i < buff_raw.length; i++) {
            beep(buff_raw[i]);
        }
        basic.pause(900);
    }
    quit = false;
}

basic.forever(function on_forever() {
    inputLoop();
    display();
    playback();
})
input.onButtonPressed(Button.B, function () {
    quit = true;
})