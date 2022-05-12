//glowing
const stage = new stageObj(() => innerWidth, () => innerHeight);

const iconsrc = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAApCAYAAABz26rUAAAAAXNSR0IArs4c6QAAAidJREFUWEftWMltw0AMlOtKFXbyzDcNuAA/XIAbyDdPx6nCdSVggDEohqdWRwTIHwPaXe4Mh8Ndadet/LdbOf5uI7C0gpMqcHg6fN/ut0n3mDT4agjMAdQq1U0ByoylQKsymfWjKICN6D/TlaSxM0AnLSEO/PPrGnJ43r90nESLgs0K0OYSNAG0fpjLSVQIyLlNBDh4Dvr8elbxnz5Ov88liUUIaOAt4JwNJwEVFiVAIDLAJQmuAo2RJ7wmYJ3o6RKSWYICmdKR9SRVwLjXACy10gQkCE6AFACoqP55HA2w1gA0tRAnTcBTAKBBwupAl7fLY+j4fuyZGQNaAiiu1r1ozYNAdJhkCXCQ3oFABDzQWtkRCXmGlBSQQRGQK1AhUDE/VDAJRNcBy2C8C9EmYxKQJekqgBYWdQKtLMZUgIPWPOMqIN0uwVoGo3lVEuQBzfyWgjB9SAAlQZnI1ihvoZky4gZGkqLSG0SAZza6YlrSYx0HDbD0LALO14ce0LpKVgXayDsHNKCzEIhU0EBXslqZW1YgyiqNSwCVrNL67PyyB+TtsZKp7NwsAe4feSvtXSWkB0Ai01m42cYiAODex7F/R8DLttYJVQLSuBUFsmWhtVd6Vv0U+YcABcGdvHq6RmWkHWBVwFKF3m3Ues8dooAmdytYt4QwaH1p8IypZXZIOUSnfYoATcp+YUPAKTKbJZN+ockGnHveRmDujLtdaGkwQ/ZffQn9AMT2MUjamBt7AAAAAElFTkSuQmCC';

let fieldi;
let fieldc;
let pfieldi;
let pfieldc;

const holdc = new charObj(10, 5, false, 8);
const damagec = new charObj(10, 15, false, 8);
const scorec = new charObj(50, 90, false, 4);
const nextc = [
    new charObj(90, 5, false, 10),
    new charObj(90, 15, false, 10),
    new charObj(90, 25, false, 10),
    new charObj(90, 35, false, 10),
    new charObj(90, 45, false, 10)
];
const scorei = new textObj('score: 0', 'sans-serif', '#fff', '#000', 4);
scorec.on(scorei);

const bcgi = new fillObj('skyblue', 100, 100);
const bcgc = new charObj(50, 50, 100, 100);
bcgc.on(bcgi);
const iconi = new imgObj(iconsrc, 0, 0);
const iconc = new charObj(50, 25, 50);
iconc.on(iconi);
const fulli = new textObj('全画面表示', 'sans-serif', '#fff', '#000', 6);
const fullc = new charObj(50, 'calc(100%-100@)', false, 3);
fullc.addEvent('click', full);
fulli.co = true;
fullc.on(fulli);

function msgDisplay(msg, color, floor) {
    const f = (floor != null) ? floor : 0;
    let alpha = 100;
    const txti = new textObj(msg, 'sans-serif', '#fff', color, 4);
    const txtc = new charObj(50, 50 + 15 * f, false, 15);
    txtc.on(txti);
    stage.put(txtc);
    const inter = setInterval(() => {
        if (0 < alpha) {
            alpha--;
            txtc.alpha = alpha / 100;
        } else {
            alpha = 0;
            clearInterval(inter);
        }
    }, 10);
}

//game
let game = false;
let gamemode;
let fullscreen = false;
let sock;

let runstopbool = true;

const mino7 = ['i', 't', 'o', 's', 'z', 'l', 'j'];
const nextMino = [];

let ren = -1;
let btb = false;
let score = 0;
let main;
let dMain;
let pMain;
let nowMino;
let holdMino = 'none';
let permHold = true;
let lasthole = null;
let gameset = false;
let HNalpha = false;
let RQA = false;

