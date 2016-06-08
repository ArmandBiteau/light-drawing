'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    IS_LOADED
} from 'config/messages';

import LoadingComponent from 'components/Loading';

import Colors from 'core/DrawingDatas';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [],

    // socketEvents: [{
    //     message: GET_COLORS,
    //     method: 'onGetColors'
    // }],

    props: {
        me: {
            type: Object,
            default: {}
        },
        users: {
            type: Array,
            default: []
        },
        roomId: {
            type: String,
            default: ''
        }
    },

    data() {

        return {
            _hidden: null,
            colors: []
        };
    },

    created() {

    },

    ready() {

        this.getDrawingParameters();

    },

    methods: {

        getDrawingParameters() {

            this.colors = Colors;
            this.me.color = this.colors[0];

            // this.socketEmitter.emit(GET_COLORS, {});

        },

        connect() {

            this.localEmitter.emit(IS_LOADED, {
                status: true
            });

            // this.socketEmitter.emit(NEW_USER, {name: this.me.name});

        }

    },

    components: {
        'loading-component': LoadingComponent
    }
});
