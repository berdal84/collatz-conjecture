import '../scss/styles.scss'

// Import all of Bootstrap's JS (TODO: import only the code required)
const bootstrap = import('bootstrap');

// Import the main module once document content is loaded
document.addEventListener('DOMContentLoaded', async (event) => {
    const module = await import( './app.js' ) // webpack will catch if it fails at "compile" time
    module.default.start()
});
