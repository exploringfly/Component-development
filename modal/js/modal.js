class Modal {
    constructor(config) {
        this._config = config;
        this.config = {
            contain: 'modal-contain',
            width: 400,
            height: 200
        };
        this.init();
    }

    init() {
        this.updateConfig();
        this.getElement();
        this.setElement();
        this.bindEvent();
    }

    updateConfig() {
        for (let i = 0; i < this._config; i++) {
            this.config[i] = this._config[i];
        }
    }

    getElement() {
        this.contain = this.$(document, '.' + this.config.contain);
        this.body = this.$(document, 'body');
        this.getOther();
    }

    getOther() {
        this.ele = ['header', 'footer', 'title', 'close', 'decide', 'cancel'];
        let parents = ['contain', 'contain', 'header', 'header', 'footer', 'footer'];
        this.ele.forEach((v, i) => {
            this[v] = this.$(this[parents[i]], '.modal-' + v);
        })
    }

    setElement() {
        this.ele.splice(0, 3);
        this.css(this.contain, {
            width: this.config.width + 'px',
            height: this.config.height + 'px',
            position: 'absolute',
            left: '50%',
            marginLeft: -this.config.width / 2 + 'px',
            top: '50%',
            marginTop: -this.config.height / 2 + 'px',
            zIndex: 100,
            background: 'white'
        });
        this.css(this.body, {background: '#7f7f7f'});
        this.css(this.header, {width: '100%', height: '35px', background: '#5998df'});
        this.css(this.title, {
            float: 'left',
            height: '100%',
            lineHeight: '35px',
            fontSize: '18px',
            paddingLeft: '5px',
            color: 'white'
        });
        this.css(this.close, {
            float: 'right',
            cursor: 'pointer',
            height: '100%',
            lineHeight: '35px',
            fontSize: '20px',
            paddingRight: '10px',
            color: 'white'
        });
        if (this.decide || this.cancel) {
            this.css(this.footer, {
                background: '#f5f5f5',
                width: '100%',
                height: '40px',
                position: 'absolute',
                left: 0,
                bottom: 0
            });
        }
        let baseValue = 10;
        if (this.decide) {
            this.css(this.decide, {
                position: 'absolute',
                background: '#5998df',
                right: baseValue + 55 + 'px',
                bottom: '6px',
                padding: '3px 8px',
                fontSize: '16px',
                color: 'white',
                cursor: 'pointer',
                fontFamily: '微软雅黑'
            });
        }

        if (this.cancel) {
            this.css(this.cancel, {
                position: 'absolute',
                background: 'white',
                right: baseValue + 'px',
                bottom: '6px',
                padding: '3px 8px',
                color: '#333',
                fontSize: '16px',
                cursor: 'pointer',
                fontFamily: '微软雅黑'
            });
        }
    }

    bindEvent() {
        this.ele.forEach(v => {
            this[v].addEventListener('click', () => {
                this.css(this.contain, {display: 'none'});
                this.css(this.body, {background: 'white'});
            }, false);
        });
    }

    decideFn(dFn) {
        if (this.decide) {
            this.decide.addEventListener('click', () => {
                dFn();
            }, false);
        }
        return this;
    }

    cancelFn(cFn) {
        if (this.cancel) {
            this.cancel.addEventListener('click', () => {
                cFn();
            }, false);
        }
        return this;
    }

    $(parent, obj) {
        return parent.querySelector(obj);
    }

    css(obj, option) {
        for (let i in option) {
            obj.style[i] = option[i];
        }
    }
}