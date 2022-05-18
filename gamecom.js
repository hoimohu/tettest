const worker = new Worker("worker.js");
let workerFunc = null;
let workerdata = null;

worker.addEventListener(
  "message",
  function (e) {
    if (workerFunc != null) {
      workerFunc(JSON.parse(e.data));
    }
    workerdata = JSON.parse(e.data);
  },
  false
);

const ctr = {
  rd: new KeyboardEvent("keydown", {
    key: "ArrowRight",
  }),
  ld: new KeyboardEvent("keydown", {
    key: "ArrowLeft",
  }),
  cd: new KeyboardEvent("keydown", {
    key: "c",
  }),
  ud: new KeyboardEvent("keydown", {
    key: "ArrowUp",
  }),
  zd: new KeyboardEvent("keydown", {
    key: "z",
  }),
  sd: new KeyboardEvent("keydown", {
    key: " ",
  }),
  ru: new KeyboardEvent("keyup", {
    key: "ArrowRight",
  }),
  lu: new KeyboardEvent("keyup", {
    key: "ArrowLeft",
  }),
  cu: new KeyboardEvent("keyup", {
    key: "c",
  }),
  uu: new KeyboardEvent("keyup", {
    key: "ArrowUp",
  }),
  zu: new KeyboardEvent("keyup", {
    key: "z",
  }),
  su: new KeyboardEvent("keyup", {
    key: " ",
  }),
  right: () => {
    document.dispatchEvent(ctr.rd);
    setTimeout(() => {
      document.dispatchEvent(ctr.ru);
    }, 36);
  },
  left: () => {
    document.dispatchEvent(ctr.ld);
    setTimeout(() => {
      document.dispatchEvent(ctr.lu);
    }, 36);
  },
  c: () => {
    document.dispatchEvent(ctr.cd);
    setTimeout(() => {
      document.dispatchEvent(ctr.cu);
    }, 36);
  },
  up: () => {
    document.dispatchEvent(ctr.ud);
    setTimeout(() => {
      document.dispatchEvent(ctr.uu);
    }, 36);
  },
  z: () => {
    document.dispatchEvent(ctr.zd);
    setTimeout(() => {
      document.dispatchEvent(ctr.zu);
    }, 36);
  },
  space: () => {
    document.dispatchEvent(ctr.sd);
    setTimeout(() => {
      document.dispatchEvent(ctr.su);
    }, 36);
  },
};

const fieldElement = document.getElementById("field");
const btn = document.getElementById("button");
const tech = document.getElementById("technique");
const next = document.getElementById("next");
const scoreElement = document.getElementById("score");
const partner = document.getElementById("partner");
const damageElement = document.getElementById("damage");
const chatElement = document.getElementById("chat");
const chatinp = document.getElementById("chatinp");
const messageElement = document.getElementById("message");
const holdElement = document.getElementById("holdmino");
const backimgElement = document.getElementById("backimg");
const gameElement = document.getElementById("game");
const btnareaElement = document.getElementById("buttonarea");
const lineElement = document.getElementById("line");
const recordElement = document.getElementById("record");

let game = true;
let gamemode;
let fullscreen = false;
let sock;
let starttime;

let runstopbool = true;

let nextNum = 5;
const mino7 = ["i", "t", "o", "s", "z", "l", "j"];
const nextElement = [];
const nextMino = [];

let ren = -1;
let linebreak = 0;
let btb = false;
let score = 0;
let main;
let dMain;
let pMain;
let nowMino;
let holdMino = "none";
let permHold = true;
let lasthole = null;
let gameset = false;
let HNalpha = false;
let RQA = false;

let mydamage = [];
let battleFunction;
let endBattleFunction;
let attackBattleFunction;

let sendChatFunction;

function msgDisplay(msg, color) {
  const txte = document.createElement("div");
  txte.innerText = msg;
  txte.style = "color:" + color + ";";
  txte.classList.add("trop2");
  tech.appendChild(txte);
  setTimeout(() => {
    txte.classList.add("op0");
    setTimeout(() => {
      txte.remove();
    }, 2000);
  }, 100);
}

function send(m) {
  if (sock != null) {
    sock.send(JSON.stringify(m));
  }
}

