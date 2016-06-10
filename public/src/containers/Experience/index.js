'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    ON_NEW_USER
} from 'config/messages';

import CanvasComponent from 'components/Canvas-experience';
import MenuDrawersComponent from 'components/Menu-drawers';

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
        };
    },

    created() {

    },

    ready() {

        this.socketEmitter.emit(ON_NEW_USER, {user: this.me, roomId: this.roomId});

    },

    methods: {

    },

    components: {
        'canvas-experience': CanvasComponent,
        'menu-drawers': MenuDrawersComponent
    }
});