let mydamage = [];
let battleFunction;
let endBattleFunction;
let attackBattleFunction;


const chatElement = document.getElementById('chat');
const chatinp = document.getElementById('chatinp');
const messageElement = document.getElementById('message');
let sendChatFunction;

function send(m) {
    if (sock != null) {
        sock.send(JSON.stringify(m));
    }
}

function chatsend() {
    if (sendChatFunction != null && !(chatinp.value.match(/^[\s　ᅟᅠ᠎​‌⁣‍⁠⁡⁢⁣⁤ㅤﾠ]*$/))) {
        sendChatFunction(chatinp.value);
        chatinp.value = '';
    }
}
chatinp.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        chatsend();
    }
});

function techsend(d) {
    if (sendChatFunction != null) {
        sendChatFunction(d, true);
    }
}

const previewMino = {
    i: new field(4, 4),
    t: new field(3, 3),
    s: new field(3, 3),
    z: new field(3, 3),
    j: new field(3, 3),
    l: new field(3, 3),
    o: new field(4, 4),
    none: new field(4, 4)
};

//i
previewMino.i.data[1][0] = 'i';
previewMino.i.data[1][1] = 'i';
previewMino.i.data[1][2] = 'i';
previewMino.i.data[1][3] = 'i';
previewMino.i.netline().render().drawfield();
//t
previewMino.t.data[1][0] = 't';
previewMino.t.data[1][1] = 't';
previewMino.t.data[1][2] = 't';
previewMino.t.data[0][1] = 't';
previewMino.t.netline().render().drawfield();
//s
previewMino.s.data[0][1] = 's';
previewMino.s.data[0][2] = 's';
previewMino.s.data[1][0] = 's';
previewMino.s.data[1][1] = 's';
previewMino.s.netline().render().drawfield();
//z
previewMino.z.data[0][0] = 'z';
previewMino.z.data[0][1] = 'z';
previewMino.z.data[1][1] = 'z';
previewMino.z.data[1][2] = 'z';
previewMino.z.netline().render().drawfield();
//j
previewMino.j.data[0][0] = 'j';
previewMino.j.data[1][0] = 'j';
previewMino.j.data[1][1] = 'j';
previewMino.j.data[1][2] = 'j';
previewMino.j.netline().render().drawfield();
//l
previewMino.l.data[0][2] = 'l';
previewMino.l.data[1][0] = 'l';
previewMino.l.data[1][1] = 'l';
previewMino.l.data[1][2] = 'l';
previewMino.l.netline().render().drawfield();
//o
previewMino.o.data[0][1] = 'o';
previewMino.o.data[1][1] = 'o';
previewMino.o.data[0][2] = 'o';
previewMino.o.data[1][2] = 'o';
previewMino.o.netline().render().drawfield();
//none
previewMino.none.netline().render().drawfield();


//right
let rightLoopPerm = false;
let rightLoopNow = false;
let rightLoopCount = 0;
let rightLoop60 = setInterval(() => {
    if (RQA) {
        clearInterval(rightLoop60);
    } else {
        if (game) {
            if (rightLoopPerm === true && leftLoopNow === false) {
                rightLoopNow = true;
                rightLoopCount++;
            } else {
                rightLoopNow = false;
                rightLoopCount = 0;
            }
            if ((rightLoopCount === 1 || 15 < rightLoopCount) && rightLoopCount % 2 === 1 && nowMino != null) {
                nowMino.control('ArrowRight');
            }
        }
    }
}, 1000 / 90);

function rightLoop() {
    if (RQA) {
        if (game) {
            if (rightLoopPerm === true && leftLoopNow === false) {
                rightLoopNow = true;
                rightLoopCount++;
            } else {
                rightLoopNow = false;
                rightLoopCount = 0;
            }
            if ((rightLoopCount === 1 || 15 < rightLoopCount) && rightLoopCount % 2 === 1 && nowMino != null) {
                nowMino.control('ArrowRight');
            }
        }
        requestAnimationFrame(rightLoop);
    }
}

