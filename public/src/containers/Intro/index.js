'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    IS_LOADED
} from 'config/messages';

import LoadingComponent from 'components/Loading';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [],

    props: {
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

    },

    methods: {

        connect() {

            this.localEmitter.emit(IS_LOADED, {
                status: true
            });

            // this.socketEmitter.emit(NEW_USER, {name: this.me.name});

            this.$router.go({ name: 'experience', params: { roomId: this.roomId }});

        }

    },

    components: {
        'loading-component': LoadingComponent
    }
});
