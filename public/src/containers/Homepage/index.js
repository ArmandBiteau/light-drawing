'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    WINDOW_RESIZE
} from 'config/messages';


export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [{
        message: WINDOW_RESIZE,
        method: 'onWindowResize'
    }],

    socketEvents: [],

    props: {
        users: {
            type: Array,
            default: []
        }
    },

    data() {

        return {
            _hidden: null
        };
    },

    created() {

    },

    ready() {

        // this.socketEmitter.emit(NEW_USER, {name: 'Armand Biteau'});

    },

    methods: {

        onWindowResize({width, height}) {
            /*eslint-disable */
            console.log(`Window resize from application: ${width}px / ${height}`);
            /*eslint-enable */
        }

    },

    components: {
    }
});