//left
let leftLoopPerm = false;
let leftLoopNow = false;
let leftLoopCount = 0;
let leftLoop60 = setInterval(() => {
    if (RQA) {
        clearInterval(leftLoop60);
    } else {
        if (game) {
            if (leftLoopPerm === true && rightLoopNow === false) {
                leftLoopNow = true;
                leftLoopCount++;
            } else {
                leftLoopNow = false;
                leftLoopCount = 0;
            }
            if ((leftLoopCount === 1 || 15 < leftLoopCount) && leftLoopCount % 2 === 1 && nowMino != null) {
                nowMino.control('ArrowLeft');
            }
        }
    }
}, 1000 / 90);

function leftLoop() {
    if (RQA) {
        if (game) {
            if (leftLoopPerm === true && rightLoopNow === false) {
                leftLoopNow = true;
                leftLoopCount++;
            } else {
                leftLoopNow = false;
                leftLoopCount = 0;
            }
            if ((leftLoopCount === 1 || 15 < leftLoopCount) && leftLoopCount % 2 === 1 && nowMino != null) {
                nowMino.control('ArrowLeft');
            }
        }
        requestAnimationFrame(leftLoop);
    }
}

//down
let downLoopPerm = false;
let downLoopCount = 0;
let downLoop60 = setInterval(() => {
    if (RQA) {
        clearInterval(downLoop60);
    } else {
        if (game) {
            if (downLoopPerm === true) {
                downLoopCount++;
            } else {
                downLoopCount = 0;
            }
            if (downLoopCount % 2 === 1 && nowMino != null) {
                nowMino.control('ArrowDown');
            }
        }
    }
}, 1000 / 90);

function downLoop() {
    if (RQA) {
        if (game) {
            if (downLoopPerm === true) {
                downLoopCount++;
            } else {
                downLoopCount = 0;
            }
            if (downLoopCount % 2 === 1 && nowMino != null) {
                nowMino.control('ArrowDown');
            }
        }
        requestAnimationFrame(downLoop);
    }
}

function RQAor60FPS() {
    if (RQA) {
        RQA = false;
        rightLoop60 = setInterval(() => {
            if (RQA) {
                clearInterval(rightLoop60);
            } else {
                if (game) {
                    if (rightLoopPerm === true && leftLoopNow === false) {
                        rightLoopNow = true;
                        rightLoopCount++;
                    } else {
                        rightLoopNow = false;
                        rightLoopCount = 0;
                    }
                    if ((rightLoopCount === 1 || 15 < rightLoopCount) && rightLoopCount % 2 === 1 && nowMino != null) {
                        nowMino.control('ArrowRight');
                    }
                }
            }
        }, 1000 / 90);
        leftLoop60 = setInterval(() => {
            if (RQA) {
                clearInterval(leftLoop60);
            } else {
                if (game) {
                    if (leftLoopPerm === true && rightLoopNow === false) {
                        leftLoopNow = true;
                        leftLoopCount++;
                    } else {
                        leftLoopNow = false;
                        leftLoopCount = 0;
                    }
                    if ((leftLoopCount === 1 || 15 < leftLoopCount) && leftLoopCount % 2 === 1 && nowMino != null) {
                        nowMino.control('ArrowLeft');
                    }
                }
            }
        }, 1000 / 90);
        downLoop60 = setInterval(() => {
            if (RQA) {
                clearInterval(downLoop60);
            } else {
                if (game) {
                    if (downLoopPerm === true) {
                        downLoopCount++;
                    } else {
                        downLoopCount = 0;
                    }
                    if (downLoopCount % 2 === 1 && nowMino != null) {
                        nowMino.control('ArrowDown');
                    }
                }
            }
        }, 1000 / 90);
        RQAor60btni.setText('90');
    } else {
        RQA = true;
        rightLoop();
        leftLoop();
        downLoop();
        RQAor60btni.setText('自動');
    }
}

const RQAor60btnc = new charObj(96, 96, 2, 2);
const RQAor60btni = new textObj('90', 'sans-serif', 'orange', '#000', 4);
RQAor60btni.co = true;
RQAor60btnc.on(RQAor60btni);
RQAor60btnc.addEvent('click', RQAor60FPS);

