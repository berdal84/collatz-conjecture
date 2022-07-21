
import log from './log.js';

class App {

    constructor() {
        log.message(`New App instance`);
    }

    start() {
        log.message(`App starting ...`);

        // ... do stuff here ...

        log.message(`App started`);
    }

    stop() {

    }
}
const app = new App();
export default app;