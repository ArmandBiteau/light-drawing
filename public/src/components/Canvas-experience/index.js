'use strict';

import THREE from 'three';
import Stats from 'stats-js';

import EventManagerMixin from 'mixins/EventManagerMixin';

import GroundMixin from './mixins/ground';
import CursorMixin from './mixins/cursor';
import SplinesMixin from './mixins/splines';

import ComposerMixin from './mixins/composer';

import DesktopControls from './controls/desktop';

import {
    WINDOW_RESIZE
} from 'config/messages';

export default Vue.extend({

    mixins: [
        EventManagerMixin,
        ComposerMixin,
        CursorMixin,
        SplinesMixin,
        DesktopControls,
        GroundMixin
    ],

    template: require('./template.html'),

    domEvents: [{
        target: document,
        event: 'mousedown',
        method: 'onMouseDown'
    },{
        target: document,
        event: 'mouseup',
        method: 'onMouseUp'
    }],

    emitterEvents: [{
        message: WINDOW_RESIZE,
        method: 'onWindowResize'
    }],

    socketEvents: [],

    props: {
        users: {
            type: Array,
            default: []
        }
    },

    data() {

        return {

            _hidden: null,
            _scene: null,
            _renderer: null,
            _controls: null,
            _camera: null,
            _clock: null,
            _clockElapsedTime: null,
            _stats: null,
            _raf: null,

            _domElement: null,

            isSceneLoaded: false,

            isDrawing: false

        };

    },

    created() {

        this._clock = new THREE.Clock(true);

    },

    ready() {

        this.sceneInitialize();

    },

    beforeDestroy() {

        this.stop();

        this.destroyStats();

    },

    watch: {

		isSceneLoaded: {

			handler(value) {

				if (value) {

					this.start();
				}
			},

			immediate: true
		}

	},

    methods: {

        bind() {

            this.run = this.run.bind(this);

        },

        addEventListener() {

		},

        removeEventListener() {

		},

        sceneInitialize() {

            /*
    		 * Scene
    		*/

            this._scene = new THREE.Scene();

            this._sceneCenter = new THREE.Vector3(0, 0, 0);

            // this._scene.fog = new THREE.Fog(0x181d21, 0.015, 3.0);

            /*
    		 * Camera
    		*/

            this._camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 100);

            this._camera.position.set(0, 3, 0);

            /*
    		 * Renderer
    		*/

            this._renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});

			this._renderer.setPixelRatio(window.devicePixelRatio);

			this._renderer.setSize(window.innerWidth, window.innerHeight);

			this._renderer.setClearColor(0x181d24, 1);

            this._domElement = this.$el;

			this._domElement.appendChild(this._renderer.domElement);

            /*
    		 * Composer
    		*/

            this.sceneLoad();

        },

        sceneLoad() {

			// new THREE.JSONLoader().load(PATH_MODELS + '/scene.json', this.onSceneLoaded);

			this.onSceneLoaded();

		},

        onSceneLoaded() {

			this.isSceneLoaded = true;

            this.cursorInitialize();

            this.splinesInitialize();

			this.controlsInitialize();

            this.groundInitialize();

            this.composerInitialize();

		},

        run() {

			this._raf = window.requestAnimationFrame(this.run);

			this.update();

			this.render();

		},

        update() {

            this._clockElapsedTime = this._clock.getDelta();

            this.cursorUpdate();

            this.splinesUpdate();

            this.controlsUpdate(this._clockElapsedTime);

            this.groundUpdate();

        },

        render() {

            this._stats.begin();

            this._renderer.autoClearColor = true;

            this.composerRender();

            // this._renderer.render(this._scene, this._camera);

            this._stats.end();

        },

        /*
		 * Start & stop
		*/

		start() {

			if (!this._raf) {

                this.initStats();

				this._raf = window.requestAnimationFrame(this.run);

			}
		},

		stop() {

			this.removeEventListener();

			this.cancelAnimationFrame();

		},

		cancelAnimationFrame() {

			if (typeof (this._raf !== 'undefined') && this._raf !== null) {

				window.cancelAnimationFrame(this._raf);

				this._raf = null;
			}
		},

        /*
		 * Utils
		*/

        initStats() {

			this._stats = new Stats();

			this._stats.setMode(0);

			this._stats.domElement.style.position = 'absolute';

			this._stats.domElement.style.left = '0px';

			this._stats.domElement.style.top = '30px';

			document.body.appendChild(this._stats.domElement);

		},

        destroyStats() {

			this._stats.domElement.parentNode.removeChild(this._stats.domElement);

		},

        onMouseDown() {

            this.isDrawing = true;

            this.splinesDraw();

        },

        onMouseUp() {

            this.isDrawing = false;

            this.splinesStop();

        },

        onWindowResize({width, height}) {

            this._camera.aspect = width / height;

			this._camera.updateProjectionMatrix();

			this._renderer.setSize(width, height);

        }

    },

    transitions: {},

    components: {}
});
