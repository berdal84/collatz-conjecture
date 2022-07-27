
import { LoadingScreen } from "./components/loading-screen";
const loadingScreen = LoadingScreen.createInstance()

// Import the main module once document content is loaded
document.addEventListener('DOMContentLoaded', async () => {

    loadingScreen.setAttribute("message", "Loading dependencies...")
    await import( './scss/styles.scss' ) // needs to be loaded fully before to load bootstrap
    await import('bootstrap');

    loadingScreen.setAttribute("message", "Loading application ...")
    const module = await import( './js/app' )   
    const app = new module.App()
    if( !app.init() ) {
        loadingScreen.setAttribute("message", "Unable to initialize app! Check the console for more details.");
        return
    }
    app.start()

    loadingScreen.setAttribute("message", "Loading complete!")
    loadingScreen.setAttribute("show", false)

}, { once: true });
