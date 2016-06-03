import VueRouter from 'vue-router';
import Emitter from 'core/Emitter';

import IntroPageComponent from 'containers/Intro';

import ExperiencePageComponent from 'containers/Experience';

import {
    ROUTER_ROUTE_CHANGE
} from 'config/messages';

Vue.use(VueRouter);

class Router extends VueRouter {

    constructor() {

        super({
            hashbang: false,
            pushState: true,
            history: true,
            abstract: false,
            saveScrollPosition: false,
            transitionOnLoad: false
        });

        this.path = '/';
        this.firstRoute = true;
        this.routeTimeout = null;
        this.isLoaded = false;

        this.map({

            'connected': {
                name: "Experience",
                component: ExperiencePageComponent
            },
            '*': {
                name: "intro",
                component: IntroPageComponent
            }


        });

        this.beforeEach( () => {

            // if (!this.isLoaded) this.go('/');

        });

        this.afterEach( ({ to, from }) => {

            Emitter.emit(ROUTER_ROUTE_CHANGE, { to, from });

        });
    }
}

export default new Router();
