// @flow

'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import States from 'core/States';

import debounce from 'lodash.debounce';

import {
    WINDOW_RESIZE, ON_NEW_USER, ON_GET_USERS
} from 'config/messages';


export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [],

    domEvents: [{
        target: window,
        event: 'resize',
        method: 'onResize'
    }],

    socketEvents: [{
        message: ON_NEW_USER,
        method: 'onNewUser'
    },{
        message: ON_GET_USERS,
        method: 'onGetUsers'
    }],

    data() {

        return {
            users: [],
            me: {
                name: 'Armand Biteau'
            }
        };

    },

    ready() {

        this.addDeviceClass();
        this.addBrowserClass();

    },

    methods: {

        bind() {
            this.onResize = debounce(this.broadcastWindowSize, 200);
        },

        addBrowserClass() {
            this.$el.classList.add(States.browserName + '-browser');
        },

        addDeviceClass() {
            this.$el.classList.add(States.deviceType + '-device');
        },

        onNewUser() {
            console.log('New user');
        },

        onGetUsers(data) {
            this.users = data.users;
        },

        /*
        * Events
        */
        broadcastWindowSize() {
            this.localEmitter.emit(WINDOW_RESIZE, {
                width: window.innerWidth,
                height: window.innerHeight
            });
        }
    }
});