document.addEventListener('keydown', e => {
    if (game && nowMino != null) {
        if (e.repeat === false) {
            if (e.key === ' ') {
                score += 5;
            }
            if (e.key === 'ArrowRight') {
                rightLoopPerm = true;
            } else if (e.key === 'ArrowLeft') {
                leftLoopPerm = true;
            } else if (e.key === 'ArrowDown') {
                downLoopPerm = true;
            } else if (e.key === 'c') {
                if (permHold && runstopbool) {
                    if (holdMino === 'none') {
                        nowMino.landing = true;
                        holdMino = nowMino.type;
                        minobag(true);
                    } else {
                        nowMino.landing = true;
                        nextMino.unshift(holdMino);
                        holdMino = nowMino.type;
                        minobag(true);
                    }
                }
            } else if (e.key === 'a') {
                if (HNalpha === false) {
                    for (let n = -3; n < 5; n++) {
                        if (n === -3) {
                            pfieldc.alpha = 0.2;
                        } else if (n === -2) {
                            damagec.alpha = 0.6;
                        } else if (n === -1) {
                            holdc.alpha = 0.6;
                        } else {
                            nextc[n].alpha = 0.6;
                        }
                    }
                    HNalpha = true;
                } else {
                    for (let n = -3; n < 5; n++) {
                        if (n === -3) {
                            pfieldc.alpha = 1;
                        } else if (n === -2) {
                            damagec.alpha = 1;
                        } else if (n === -1) {
                            holdc.alpha = 1;
                        } else {
                            nextc[n].alpha = 1;
                        }
                    }
                    HNalpha = false;
                }
            } else if (e.key === 'r' && gamemode === 'normal') {
                start();
            } else if (e.key === 'Escape' && gamemode === 'normal') {
                startMenu();
            } else if (runstopbool) {
                nowMino.control(e.key);
            }
        }
    } else if (game === false && nowMino != null && e.key === 'Escape' && gamemode === 'fin') {
        startMenu();
    } else if (game === false && nowMino != null && e.key === 'r' && gamemode === 'fin') {
        if (sock != null) {
            send({
                type: 'continue'
            });
        }
    }
});
document.addEventListener('keyup', e => {
    if (game) {
        if (e.key === 'ArrowRight') {
            rightLoopPerm = false;
            rightLoopCount = 0;
        } else if (e.key === 'ArrowLeft') {
            leftLoopPerm = false;
            leftLoopCount = 0;
        } else if (e.key === 'ArrowDown') {
            downLoopPerm = false;
            downLoopCount = 0;
        }
    }
});


