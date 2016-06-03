'use strict';

let WAGNER = require('@superguigui/wagner');
let FXAAPass = require('@superguigui/wagner/src/passes/fxaa/FXAAPass');
let TiltPass = require('@superguigui/wagner/src/passes/tiltshift/tiltshiftPass');

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

            if (this.isDrawing) this._composer.pass(this._tiltPass);

            this._composer.toScreen();

        }

	}
};
