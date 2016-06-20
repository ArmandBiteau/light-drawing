import Emitter from 'core/Emitter';
import Socket from 'core/Socket';

const EventManagerMixin = {

  emitterEvents: [],

  domEvents: [],

  socketEvents: [],

  created() {

    this.localEmitter = Emitter;
    this.socketEmitter = Socket;

    this.emitterEvents = this.$options.emitterEvents;
    this.domEvents = this.$options.domEvents;
    this.socketEvents = this.$options.socketEvents;

    this.bind();
  },

  ready() {

    this.addEventListeners();

  },

  beforeDestroy() {

    this.removeEventListeners();
  },

  methods: {

    bind() {

      this.emitterEvents.forEach((event) => {
        this[event.method] = ::this[event.method];
      });

      this.socketEvents.forEach((event) => {
        this[event.method] = ::this[event.method];
      });

    },

    addEventListeners() {

      // Add EventEmitter events
      this.emitterEvents.forEach((emitterEvent) => {
        if(typeof emitterEvent.once !== 'undefined') {
          if(emitterEvent.once) {
            this.localEmitter.once(emitterEvent.message, this[emitterEvent.method]);
          }
        } else {
          this.localEmitter.on(emitterEvent.message, this[emitterEvent.method]);
        }
      });

      // Add SocketEmitter events
      this.socketEvents.forEach((socketEvent) => {
        if(typeof socketEvent.once !== 'undefined') {
          if(socketEvent.once) {
            this.socketEmitter.once(socketEvent.message, this[socketEvent.method]);
          }
        } else {
          this.socketEmitter.on(socketEvent.message, this[socketEvent.method]);
        }
      });

      // Add DOM events
      this.domEvents.forEach((domEvent) => {
        if( typeof domEvent.target === 'undefined') {
          domEvent.target = document;
        }
        domEvent.target.addEventListener(domEvent.event, this[domEvent.method], false);
      });
    },

    removeEventListeners() {

      // Remove EventEmitter events
      this.emitterEvents.forEach((emitterEvent) => {
        this.localEmitter.off(emitterEvent.message, this[emitterEvent.method]);
      });

      // Remove SocketEmitter events
      this.socketEvents.forEach((socketEvent) => {
        this.socketEmitter.off(socketEvent.message, this[socketEvent.method]);
      });

      // Remove DOM events
      this.domEvents.forEach((domEvent) => {
        domEvent.target.removeEventListener(domEvent.event, this[domEvent.method], false);
      });
    }
  }
};

module.exports = EventManagerMixin;