function minobag(hold = false) {
    if (game && runstopbool) {
        let damage = 0;
        let clearline = 0;
        let perfect = true;
        let plusscore = 0;
        for (let i1 = 0; i1 < main.data.length; i1++) {
            if (main.data[i1].indexOf('') === -1) {
                main.data.splice(i1, 1);
                const ins = [];
                for (let i2 = 0; i2 < main.width; i2++) {
                    ins.push('');
                }
                main.data.unshift(ins);
                clearline++;
            }
            if (main.data[i1].join('') !== '') {
                perfect = false;
            }
        }
        if (clearline !== 0) {
            main.render().drawfield();
        }

        if (nowMino != null) {
            if (nowMino.tspin) {
                if (clearline === 0) {
                    if (nowMino.miniTspin) {
                        msgDisplay('T-Spin Mini', '#00f');
                        techsend('T-Spin Mini');
                    } else {
                        msgDisplay('T-Spin', '#00f');
                        techsend('T-Spin');
                    }
                } else if (clearline === 1) {
                    if (nowMino.miniTspin) {
                        msgDisplay('T-Spin Mini Single', '#00f');
                        techsend('T-Spin Mini Single');
                    } else {
                        msgDisplay('T-Spin Single', '#00f');
                        techsend('T-Spin Single');
                        damage += 2;
                    }
                } else if (clearline === 2) {
                    if (nowMino.miniTspin) {
                        msgDisplay('T-Spin Mini Double', '#00f');
                        techsend('T-Spin Mini Double');
                    } else {
                        msgDisplay('T-Spin Double', '#00f');
                        techsend('T-Spin Double');
                        damage += 4;
                    }
                } else if (clearline === 3) {
                    msgDisplay('T-Spin Triple', '#00f');
                    techsend('T-Spin Triple');
                    damage += 6;
                }
                if (btb && nowMino.tspin === true && 0 < clearline) {
                    msgDisplay('Back-to-Back', '#00f', 1);
                    techsend('Back-to-Back');
                    damage += 1;
                } else if (nowMino.tspin === true && 0 < clearline) {
                    btb = true;
                }
            }
        }

        if (clearline === 4) {
            msgDisplay('Tetris', '#00f');
            techsend('Tetris');
            damage += 4;
            if (btb) {
                msgDisplay('Back-to-Back', '#00f', 1);
                techsend('Back-to-Back');
                damage += 1;
            } else {
                btb = true;
            }
        } else if (0 < clearline && (nowMino.tspin === false || nowMino.miniTspin === true)) {
            btb = false;
            damage += (clearline - 1);
            plusscore++;

        }

        if (perfect && 0 < clearline) {
            ren++;
            msgDisplay('Perfect Clear', 'greenyellow', -2);
            techsend('Perfect Clear');
            damage += 10;
        } else if (0 < clearline) {
            ren++;
            if (0 < ren) {
                msgDisplay(ren + 'REN', '#00f', -1);
                techsend(ren + 'REN');
            }
            if (10 < ren) {
                damage += 5;
            } else if (7 < ren) {
                damage += 4;
            } else if (5 < ren) {
                damage += 3;
            } else if (3 < ren) {
                damage += 2;
            } else if (1 < ren) {
                damage += 1;
            }
        } else if (hold === false) {
            ren = -1;
        }
        if (0 < clearline) {
            runstopbool = false;
            setTimeout(minobagNext, 300);
        } else {
            minobagNext();
        }

        function minobagNext() {
            if (game) {
                runstopbool = true;
                if (nextMino.length <= 5) {
                    while (nextMino.length <= 5) {
                        const mino7a = JSON.parse(JSON.stringify(mino7));
                        while (mino7a.length !== 0) {
                            nextMino.push(mino7a.splice(Math.floor(Math.random() * mino7a.length), 1)[0]);
                        }
                    }
                }
                nowMino = new mino(nextMino.shift(), main, minobag);
                for (let i = 0; i < 5; i++) {
                    const canvas = previewMino[nextMino[i]].canvas.cloneNode();
                    const context = canvas.getContext('2d');
                    context.drawImage(previewMino[nextMino[i]].canvas, 0, 0);
                    nextc[i].items = [new imgObj(canvas, 0, 0, canvas.width, canvas.height)];
                }
                if (holdMino != null) {
                    const canvas = previewMino[holdMino].canvas.cloneNode();
                    const context = canvas.getContext('2d');
                    context.drawImage(previewMino[holdMino].canvas, 0, 0);
                    holdc.items = [new imgObj(canvas, 0, 0, canvas.width, canvas.height)];
                }
                score += (damage * 100 + plusscore * 100);
                scorei.setText('score: ' + score);
                nowMino.render();
                if (gamemode === 'battle') {
                    attackBattleFunction(damage);
                    battleFunction();
                }
                if (hold) {
                    permHold = false;
                } else {
                    permHold = true;
                }
            } else {
                nowMino.landing = true;
            }
        }
    } else {
        if (gamemode === 'normal') {
            nowMino.landing = true;
            startMenu();
            msgDisplay('GAME OVER', 'red');
        } else if (gamemode === 'battle') {
            endBattleFunction();
            nowMino.landing = true;
        }
    }
}


function start() {
    rightLoopPerm = false;
    lrLoopCount = 0;
    leftLoopPerm = false;
    lrLoopCount = 0;
    downLoopPerm = false;
    downLoopCount = 0;
    gamemode = 'normal';
    if (nowMino != null) {
        main.canvas.remove();
        nowMino.landing = true;
        while (nextMino.length !== 0) {
            nextMino.shift();
        }
    }
    game = true;
    runstopbool = true;
    btb = false;
    score = 0;
    ren = -1;
    holdMino = 'none';
    permHold = true;
    let pushedDiv = document.createElement('div');
    main = new field(10, 50, pushedDiv, () => {
        game = false;
        gameset = true;
        pushedDiv.remove();
        pushedDiv = null;
    });
    main.netline().drawfield();
    for (let n = 0; n < nextc.length; n++) {
        nextc[n].x = 90;
    }
    fieldi = new imgObj(main.canvas, 0, 0, main.canvas.width, main.canvas.height);
    fieldc = new charObj(50, 50, false, 80);
    fieldc.on(fieldi);
    iconi.smooth = true;
    stage.stage = [bcgc, iconc, fullc, RQAor60btnc, fieldc, holdc, scorec, nextc[0], nextc[1], nextc[2], nextc[3], nextc[4]];
    minobag();
}

