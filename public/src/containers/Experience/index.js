'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    // IS_LOADED
} from 'config/messages';

import CanvasComponent from 'components/Canvas-experience';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    socketEvents: [],

    props: {
        users: {
            type: Array,
            default: []
        },
        me: {
            type: Object,
            default: {}
        },
        roomId: {
            type: String,
            default: ''
        }
    },

    data() {

        return {
            _hidden: null
            // isLoaded: false
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
