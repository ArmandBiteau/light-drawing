'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import {
    IS_LOADED
} from 'config/messages';

export default Vue.extend({

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  emitterEvents: [],

  domEvents: [],

  data() {

    return {
      _hidden: null
    };
  },

  ready() {

      setTimeout(() => {

          this.localEmitter.emit(IS_LOADED, {});

      }, 100);

  },

  beforeDestroy() {},

  methods: {},

  transitions: {},

  components: {}
});
