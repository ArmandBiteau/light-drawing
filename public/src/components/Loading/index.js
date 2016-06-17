'use strict';

import EventManagerMixin from 'mixins/EventManagerMixin';

import Loader from 'resource-loader';

import TweenMax from 'gsap';

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
            _hidden: null,
            loader: null,
            manifest: []
        };
    },

    created() {

    },

    ready() {

        this.createManifest();

        this.load();

    },

    methods: {

        createManifest() {

            this.manifest = [
                '/images/textures/iChannel.png',
                '/images/screenshot.png',
                '/images/screenshot2.png',
                '/images/screenshot3.png'
            ];

        },

        load() {

            let loader = new Loader();
            loader.on('error', this.onLoadError);
            loader.on('progress', this.onLoadProgress);
            loader.on('complete', this.onLoadComplete);

            this.manifest.forEach(function(file) {
                loader.add(file, file);
            });
            loader.load();

            this.loader = loader;

        },

        onLoadProgress: function(event) {

            TweenMax.to(this.$els.progressBar, 0.3, {
                width: event.progress + '%'
            });

       },

       onLoadComplete: function() {

           setTimeout(() => {
               this.localEmitter.emit(IS_LOADED, {});
           }, 300);

       },

       onLoadError: function() {
           console.log('Error while loading files');
       }

    },

    transitions: {},

    components: {}
});
