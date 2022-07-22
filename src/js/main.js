import '../scss/styles.scss'

// Import all of Bootstrap's JS
const bootstrap = import('bootstrap');

// Import app an run main loop
document.addEventListener('DOMContentLoaded', (event) => {
    import( './app.js')
    .then( module => {
        module.default.start()
    })
    .catch( reason => {
        console.error('Unable to import app.js, reason:' + reason)
    });
});
