class test_field {
    data = [];
    constructor(width, height) {
        this.width = width;
        this.height = height;
        for (let i1 = 0; i1 < height; i1++) {
            this.data.push([]);
            for (let i2 = 0; i2 < width; i2++) {
                this.data.at(-1).push('');
            }
        }
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
}

class test_mino {
    landing = false;
    fallTimer = 10;
    fallCounter = 0;
    fallCounterCounter = 0;
    angle = 0;
    tspin = false;
    miniTspin = false;

    inter = null;

    constructor(type, fi, landFunction) {
        this.type = type;
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
        }
    }
    control(key) {
        if (this.landing === false) {
            if (key === ' ') {
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
                } else {
                    this.fallCounterCounter++;
                }
            } else {
                this.tspin = false;
                this.miniTspin = false;
            }
            this.fallCounter = 0;
        } else {
            this.inter = null;
        }
    }
}

function workercom(j) {
    const com_field = new test_field(10, 50);
    const com_field2 = new test_field(10, 50);

    function com_aglmaxfunc(t) {
        switch (t) {
            case 'i':
                return 2;
            case 'o':
                return 1;
            case 's':
            case 'z':
                return 2;
            default:
                return 4;
        }
    }

    const com_type = j.type1;
    const com_type2 = j.type2;
    const com_typehold = j.typehold;
    let com_aglmax = com_aglmaxfunc(com_type);
    let com_aglmaxhold = com_aglmaxfunc(com_typehold);
    let com_score = [false, false, false, false];

    for (let n0 = 0; n0 < com_aglmax; n0++) {
        for (let n1 = -5; n1 < 6; n1++) {
            com_field.data = JSON.parse(JSON.stringify(j.main));
            let com_ctrcount = n1;
            let com_aglcount = n0;
            const com_mino = new test_mino(com_type, com_field);
            while (com_aglcount !== 0) {
                com_aglcount--;
                com_mino.control('ArrowUp');
            }
            while (com_ctrcount !== 0) {
                if (com_ctrcount < 0) {
                    com_mino.control('ArrowLeft');
                    com_ctrcount++;
                } else if (0 < com_ctrcount) {
                    com_mino.control('ArrowRight');
                    com_ctrcount--;
                }
            }
            com_mino.control(' ');

            let com_clearline = 0;

            for (let i1 = 0; i1 < com_field2.data.length; i1++) {
                if (com_field2.data[i1].indexOf('') === -1) {
                    com_field2.data.splice(i1, 1);
                    const ins = [];
                    for (let i2 = 0; i2 < com_field2.width; i2++) {
                        ins.push('');
                    }
                    com_field2.data.unshift(ins);
                    com_clearline++;
                }
            }
            if (com_clearline === 1) {
                com_clearline = 0.5;
            }

            for (let n02 = 0; n02 < 4; n02++) {
                for (let n12 = -5; n12 < 6; n12++) {
                    com_field2.data = JSON.parse(JSON.stringify(com_field.data));
                    let com_ctrcount2 = n12;
                    let com_aglcount2 = n02;
                    const com_mino2 = new test_mino(com_type2, com_field2);
                    while (com_aglcount2 !== 0) {
                        com_aglcount2--;
                        com_mino2.control('ArrowUp');
                    }
                    while (com_ctrcount2 !== 0) {
                        if (com_ctrcount2 < 0) {
                            com_mino2.control('ArrowLeft');
                            com_ctrcount2++;
                        } else if (0 < com_ctrcount2) {
                            com_mino2.control('ArrowRight');
                            com_ctrcount2--;
                        }
                    }
                    com_mino2.control(' ');
                    let com_beforeexist;
                    let com_thisscore = 0;
                    let com_nowtop = 0;
                    let com_maintop = 0;
                    let com_clearline2 = 0;
                    const com_onexist = [false, false, false, false, false, false, false, false, false, false];
                    for (let i1 = 0; i1 < com_field2.data.length; i1++) {
                        if (com_field2.data[i1].indexOf('') === -1) {
                            com_field2.data.splice(i1, 1);
                            const ins = [];
                            for (let i2 = 0; i2 < com_field2.width; i2++) {
                                ins.push('');
                            }
                            com_field2.data.unshift(ins);
                            com_clearline2++;
                        }
                    }
                    if (com_clearline2 === 1) {
                        com_clearline2 = 0.5;
                    }
                    com_clearline += com_clearline2;
                    for (let n3 = 0; n3 < com_field2.data.length; n3++) {
                        const element = com_field2.data[n3].join('');
                        if (element !== '') {
                            com_nowtop = n3;
                            break;
                        }
                    }
                    for (let n3 = 0; n3 < j.main.length; n3++) {
                        const element = j.main[n3].join('');
                        if (element !== '') {
                            com_maintop = n3;
                            break;
                        }
                    }
                    com_thisscore += 10 * (com_maintop - com_nowtop - com_clearline * com_clearline);
                    for (let n4 = com_nowtop; n4 < com_field2.data.length; n4++) {
                        const row = com_field2.data[n4];
                        for (let n5 = 0; n5 < row.length; n5++) {
                            const column = row[n5];
                            if (column !== '') {
                                if (com_beforeexist == null) {
                                    com_beforeexist = true;
                                } else if (com_beforeexist === false) {
                                    com_beforeexist = true;
                                    com_thisscore++;
                                }
                                if (com_onexist[n5] === false) {
                                    com_onexist[n5] = true;
                                    com_thisscore++;
                                }
                            } else {
                                if (com_beforeexist == null) {
                                    com_beforeexist = false;
                                } else if (com_beforeexist === true) {
                                    com_beforeexist = false;
                                    com_thisscore++;
                                }
                                if (com_onexist[n5] === true) {
                                    com_onexist[n5] = false;
                                    com_thisscore++;
                                }
                            }
                        }
                    }
                    if (com_score[0] === false || com_thisscore <= com_score[0]) {
                        com_score[0] = com_thisscore;
                        com_score[1] = n1;
                        com_score[2] = n0;
                        com_score[3] = 0;
                    }
                }
            }
        }
        if (com_typehold !== 'none' && j.com_hold && j.com_permhold) {
            for (let n0 = 0; n0 < com_aglmaxhold; n0++) {
                for (let n1 = -5; n1 < 6; n1++) {
                    com_field.data = JSON.parse(JSON.stringify(j.main));
                    let com_ctrcount = n1;
                    let com_aglcount = n0;
                    const com_mino = new test_mino(com_typehold, com_field);
                    while (com_aglcount !== 0) {
                        com_aglcount--;
                        com_mino.control('ArrowUp');
                    }
                    while (com_ctrcount !== 0) {
                        if (com_ctrcount < 0) {
                            com_mino.control('ArrowLeft');
                            com_ctrcount++;
                        } else if (0 < com_ctrcount) {
                            com_mino.control('ArrowRight');
                            com_ctrcount--;
                        }
                    }
                    com_mino.control(' ');

                    let com_clearline = 0;

                    for (let i1 = 0; i1 < com_field2.data.length; i1++) {
                        if (com_field2.data[i1].indexOf('') === -1) {
                            com_field2.data.splice(i1, 1);
                            const ins = [];
                            for (let i2 = 0; i2 < com_field2.width; i2++) {
                                ins.push('');
                            }
                            com_field2.data.unshift(ins);
                            com_clearline++;
                        }
                    }
                    if (com_clearline === 1) {
                        com_clearline = 0.5;
                    }

                    for (let n02 = 0; n02 < 4; n02++) {
                        for (let n12 = -5; n12 < 6; n12++) {
                            com_field2.data = JSON.parse(JSON.stringify(com_field.data));
                            let com_ctrcount2 = n12;
                            let com_aglcount2 = n02;
                            const com_mino2 = new test_mino(com_type, com_field2);
                            while (com_aglcount2 !== 0) {
                                com_aglcount2--;
                                com_mino2.control('ArrowUp');
                            }
                            while (com_ctrcount2 !== 0) {
                                if (com_ctrcount2 < 0) {
                                    com_mino2.control('ArrowLeft');
                                    com_ctrcount2++;
                                } else if (0 < com_ctrcount2) {
                                    com_mino2.control('ArrowRight');
                                    com_ctrcount2--;
                                }
                            }
                            com_mino2.control(' ');
                            let com_beforeexist;
                            let com_thisscore = 0;
                            let com_nowtop = 0;
                            let com_maintop = 0;
                            let com_clearline2 = 0;
                            const com_onexist = [false, false, false, false, false, false, false, false, false, false];
                            for (let i1 = 0; i1 < com_field2.data.length; i1++) {
                                if (com_field2.data[i1].indexOf('') === -1) {
                                    com_field2.data.splice(i1, 1);
                                    const ins = [];
                                    for (let i2 = 0; i2 < com_field2.width; i2++) {
                                        ins.push('');
                                    }
                                    com_field2.data.unshift(ins);
                                    com_clearline2++;
                                }
                            }
                            if (com_clearline2 === 1) {
                                com_clearline2 = 0.5;
                            }
                            com_clearline += com_clearline2;
                            for (let n3 = 0; n3 < com_field2.data.length; n3++) {
                                const element = com_field2.data[n3].join('');
                                if (element !== '') {
                                    com_nowtop = n3;
                                    break;
                                }
                            }
                            for (let n3 = 0; n3 < j.main.length; n3++) {
                                const element = j.main[n3].join('');
                                if (element !== '') {
                                    com_maintop = n3;
                                    break;
                                }
                            }
                            com_thisscore += 10 * (com_maintop - com_nowtop - com_clearline * com_clearline);
                            for (let n4 = com_nowtop; n4 < com_field2.data.length; n4++) {
                                const row = com_field2.data[n4];
                                for (let n5 = 0; n5 < row.length; n5++) {
                                    const column = row[n5];
                                    if (column !== '') {
                                        if (com_beforeexist == null) {
                                            com_beforeexist = true;
                                        } else if (com_beforeexist === false) {
                                            com_beforeexist = true;
                                            com_thisscore++;
                                        }
                                        if (com_onexist[n5] === false) {
                                            com_onexist[n5] = true;
                                            com_thisscore++;
                                        }
                                    } else {
                                        if (com_beforeexist == null) {
                                            com_beforeexist = false;
                                        } else if (com_beforeexist === true) {
                                            com_beforeexist = false;
                                            com_thisscore++;
                                        }
                                        if (com_onexist[n5] === true) {
                                            com_onexist[n5] = false;
                                            com_thisscore++;
                                        }
                                    }
                                }
                            }
                            if (com_score[0] === false || com_thisscore <= com_score[0]) {
                                com_score[0] = com_thisscore;
                                com_score[1] = n1;
                                com_score[2] = n0;
                                com_score[3] = 1;
                            }
                        }
                    }
                }
            }
        }
    }
    return JSON.stringify(com_score);
}
self.addEventListener('message', function (e) {
    self.postMessage(workercom(JSON.parse(e.data)));
}, false);