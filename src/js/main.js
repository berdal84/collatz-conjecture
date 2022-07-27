
// Import the main module once document content is loaded
document.addEventListener('DOMContentLoaded', async (event) => {
    await import( '../scss/styles.scss' )
    await import('bootstrap');
    import( './app.js' ).then( (module) => {
        const app = new module.App()
        if( !app.init() ) {
            alert("Unable to initialize app! Check the console for more details.");
            return
        }
        app.start()
    });

}, { once: true });
