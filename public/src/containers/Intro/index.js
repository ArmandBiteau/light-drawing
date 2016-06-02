'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    WINDOW_RESIZE, NEW_USER
} from 'config/messages';

import LoadingComponent from 'components/Loading';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [{
        message: WINDOW_RESIZE,
        method: 'onWindowResize'
    }],

    props: {
        me: {
            type: Object,
            default: {}
        }
    },

    data() {

        return {
            _hidden: null
        };
    },

    created() {

    },

    methods: {

        connect() {

            this.socketEmitter.emit(NEW_USER, {name: this.me.name});

            this.$router.isLoaded = true;
            this.$router.go('/connected');

        },

        onWindowResize({width, height}) {
            /*eslint-disable */
            console.log(`Window resize from application: ${width}px / ${height}`);
            /*eslint-enable */
        }

    },

    components: {
        'loading-component': LoadingComponent
    }
});
