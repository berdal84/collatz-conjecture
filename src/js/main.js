// Import our custom CSS
import '../scss/styles.scss'



// Import all of Bootstrap's JS
const bootstrap = import('bootstrap');

import app from './app.js';

// Import app an run main loop
document.addEventListener('DOMContentLoaded', (event) => {
    app.start();
});
