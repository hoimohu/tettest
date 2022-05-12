const fieldElement = document.getElementById('field');
const btn = document.getElementById('button');
const tech = document.getElementById('technique');
const next = document.getElementById('next');
const scoreElement = document.getElementById('score');
const partner = document.getElementById('partner');
const damageElement = document.getElementById('damage');
const chat = document.getElementById('chat');
const chatinp = document.getElementById('chatinp');
const holdElement = document.getElementById('holdmino');

let game = true;
let gamemode;
let fullscreen = false;

let runstopbool = true;

let nextNum = 5;
const mino7 = ['i', 't', 'o', 's', 'z', 'l', 'j'];
const nextElement = [];
const nextMino = [];

let ren = -1;
let btb = false;
let score = 0;
let main;
let pMain;
let nowMino;
let holdMino;
let permHold = true;
let lasthole = null;
let gameset = false;

let mydamage = [];
let battleFunction;
let endBattleFunction;
let attackBattleFunction;

let sendChatFunction;

function chatsend() {
    if (sendChatFunction != null) {
        sendChatFunction(chatinp.value);
        chatinp.value = '';
    }
}

function techsend(d) {
    if (sendChatFunction != null) {
        sendChatFunction(d);
    }
}

for (let i = 0; i < nextNum; i++) {
    const d = document.createElement('div');
    next.appendChild(d);
    nextElement.push(d);
}

const previewMino = {
    i: new field(4, 4),
    t: new field(3, 3),
    s: new field(3, 3),
    z: new field(3, 3),
    j: new field(3, 3),
    l: new field(3, 3),
    o: new field(4, 3),
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


//right
let rightLoopPerm = false;
let rightLoopCount = 0;
(function rightLoop() {
    if (game) {
        if (rightLoopPerm !== false) {
            rightLoopCount++;
        } else {
            rightLoopCount = 0;
        }
        if ((rightLoopCount === 1 || 10 < rightLoopCount) && rightLoopCount % 2 === 1 && nowMino != null) {
            nowMino.control('ArrowRight');
        }
    }
    requestAnimationFrame(rightLoop);
})();

//left
let leftLoopPerm = false;
let leftLoopCount = 0;
(function leftLoop() {
    if (game) {
        if (leftLoopPerm !== false) {
            leftLoopCount++;
        } else {
            leftLoopCount = 0;
        }
        if ((leftLoopCount === 1 || 10 < leftLoopCount) && leftLoopCount % 2 === 1 && nowMino != null) {
            nowMino.control('ArrowLeft');
        }
    }
    requestAnimationFrame(leftLoop);
})();

//down
let downLoopPerm = false;
let downLoopCount = 0;
(function downLoop() {
    if (game) {
        if (downLoopPerm !== false) {
            downLoopCount++;
        } else {
            downLoopCount = 0;
        }
        if (downLoopCount % 2 === 1 && nowMino != null) {
            nowMino.control('ArrowDown');
        }
    }
    requestAnimationFrame(downLoop);
})();

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
                    if (holdMino == null) {
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
            } else if (runstopbool) {
                nowMino.control(e.key);
            }
        }
    }
});
document.addEventListener('keyup', e => {
    if (game) {
        if (e.key === 'ArrowRight') {
            rightLoopPerm = false;
        } else if (e.key === 'ArrowLeft') {
            leftLoopPerm = false;
        } else if (e.key === 'ArrowDown') {
            downLoopPerm = false;
        }
    }
});


