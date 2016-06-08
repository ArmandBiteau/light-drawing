// @flow

'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import States from 'core/States';

import debounce from 'lodash.debounce';

import {
    WINDOW_RESIZE, ON_NEW_USER, ON_GET_USERS, IS_LOADED
} from 'config/messages';


export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [{
        message: IS_LOADED,
        method: 'onLoaded'
    }],

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
            users: [{
                // name: 'Armand Biteau'
            }],
            me: {
                id: '',
                name: 'Armand Biteau',
                color: {
                    name: 'blue',
                    gradient: [
                        0xF6F6F6, //white
                        0x6238FF, //purple
                        0x283BEF, //blue
                        0x6238FF, //purple
                        0x4890FF, //cyan
                        0x4890FF, //cyan
                        0x6DE49B  //green
                    ]
                }
            },
            roomId: '',
            isReady: false
        };

    },

    ready() {

        this.addDeviceClass();
        this.addBrowserClass();

        if (!this.isReady && this.$route.path != '/') {

            this.roomId = this.$route.params ? this.$route.params.roomId : '';

            this.$router.go({ name: 'connect', params: {roomId: this.roomId}});

        }

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

        onLoaded() {

            this.isReady = true;

            this.$router.go({ name: 'experience', params: { roomId: this.roomId }});

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
