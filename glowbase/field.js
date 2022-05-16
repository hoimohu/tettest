class field {
    canvas = document.createElement('canvas');
    context = this.canvas.getContext('2d');
    picture = document.createElement('canvas');
    pctx = this.picture.getContext('2d');
    netstroke = document.createElement('canvas');
    nsctx = this.netstroke.getContext('2d');
    data = [];
    constructor(width, height, element, gameover) {
        this.width = width;
        this.height = height;
        this.netstroke.width = 30;
        this.netstroke.height = 30;
        this.picture.width = this.width * 30;
        this.picture.height = this.height * 30;
        if (22 < this.height) {
            this.canvas.width = this.width * 30;
            this.canvas.height = 660;
        } else {
            this.canvas.width = this.width * 30;
            this.canvas.height = this.height * 30;
        }
        this.nsctx.lineWidth = '2';
        this.nsctx.strokeStyle = 'gray';
        this.nsctx.beginPath();
        this.nsctx.moveTo(0, 0);
        this.nsctx.lineTo(0, 30);
        this.nsctx.lineTo(30, 30);
        this.nsctx.lineTo(30, 0);
        this.nsctx.lineTo(0, 0);
        this.nsctx.stroke();
        for (let i1 = 0; i1 < height; i1++) {
            this.data.push([]);
            for (let i2 = 0; i2 < width; i2++) {
                this.data.at(-1).push('');
            }
        }
        if (element != null) {
            this.setelement(element);
        }
        if (gameover != null) {
            this.gameover = gameover;
        }
    }
    render() {
        for (let i1 = 0; i1 < this.data.length; i1++) {
            for (let i2 = 0; i2 < this.data.length; i2++) {
                const e2 = this.data[i1][i2];
                this.pctx.globalAlpha = 1.0;
                if (e2 === '') {
                    this.pctx.fillStyle = 'black';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 'i') {
                    this.pctx.fillStyle = 'cyan';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 'o') {
                    this.pctx.fillStyle = 'yellow';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 't') {
                    this.pctx.fillStyle = 'purple';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 's') {
                    this.pctx.fillStyle = 'greenyellow';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 'z') {
                    this.pctx.fillStyle = 'red';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 'j') {
                    this.pctx.fillStyle = 'blue';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 'l') {
                    this.pctx.fillStyle = 'orange';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                } else if (e2 === 'd') {
                    this.pctx.fillStyle = 'azure';
                    this.pctx.fillRect(i2 * 30, i1 * 30, 30, 30);
                }
                this.pctx.globalAlpha = 0.4;
                this.pctx.drawImage(this.netstroke, i2 * 30, i1 * 30);
            }
        }
        return this;
    }
    netline() {
        this.pctx.globalAlpha = 1.0;
        this.pctx.fillStyle = 'black';
        this.pctx.fillRect(0, 0, this.picture.width, this.picture.height);
        for (let i1 = 0; i1 < this.data.length; i1++) {
            for (let i2 = 0; i2 < this.data.length; i2++) {
                this.pctx.globalAlpha = 0.4;
                this.pctx.drawImage(this.netstroke, i2 * 30, i1 * 30);
            }
        }
        return this;
    }
    drawfield() {
        this.context.drawImage(this.picture, 0, this.picture.height - this.canvas.height, this.canvas.width, this.canvas.height, 0, 0, this.canvas.width, this.canvas.height);
    }
    isblock(x, y) {
        if (x < 0 || y < 0 || this.width <= x || this.height <= y) {
            return true;
        }
        if (this.data[y][x] !== '') {
            return true;
        }
        return false;
    }
    setelement(element) {
        this.element = element;
        element.appendChild(this.canvas);
    }
}

