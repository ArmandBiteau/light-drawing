'use strict';

let WAGNER = require('@superguigui/wagner');
let FXAAPass = require('@superguigui/wagner/src/passes/fxaa/FXAAPass');
let TiltPass = require('@superguigui/wagner/src/passes/tiltshift/tiltshiftPass');
let VignettePass = require('@superguigui/wagner/src/passes/vignette/vignettePass');
let BloomPass = require('@superguigui/wagner/src/passes/bloom/MultiPassBloomPass');
let NoisePass = require('@superguigui/wagner/src/passes/noise/noise');

export default {

    created() {

		// composer manager

		this._composer = null;

        this._fxaaPass = null;

        this._tiltPass = null;

	},

	methods: {

		composerInitialize() {

            this._composer = new WAGNER.Composer(this._renderer, {useRGBA: true});

            this._fxaaPass = new FXAAPass();

            this._bloomPass = new BloomPass({
                blurAmount: 2.0,
                applyZoomBlur: true,
                zoomBlurStrength: 0.20
            });

            this._noisePass = new NoisePass({
                amount: 0.04,
                speed: 0.8
            });

            this._vignettePass = new VignettePass({
                boost: 1.0,
                reduction: 0.8
            });

            this._tiltPass = new TiltPass({
                bluramount: 3
            });

            this._composer.setSize(window.innerWidth, window.innerHeight);

		},

        composerRender() {

            this._composer.reset();

            this._composer.renderer.clear();

			this._composer.render(this._scene, this._camera);

            this._composer.pass(this._fxaaPass);

            this._composer.pass(this._bloomPass);

            this._composer.pass(this._noisePass);

            this._composer.pass(this._vignettePass);

            if (this.isDrawing) {

                this._composer.pass(this._tiltPass);

            }

            this._composer.toScreen();

        }

	}
};
