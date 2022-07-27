
import { Loader } from './js/loader'

// Import the main module once document content is loaded
document.addEventListener('DOMContentLoaded', async () => {

    const loader = new Loader()
    loader.init()

    loader.show("Loading dependencies...")
    await import( './scss/styles.scss' ) // needs to be loaded fully before to load bootstrap
    await import('bootstrap');

    loader.updateMessage("Loading application ...")
    const module = await import( './js/app' )   
    const app = new module.App()
    if( !app.init() ) {
        loader.updateMessage("Unable to initialize app! Check the console for more details.");
        return
    }
    app.start()

    loader.updateMessage("Loading complete!")
    loader.hide({ delayInMs: 500, durationInMs: 500})

}, { once: true });
