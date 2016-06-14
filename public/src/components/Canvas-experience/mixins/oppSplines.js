'use strict';

import OppSpline from '../objects/oppSpline';

export default {

    created() {

        this._oppSplines = [];

	},

	methods: {

		oppSplinesInitialize() {

		},

        oppSplinesDraw(data) {

            this._oppSplines.push(new OppSpline(data));

            this._scene.add(this._oppSplines[this._oppSplines.length-1]);

		},

        oppSplinesUpdate() {

		},

        getSplineById(id) {

            for (let i = 0; i < this._oppSplines.length; i++) {

                if (this._oppSplines[i].name == id) return this._oppSplines[i];

            }

        },

        onNewOppSpline(data) {

            this.oppSplinesDraw(data);

        },

        onUpdateOppSpline(data) {

            let currentSpline = this.getSplineById(data.name);
            currentSpline.update(data.point);

        },

        onStopOppSpline(data) {

            let currentSpline = this.getSplineById(data.name);
            currentSpline.stop();

        }

	}
};
