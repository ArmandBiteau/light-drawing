'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

export default Vue.extend({

  mixins: [EventManagerMixin],

  template: require('./template.html'),

  props: {
      popupMessage: {
          type: Object,
          default: ''
      }
  },

  data() {

    return {
      _hidden: null
    };
  }
});
