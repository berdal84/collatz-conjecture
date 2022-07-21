// Import our custom CSS
import '../scss/styles.scss'



// Import all of Bootstrap's JS
const bootstrap = import('bootstrap');

// Import app an run main loop
import app from './app.js';
app.start();