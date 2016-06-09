// @flow

'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import PopupMessage from 'components/PopupMessage';

import States from 'core/States';

import debounce from 'lodash.debounce';

import {
    WINDOW_RESIZE, ON_NEW_USER, ON_GET_USERS, IS_LOADED, POPUP_MESSAGE
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
            popupMessage: {
                type: '',
                message: ''
            },
            users: [{
                // name: 'Armand Biteau'
            }],
            me: {
                id: '',
                name: 'Armand Biteau',
                color: {
                    name: '',
                    gradient: []
                }
            },
            roomId: '',
            entryPoint: '',
            isReady: false
        };

    },

    created() {

    },

    ready() {

        this.addDeviceClass();
        this.addBrowserClass();

        this.entryPoint = this.$route.path;

        if (!this.isReady && this.entryPoint != '/') {

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


        /*
        * Events
        */
        broadcastWindowSize() {
            this.localEmitter.emit(WINDOW_RESIZE, {
                width: window.innerWidth,
                height: window.innerHeight
            });
        },

        onLoaded(data) {

            this.me = data.me;
            this.roomId = data.roomId;

            this.isReady = true;

            // EVENT TO THE SERVER !!!!!

            this.$router.go({ name: 'experience', params: { roomId: this.roomId }});

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
