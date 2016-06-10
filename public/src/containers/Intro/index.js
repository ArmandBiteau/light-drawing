'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    IS_LOADED, POPUP_MESSAGE, CHECK_ROOM_CONNECTION, CHECK_ROOM_CREATE, GET_ROOM_NAME, BACK_HOME
} from 'config/messages';

import LoadingComponent from 'components/Loading';

import Colors from 'core/DrawingDatas';

export default Vue.extend({

    mixins: [EventManagerMixin],

    template: require('./template.html'),

    emitterEvents: [],

    socketEvents: [{
        message: CHECK_ROOM_CONNECTION,
        method: 'onRoomChecked'
    },{
        message: CHECK_ROOM_CREATE,
        method: 'onRoomChecked'
    },{
        message: GET_ROOM_NAME,
        method: 'onRoomName'
    }],

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
        room: {
            id: '',
            name: ''
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

        if (this.entryPoint != '/') {
            this.socketEmitter.emit(GET_ROOM_NAME, {roomId: this.room.id});
        }

        this.getDrawingParameters();

    },

    methods: {

        getDrawingParameters() {

            this.colors = Colors;
            this.me.color = this.colors[0];

        },

        connect() {

            if (this.room.name) {
                this.room.id = this.room.name.replace(/ /g,'');
            }

            if (this.me.name && this.room.id && this.me.color) {
                if (this.entryPoint == '/') {
                    this.socketEmitter.emit(CHECK_ROOM_CREATE, {user: this.me, room: this.room});

                } else {
                    this.socketEmitter.emit(CHECK_ROOM_CONNECTION, {user: this.me, room: this.room});

                }

            } else {
                this.localEmitter.emit(POPUP_MESSAGE, {
                    type: 'error',
                    message: 'Form not correctly filled out'
                });

            }

        },

        /*
        * SOCKET EVENTS
        */

        onRoomChecked(data) {

            if (data.status == true) {
                this.localEmitter.emit(IS_LOADED, {
                    me: this.me,
                    room: this.room,
                    status: true
                });

            } else {

                this.localEmitter.emit(POPUP_MESSAGE, {
                    type: 'error',
                    message: data.message
                });

            }

        },

        onRoomName(data) {

            if (data.status == true) {
                this.room.name = data.message;

            } else {

                this.localEmitter.emit(BACK_HOME, {});

                this.localEmitter.emit(POPUP_MESSAGE, {
                    type: 'error',
                    message: 'The room you tried to join doesn\'t exist'
                });

            }

        }

    },

    components: {
        'loading-component': LoadingComponent
    }
});