function chatsend() {
  if (sendChatFunction != null && chatinp.value.match(/^\d+$/)) {
    sendChatFunction("[変更]速さを" + chatinp.value + "に変更しました");
    comspeed = chatinp.value - 0;
    chatinp.value = "";
  } else if (
    sendChatFunction != null &&
    !chatinp.value.match(/^[\s　ᅟᅠ᠎​‌⁣‍⁠⁡⁢⁣⁤ㅤﾠ]*$/)
  ) {
    sendChatFunction(chatinp.value);
    chatinp.value = "";
  }
}
chatinp.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    chatsend();
  }
});

function techsend(d) {
  if (sendChatFunction != null) {
    sendChatFunction(d, true);
  }
}

function time(t) {
  return (
    Math.floor(t / 3600000) +
    ":" +
    (Math.floor(t / 60000) % 60) +
    ":" +
    (Math.floor(t / 1000) % 60) +
    ":" +
    (t % 1000)
  );
}

for (let i = 0; i < nextNum; i++) {
  const d = document.createElement("div");
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
  o: new field(4, 4),
  none: new field(4, 4),
};

//i
previewMino.i.data[1][0] = "i";
previewMino.i.data[1][1] = "i";
previewMino.i.data[1][2] = "i";
previewMino.i.data[1][3] = "i";
previewMino.i.netline().render().drawfield();
//t
previewMino.t.data[1][0] = "t";
previewMino.t.data[1][1] = "t";
previewMino.t.data[1][2] = "t";
previewMino.t.data[0][1] = "t";
previewMino.t.netline().render().drawfield();
//s
previewMino.s.data[0][1] = "s";
previewMino.s.data[0][2] = "s";
previewMino.s.data[1][0] = "s";
previewMino.s.data[1][1] = "s";
previewMino.s.netline().render().drawfield();
//z
previewMino.z.data[0][0] = "z";
previewMino.z.data[0][1] = "z";
previewMino.z.data[1][1] = "z";
previewMino.z.data[1][2] = "z";
previewMino.z.netline().render().drawfield();
//j
previewMino.j.data[0][0] = "j";
previewMino.j.data[1][0] = "j";
previewMino.j.data[1][1] = "j";
previewMino.j.data[1][2] = "j";
previewMino.j.netline().render().drawfield();
//l
previewMino.l.data[0][2] = "l";
previewMino.l.data[1][0] = "l";
previewMino.l.data[1][1] = "l";
previewMino.l.data[1][2] = "l";
previewMino.l.netline().render().drawfield();
//o
previewMino.o.data[0][1] = "o";
previewMino.o.data[1][1] = "o";
previewMino.o.data[0][2] = "o";
previewMino.o.data[1][2] = "o";
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
      if (
        (rightLoopCount === 1 || 15 < rightLoopCount) &&
        rightLoopCount % 2 === 1 &&
        nowMino != null
      ) {
        nowMino.control("ArrowRight");
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
      if (
        (rightLoopCount === 1 || 15 < rightLoopCount) &&
        rightLoopCount % 2 === 1 &&
        nowMino != null
      ) {
        nowMino.control("ArrowRight");
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
      if (
        (leftLoopCount === 1 || 15 < leftLoopCount) &&
        leftLoopCount % 2 === 1 &&
        nowMino != null
      ) {
        nowMino.control("ArrowLeft");
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
      if (
        (leftLoopCount === 1 || 15 < leftLoopCount) &&
        leftLoopCount % 2 === 1 &&
        nowMino != null
      ) {
        nowMino.control("ArrowLeft");
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
        nowMino.control("ArrowDown");
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
        nowMino.control("ArrowDown");
      }
    }
    requestAnimationFrame(downLoop);
  }
}

function RQAor60FPS() {
  RQAor90btnE.blur();
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
          if (
            (rightLoopCount === 1 || 15 < rightLoopCount) &&
            rightLoopCount % 2 === 1 &&
            nowMino != null
          ) {
            nowMino.control("ArrowRight");
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
          if (
            (leftLoopCount === 1 || 15 < leftLoopCount) &&
            leftLoopCount % 2 === 1 &&
            nowMino != null
          ) {
            nowMino.control("ArrowLeft");
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
            nowMino.control("ArrowDown");
          }
        }
      }
    }, 1000 / 90);
    RQAor90btnE.innerText = "90fps固定中";
  } else {
    RQA = true;
    rightLoop();
    leftLoop();
    downLoop();
    RQAor90btnE.innerText = "自動調整中";
  }
}

