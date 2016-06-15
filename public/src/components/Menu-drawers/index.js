'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    UPDATE_PLAYER
} from 'config/messages';

import Colors from 'core/DrawingDatas';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [],

    domEvents: [],

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
            colors: []
        };
    },

    watch: {

        'me.color': function () {

            console.log(this.me);

            this.socketEmitter.emit(UPDATE_PLAYER, {user: this.me});

        }

    },

    ready() {

        this.getColors();

    },

    beforeDestroy() {},

    methods: {

        getColors() {

            this.colors = Colors;

        }

    },

    transitions: {

    },

    components: {}
});
