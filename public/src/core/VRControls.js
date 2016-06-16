/*eslint-disable */

/**
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 */

import THREE from 'three';

export default function ( object, onError ) {

	let scope = this;

	let vrInput;

	var moveForward = false;
	var velocity = 0;

	let standingMatrix = new THREE.Matrix4();

	function gotVRDevices( devices ) {

		for ( let i = 0; i < devices.length; i ++ ) {

			if ( ( 'VRDisplay' in window && devices[ i ] instanceof VRDisplay ) || ( 'PositionSensorVRDevice' in window && devices[ i ] instanceof PositionSensorVRDevice ) ) {

				vrInput = devices[ i ];
				break;  // We keep the first we encounter

			}

		}

		if ( !vrInput ) {

			if ( onError ) onError( 'VR input not available.' );

		}

	}

	if ( navigator.getVRDisplays ) {

		navigator.getVRDisplays().then( gotVRDevices );

	} else if ( navigator.getVRDevices ) {

		// Deprecated API.
		navigator.getVRDevices().then( gotVRDevices );

	}


	function onDocumentTouchEnd(event) {

		event.preventDefault();

		moveForward = false;

	}

	function onDocumentTouchStart(event) {

		if (event.touches.length === 1) {

			event.preventDefault();

			moveForward = true;

			document.querySelector('canvas').addEventListener('touchend', onDocumentTouchEnd, false);

		}

	}

	function onDocumentTouchMove(event) {

		if (event.touches.length === 1) {

			event.preventDefault();

			moveForward = true;

		}

	}

	document.querySelector('canvas').addEventListener('touchstart', onDocumentTouchStart, false);
	document.querySelector('canvas').addEventListener('touchend', onDocumentTouchEnd, false);
	document.querySelector('canvas').addEventListener('touchmove', onDocumentTouchMove, false);

	// the Rift SDK returns the position in meters
	// this scale factor allows the user to define how meters
	// are converted to scene units.

	this.scale = 1;

	// If true will use "standing space" coordinate system where y=0 is the
	// floor and x=0, z=0 is the center of the room.
	this.standing = false;

	// Distance from the users eyes to the floor in meters. Used when
	// standing=true but the VRDisplay doesn't provide stageParameters.
	this.userHeight = 1.6;

	this.getStandingMatrix = function () {

		return standingMatrix;

	};

	this.update = function (delta) {

		velocity = 0;

		if (moveForward) velocity -= 0.02 * delta;

		if ( vrInput ) {

			if ( vrInput.getPose ) {

				let pose = vrInput.getPose();

				if ( pose.orientation !== null ) {

					object.quaternion.fromArray( pose.orientation );

				}

				if ( pose.position !== null ) {

					object.position.fromArray( pose.position );

				} else {

					// object.position.set( 0, 0, 0 );

				}

			} else {

				// Deprecated API.
				let state = vrInput.getState();

				if ( state.orientation !== null ) {

					object.quaternion.copy( state.orientation );

				}

				if ( state.position !== null ) {

					object.position.copy( state.position );

				} else {

					// object.position.set( 0, 0, 0 );

				}

			}

			if ( this.standing ) {

				if ( vrInput.stageParameters ) {

					object.updateMatrix();

					standingMatrix.fromArray(vrInput.stageParameters.sittingToStandingTransform);
					object.applyMatrix( standingMatrix );

				} else {

					object.position.setY( object.position.y + this.userHeight );

				}

			}

			object.position.multiplyScalar( scope.scale );

			object.translateZ(velocity);

		}

	};

	this.resetPose = function () {

		if ( vrInput ) {

			if ( vrInput.resetPose !== undefined ) {

				vrInput.resetPose();

			} else if ( vrInput.resetSensor !== undefined ) {

				// Deprecated API.
				vrInput.resetSensor();

			} else if ( vrInput.zeroSensor !== undefined ) {

				// Really deprecated API.
				vrInput.zeroSensor();

			}

		}

	};

	this.resetSensor = function () {

		console.warn( 'THREE.VRControls: .resetSensor() is now .resetPose().' );
		this.resetPose();

	};

	this.zeroSensor = function () {

		console.warn( 'THREE.VRControls: .zeroSensor() is now .resetPose().' );
		this.resetPose();

	};

	this.dispose = function () {

		vrInput = null;

	};

}
/*eslint-enable */
