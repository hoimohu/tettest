'use strict';
/**
 * glowing.js version 1.5
 * Copyright (c) 2021 kumacat
 */

const glowing_version = 1.5;
console.log("%cGlowing.js 🌟 version " + glowing_version + " is running.", "padding:10px;border-left:20px orange solid;border-right:20px orange solid;border-top:6px orange solid;border-bottom:6px orange solid;background-color:#369;color:#fff;");

class charObj {
    constructor(x, y, width, height) {
        this.Run = true;
        this.x = x;
        this.y = y;
        this.w = (width != null) ? width : false;
        this.h = (height != null) ? height : false;
        this.clickFunction = [];
        this.downFunction = [];
        this.upFunction = [];
        this.dragFunction = [];
        this.items = [];
        this.readyClick = false;
        this.alpha = 1;
        this.angle = 0;
    }
    on(...items) {
        for (let n = 0; n < items.length; n++) {
            this.items.push(items[n]);
        }
    }
    addEvent(kind, eventFunction) {
        switch (kind) {
            case 'click':
                this.clickFunction.push(eventFunction);
                break;
            case 'down':
                this.downFunction.push(eventFunction);
                break;
            case 'up':
                this.upFunction.push(eventFunction);
                break;
            case 'drag':
                this.dragFunction.push(eventFunction);
                break;
        }
    }
    render(arg) {
        if (this.Run === true) {
            for (let n = 0; n < this.items.length; n++) {
                this.items[n].render(arg);
            }
        }
    }
    resize(width, height) {
        this.w = (width !== 0 || width != null) ? width : this.w;
        this.h = (height !== 0 || height != null) ? height : this.h;
    }
    deleteItem(...items) {
        for (let n1 = 0; n1 < items.length; n1++) {
            for (let n2 = 0; n2 < this.items.length; n2++) {
                if (this.items[n2] === items[n1]) {
                    this.items.splice(n2, 1);
                }
            }
        }
    }
    hide(bool) {
        if (bool != null) {
            if (bool === true) {
                this.Run = true;
            } else if (bool === false) {
                this.Run = false;
            } else {
                if (this.Run === true) {
                    this.Run = false;
                } else if (this.Run === false) {
                    this.Run = true;
                }
            }
        } else {
            if (this.Run === true) {
                this.Run = false;
            } else if (this.Run === false) {
                this.Run = true;
            }
        }
    }
}

