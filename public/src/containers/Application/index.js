// @flow

'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import PopupMessage from 'components/Message-popup';

import States from 'core/States';

import debounce from 'lodash.debounce';

import {
    WINDOW_RESIZE, NEW_USER, GET_USERS, IS_LOADED, POPUP_MESSAGE, BACK_HOME
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
                name: 'Armand Biteau',
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
            isReady: false
        };

    },

    created() {

    },

    ready() {

        this.entryPoint = this.$route.path;

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

        onLoaded(data) {

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