function minobag(hold = false) {
    if (game && runstopbool) {
        let damage = 0;
        let clearline = 0;
        let perfect = true;
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
                        const d = document.createElement('div');
                        d.innerText = 'Mini T-Spin';
                        tech.appendChild(d);
                        setTimeout(() => {
                            d.remove();
                        }, 1000);
                        techsend('Mini T-Spin');
                    } else {
                        const d = document.createElement('div');
                        d.innerText = 'T-Spin';
                        tech.appendChild(d);
                        setTimeout(() => {
                            d.remove();
                        }, 1000);
                        techsend('T-Spin');
                    }
                } else if (clearline === 1) {
                    if (nowMino.miniTspin) {
                        const d = document.createElement('div');
                        d.innerText = 'Mini T-Spin Single';
                        tech.appendChild(d);
                        setTimeout(() => {
                            d.remove();
                        }, 1000);
                        techsend('Mini T-Spin Single');
                    } else {
                        const d = document.createElement('div');
                        d.innerText = 'T-Spin Single';
                        tech.appendChild(d);
                        setTimeout(() => {
                            d.remove();
                        }, 1000);
                        techsend('T-Spin Single');
                        damage += 2;
                    }
                } else if (clearline === 2) {
                    if (nowMino.miniTspin) {
                        const d = document.createElement('div');
                        d.innerText = 'Mini T-Spin Double';
                        tech.appendChild(d);
                        setTimeout(() => {
                            d.remove();
                        }, 1000);
                        techsend('Mini T-Spin Double');
                    } else {
                        const d = document.createElement('div');
                        d.innerText = 'T-Spin Double';
                        tech.appendChild(d);
                        setTimeout(() => {
                            d.remove();
                        }, 1000);
                        techsend('T-Spin Double');
                        damage += 3;
                    }
                } else if (clearline === 3) {
                    const d = document.createElement('div');
                    d.innerText = 'T-Spin Triple';
                    tech.appendChild(d);
                    setTimeout(() => {
                        d.remove();
                    }, 1000);
                    techsend('T-Spin Triple');
                    damage += 4;
                }
                if (btb && nowMino.tspin === true && 0 < clearline) {
                    const d = document.createElement('div');
                    d.innerText = 'Back-to-Back';
                    tech.appendChild(d);
                    setTimeout(() => {
                        d.remove();
                    }, 1000);
                    techsend('Back-to-Back');
                    damage += 1;
                } else if (nowMino.tspin === true && 0 < clearline) {
                    btb = true;
                }
            }
        }

        if (clearline === 4) {
            const d = document.createElement('div');
            d.innerText = 'Tetris';
            tech.appendChild(d);
            setTimeout(() => {
                d.remove();
            }, 1000);
            techsend('Tetris');
            damage += 4;
            if (btb) {
                const d = document.createElement('div');
                d.innerText = 'Back-to-Back';
                tech.appendChild(d);
                setTimeout(() => {
                    d.remove();
                }, 1000);
                techsend('Back-to-Back');
                damage += 1;
            } else {
                btb = true;
            }
        } else if (0 < clearline && nowMino.tspin === false) {
            btb = false;
            damage += (clearline - 1);

        }

        if (perfect && 0 < clearline) {
            const d = document.createElement('div');
            d.innerText = 'Perfect Clear';
            tech.appendChild(d);
            setTimeout(() => {
                d.remove();
            }, 1000);
            techsend('Perfect Clear');
            damage += 10;
        } else if (0 < clearline) {
            ren++;
            if (0 < ren) {
                const d = document.createElement('div');
                d.innerText = ren + 'REN';
                tech.appendChild(d);
                setTimeout(() => {
                    d.remove();
                }, 1000);
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
            runstopbool = true;
            if (nextMino.length <= nextNum) {
                while (nextMino.length <= nextNum) {
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
                nextElement[i].innerHTML = '';
                nextElement[i].appendChild(canvas);
            }
            holdElement.innerHTML = '';
            if (holdMino != null) {
                const canvas = previewMino[holdMino].canvas.cloneNode();
                const context = canvas.getContext('2d');
                context.drawImage(previewMino[holdMino].canvas, 0, 0);
                holdElement.innerHTML = '';
                holdElement.appendChild(canvas);
            }
            score += damage * 100;
            nowMino.render();
            scoreElement.innerText = score;
            if (gamemode === 'battle') {
                attackBattleFunction(damage);
                battleFunction();
            }
            if (hold) {
                permHold = false;
            } else {
                permHold = true;
            }
        }
    } else {
        if (gamemode === 'normal') {
            fieldElement.innerText = 'ゲームオーバー\nスコア: ' + score;
        } else if (gamemode === 'battle') {
            endBattleFunction();
        }
    }
}


function start() {
    rightLoopPerm = false;
    rightLoopCount = 0;
    leftLoopPerm = false;
    leftLoopCount = 0;
    downLoopPerm = false;
    downLoopCount = 0;
    fieldElement.innerText = '';
    btn.innerHTML = '<button onclick="full()">フルスクリーン|フルスクリーン解除</button><button onclick="start()">最初から</button>';
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
    holdMino = null;
    permHold = true;
    main = new field(10, 22, fieldElement, () => {
        game = false;
        gameset = true;
    });
    main.netline().drawfield();
    minobag();
}