class imgObj {
    constructor(url, startX, startY, imageWidth, imageHeight, crossOrigin, loadback) {
        this.loadstate = false;
        this.sx = startX;
        this.sy = startY;
        this.w = (imageWidth != null) ? imageWidth : false;
        this.h = (imageHeight != null) ? imageHeight : false;
        this.co = (crossOrigin != null) ? crossOrigin : false;
        this.lb = (loadback != null) ? loadback : false;
        if (typeof url === 'string') {
            this.url = url;
            const imageElement = new Image();
            imageElement.src = url;
            if (this.w === false) {
                imageElement.addEventListener('load', () => {
                    this.w = imageElement.naturalWidth - startX;
                });
            }
            if (this.h === false) {
                imageElement.addEventListener('load', () => {
                    this.h = imageElement.naturalHeight - startY;
                });
            }
            imageElement.addEventListener('load', () => {
                this.loadstate = true;
                if (this.lb != null) {
                    if (typeof this.lb === 'function') {
                        this.lb(this);
                    }
                }
            });
            this.i = imageElement;
        } else {
            this.url = 'canvas';
            this.i = url;
            this.loadstate = true;
            if (this.lb != null) {
                if (typeof this.lb === 'function') {
                    this.lb(this);
                }
            }
        }
        this.smooth = true;
    }
    sizecalc(calc, target, thisobj) {
        function calc_string(str) {
            const spl1 = str.match(/[^ 　].*?/g);
            const calc1 = {
                before: '',
                after: '',
                next: '',
                front: '',
                calc: false
            };
            for (let n1 = 0; n1 < spl1.length; n1++) {
                const element = spl1[n1];
                switch (element) {
                    case '*':
                    case '/':
                    case '%':
                        calc1.front = true;
                        if (calc1.calc === '*') {
                            calc1.before = ('' + ((calc1.before - 0) * (calc1.after - 0)));
                        } else if (calc1.calc === '/') {
                            calc1.before = ('' + ((calc1.before - 0) / (calc1.after - 0)));
                        } else if (calc1.calc === '%') {
                            calc1.before = ('' + ((calc1.before - 0) % (calc1.after - 0)));
                        }
                        calc1.after = '';
                        calc1.calc = element;
                        break;
                    case '+':
                        calc1.front = true;
                        if (calc1.calc === false) {
                            calc1.next += (calc1.before + element);
                        } else if (calc1.calc === '*') {
                            calc1.next += ('' + ((calc1.before - 0) * (calc1.after - 0)) + element);
                        } else if (calc1.calc === '/') {
                            calc1.next += ('' + ((calc1.before - 0) / (calc1.after - 0)) + element);
                        } else if (calc1.calc === '%') {
                            calc1.next += ('' + ((calc1.before - 0) % (calc1.after - 0)) + element);
                        }
                        calc1.before = '';
                        calc1.after = '';
                        calc1.calc = false;
                        break;
                    case '-':
                        if (calc1.front === true) {
                            calc1.after += element;
                        } else if (calc1.front === false) {
                            calc1.front = true;
                            if (calc1.calc === false) {
                                calc1.next += (calc1.before + element);
                            } else if (calc1.calc === '*') {
                                calc1.next += ('' + ((calc1.before - 0) * (calc1.after - 0)) + element);
                            } else if (calc1.calc === '/') {
                                calc1.next += ('' + ((calc1.before - 0) / (calc1.after - 0)) + element);
                            } else if (calc1.calc === '%') {
                                calc1.next += ('' + ((calc1.before - 0) % (calc1.after - 0)) + element);
                            }
                            calc1.before = '';
                            calc1.after = '';
                            calc1.calc = false;
                        }
                        break;
                    default:
                        calc1.front = false;
                        if (calc1.calc === false) {
                            calc1.before += element;
                        } else {
                            calc1.after += element;
                        }
                        if (!(n1 + 1 < spl1.length)) {
                            if (calc1.calc === false) {
                                calc1.next += calc1.before;
                            } else if (calc1.calc === '*') {
                                calc1.next += ('' + ((calc1.before - 0) * (calc1.after - 0)));
                            } else if (calc1.calc === '/') {
                                calc1.next += ('' + ((calc1.before - 0) / (calc1.after - 0)));
                            } else if (calc1.calc === '%') {
                                calc1.next += ('' + ((calc1.before - 0) % (calc1.after - 0)));
                            }
                            calc1.before = '';
                            calc1.after = '';
                        }
                        break;
                }
            }
            const spl2 = calc1.next.split('');
            const calc2 = {
                before: '',
                after: '',
                front: '',
                calc: false
            };
            for (let n2 = 0; n2 < spl2.length; n2++) {
                const element = spl2[n2];
                switch (element) {
                    case '+':
                        calc2.front = true;
                        if (calc2.calc === '+') {
                            calc2.before = ((calc2.before - 0) + (calc2.after - 0));
                        } else if (calc2.calc === '-') {
                            calc2.before = ((calc2.before - 0) - (calc2.after - 0));
                        }
                        calc2.calc = '+';
                        calc2.after = '';
                        break;
                    case '-':
                        if (calc2.front === true) {
                            calc2.after += element;
                        } else if (calc2.front === false) {
                            calc2.front = true;
                            if (calc2.calc === '+') {
                                calc2.before = ((calc2.before - 0) + (calc2.after - 0));
                            } else if (calc2.calc === '-') {
                                calc2.before = ((calc2.before - 0) - (calc2.after - 0));
                            }
                            calc2.calc = '-';
                            calc2.after = '';
                        }
                        break;
                    default:
                        calc2.front = false;
                        if (calc2.calc === false) {
                            calc2.before += element;
                        } else {
                            calc2.after += element;
                        }
                        if (!(n2 + 1 < spl2.length)) {
                            if (calc2.calc === '+') {
                                calc2.before = ((calc2.before - 0) + (calc2.after - 0));
                            } else if (calc2.calc === '-') {
                                calc2.before = ((calc2.before - 0) - (calc2.after - 0));
                            }
                            calc2.after = '';
                        }
                        break;
                }
            }
            return calc2.before - 0;
        }

        function replace_percentage(num) {
            return (num.replace('%', '') - 0) * target / 100;
        }

        function replace_thisobj(num) {
            return (num.replace('@', '') - 0) * thisobj / 100;
        }

        function match_string(str) {
            const mat = str.match(/(?<=\()[^\(\)]*?(?=\))/g);
            const spl = str.split(/\([^\(\)]*?\)/g);
            if (mat) {
                const result = [spl[0]];
                for (let n1 = 0; n1 < mat.length; n1++) {
                    result.push(calc_string(mat[n1]), spl[n1 + 1]);
                }
                return match_string(result.join('')) - 0;
            } else {
                return calc_string(str) - 0;
            }
        }

        if ((calc + '').indexOf('calc') !== -1) {
            const match1 = calc.match(/(?<=calc).*\)$/)[0];
            return match_string(match1.match(/[^ 　].*?/g).join('').replace(/px/g, '').replace(/\d+%(?=\D)(?!\()/g, replace_percentage).replace(/\d+@(?=\D)(?!\()/g, replace_thisobj));
        } else {
            if ((calc + '').indexOf('%') !== -1) {
                return target / 100 * (calc.match(/.*(?=%)/)[0] - 0);
            }
            if ((calc + '').indexOf('px') !== -1) {
                return calc.match(/.*(?=px)/)[0] - 0;
            }
        }
    }
    render(arg) {
        if (arg.width === false) {
            if (arg.height === false) {
                arg.width = 10;
            }
        }
        if ((arg.width + '').indexOf('@') !== -1) {
            if ((arg.height + '').indexOf('@') !== -1) {}
        } else {
            if ((arg.height + '').indexOf('@') !== -1) {} else {
                arg.canvasContext.globalAlpha = arg.alpha;
                arg.canvasContext.mozImageSmoothingEnabled = this.smooth;
                arg.canvasContext.webkitImageSmoothingEnabled = this.smooth;
                arg.canvasContext.msImageSmoothingEnabled = this.smooth;
                arg.canvasContext.imageSmoothingEnabled = this.smooth;
                if (arg.height === false) {
                    const w = (typeof arg.width === 'number') ? arg.canvasElement.width / 100 * arg.width : this.sizecalc(arg.width, arg.canvasElement.width);
                    const h = w / this.w * this.h;
                    const x = (typeof arg.x === 'number') ? arg.canvasElement.width / 100 * arg.x : this.sizecalc(arg.x, arg.canvasElement.width, w);
                    const y = (typeof arg.y === 'number') ? arg.canvasElement.height / 100 * arg.y : this.sizecalc(arg.y, arg.canvasElement.height, h);
                    arg.canvasContext.translate(x, y);
                    arg.canvasContext.rotate(arg.angle * Math.PI / 180);
                    arg.canvasContext.translate(-x, -y);
                    arg.canvasContext.drawImage(this.i, this.sx, this.sy, this.w, this.h, x - w / 2, y - h / 2, w, h);
                } else if (arg.width === false) {
                    const h = (typeof arg.height === 'number') ? arg.canvasElement.height / 100 * arg.height : this.sizecalc(arg.height, arg.canvasElement.height);
                    const w = h / this.h * this.w;
                    const x = (typeof arg.x === 'number') ? arg.canvasElement.width / 100 * arg.x : this.sizecalc(arg.x, arg.canvasElement.width, w);
                    const y = (typeof arg.y === 'number') ? arg.canvasElement.height / 100 * arg.y : this.sizecalc(arg.y, arg.canvasElement.height, h);
                    arg.canvasContext.translate(x, y);
                    arg.canvasContext.rotate(arg.angle * Math.PI / 180);
                    arg.canvasContext.translate(-x, -y);
                    arg.canvasContext.drawImage(this.i, this.sx, this.sy, this.w, this.h, x - w / 2, y - h / 2, w, h);
                } else {
                    const w = (typeof arg.width === 'number') ? arg.canvasElement.width / 100 * arg.width : this.sizecalc(arg.width, arg.canvasElement.width);
                    const h = (typeof arg.height === 'number') ? arg.canvasElement.height / 100 * arg.height : this.sizecalc(arg.height, arg.canvasElement.height);
                    const x = (typeof arg.x === 'number') ? arg.canvasElement.width / 100 * arg.x : this.sizecalc(arg.x, arg.canvasElement.width, w);
                    const y = (typeof arg.y === 'number') ? arg.canvasElement.height / 100 * arg.y : this.sizecalc(arg.y, arg.canvasElement.height, h);
                    arg.canvasContext.translate(x, y);
                    arg.canvasContext.rotate(arg.angle * Math.PI / 180);
                    arg.canvasContext.translate(-x, -y);
                    arg.canvasContext.drawImage(this.i, this.sx, this.sy, this.w, this.h, x - w / 2, y - h / 2, w, h);
                }
            }
        }
    }
    onPointer(x, y, w, h, arg) {
        const eventCanvas = document.createElement('canvas');
        const eventContext = eventCanvas.getContext('2d');
        const diagonal = Math.sqrt(this.w * this.w + this.h * this.h);
        eventCanvas.width = diagonal;
        eventCanvas.height = diagonal;
        const pointX = (w === false) ? Math.round(eventCanvas.width / 2 + this.h / h * x) : Math.round(eventCanvas.width / 2 + this.w / w * x);
        const pointY = (h === false) ? Math.round(eventCanvas.height / 2 + this.w / w * y) : Math.round(eventCanvas.height / 2 + this.h / h * y);
        eventContext.globalAlpha = arg.alpha;
        eventContext.mozImageSmoothingEnabled = this.smooth;
        eventContext.webkitImageSmoothingEnabled = this.smooth;
        eventContext.msImageSmoothingEnabled = this.smooth;
        eventContext.imageSmoothingEnabled = this.smooth;
        eventContext.translate(eventCanvas.width / 2, eventCanvas.height / 2);
        eventContext.rotate(arg.angle * Math.PI / 180);
        eventContext.translate(-eventCanvas.width / 2, -eventCanvas.height / 2);
        eventContext.drawImage(this.i, this.sx, this.sy, this.w, this.h, (eventCanvas.width - this.w) / 2, (eventCanvas.height - this.h) / 2, this.w, this.h);
        if (pointX >= 0 && pointY >= 0 && pointX <= eventCanvas.width && pointY <= eventCanvas.height) {
            if (this.co === true) {
                return true;
            } else {
                if (eventContext.getImageData(pointX, pointY, 1, 1).data[3] > 0) {
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }
    loaded(arg) {
        const func = (arg != null) ? arg : false;
        if (typeof func === 'function') {
            if (this.loadstate === false) {
                this.lb = func;
            } else if (this.loadstate === true) {
                this.lb = func;
                this.lb(this);
            }
        }
        return this;
    }
}

class stageObj extends charObj {
    constructor(width, height, canvasX, canvasY, canvasW, canvasH) {
        super(canvasX, canvasY, canvasW, canvasH);
        this.addEvent('down', this.pointerDownEvent.bind(this));
        this.addEvent('drag', this.pointerDragEvent.bind(this));
        this.addEvent('up', this.pointerUpEvent.bind(this));
        this.Run = true;
        this.resizeRun = true;
        this.renderRun = true;
        this.dragRun = false;
        this.stage = [];
        this.canvasElement = document.createElement('canvas');
        this.canvasContext = this.canvasElement.getContext('2d');
        this.canvasElement.innerText = 'This browser is not supported.\nこのブラウザは非対応です。';
        this.width = width;
        this.height = height;
        this.canvasElement.addEventListener('pointerdown', e => {
            if (this.Run) {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.pointerDownEvent(x, y);
            }
        });
        this.canvasElement.addEventListener('pointermove', e => {
            if (this.Run) {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.pointerDragEvent(x, y);
            }
        });
        this.canvasElement.addEventListener('pointerup', e => {
            if (this.Run) {
                const rect = e.target.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                this.pointerUpEvent(x, y);
            }
        });
        this.canvasdraw = new imgObj(this.canvasElement, 0, 0, this.canvasElement.width, this.canvasElement.height);
        this.on(this.canvasdraw);
        this.renderLoop(true);
    }
    renderLoop(bool) {
        if (this.Run === true) {
            if (bool !== true && bool !== false) {
                switch (this.renderRun) {
                    case true:
                        this.renderRun = false;
                        break;
                    case false:
                        this.renderRun = true;
                        break;
                }
                this.renderLoop(this.renderRun);
            } else if (bool === true) {
                this.renderRun = true;
                if (this.Run === true) {
                    if (this.resizeRun === true) {
                        this.canvasElement.width = (typeof this.width === 'function') ? this.width() : this.width;
                        this.canvasElement.height = (typeof this.height === 'function') ? this.height() : this.height;
                    }
                    if (this.renderRun === true) {
                        for (let n = 0; n < this.stage.length; n++) {
                            this.stage[n].render({
                                canvasElement: this.canvasElement,
                                canvasContext: this.canvasContext,
                                x: this.stage[n].x,
                                y: this.stage[n].y,
                                width: this.stage[n].w,
                                height: this.stage[n].h,
                                alpha: this.stage[n].alpha,
                                angle: this.stage[n].angle,
                            });
                        }
                    }
                    this.canvasdraw.i = this.canvasElement;
                    this.canvasdraw.w = this.canvasElement.width;
                    this.canvasdraw.h = this.canvasElement.height;
                    if (this.resizeRun === true || this.renderRun === true) {
                        requestAnimationFrame(() => this.renderLoop(true));
                    }
                }
            } else if (bool === false) {
                this.renderRun = false;
            }
        }
    }
    put(...items) {
        for (let n = 0; n < items.length; n++) {
            this.stage.push(items[n]);
        }
    }
    pointerDownEvent(x, y) {
        if (this.Run === true) {
            for (let n1 = this.stage.length - 1; n1 >= 0; n1--) {
                if (this.pointCheck(n1, x)) {
                    let permission = false;
                    for (let n2 = 0; n2 < this.stage[n1].items.length; n2++) {
                        permission = (permission === true) ? true : this.stage[n1].items[n2].onPointer(x - ((typeof this.stage[n1].x === 'number') ? this.canvasElement.width / 100 * this.stage[n1].x : this.canvasdraw.sizecalc(this.stage[n1].x, this.canvasElement.width, (this.stage[n1].w === false) ? false : (typeof this.stage[n1].w === 'number') ? this.canvasElement.width / 100 * this.stage[n1].w : this.canvasdraw.sizecalc(this.stage[n1].w, this.canvasElement.width))), y - ((typeof this.stage[n1].y === 'number') ? this.canvasElement.height / 100 * this.stage[n1].y : this.canvasdraw.sizecalc(this.stage[n1].y, this.canvasElement.height, (this.stage[n1].h === false) ? false : (typeof this.stage[n1].h === 'number') ? this.canvasElement.height / 100 * this.stage[n1].h : this.canvasdraw.sizecalc(this.stage[n1].h, this.canvasElement.height))), (this.stage[n1].w === false) ? false : (typeof this.stage[n1].w === 'number') ? this.canvasElement.width / 100 * this.stage[n1].w : this.canvasdraw.sizecalc(this.stage[n1].w, this.canvasElement.width), (this.stage[n1].h === false) ? false : (typeof this.stage[n1].h === 'number') ? this.canvasElement.height / 100 * this.stage[n1].h : this.canvasdraw.sizecalc(this.stage[n1].h, this.canvasElement.height), {
                            canvasElement: this.canvasElement,
                            canvasContext: this.canvasContext,
                            x: this.stage[n1].x,
                            y: this.stage[n1].y,
                            width: this.stage[n1].w,
                            height: this.stage[n1].h,
                            alpha: this.stage[n1].alpha,
                            angle: this.stage[n1].angle,
                        });
                    }
                    if (permission === true) {
                        const downMax = this.stage[n1].downFunction.length;
                        for (let n3 = 0; n3 < downMax; n3++) {
                            if (this.stage[n1].downFunction != null) {
                                this.stage[n1].downFunction[n3](x, y);
                            }
                        }
                        if (this.stage[n1] != null) {
                            this.stage[n1].readyClick = true;
                        }
                        break;
                    }
                }
            }
        }
    }
    pointerDragEvent(x, y) {
        if (this.Run === true) {
            for (let n1 = this.stage.length - 1; n1 >= 0; n1--) {
                if (this.pointCheck(n1, x)) {
                    if (this.stage[n1] != null) {
                        if (this.stage[n1].readyClick === true && (this.dragRun === false || this.stage[n1] === this.dragRun)) {
                            const dragMax = this.stage[n1].dragFunction.length;
                            for (let n4 = 0; n4 < dragMax; n4++) {
                                if (this.stage[n1].dragFunction != null) {
                                    if (this.dragRun === false) {
                                        this.dragRun = this.stage[n1];
                                    }
                                    this.stage[n1].dragFunction[n4](x, y);
                                }
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
    pointerUpEvent(x, y) {
        if (this.Run === true) {
            this.dragRun = false;
            for (let n1 = this.stage.length - 1; n1 >= 0; n1--) {
                if (this.pointCheck(n1, x)) {
                    let permission = false;
                    for (let n2 = 0; n2 < this.stage[n1].items.length; n2++) {
                        permission = (permission === true) ? true : this.stage[n1].items[n2].onPointer(x - ((typeof this.stage[n1].x === 'number') ? this.canvasElement.width / 100 * this.stage[n1].x : this.canvasdraw.sizecalc(this.stage[n1].x, this.canvasElement.width, (this.stage[n1].w === false) ? false : (typeof this.stage[n1].w === 'number') ? this.canvasElement.width / 100 * this.stage[n1].w : this.canvasdraw.sizecalc(this.stage[n1].w, this.canvasElement.width))), y - ((typeof this.stage[n1].y === 'number') ? this.canvasElement.height / 100 * this.stage[n1].y : this.canvasdraw.sizecalc(this.stage[n1].y, this.canvasElement.height, (this.stage[n1].h === false) ? false : (typeof this.stage[n1].h === 'number') ? this.canvasElement.height / 100 * this.stage[n1].h : this.canvasdraw.sizecalc(this.stage[n1].h, this.canvasElement.height))), (this.stage[n1].w === false) ? false : (typeof this.stage[n1].w === 'number') ? this.canvasElement.width / 100 * this.stage[n1].w : this.canvasdraw.sizecalc(this.stage[n1].w, this.canvasElement.width), (this.stage[n1].h === false) ? false : (typeof this.stage[n1].h === 'number') ? this.canvasElement.height / 100 * this.stage[n1].h : this.canvasdraw.sizecalc(this.stage[n1].h, this.canvasElement.height), {
                            canvasElement: this.canvasElement,
                            canvasContext: this.canvasContext,
                            x: this.stage[n1].x,
                            y: this.stage[n1].y,
                            width: this.stage[n1].w,
                            height: this.stage[n1].h,
                            alpha: this.stage[n1].alpha,
                            angle: this.stage[n1].angle,
                        });
                    }
                    if (permission === true) {
                        const upMax = this.stage[n1].upFunction.length;
                        for (let n3 = 0; n3 < upMax; n3++) {
                            if (this.stage[n1].upFunction != null) {
                                this.stage[n1].upFunction[n3](x, y);
                            }
                        }
                        if (this.stage[n1] != null) {
                            if (this.stage[n1].readyClick === true) {
                                const clickMax = this.stage[n1].clickFunction.length;
                                for (let n4 = 0; n4 < clickMax; n4++) {
                                    if (this.stage[n1].clickFunction != null) {
                                        this.stage[n1].clickFunction[n4](x, y);
                                    }
                                }
                            }
                        }
                        break;
                    }
                }
                if (this.stage[n1] != null) {
                    this.stage[n1].readyClick = false;
                }
            }
            for (let n5 = 0; n5 < this.stage.length; n5++) {
                if (this.stage[n5] != null) {
                    this.stage[n5].readyClick = false;
                }
            }
        }
    }
    pointCheck(n, pointX) {
        const w = (this.stage[n].w !== false) ? ((typeof this.stage[n].w === 'number') ? this.canvasElement.width / 100 * this.stage[n].w : this.canvasdraw.sizecalc(this.stage[n].w, this.canvasElement.width)) : ((this.stage[n].h === false) ? this.canvasElement.width / 100 * 10 : false);
        if (this.stage[n].w !== false) {
            const x = (typeof this.stage[n].x === 'number') ? this.canvasElement.width / 100 * this.stage[n].x : this.canvasdraw.sizecalc(this.stage[n].x, this.canvasElement.width, w);
            const charStartX = x - w / 2;
            const charEndX = x + w / 2;
            if (charStartX < pointX && charEndX > pointX && this.stage[n].Run === true) {
                return true;
            } else {
                return false;
            }
        } else {
            if (this.stage[n].Run === true) {
                return true;
            } else {
                return false;
            }
        }
    }
    deleteChar(...character) {
        for (let n1 = 0; n1 < character.length; n1++) {
            for (let n2 = 0; n2 < this.stage.length; n2++) {
                if (this.stage[n2] === character[n1]) {
                    this.stage.splice(n2, 1);
                }
            }
        }
    }
    remove() {
        if (this.Run === true) {
            this.Run = false;
        }
    }
}

class textObj extends imgObj {
    constructor(text, font, fillColor, strokeColor, strokeWidth) {
        super(false, 0, 0, 0, 0);
        this.i = document.createElement('canvas');
        this.i.width = 0;
        this.i.height = 0;
        this.iCanvasContext = this.i.getContext('2d');
        this.font = font;
        this.size = 48;
        this.fillColor = (fillColor != null) ? fillColor : '#000';
        if (strokeColor != null || strokeWidth != null) {
            this.strokeColor = (strokeColor != null) ? strokeColor : '#000';
            this.strokeWidth = (strokeWidth != null) ? strokeWidth : 6;
        } else {
            this.strokeColor = false;
            this.strokeWidth = false;
        }
        this.setText(text);
    }
    setText(text) {
        this.i.width = 0;
        this.i.height = 0;
        this.text = text;
        const textArray = this.text.split('\n');
        this.iCanvasContext.textBaseline = 'top'
        this.iCanvasContext.font = this.size + 'px ' + this.font;
        let textWidth = 0;
        let textHeight1 = 0;
        for (let n1 = 0; n1 < textArray.length; n1++) {
            const measure = this.iCanvasContext.measureText(textArray[n1]);
            if (measure.width > textWidth) {
                textWidth = measure.width;
            }
            textHeight1 += measure.actualBoundingBoxDescent + this.size / 8;
        }
        this.i.width = textWidth;
        this.i.height = textHeight1;
        this.w = this.i.width;
        this.h = this.i.height;
        this.iCanvasContext.textBaseline = 'top'
        this.iCanvasContext.font = this.size + 'px ' + this.font;
        let textHeight2 = 0;
        for (let n2 = 0; n2 < textArray.length; n2++) {
            const measure = this.iCanvasContext.measureText(textArray[n2]);
            if (this.strokeColor !== false && this.strokeWidth !== false) {
                this.iCanvasContext.lineWidth = this.strokeWidth
                this.iCanvasContext.lineJoin = "miter";
                this.iCanvasContext.strokeStyle = this.strokeColor;
                this.iCanvasContext.strokeText(textArray[n2], 0, textHeight2 + this.size / 14, this.i.width);
            }
            this.iCanvasContext.fillStyle = this.fillColor;
            this.iCanvasContext.fillText(textArray[n2], 0, textHeight2 + this.size / 14, this.i.width);
            textHeight2 += measure.actualBoundingBoxDescent + this.size / 10;
        }
    }
    set changeFF(fontFamily) {
        this.font = (fontFamily != null) ? fontFamily : this.font;
        this.setText(this.text);
    }
    set changeFC(color) {
        this.fillColor = (color != null) ? color : this.fillColor;
        this.setText(this.text);
    }
    set changeSZ(size) {
        this.size = (size != null) ? size : this.size;
        this.setText(this.text);
    }
    set changeSC(color) {
        this.strokeColor = (color != null) ? color : this.strokeColor;
        this.setText(this.text);
    }
    set changeSW(width) {
        this.strokeWidth = (width != null) ? width : this.strokeWidth;
        this.setText(this.text);
    }
}

class fillObj extends imgObj {
    constructor(fillColor, width, height, marginTop, marginRight, marginBottom, marginLeft) {
        super(false, 0, 0, 1, 1);
        this.i = document.createElement('canvas');
        this.iCanvasContext = this.i.getContext('2d');
        this.fillColor = (fillColor != null) ? fillColor : '#000';
        this.fillWidth = width;
        this.fillHeight = height;
        this.marginTop = (marginTop != null) ? marginTop : 0;
        this.marginRight = (marginRight != null) ? marginRight : 0;
        this.marginBottom = (marginBottom != null) ? marginBottom : 0;
        this.marginLeft = (marginLeft != null) ? marginLeft : 0;
        this.smooth = false;
        this.setFill();
    }
    setFill(fillColor, width, height, marginTop, marginRight, marginBottom, marginLeft) {
        this.fillColor = (fillColor != null && fillColor !== false) ? fillColor : this.fillColor;
        this.fillWidth = (width != null && width !== false) ? width : this.fillWidth;
        this.fillHeight = (height != null && height !== false) ? height : this.fillHeight;
        this.marginTop = (marginTop != null && marginTop !== false) ? marginTop : this.marginTop;
        this.marginRight = (marginRight != null && marginRight !== false) ? marginRight : this.marginRight;
        this.marginBottom = (marginBottom != null && marginBottom !== false) ? marginBottom : this.marginBottom;
        this.marginLeft = (marginLeft != null && marginLeft !== false) ? marginLeft : this.marginLeft;
        this.i.width = this.marginLeft + this.fillWidth + this.marginRight;
        this.i.height = this.marginTop + this.fillHeight + this.marginBottom;
        this.w = this.i.width;
        this.h = this.i.height;
        this.iCanvasContext.fillStyle = this.fillColor;
        this.iCanvasContext.fillRect(this.marginLeft, this.marginTop, this.fillWidth, this.fillHeight);
    }
}

class frameObj extends fillObj {
    constructor(width, height, lineWidth, lineColor, fillColor, marginTop, marginRight, marginBottom, marginLeft) {
        super(lineColor, width, height, marginTop, marginRight, marginBottom, marginLeft);
        this.frameFill = (fillColor != null) ? fillColor : 'rgba(0,0,0,0)';
        this.iCanvasContext.fillStyle = this.frameFill;
        this.iCanvasContext.fillRect(this.marginLeft + lineWidth, this.marginTop + lineWidth, width - lineWidth * 2, height - lineWidth * 2);
    }
    setFrame(width, height, lineWidth, lineColor, fillColor, marginTop, marginRight, marginBottom, marginLeft) {
        super.setFill(lineColor, width, height, marginTop, marginRight, marginBottom, marginLeft);
        this.frameFill = (fillColor != null) ? fillColor : 'rgba(0,0,0,0)';
        this.iCanvasContext.fillStyle = this.frameFill;
        this.iCanvasContext.fillRect(this.marginLeft + lineWidth, this.marginTop + lineWidth, width - lineWidth * 2, height - lineWidth * 2);
    }
}