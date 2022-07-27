import '../scss/styles.scss'

// Import all of Bootstrap's JS (TODO: import only the code required)


// Import the main module once document content is loaded
document.addEventListener('DOMContentLoaded', async (event) => {
    await import('bootstrap');
    import( './app.js' ).then( (module) => {
        const app = new module.App()
        app.init()
        app.start()
    });

}, { once: true });
