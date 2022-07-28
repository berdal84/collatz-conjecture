import { LoadingScreen } from "./components/loading-screen";
const loading = LoadingScreen.createInstance({ id: "loading", transitionDuration: 500 })

// Import the main module once document content is loaded
document.addEventListener('DOMContentLoaded', async () => {

    // Load dependencies
    loading.message("Loading dependencies...")
    await import( './scss/styles.scss' ) // needs to be loaded fully before to load bootstrap
    await Promise.all([
        import('bootstrap')
    ]) 

    // Load application
    loading.message("Loading application ...")
    const module = await import( './js/app' )  
    
    // Init application
    const app = new module.App()
    if( !app.init() ) {
        loading.attr( "message", "Unable to initialize app! Check the console for more details.");
        return
    }

    // Start application
    app.start()
    loading.message("Loading complete!")
    loading.hide()

}, { once: true });
