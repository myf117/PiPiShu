class Dispatcher {
    constructor() {
        this.handlers = [];
    }
    listen(handler) {
        this.handlers.push(handler);
    }
    emit(...args) {
        this.handlers.forEach(handler => {
            handler(...args);
        });
    }
}
class Player {
    constructor() {
        //初始化
        this.audioContext = new AudioContext();
        this.playList = [];
        this.playIndex = 0;

        this.emptyNode = {
            file: null,
            offset: 0,
            start: null,
            source: null,
            buffer: null,
        };

        this.onPlay = new Dispatcher();
        this.onPause = new Dispatcher();
        this.obChange = new Dispatcher();
        this.onReady = new Dispatcher();
    }

    get isEmpty() {
        return this.current === this.emptyNode;
    }

    get current() {
        return this.playList[this.playIndex] || this.emptyNode;
    }

    get position() {
        if (!this.playList.length) {
            return 0;
        }
        return (
            this.current.offset +
            (this.current.start !== null ? this.audioContext.currentTime - this.current.start : 0)
        );
    }

    set position(val) {
        if (!this.playList.length) {
            return;
        }
        this.stop();
        this.current.offset = val;
        this.current.start = null;
        this.play();
    }

    get duration() {
        return this.current.buffer ? this.buffer.duration : 0.001;
    }
}

export const player = new Player();
