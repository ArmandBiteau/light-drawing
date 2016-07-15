'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    UPDATE_PLAYER, UPDATE_COLOR
} from 'config/messages';

import Colors from 'data/colors';

import States from 'core/states';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [],

    domEvents: [{
        target: document,
        event: 'keyup',
        method: 'onKeyup'
    }],

    props: {
        users: {
            type: Array,
            default: []
        },
        me: {
            type: Object,
            default: {}
        }
    },

    data() {

        return {
            _hidden: null,
            colors: [],
            colorHexa: '',
            iColor: 0,
            showHtmlMenu: true
        };
    },

    watch: {

        'me.color': function () {

            this.socketEmitter.emit(UPDATE_PLAYER, {user: this.me});

            this.localEmitter.emit(UPDATE_COLOR, {
                color: this.me.color
            });

        }

    },

    ready() {

        if (States.deviceType == "mobile") this.showHtmlMenu = false;

        this.getColors();

        this.colorHexa = '#' + this.me.color.gradient[0].toString(16);

        this.iColor = Math.floor(Math.random() * (this.colors.length-1));

    },

    beforeDestroy() {},

    methods: {

        toHexString(n) {
            if(n < 0) {
                n = 0xFFFFFFFF + n + 1;
            }
            return "0x" + ("00000000" + n.toString(16).toUpperCase()).substr(-8);
        },

        getColors() {

            this.colors = Colors;

        },

        switchColor() {

            this.iColor = (this.iColor < this.colors.length-1) ? (this.iColor+1) : 0;

            this.me.color = this.colors[this.iColor];
            this.colorHexa = '#' + this.me.color.gradient[0].toString(16);

        },

        onKeyup(e) {

            // spacebar
            if (e.keyCode != 32) return;

            this.switchColor();

        }

    }
});