function battle() {
    if (gamemode !== 'battle') {
        messageElement.innerHTML = '';
        gamemode = 'battle';
        rightLoopPerm = false;
        lrLoopCount = 0;
        leftLoopPerm = false;
        lrLoopCount = 0;
        downLoopPerm = false;
        downLoopCount = 0;
        chatinp.value = '';
        if (nowMino != null) {
            main.canvas.remove();
            nowMino.landing = true;
            while (nextMino.length !== 0) {
                nextMino.shift();
            }
        }
        game = true;
        runstopbool = true;
        btb = false;
        score = 0;
        ren = -1;
        holdMino = 'none';
        permHold = true;
        mydamage = [];
        let pushedDiv = document.createElement('div');
        main = new field(10, 50, pushedDiv, () => {
            game = false;
            gameset = true;
            pushedDiv.remove();
            pushedDiv = null;
        });
        for (let n = 0; n < nextc.length; n++) {
            nextc[n].x = 'calc(100@/3*10+15*(100%/(100@/3*10))*(100%/(100@/3*10)))';
        }
        if (holdMino != null) {
            const canvas = previewMino[holdMino].canvas.cloneNode();
            const context = canvas.getContext('2d');
            context.drawImage(previewMino[holdMino].canvas, 0, 0);
            holdc.items = [new imgObj(canvas, 0, 0, canvas.width, canvas.height)];
        }
        main.netline().drawfield();
        pMain = new field(10, 50, pushedDiv);
        pMain.netline().drawfield();
        dMain = new field(1, 1, pushedDiv);
        dMain.netline().drawfield();
        damagec.items = [new imgObj(dMain.canvas, 0, 0, dMain.canvas.width, dMain.canvas.height)];

        fieldi = new imgObj(main.canvas, 0, 0, main.canvas.width, main.canvas.height);
        fieldc = new charObj('calc(50@+10*100%/100@*100%/100@)', 50, false, 80);
        fieldc.on(fieldi);

        pfieldi = new imgObj(pMain.canvas, 0, 0, pMain.canvas.width, pMain.canvas.height);
        pfieldc = new charObj('calc(100%-(50@+10*100%/100@*100%/100@))', 50, false, 80);
        pfieldc.on(pfieldi);

        iconi.smooth = true;

        for (let i = 0; i < 5; i++) {
            const canvas = previewMino.none.canvas.cloneNode();
            const context = canvas.getContext('2d');
            context.drawImage(previewMino.none.canvas, 0, 0);
            nextc[i].items = [new imgObj(canvas, 0, 0, canvas.width, canvas.height)];
        }

        stage.stage = [bcgc, iconc, fullc, RQAor60btnc, pfieldc, fieldc, damagec, holdc, nextc[0], nextc[1], nextc[2], nextc[3], nextc[4]];

        if (sock == null) {

            msgDisplay('サーバーに接続します', 'blue');

            //websocket
            // sock = new WebSocket("ws://127.0.0.1:8080");
            sock = new WebSocket("wss://horse-tortoiseshell-crater.glitch.me");

            sock.addEventListener("open", () => {
                chatElement.className = 'flex';
                battleFunction = () => {
                    send({
                        type: 'battle',
                        battle: 'field',
                        data: main.data
                    });
                };
                endBattleFunction = () => {
                    if (gameset) {
                        send({
                            type: 'battle',
                            battle: 'lose',
                            score: score
                        });
                    }
                };
                attackBattleFunction = (d) => {
                    if (d <= mydamage.length) {
                        dMain.data[0][0] = '';
                        dMain.render().drawfield();
                        for (let i = 0; i < mydamage.length; i++) {
                            main.data.shift();
                            main.data.push(mydamage[i]);
                        }
                        mydamage = [];
                        main.render().drawfield();
                    } else {
                        send({
                            type: 'battle',
                            battle: 'attack',
                            data: d - mydamage
                        });
                    }
                };
                sendChatFunction = (d, tech) => {
                    if (tech === true) {
                        send({
                            type: 'tech',
                            data: d
                        });
                    } else {
                        send({
                            type: 'chat',
                            data: d
                        });
                    }
                }
            });
            sock.addEventListener("message", e => {
                const ms = JSON.parse(e.data);
                if (ms.type === 'key') {
                    send({
                        type: 'keyconnect',
                        data: ms.data
                    });
                } else if (ms.type === 'count') {
                    if (ms.count === 3) {
                        while (nextMino.length <= 5) {
                            const mino7a = JSON.parse(JSON.stringify(mino7));
                            while (mino7a.length !== 0) {
                                nextMino.push(mino7a.splice(Math.floor(Math.random() * mino7a.length), 1)[0]);
                            }
                        }
                        for (let i = 0; i < 5; i++) {
                            const canvas = previewMino[nextMino[i]].canvas.cloneNode();
                            const context = canvas.getContext('2d');
                            context.drawImage(previewMino[nextMino[i]].canvas, 0, 0);
                            nextc[i].items = [new imgObj(canvas, 0, 0, canvas.width, canvas.height)];
                        }
                    }
                    msgDisplay('' + ms.count, 'blue');
                } else if (ms.type === 'start') {
                    msgDisplay('START!', 'greenyellow');
                    main.netline().drawfield();
                    minobag();
                } else if (ms.type === 'attack') {
                    const insertArray = [];
                    if (lasthole != null && 0.25 < Math.random()) {
                        const space = lasthole;
                        for (let i = 0; i < main.width; i++) {
                            if (i === space) {
                                insertArray.push('');
                            } else {
                                insertArray.push('d');
                            }
                        }
                    } else {
                        const space = Math.floor(Math.random() * main.width);
                        lasthole = space;
                        for (let i = 0; i < main.width; i++) {
                            if (i === space) {
                                insertArray.push('');
                            } else {
                                insertArray.push('d');
                            }
                        }
                    }
                    for (let i = 0; i < ms.data; i++) {
                        mydamage.push(JSON.parse(JSON.stringify(insertArray)));
                    }
                    if (0 === mydamage.length) {
                        dMain.data[0][0] = 'i';
                    } else if (1 === mydamage.length) {
                        dMain.data[0][0] = 'j';
                    } else if (2 === mydamage.length) {
                        dMain.data[0][0] = 'l';
                    } else if (3 === mydamage.length) {
                        dMain.data[0][0] = 'o';
                    } else if (4 === mydamage.length) {
                        dMain.data[0][0] = 's';
                    } else if (5 === mydamage.length) {
                        dMain.data[0][0] = 't';
                    } else if (5 < mydamage.length) {
                        dMain.data[0][0] = 'z';
                    }
                    dMain.render().drawfield();
                } else if (ms.type === 'field') {
                    pMain.data = ms.data;
                    pMain.render().drawfield();
                } else if (ms.type === 'lose') {
                    gamemode = 'fin';
                    game = false;
                    nowMino.landing = true;
                    const d = document.createElement('div');
                    d.classList.add('blue');
                    d.innerText = 'あなたのまけです。。。。\n・・・スコア: ' + score + '\n\n相手のスコア: ' + ms.score;
                    messageElement.appendChild(d);
                    d.scrollIntoView(false);
                    msgDisplay('You lose...', 'blue');
                    setTimeout(() => {
                        msgDisplay('You lose...', 'blue');
                        const contii1 = new textObj('つづけて誰かと対戦する', 'sans-serif', '#fff', '#000', 4);
                        const contii2 = new frameObj(600, 50, 2, '#00f', '#fff');
                        const contic = new charObj(50, 60, false, 5);
                        contic.addEvent('click', () => send({
                            type: 'continue'
                        }));
                        contic.on(contii2, contii1);
                        stage.put(contic);
                    }, 1000);
                } else if (ms.type === 'win') {
                    gamemode = 'fin';
                    game = false;
                    nowMino.landing = true;
                    const d = document.createElement('div');
                    d.classList.add('orange');
                    d.innerText = 'かち！！！！\n・・・スコア: ' + score + '\n\n相手のスコア: ' + ms.score;
                    messageElement.appendChild(d);
                    d.scrollIntoView(false);
                    send({
                        type: 'battle',
                        battle: 'win',
                        score: score
                    });
                    msgDisplay('YOU WIN!!', 'greenyellow');
                    setTimeout(() => {
                        msgDisplay('YOU WIN!!', 'greenyellow');
                        const contii1 = new textObj('つづけて誰かと対戦する', 'sans-serif', '#fff', '#000', 4);
                        const contii2 = new frameObj(600, 50, 2, '#00f', '#fff');
                        const contic = new charObj(50, 60, false, 5);
                        contic.addEvent('click', () => send({
                            type: 'continue'
                        }));
                        contic.on(contii2, contii1);
                        stage.put(contic);
                    }, 1000);
                } else if (ms.type === 'chat') {
                    if (ms.owner === 'わざ・お相手') {
                        msgDisplay(ms.data, 'red', 2);
                    }
                    const d = document.createElement('div');
                    d.innerText = ms.owner + ': ' + ms.data;
                    messageElement.appendChild(d);
                    d.scrollIntoView(false);
                } else if (ms.type === 'disconnect') {
                    msgDisplay('相手の接続が切断されました', 'red');
                    const d = document.createElement('div');
                    d.classList.add('red');
                    d.innerText = '相手の接続が切断されました';
                    messageElement.appendChild(d);
                    d.scrollIntoView(false);
                    send({
                        type: 'partnernull'
                    });
                } else if (ms.type === 'continue') {
                    nowMino.landing = true;
                    battle();
                }
            });

            sock.addEventListener("close", () => {
                msgDisplay('サーバーとの接続が切断されました', 'red');
                const d = document.createElement('div');
                d.classList.add('red');
                d.innerText = 'サーバーとの接続が切断されました';
                messageElement.appendChild(d);
                d.scrollIntoView(false);
            });

            sock.addEventListener("error", () => {
                msgDisplay('エラーが発生しました', 'red');
                const d = document.createElement('div');
                d.classList.add('red');
                d.innerText = 'エラーが発生しました';
                messageElement.appendChild(d);
                d.scrollIntoView(false);
            });
        }
    }
}