const RQAor90btnE = document.createElement("button");
RQAor90btnE.setAttribute("type", "button");
RQAor90btnE.innerText = "90fps固定中";
RQAor90btnE.addEventListener("click", RQAor60FPS);
btnareaElement.appendChild(RQAor90btnE);

document.addEventListener("keydown", (e) => {
  if (game && nowMino != null) {
    if (!(e.ctrlKey === true || document.activeElement === chatinp)) {
      e.preventDefault();
    }
    if (e.repeat === false) {
      if (e.key === " ") {
        score += 5;
      }
      if (e.key === "ArrowRight") {
        rightLoopPerm = true;
      } else if (e.key === "ArrowLeft") {
        leftLoopPerm = true;
      } else if (e.key === "ArrowDown") {
        downLoopPerm = true;
      } else if (e.key === "c") {
        if (permHold && runstopbool) {
          if (holdMino === "none") {
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
      } else if (e.key === "a") {
        if (HNalpha === false) {
          btnareaElement.className = "op2";
          chatElement.style = "display:none;";
          HNalpha = true;
        } else {
          btnareaElement.className = "";
          chatElement.style = "";
          HNalpha = false;
        }
      } else if (e.key === "r" && gamemode === "normal") {
        start();
      } else if (e.key === "Escape" && gamemode === "normal") {
        startMenu();
      } else if (runstopbool) {
        nowMino.control(e.key);
      }
    }
  } else if (
    game === false &&
    nowMino != null &&
    e.key === "Escape" &&
    gamemode === "fin"
  ) {
    startMenu();
  } else if (
    game === false &&
    nowMino != null &&
    e.key === "r" &&
    gamemode === "fin"
  ) {
    if (sock != null) {
      conti();
    }
  }
});
document.addEventListener("keyup", (e) => {
  if (game) {
    if (e.key === "ArrowRight") {
      rightLoopPerm = false;
      rightLoopCount = 0;
    } else if (e.key === "ArrowLeft") {
      leftLoopPerm = false;
      leftLoopCount = 0;
    } else if (e.key === "ArrowDown") {
      downLoopPerm = false;
      downLoopCount = 0;
    }
  }
});

let comspeed = 100;
let com_count = 0;
let com_run = true;
let com_hold = true;

function com(com_permhold) {
  if (!com_run) return;
  com_count++;
  if (nowMino.type === "i" && com_count < 8 && com_permhold) {
    ctr.c();
    return;
  }
  workerFunc = function move(com_score) {
    if (com_score[3] !== 0) {
      setTimeout(() => {
        com_score[3] = 0;
        ctr.c();
      }, comspeed);
    } else if (com_score[2] !== 0) {
      setTimeout(() => {
        com_score[2]--;
        ctr.up();
        move(com_score);
      }, comspeed);
    } else if (com_score[1] < 0) {
      setTimeout(() => {
        com_score[1]++;
        ctr.left();
        move(com_score);
      }, comspeed);
    } else if (0 < com_score[1]) {
      setTimeout(() => {
        com_score[1]--;
        ctr.right();
        move(com_score);
      }, comspeed);
    } else {
      setTimeout(() => {
        ctr.space();
      }, 36);
    }
  };
  worker.postMessage(
    JSON.stringify({
      type1: nowMino.type,
      type2: nextMino[0],
      typehold: holdMino,
      com_hold: com_hold,
      com_permhold: com_permhold,
      main: main.data,
    })
  );
}

function minobag(hold = false) {
  if (game && runstopbool) {
    let damage = 0;
    let clearline = 0;
    let perfect = true;
    let plusscore = 0;
    for (let i1 = 0; i1 < main.data.length; i1++) {
      if (main.data[i1].indexOf("") === -1) {
        main.data.splice(i1, 1);
        const ins = [];
        for (let i2 = 0; i2 < main.width; i2++) {
          ins.push("");
        }
        main.data.unshift(ins);
        clearline++;
        linebreak++;
        if (linebreak === 40) {
          const re = document.createElement("div");
          re.className = "red";
          re.innerText = "\n" + time(Date.now() - starttime);
          recordElement.appendChild(re);
        } else if (linebreak === 99) {
          const re = document.createElement("div");
          re.className = "blue";
          re.innerText = "\n" + time(Date.now() - starttime);
          recordElement.appendChild(re);
        } else if (linebreak === 999) {
          re.className = "orange";
          const re = document.createElement("div");
          re.innerText = "\n" + time(Date.now() - starttime);
          recordElement.appendChild(re);
        }
      }
      if (main.data[i1].join("") !== "") {
        perfect = false;
      }
    }
    if (clearline !== 0) {
      lineElement.innerText = linebreak;
      main.render().drawfield();
    }

    if (nowMino != null) {
      if (nowMino.tspin) {
        if (clearline === 0) {
          if (nowMino.miniTspin) {
            msgDisplay("T-Spin Mini", "#00f");
            techsend("T-Spin Mini");
          } else {
            msgDisplay("T-Spin", "#00f");
            techsend("T-Spin");
          }
        } else if (clearline === 1) {
          if (nowMino.miniTspin) {
            msgDisplay("T-Spin Mini Single", "#00f");
            techsend("T-Spin Mini Single");
          } else {
            msgDisplay("T-Spin Single", "#00f");
            techsend("T-Spin Single");
            damage += 2;
          }
        } else if (clearline === 2) {
          if (nowMino.miniTspin) {
            msgDisplay("T-Spin Mini Double", "#00f");
            techsend("T-Spin Mini Double");
          } else {
            msgDisplay("T-Spin Double", "#00f");
            techsend("T-Spin Double");
            damage += 4;
          }
        } else if (clearline === 3) {
          msgDisplay("T-Spin Triple", "#00f");
          techsend("T-Spin Triple");
          damage += 6;
        }
        if (btb && nowMino.tspin === true && 0 < clearline) {
          msgDisplay("Back-to-Back", "#00f", 1);
          techsend("Back-to-Back");
          damage += 1;
        } else if (nowMino.tspin === true && 0 < clearline) {
          btb = true;
        }
      }
    }

    if (clearline === 4) {
      msgDisplay("Tetris", "#00f");
      techsend("Tetris");
      damage += 4;
      if (btb) {
        msgDisplay("Back-to-Back", "#00f", 1);
        techsend("Back-to-Back");
        damage += 1;
      } else {
        btb = true;
      }
    } else if (
      0 < clearline &&
      (nowMino.tspin === false || nowMino.miniTspin === true)
    ) {
      btb = false;
      damage += clearline - 1;
      plusscore++;
    }

    if (perfect && 0 < clearline) {
      ren++;
      msgDisplay("Perfect Clear", "greenyellow", -2);
      techsend("Perfect Clear");
      damage += 10;
    } else if (0 < clearline) {
      ren++;
      if (0 < ren) {
        msgDisplay(ren + "REN", "#00f", -1);
        techsend(ren + "REN");
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
        if (nextMino.length <= nextNum) {
          while (nextMino.length <= nextNum) {
            const mino7a = JSON.parse(JSON.stringify(mino7));
            while (mino7a.length !== 0) {
              nextMino.push(
                mino7a.splice(Math.floor(Math.random() * mino7a.length), 1)[0]
              );
            }
          }
        }
        let minospeed = 1250;
        for (let n = 0; n < linebreak / 40; n++) {
          minospeed -= 50;
        }
        nowMino = new mino(nextMino.shift(), main, minobag, minospeed);
        for (let i = 0; i < 5; i++) {
          const canvas = previewMino[nextMino[i]].canvas.cloneNode();
          const context = canvas.getContext("2d");
          context.drawImage(previewMino[nextMino[i]].canvas, 0, 0);
          nextElement[i].innerHTML = "";
          nextElement[i].appendChild(canvas);
        }
        if (holdMino != null) {
          const canvas = previewMino[holdMino].canvas.cloneNode();
          const context = canvas.getContext("2d");
          context.drawImage(previewMino[holdMino].canvas, 0, 0);
          holdElement.innerHTML = "";
          holdElement.appendChild(canvas);
        }
        score += damage * 100 + plusscore * 100;
        scoreElement.innerText = score;
        nowMino.render();
        if (gamemode === "battle" && hold === false) {
          attackBattleFunction(damage);
          battleFunction();
        }
        if (hold) {
          permHold = false;
        } else {
          permHold = true;
        }
        com(!hold);
      } else {
        nowMino.landing = true;
      }
    }
  } else {
    if (gamemode === "normal") {
      nowMino.landing = true;
      startMenu();
      msgDisplay("GAME OVER", "red");
    } else if (gamemode === "battle") {
      endBattleFunction();
      nowMino.landing = true;
    }
  }
}

function start() {
  starttime = Date.now();
  workerFunc = null;
  workerdata = null;

  com_count = 0;
  com_run = true;
  com_hold = true;

  com_run = true;

  rightLoopPerm = false;
  rightLoopCount = 0;
  leftLoopPerm = false;
  leftLoopCount = 0;
  downLoopPerm = false;
  downLoopCount = 0;

  linebreak = 0;

  lineElement.innerText = "0";
  recordElement.innerHTML = "";
  backimgElement.className = "";
  btn.innerHTML =
    '<button onclick="full()">フルスクリーン|フルスクリーン解除</button><button onclick="start()">最初から</button><button onclick="startMenu()" type="button">メニューに戻る</button>';

  gamemode = "normal";

  if (nowMino != null) {
    main.canvas.remove();
    nowMino.landing = true;
  }

  while (nextElement.length !== 0) {
    nextElement.shift().remove();
  }
  while (nextMino.length !== 0) {
    nextMino.shift();
  }
  for (let i = -1; i < nextNum; i++) {
    const d = document.createElement("div");
    next.appendChild(d);
    nextElement.push(d);
  }

  game = true;
  runstopbool = true;
  btb = false;
  score = 0;
  ren = -1;
  holdMino = "none";
  permHold = true;
  main = new field(10, 50, fieldElement, () => {
    game = false;
    gameset = true;
  });
  main.netline().drawfield();
  minobag();
}

function battle() {
  if (gamemode !== "battle") {
    starttime = Date.now();
    workerFunc = null;
    workerdata = null;

    com_count = 0;
    com_run = true;
    com_hold = true;

    com_run = true;

    gamemode = "battle";

    rightLoopPerm = false;
    rightLoopCount = 0;
    leftLoopPerm = false;
    leftLoopCount = 0;
    downLoopPerm = false;
    downLoopCount = 0;

    linebreak = 0;

    messageElement.innerHTML = "";
    tech.innerHTML = "";
    next.innerHTML = "";
    scoreElement.innerHTML = "";
    damageElement.innerHTML = "";
    holdElement.innerHTML = "";
    fieldElement.innerHTML = "";
    partner.innerHTML = "";
    lineElement.innerText = "0";
    recordElement.innerHTML = "";
    btn.innerHTML =
      '<button type="button" onclick="full()">フルスクリーン|フルスクリーン解除</button>';
    chatinp.value = "";

    while (nextElement.length !== 0) {
      nextElement.shift();
    }
    for (let i = -1; i < nextNum; i++) {
      const d = document.createElement("div");
      next.appendChild(d);
      nextElement.push(d);
    }

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
    holdMino = "none";
    permHold = true;
    mydamage = [];
    main = new field(10, 50, fieldElement, () => {
      game = false;
      gameset = true;
    });
    if (holdMino != null) {
      const canvas = previewMino[holdMino].canvas.cloneNode();
      const context = canvas.getContext("2d");
      context.drawImage(previewMino[holdMino].canvas, 0, 0);
      holdElement.innerHTML = "";
      holdElement.appendChild(canvas);
    }
    main.netline().drawfield();
    pMain = new field(10, 50, partner);
    pMain.netline().drawfield();
    dMain = new field(1, 1, damageElement);
    dMain.netline().drawfield();

    backimgElement.className = "";

    if (sock == null) {
      msgDisplay("サーバーに接続します", "blue");

      //websocket
      // sock = new WebSocket("ws://127.0.0.1:8080");
      sock = new WebSocket("wss://horse-tortoiseshell-crater.glitch.me");

      sock.addEventListener("open", () => {
        chatElement.className = "flex";
        battleFunction = () => {
          send({
            type: "battle",
            battle: "field",
            data: main.data,
          });
        };
        endBattleFunction = () => {
          if (gameset && gamemode === "battle") {
            send({
              type: "battle",
              battle: "lose",
              score: score,
            });
          }
        };
        attackBattleFunction = (d) => {
          let senddamage = d;
          for (let i = 0; i < d && 0 < mydamage.length; i++) {
            senddamage--;
            mydamage.shift();
          }
          for (let i = 0; !(mydamage.length === 0 || 11 < i); i++) {
            main.data.shift();
            main.data.push(mydamage.shift());
          }
          if (1 === mydamage.length) {
            dMain.data[0][0] = "i";
          } else if (2 === mydamage.length) {
            dMain.data[0][0] = "j";
          } else if (3 === mydamage.length) {
            dMain.data[0][0] = "l";
          } else if (4 === mydamage.length) {
            dMain.data[0][0] = "o";
          } else if (5 === mydamage.length) {
            dMain.data[0][0] = "s";
          } else if (6 === mydamage.length) {
            dMain.data[0][0] = "t";
          } else if (7 < mydamage.length) {
            dMain.data[0][0] = "z";
          } else {
            dMain.data[0][0] = "";
          }
          dMain.render().drawfield();
          main.render().drawfield();
          if (0 < senddamage) {
            send({
              type: "battle",
              battle: "attack",
              data: senddamage,
            });
          }
        };
        sendChatFunction = (d, tech) => {
          if (tech === true) {
            send({
              type: "tech",
              data: d,
            });
          } else {
            send({
              type: "chat",
              data: d,
            });
          }
        };
      });
      sock.addEventListener("message", (e) => {
        const ms = JSON.parse(e.data);
        if (ms.type === "key") {
          send({
            type: "keyconnect",
            data: ms.data,
          });
        } else if (ms.type === "count") {
          if (ms.count === 3) {
            if (nextMino.length <= nextNum) {
              while (nextMino.length <= nextNum) {
                const mino7a = JSON.parse(JSON.stringify(mino7));
                while (mino7a.length !== 0) {
                  nextMino.push(
                    mino7a.splice(
                      Math.floor(Math.random() * mino7a.length),
                      1
                    )[0]
                  );
                }
              }
            }
            for (let i = 0; i < 5; i++) {
              const canvas = previewMino[nextMino[i]].canvas.cloneNode();
              const context = canvas.getContext("2d");
              context.drawImage(previewMino[nextMino[i]].canvas, 0, 0);
              nextElement[i].innerHTML = "";
              nextElement[i].appendChild(canvas);
            }
          }
          msgDisplay("" + ms.count, "blue");
        } else if (ms.type === "start") {
          msgDisplay("START!", "greenyellow");
          main.netline().drawfield();
          minobag();
        } else if (ms.type === "attack") {
          const insertArray = [];
          if (lasthole != null && 0.25 < Math.random()) {
            const space = lasthole;
            for (let i = 0; i < main.width; i++) {
              if (i === space) {
                insertArray.push("");
              } else {
                insertArray.push("d");
              }
            }
          } else {
            const space = Math.floor(Math.random() * main.width);
            lasthole = space;
            for (let i = 0; i < main.width; i++) {
              if (i === space) {
                insertArray.push("");
              } else {
                insertArray.push("d");
              }
            }
          }
          for (let i = 0; i < ms.data; i++) {
            mydamage.push(JSON.parse(JSON.stringify(insertArray)));
          }
          if (0 === mydamage.length) {
            dMain.data[0][0] = "i";
          } else if (1 === mydamage.length) {
            dMain.data[0][0] = "j";
          } else if (2 === mydamage.length) {
            dMain.data[0][0] = "l";
          } else if (3 === mydamage.length) {
            dMain.data[0][0] = "o";
          } else if (4 === mydamage.length) {
            dMain.data[0][0] = "s";
          } else if (5 === mydamage.length) {
            dMain.data[0][0] = "t";
          } else if (5 < mydamage.length) {
            dMain.data[0][0] = "z";
          }
          dMain.render().drawfield();
        } else if (ms.type === "field") {
          pMain.data = ms.data;
          pMain.render().drawfield();
        } else if (ms.type === "lose") {
          gamemode = "fin";
          game = false;
          nowMino.landing = true;
          const d = document.createElement("div");
          d.classList.add("blue");
          d.innerText =
            "あなたのまけです。。。。\n・・・スコア: " +
            score +
            "\n\n相手のスコア: " +
            ms.score;
          messageElement.appendChild(d);
          d.scrollIntoView(false);
          msgDisplay("You lose...", "blue");
          setTimeout(() => {
            msgDisplay("You lose...", "blue");
            btn.innerHTML =
              '<button type="button" onclick="conti()">つづけて誰かと対戦する</button><button type="button" onclick="full()">フルスクリーン|フルスクリーン解除</button><button onclick="startMenu()" type="button">メニューに戻る</button>';
          }, 1000);
          continueperm = true;
        } else if (ms.type === "win") {
          gamemode = "fin";
          game = false;
          nowMino.landing = true;
          const d = document.createElement("div");
          d.classList.add("orange");
          d.innerText =
            "かち！！！！\n・・・スコア: " +
            score +
            "\n\n相手のスコア: " +
            ms.score;
          messageElement.appendChild(d);
          d.scrollIntoView(false);
          send({
            type: "battle",
            battle: "win",
            score: score,
          });
          msgDisplay("YOU WIN!!", "greenyellow");
          setTimeout(() => {
            setTimeout(() => {
              msgDisplay("You WIN!!", "greenyellow");
              btn.innerHTML =
                '<button type="button" onclick="conti()">つづけて誰かと対戦する</button><button type="button" onclick="full()">フルスクリーン|フルスクリーン解除</button><button onclick="startMenu()" type="button">メニューに戻る</button>';
            }, 1000);
            continueperm = true;
          }, 1000);
        } else if (ms.type === "chat") {
          if (ms.owner === "わざ・お相手") {
            msgDisplay(ms.data, "red", 2);
          }
          const d = document.createElement("div");
          d.innerText = ms.owner + ": " + ms.data;
          messageElement.appendChild(d);
          d.scrollIntoView(false);
        } else if (ms.type === "disconnect") {
          msgDisplay("相手の接続が切断されました", "red");
          const d = document.createElement("div");
          d.classList.add("red");
          d.innerText = "相手の接続が切断されました";
          messageElement.appendChild(d);
          d.scrollIntoView(false);
          send({
            type: "partnernull",
          });
        } else if (ms.type === "continue") {
          nowMino.landing = true;
          battle();
        }
      });

      sock.addEventListener("close", () => {
        msgDisplay("サーバーとの接続が切断されました", "red");
        const d = document.createElement("div");
        d.classList.add("red");
        d.innerText = "サーバーとの接続が切断されました";
        messageElement.appendChild(d);
        d.scrollIntoView(false);
      });

      sock.addEventListener("error", () => {
        msgDisplay("エラーが発生しました", "red");
        const d = document.createElement("div");
        d.classList.add("red");
        d.innerText = "エラーが発生しました";
        messageElement.appendChild(d);
        d.scrollIntoView(false);
      });
    }
  }
}

function startMenu() {
  workerFunc = null;
  workerdata = null;

  if (gamemode !== "startmenu") {
    com_run = false;
    rightLoopPerm = false;
    rightLoopCount = 0;
    leftLoopPerm = false;
    leftLoopCount = 0;
    downLoopPerm = false;
    downLoopCount = 0;

    linebreak = 0;

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

  btn.innerHTML =
    '<button onclick="full()" type="button">フルスクリーン|フルスクリーン解除</button><button onclick="start()" type="button">スタート</button><button onclick="battle()" type="button">2人で対戦</button>';
  tech.innerHTML = "";
  next.innerHTML = "";
  scoreElement.innerHTML = "";
  partner.innerHTML = "";
  damageElement.innerHTML = "";
  messageElement.innerHTML = "";
  holdElement.innerHTML = "";
  lineElement.innerText = "";
  recordElement.innerHTML = "";

  messageElement.innerHTML = "";
  chatElement.className = "none";
  gamemode = "startmenu";
  backimgElement.className = "pixel";
}

let continueperm = false;

function conti() {
  if (continueperm) {
    continueperm = false;
    send({
      type: "continue",
    });
  }
}

function full() {
  btn.innerHTML = btn.innerHTML;
  if (fullscreen === false) {
    document.body.requestFullscreen();
    fullscreen = true;
  } else {
    document.exitFullscreen();
    fullscreen = false;
  }
}

function resize() {
  if (innerWidth < innerHeight) {
    gameElement.className = "flexbetween";
  } else {
    gameElement.className = "flexcenter";
  }
}

window.onresize = resize;
window.onload = startMenu;