class mino {
    landing = false;
    fallTimer = 10;
    fallCounter = 0;
    fallCounterCounter = 0;
    angle = 0;
    tspin = false;
    miniTspin = false;
    inter = setInterval(() => {
        if (this.landing === false) {
            if (this.fallTimer <= 0) {
                this.minodown();
                this.fallTimer = 10;
            } else {
                this.fallTimer--;
            }
        } else {
            clearInterval(this.inter);
        }
    }, 125);
    constructor(type, fi, landFunction) {
        this.type = type;
        this.canvas = fi.canvas;
        this.context = fi.context;
        this.width = fi.width;
        this.height = fi.height;
        this.field = fi;
        if (landFunction != null) {
            this.landFunction = landFunction;
        }
        if (type === 'i') {
            this.x = 5;
            this.y = 2;
            this.data = [
                [-3, -1],
                [-1, -1],
                [1, -1],
                [3, -1]
            ];
        } else if (type === 't') {
            this.x = 4;
            this.y = 2;
            this.data = [
                [-1, 0],
                [0, 0],
                [1, 0],
                [0, -1]
            ];
        } else if (type === 'l') {
            this.x = 4;
            this.y = 2;
            this.data = [
                [1, -1],
                [-1, 0],
                [0, 0],
                [1, 0]
            ];
        } else if (type === 'j') {
            this.x = 4;
            this.y = 2;
            this.data = [
                [-1, -1],
                [-1, 0],
                [0, 0],
                [1, 0]
            ];
        } else if (type === 's') {
            this.x = 4;
            this.y = 2;
            this.data = [
                [-1, 0],
                [0, 0],
                [0, -1],
                [1, -1]
            ];
        } else if (type === 'z') {
            this.x = 4;
            this.y = 2;
            this.data = [
                [-1, -1],
                [0, -1],
                [0, 0],
                [1, 0]
            ];
        } else if (type === 'o') {
            this.x = 5;
            this.y = 1;
            this.data = [
                [-1, -1],
                [-1, 1],
                [1, 1],
                [1, -1]
            ];
        }
        this.y = this.field.height - 22 + this.y;
        let permission = true;
        for (let i = 0; i < this.data.length; i++) {
            const e = this.data[i];
            if (type === 'i' || type === 'o') {
                if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30, (e[1] * 15 + this.y * 30 - 15) / 30)) {
                    permission = false;
                }
            } else {
                if (this.field.isblock(e[0] + this.x, e[1] + this.y)) {
                    permission = false;
                }
            }
        }
        if (permission === false) {
            this.y--;
            permission = true;
            for (let i = 0; i < this.data.length; i++) {
                const e = this.data[i];
                if (type === 'i' || type === 'o') {
                    if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30, (e[1] * 15 + this.y * 30 - 15) / 30)) {
                        permission = false;
                    }
                } else {
                    if (this.field.isblock(e[0] + this.x, e[1] + this.y)) {
                        permission = false;
                    }
                }
            }
            if (permission === false) {
                if (this.field.gameover != null) {
                    this.field.gameover();
                }
            }
        }
    }
    rotate(RorL, count = 0) {
        //srs
        if (this.type === 'i' || this.type === 'o') {
            //i
            if (count === 1) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x -= 2;
                    } else {
                        //0->l
                        this.x -= 1;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x -= 1;
                    } else {
                        //r->0
                        this.x += 2;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x += 2;
                    } else {
                        //2->r
                        this.x += 1;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x += 1;
                    } else {
                        //l->2
                        this.x -= 2;
                    }
                }
            } else if (count === 2) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x += 3;
                    } else {
                        //0->l
                        this.x += 3;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x += 3;
                    } else {
                        //r->0
                        this.x -= 3;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x -= 3;
                    } else {
                        //2->r
                        this.x -= 3;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x -= 3;
                    } else {
                        //l->2
                        this.x += 3;
                    }
                }
            } else if (count === 3) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x -= 3;
                        this.y += 1;
                    } else {
                        //0->l
                        this.x -= 3;
                        this.y -= 2;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x -= 3;
                        this.y -= 2;
                    } else {
                        //r->0
                        this.x += 3;
                        this.y -= 1;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x += 3;
                        this.y -= 1;
                    } else {
                        //2->r
                        this.x += 3;
                        this.y += 2;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x += 3;
                        this.y += 2;
                    } else {
                        //l->2
                        this.x -= 3;
                        this.y += 1;
                    }
                }
            } else if (count === 4) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x += 3;
                        this.y -= 3;
                    } else {
                        //0->l
                        this.x += 3;
                        this.y += 3;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x += 3;
                        this.y += 3;
                    } else {
                        //r->0
                        this.x -= 3;
                        this.y += 3;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x -= 3;
                        this.y += 3;
                    } else {
                        //2->r
                        this.x -= 3;
                        this.y -= 3;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x -= 3;
                        this.y -= 3;
                    } else {
                        //l->2
                        this.x += 3;
                        this.y += 3;
                    }
                }
            } else if (count === 5) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x -= 1;
                        this.y += 2;
                    } else {
                        //0->l
                        this.x -= 2;
                        this.y -= 1;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x -= 2;
                        this.y -= 1;
                    } else {
                        //r->0
                        this.x += 1;
                        this.y -= 2;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x += 1;
                        this.y -= 2;
                    } else {
                        //2->r
                        this.x += 2;
                        this.y += 1;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x += 2;
                        this.y += 1;
                    } else {
                        //l->2
                        this.x -= 1;
                        this.y += 2;
                    }
                }
            }
        } else {
            //j,l,s,t,z
            if (count === 1) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x -= 1;
                    } else {
                        //0->l
                        this.x += 1;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x += 1;
                    } else {
                        //r->0
                        this.x += 1;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x += 1;
                    } else {
                        //2->r
                        this.x -= 1;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x -= 1;
                    } else {
                        //l->2
                        this.x -= 1;
                    }
                }
            } else if (count === 2) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.y -= 1;
                    } else {
                        //0->l
                        this.y -= 1;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.y += 1;
                    } else {
                        //r->0
                        this.y += 1;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.y -= 1;
                    } else {
                        //2->r
                        this.y -= 1;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.y += 1;
                    } else {
                        //l->2
                        this.y += 1;
                    }
                }
            } else if (count === 3) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x += 1;
                        this.y += 3;
                    } else {
                        //0->l
                        this.x -= 1;
                        this.y += 3;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x -= 1;
                        this.y -= 3;
                    } else {
                        //r->0
                        this.x -= 1;
                        this.y -= 3;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x -= 1;
                        this.y += 3;
                    } else {
                        //2->r
                        this.x += 1;
                        this.y += 3;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x += 1;
                        this.y -= 3;
                    } else {
                        //l->2
                        this.x += 1;
                        this.y -= 3;
                    }
                }
            } else if (count === 4) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x -= 1;
                    } else {
                        //0->l
                        this.x += 1;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x += 1;
                    } else {
                        //r->0
                        this.x += 1;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x += 1;
                    } else {
                        //2->r
                        this.x -= 1;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x -= 1;
                    } else {
                        //l->2
                        this.x -= 1;
                    }
                }
            } else if (count === 5) {
                if (this.angle === 0) {
                    if (RorL === 1) {
                        //0->r
                        this.x += 1;
                        this.y -= 2;
                    } else {
                        //0->l
                        this.x -= 1;
                        this.y -= 2;
                    }
                } else if (this.angle === 1) {
                    if (RorL === 1) {
                        //r->2
                        this.x -= 1;
                        this.y += 2;
                    } else {
                        //r->0
                        this.x -= 1;
                        this.y += 2;
                    }
                } else if (this.angle === 2) {
                    if (RorL === 1) {
                        //2->l
                        this.x -= 1;
                        this.y -= 2;
                    } else {
                        //2->r
                        this.x += 1;
                        this.y -= 2;
                    }
                } else if (this.angle === 3) {
                    if (RorL === 1) {
                        //l->0
                        this.x += 1;
                        this.y += 2;
                    } else {
                        //l->2
                        this.x += 1;
                        this.y += 2;
                    }
                }
            }
        }
        if (RorL === 1) {
            for (let i = 0; i < this.data.length; i++) {
                const e = this.data[i];
                const ex = e[0];
                const ey = e[1];
                e[0] = -ey;
                e[1] = ex;
            }
        } else if (RorL === -1) {
            for (let i = 0; i < this.data.length; i++) {
                const e = this.data[i];
                const ex = e[0];
                const ey = e[1];
                e[0] = ey;
                e[1] = -ex;
            }
        }
        let permission = true;
        for (let i = 0; i < this.data.length; i++) {
            const e = this.data[i];
            if (this.type === 'i' || this.type === 'o') {
                if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30, (e[1] * 15 + this.y * 30 - 15) / 30)) {
                    permission = false;
                }
            } else {
                if (this.field.isblock(e[0] + this.x, e[1] + this.y)) {
                    permission = false;
                }
            }
        }
        if (permission === false) {
            if (RorL === -1) {
                for (let i = 0; i < this.data.length; i++) {
                    const e = this.data[i];
                    const ex = e[0];
                    const ey = e[1];
                    e[0] = -ey;
                    e[1] = ex;
                }
            } else if (RorL === 1) {
                for (let i = 0; i < this.data.length; i++) {
                    const e = this.data[i];
                    const ex = e[0];
                    const ey = e[1];
                    e[0] = ey;
                    e[1] = -ex;
                }
            }
            if (count !== 5) {
                this.rotate(RorL, ++count);
            }
        } else {
            this.angle += RorL;
            this.fallCounter = 1;
            if (this.angle === 4) {
                this.angle = 0;
            } else if (this.angle === -1) {
                this.angle = 3;
            }
            if (this.type === 't') {
                let isTspin = 0;
                if (this.field.isblock(this.x - 1, this.y - 1)) {
                    isTspin++;
                }
                if (this.field.isblock(this.x + 1, this.y - 1)) {
                    isTspin++;
                }
                if (this.field.isblock(this.x + 1, this.y + 1)) {
                    isTspin++;
                }
                if (this.field.isblock(this.x - 1, this.y + 1)) {
                    isTspin++;
                }
                if (2 < isTspin) {
                    this.tspin = true;
                }
                if (this.tspin) {
                    if (this.angle === 0) {
                        if (this.field.isblock(this.x + 1, this.y - 1) === false || this.field.isblock(this.x - 1, this.y - 1) === false) {
                            this.miniTspin = true;
                        }
                    } else if (this.angle === 1) {
                        if (this.field.isblock(this.x + 1, this.y + 1) === false || this.field.isblock(this.x + 1, this.y - 1) === false) {
                            this.miniTspin = true;
                        }
                    } else if (this.angle === 2) {
                        if (this.field.isblock(this.x + 1, this.y + 1) === false || this.field.isblock(this.x - 1, this.y + 1) === false) {
                            this.miniTspin = true;
                        }
                    } else if (this.angle === 3) {
                        if (this.field.isblock(this.x - 1, this.y + 1) === false || this.field.isblock(this.x - 1, this.y - 1) === false) {
                            this.miniTspin = true;
                        }
                    }
                }
            }
            this.render();
        }
    }
    control(key) {
        if (this.landing === false) {
            if (key === ' ') {
                clearInterval(this.inter);
                while (this.landing === false) {
                    this.minodown();
                }
            } else if (key === 'ArrowUp') {
                this.rotate(1);
            } else if (key === 'z') {
                this.rotate(-1);
            } else if (key === 'ArrowRight') {
                let permission = true;
                for (let i = 0; i < this.data.length; i++) {
                    const e = this.data[i];
                    if (this.type === 'i' || this.type === 'o') {
                        if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30 + 1, (e[1] * 15 + this.y * 30 - 15) / 30)) {
                            permission = false;
                        }
                    } else {
                        if (this.field.isblock(e[0] + this.x + 1, e[1] + this.y)) {
                            permission = false;
                        }
                    }
                }
                if (permission === true) {
                    this.fallCounter = 1;
                    this.x++;
                    this.tspin = false;
                    this.miniTspin = false;
                }
            } else if (key === 'ArrowDown') {
                this.y++;
                let permission = true;
                for (let i = 0; i < this.data.length; i++) {
                    const e = this.data[i];
                    if (this.type === 'i' || this.type === 'o') {
                        if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30, (e[1] * 15 + this.y * 30 - 15) / 30)) {
                            permission = false;
                        }
                    } else {
                        if (this.field.isblock(e[0] + this.x, e[1] + this.y)) {
                            permission = false;
                        }
                    }
                }
                if (permission === false) {
                    this.y--;
                } else {
                    this.tspin = false;
                    this.miniTspin = false;
                }
            } else if (key === 'ArrowLeft') {
                let permission = true;
                for (let i = 0; i < this.data.length; i++) {
                    const e = this.data[i];
                    if (this.type === 'i' || this.type === 'o') {
                        if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30 - 1, (e[1] * 15 + this.y * 30 - 15) / 30)) {
                            permission = false;
                        }
                    } else {
                        if (this.field.isblock(e[0] + this.x - 1, e[1] + this.y)) {
                            permission = false;
                        }
                    }
                }
                if (permission === true) {
                    this.fallCounter = 1;
                    this.x--;
                    this.tspin = false;
                    this.miniTspin = false;
                }
            }
            this.render();
        }
    }
    minodown() {
        if (this.landing === false) {
            this.y++;
            let permission = true;
            for (let i = 0; i < this.data.length; i++) {
                const e = this.data[i];
                if (this.type === 'i' || this.type === 'o') {
                    if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30, (e[1] * 15 + this.y * 30 - 15) / 30)) {
                        permission = false;
                    }
                } else {
                    if (this.field.isblock(e[0] + this.x, e[1] + this.y)) {
                        permission = false;
                    }
                }
            }
            if (permission === false) {
                this.y--;
                if (this.fallCounter !== 1 || 5 < this.fallCounterCounter) {
                    this.landing = true;
                    for (let i = 0; i < this.data.length; i++) {
                        const e = this.data[i];
                        if (this.type === 'i' || this.type === 'o') {
                            if (0 <= (e[1] * 15 + this.y * 30 - 15) / 30) {
                                this.field.data[(e[1] * 15 + this.y * 30 - 15) / 30][(e[0] * 15 + this.x * 30 - 15) / 30] = this.type;
                            }
                        } else {
                            if (0 <= e[1] + this.y) {
                                this.field.data[e[1] + this.y][e[0] + this.x] = this.type;
                            }
                        }
                    }
                    this.field.render();
                    if (this.landFunction != null) {
                        this.landFunction();
                    }
                } else {
                    this.fallCounterCounter++;
                }
            } else {
                this.tspin = false;
                this.miniTspin = false;
            }
            this.fallCounter = 0;
            this.render();
        } else {
            this.inter = null;
        }
    }
    render() {
        if (this.landing === false) {
            let shadowY = this.y;
            let shadowWhile = true;
            while (shadowWhile) {
                let permission = true;
                for (let i = 0; i < this.data.length; i++) {
                    const e = this.data[i];
                    if (this.type === 'i' || this.type === 'o') {
                        if (this.field.isblock((e[0] * 15 + this.x * 30 - 15) / 30, (e[1] * 15 + shadowY * 30 - 15) / 30)) {
                            permission = false;
                        }
                    } else {
                        if (this.field.isblock((e[0] + this.x), (e[1] + shadowY))) {
                            permission = false;
                        }
                    }
                }
                if (permission === true) {
                    shadowY++;
                } else {
                    shadowY--;
                    shadowWhile = false;
                }
            }
            this.field.drawfield();
            for (let i = 0; i < this.data.length; i++) {
                const e = this.data[i];
                this.context.globalAlpha = 1.0;
                if (this.type === 'i') {
                    this.context.fillStyle = 'cyan';
                    this.context.fillRect(e[0] * 15 + this.x * 30 - 15, e[1] * 15 + (this.y + 22 - this.field.height) * 30 - 15, 30, 30);
                } else if (this.type === 'o') {
                    this.context.fillStyle = 'yellow';
                    this.context.fillRect(e[0] * 15 + this.x * 30 - 15, e[1] * 15 + (this.y + 22 - this.field.height) * 30 - 15, 30, 30);
                } else if (this.type === 't') {
                    this.context.fillStyle = 'purple';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + this.y + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 's') {
                    this.context.fillStyle = 'greenyellow';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + this.y + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 'z') {
                    this.context.fillStyle = 'red';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + this.y + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 'j') {
                    this.context.fillStyle = 'blue';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + this.y + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 'l') {
                    this.context.fillStyle = 'orange';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + this.y + 22 - this.field.height) * 30, 30, 30);
                }
                this.context.globalAlpha = 0.4;
                if (this.type === 'i' || this.type === 'o') {
                    this.context.drawImage(this.field.netstroke, e[0] * 15 + this.x * 30 - 15, e[1] * 15 + (this.y + 22 - this.field.height) * 30 - 15);
                } else {
                    this.context.drawImage(this.field.netstroke, (e[0] + this.x) * 30, (e[1] + this.y + 22 - this.field.height) * 30);
                }
            }
            this.context.globalAlpha = 0.6;
            for (let i = 0; i < this.data.length; i++) {
                const e = this.data[i];
                if (this.type === 'i') {
                    this.context.fillStyle = 'cyan';
                    this.context.fillRect(e[0] * 15 + this.x * 30 - 15, e[1] * 15 + (shadowY + 22 - this.field.height) * 30 - 15, 30, 30);
                } else if (this.type === 'o') {
                    this.context.fillStyle = 'yellow';
                    this.context.fillRect(e[0] * 15 + this.x * 30 - 15, e[1] * 15 + (shadowY + 22 - this.field.height) * 30 - 15, 30, 30);
                } else if (this.type === 't') {
                    this.context.fillStyle = 'purple';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + shadowY + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 's') {
                    this.context.fillStyle = 'greenyellow';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + shadowY + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 'z') {
                    this.context.fillStyle = 'red';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + shadowY + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 'j') {
                    this.context.fillStyle = 'blue';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + shadowY + 22 - this.field.height) * 30, 30, 30);
                } else if (this.type === 'l') {
                    this.context.fillStyle = 'orange';
                    this.context.fillRect((e[0] + this.x) * 30, (e[1] + shadowY + 22 - this.field.height) * 30, 30, 30);
                }
            }
        }
    }
}