function battle() {
    if (gamemode !== 'battle') {
        gamemode = 'battle';
        rightLoopPerm = false;
        rightLoopCount = 0;
        leftLoopPerm = false;
        leftLoopCount = 0;
        downLoopPerm = false;
        downLoopCount = 0;
        tech.innerText = '';
        next.innerHTML = '';
        scoreElement.innerText = '';
        damageElement.innerText = '';
        holdElement.innerHTML = '';
        chat.innerText = '';
        chatinp.value = '';
        fieldElement.innerText = '';
        partner.innerText = '';
        btn.innerHTML = '<button onclick="full()">フルスクリーン|フルスクリーン解除</button>';
        while (nextElement.length !== 0) {
            nextElement.shift();
        }
        for (let i = -1; i < nextNum; i++) {
            if (i === -1) {
                const d = document.createElement('div');
                d.innerText = 'next';
                next.appendChild(d);
            } else {
                const d = document.createElement('div');
                next.appendChild(d);
                nextElement.push(d);
            }
        }
        if (nowMino != null) {
            main.canvas.remove();
            nowMino.landing = true;
            while (nextMino.length !== 0) {
                nextMino.shift();
            }
        }
        const conn1 = document.createElement('div');
        conn1.innerText = 'サーバーに接続します';
        tech.appendChild(conn1);
        setTimeout(() => {
            conn1.remove();
        }, 1000);
        game = true;
        runstopbool = true;
        btb = false;
        score = 0;
        ren = -1;
        holdMino = null;
        permHold = true;
        mydamage = [];
        main = new field(10, 50, fieldElement, () => {
            game = false;
            gameset = true;
        });
        main.netline().drawfield();
        pMain = new field(10, 50, partner);
        pMain.netline().drawfield();
        const dMain = new field(1, 1, damageElement);
        dMain.netline().drawfield();
        //websocket
        const sock = new WebSocket("wss://horse-tortoiseshell-crater.glitch.me");

        function send(m) {
            sock.send(JSON.stringify(m));
        }

        sock.addEventListener("open", e => {
            const d = document.createElement('div');
            d.innerText = '対戦相手を探しています...';
            tech.appendChild(d);
            setTimeout(() => {
                d.remove();
            }, 1000);
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

            sendChatFunction = (d) => {
                send({
                    type: 'chat',
                    data: d
                });
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
                const d = document.createElement('div');
                d.innerText = ms.count;
                tech.appendChild(d);
                setTimeout(() => {
                    d.remove();
                }, 1000);
            } else if (ms.type === 'start') {
                const d = document.createElement('div');
                d.innerText = 'START!';
                tech.appendChild(d);
                setTimeout(() => {
                    d.remove();
                }, 1000);
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
                nowMino.landing = true;
                game = false;
                fieldElement.innerText = 'まけ・・・\n最終スコア: ' + score;
                partner.innerText = 'かち・・・\n最終スコア' + ms.score;
                const b = document.createElement('button');
                b.innerText = 'もういっかい';
                b.addEventListener('click', () => {
                    b.remove();
                    battle();
                });
                document.body.appendChild(b);
            } else if (ms.type === 'win') {
                gamemode = 'fin';
                nowMino.landing = true;
                game = false;
                fieldElement.innerText = 'かち・・・\n最終スコア: ' + score;
                partner.innerText = 'まけ・・・\n最終スコア' + ms.score;
                send({
                    type: 'battle',
                    battle: 'win',
                    score: score
                });
                const b = document.createElement('button');
                b.innerText = 'もういっかい';
                b.addEventListener('click', () => {
                    b.remove();
                    battle();
                });
                document.body.appendChild(b);
            } else if (ms.type === 'chat') {
                const d = document.createElement('div');
                d.innerText = ms.owner + ': ' + ms.data;
                chat.appendChild(d);
                chat.scrollTo({
                    top: chat.clientHeight,
                    behavior: 'smooth'
                });
            } else if (ms.type === 'disconnect') {
                const d = document.createElement('div');
                d.innerText = '相手の接続が切断されました';
                tech.appendChild(d);
            }
        });

        sock.addEventListener("close", e => {
            const d = document.createElement('div');
            d.innerText = 'サーバーとの接続が切断されました';
            tech.appendChild(d);
        });

        sock.addEventListener("error", e => {
            const d = document.createElement('div');
            d.innerText = 'エラーが発生しました';
            tech.appendChild(d);
        });
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