function full() {
    if (fullscreen === false) {
        document.body.requestFullscreen();
        fullscreen = true;
    } else {
        document.exitFullscreen();
        fullscreen = false;
    }
}

function startMenu() {
    if (gamemode !== 'startmenu') {
        rightLoopPerm = false;
        lrLoopCount = 0;
        leftLoopPerm = false;
        lrLoopCount = 0;
        downLoopPerm = false;
        downLoopCount = 0;
        if (nowMino != null) {
            main.canvas.remove();
            nowMino.landing = true;
            while (nextMino.length !== 0) {
                nextMino.shift();
            }
        }
        game = false;
        nowMino = null;
        main = null;
    }
    messageElement.innerHTML = '';
    chatElement.className = 'none';
    stage.stage = [];
    iconi.smooth = false;
    gamemode = 'startmenu';
    const soloi1 = new textObj('ひとりでプレイ', 'sans-serif', '#fff', '#000', 4);
    const soloi2 = new frameObj(600, 80, 2, '#00f', '#fff');
    const soloc = new charObj(50, 60, false, 5);
    soloc.addEvent('click', start);
    soloc.on(soloi2, soloi1);
    const multii1 = new textObj('ふたりでプレイ', 'sans-serif', '#fff', '#000', 4);
    const multi2 = new frameObj(600, 80, 2, '#00f', '#fff');
    const multic = new charObj(50, 85, false, 5);
    multic.addEvent('click', battle);
    multic.on(multi2, multii1);
    stage.put(bcgc, iconc, soloc, multic, fullc, RQAor60btnc);
}

window.onload = () => {
    document.body.appendChild(stage.canvasElement);
    startMenu();
};