// @flow

'use strict';

let Device = require('device-detect')();

import WEBVR from 'core/Webvr';

import EventManagerMixin from 'mixins/EventManagerMixin';

import PopupMessage from 'components/Message-popup';

import States from 'core/States';

import debounce from 'lodash.debounce';

import {
    WINDOW_RESIZE, NEW_USER, GET_USERS, IS_READY, IS_LOADED, POPUP_MESSAGE, BACK_HOME, GET_MY_ID
} from 'config/messages';

export default Vue.extend({

    mixins: [EventManagerMixin],

    components: {
        'popup-message': PopupMessage
    },

    template: require('./template.html'),

    emitterEvents: [{
        message: IS_LOADED,
        method: 'onLoaded'
    },{
        message: IS_READY,
        method: 'onReady'
    },{
        message: POPUP_MESSAGE,
        method: 'onPopupMessage'
    },{
        message: BACK_HOME,
        method: 'onBackHome'
    }],

    domEvents: [{
        target: window,
        event: 'resize',
        method: 'onResize'
    }],

    socketEvents: [{
        message: NEW_USER,
        method: 'onNewUser'
    },{
        message: GET_USERS,
        method: 'onGetUsers'
    },{
        message: GET_MY_ID,
        method: 'onGetMyID'
    }],

    data() {

        return {
            popupMessage: {
                type: '',
                message: ''
            },
            users: [],
            me: {
                id: '',
                name: '',
                color: {
                    name: '',
                    gradient: []
                }
            },
            room: {
                id: '',
                name: ''
            },
            roomId: '',
            entryPoint: '',
            isReady: false,
            isLoaded: false
        };

    },

    created() {

    },

    ready() {

        window.mobile = (Device.device == 'iPhone' || Device.device == 'iPad' || Device.device == 'Blackberry' || Device.device == 'WindowsMobile' || Device.device == 'Android') ? true : false;
        if (window.mobile) require('core/Webvr-polyfill');
        if (window.mobile && WEBVR.isLatestAvailable() === false) {
			document.body.appendChild(WEBVR.getMessage());
		}

        this.entryPoint = this.$route.path;

        // JOIN ROOM
        if (!this.isReady && this.entryPoint != '/') {

            this.room.id = this.$route.params ? this.$route.params.roomId : '';

            this.$router.go({ name: 'connect', params: {roomId: this.room.id}});

        }

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

        /*
        * SOCKET EVENTS
        */

        onNewUser(user) {
            this.localEmitter.emit(POPUP_MESSAGE, {
                type: 'event',
                message: 'New painter: '+user.name+' !'
            });
        },

        onGetUsers(data) {
            this.users = data.users;
        },

        /*
        * LOCAL EVENTS
        */

        broadcastWindowSize() {
            this.localEmitter.emit(WINDOW_RESIZE, {
                width: window.innerWidth,
                height: window.innerHeight
            });
        },

        onLoaded() {
            this.isLoaded = true;
        },

        onReady(data) {

            this.me = data.me;
            this.room.id = data.room.id;
            this.room.name = data.room.name;
            this.isReady = true;

            this.$router.go({ name: 'experience', params: { roomId: this.room.id }});

        },

        onBackHome() {

            this.isReady = false;
            this.entryPoint = '/';
            this.$router.go(this.entryPoint);

        },

        onGetMyID(data) {

                this.me.id = data.id;

        },

        onPopupMessage(data) {

            this.popupMessage.type = data.type;
            this.popupMessage.message = data.message;

            window.setTimeout(() => {

                this.popupMessage.type = '';
                this.popupMessage.message = '';

            }, 3000);

        }

    }
});
