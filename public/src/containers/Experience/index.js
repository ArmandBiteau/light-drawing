'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

// import {
//     WINDOW_RESIZE
// } from 'config/messages';

import CanvasComponent from 'components/Canvas-experience';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

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

    },

    methods: {

    },

    components: {
        'canvas-experience': CanvasComponent
    }
});
