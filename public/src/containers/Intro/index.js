'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    IS_LOADED, POPUP_MESSAGE
} from 'config/messages';

import LoadingComponent from 'components/Loading';

import Colors from 'core/DrawingDatas';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [],

    props: {
        entryPoint: {
            type: String,
            default: ''
        },
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

        },

        connect() {

            if (this.me.name && this.roomId && this.me.color) {

                this.localEmitter.emit(IS_LOADED, {
                    me: this.me,
                    roomId: this.roomId,
                    status: true
                });

            } else {

                this.localEmitter.emit(POPUP_MESSAGE, {
                    type: 'error',
                    message: 'Form not correctly filled out'
                });

            }

        }

    },

    components: {
        'loading-component': LoadingComponent
    }
});
