
import { Log } from './log';
import { IChartBridge, ChartBridge, ChartBridgeType } from './chart-bridge';
import { CollatzMath } from './collatz-math';

const log = new Log("App")

export class App {

    /** @type {number} count instances, to ensure we have only one at a time while avoiding singleton pattern. */
    static #instance_count = 0

    /** @type {number} some random number to identify this app */
    #uid               = Math.floor( Math.random() * 100000 + (new Date()).getMilliseconds())

    /** @type {IChartBridge} the char bridge instance (to control a chart implem)*/
    #chart             = null

    /** @type {HTMLElement} the error message element */
    #errorMsgEl        = null

    /** @type {HTMLButtonElement} the reset button element*/
    #resetBtnEl        = null

    /** @type {HTMLButtonElement} the run button element */
    #runBtnEl          = null

    /** @type {HTMLInputElement} */
    #initInputEl       = null

    constructor() {
        App.#instance_count++
        log.message(`New App instance (uid: ${this.#uid}, instance_count: ${App.#instance_count})`);
    }

    /**
     * Display an error message
     * @param {string} text 
     */
    #showError( text ) {
        this.#errorMsgEl.style.display = 'block';
        this.#errorMsgEl.innerText     = `There is a problem: ${text}`;
    }

    /**
     * Clear the - last - error message
     */
    #clearError() {
        this.#errorMsgEl.style.display = 'none';
    }

    /**
     * Initialize the application.
     * Must be called before start()
     * @return {boolean} true in case of success, false if there is an issue.
     */
    init() {
        log.message(`App initializing ...`);

        // create instances / get elements
        this.#chart = ChartBridge.createInstance(ChartBridgeType.CHARTJS);
        this.#errorMsgEl  = document.getElementById('error-message');
        this.#resetBtnEl  = document.getElementById('reset-btn');
        this.#runBtnEl    = document.getElementById('run-btn');
        this.#initInputEl = document.getElementById('init-input');

        // check non null
        if( !this.#chart ){
            log.error("Unable to initialize chartController!")
            return false
        }

        if( !this.#errorMsgEl ){
            log.error("Unable to initialize errorMsgEl!")
            return false
        }

        if( !this.#resetBtnEl ) {
            log.error("Unable to initialize resetBtnEl!")
            return false
        }

        if( !this.#runBtnEl ) {
            log.error("Unable to initialize runBtnEl!")
            return false
        }

        if( !this.#initInputEl ) {
            log.error("Unable to initialize initInputEl!")
            return false;
        }

        // initialize
        if( !this.#chart.init("chart")){
            log.error("Unable to initialize the chart bridge!")
            return false
        }

        this.#clearError();

        log.message(`App initialized`);

        return true
    }

    /**
     * Start the application.
     * App must be initialized (@see init())
     */
    start() {
        log.message(`App starting ...`);

        // Trigger a run when user clicks on "Run" button or press Enter while editing the initial number input.
        this.#runBtnEl.addEventListener( 'click', this.#onRun );
        this.#initInputEl.addEventListener( 'keyup', ( event ) => { if( event.key === 'Enter' ) this.#onRun(); } );
        
        // Trigger a reset when user clicks on "Reset" button
        this.#resetBtnEl.addEventListener( 'click', this.#onReset );

        log.message(`App started`);
    }

    /**
     * Function triggered when user wants to reset the form
     */
    #onReset = () => {
        log.message(`onReset() triggered`);
        this.#initInputEl.value = null;
        this.#chart.reset();
    }

     /**
     * Function triggered when use wants to run the algorithm
     */
    #onRun = () => {
        log.message(`onRun() triggered`);
        this.#clearError();
        this.#chart.reset();
        this.#runAlgorithm( this.#initInputEl.value )
            .then( integers => {
            if( integers ) {
                this.#chart.update(integers);
            }
        });
    }

    /**
     * Run the syracuze function recursively (actually in a loop here) and return the suite as an array of integers.
     * @param {string} input must be the input of the user (in a string) but should be convertible to a non null positive integer
     * @returns {Array<number>} a suite of non null positive integers
     */
    async #runAlgorithm( input ) {

        // Check if the string is valid

        if ( input.length === 0 ) {
            this.#showError('Initial number is required!')
            return undefined;
        }

        if ( Number.isNaN(input) ) {
            this.#showError('Initial number is not a number!')
            return undefined;
        }

        // Check if the string as number is valid

        const inputAsNumber = Number(input);
        if( !Number.isInteger(inputAsNumber)) 
        {
            this.showError('Initial number is not a an integer!')
            return undefined;
        }
        
        if( inputAsNumber <= 0 ) {
            this.#showError('Initial number must be defined in ]0, inf]')
            return undefined;
        }

        // Run the algorithm (Syracuse function)

        log.message('running algorithm ...')

        const integer_suite = [inputAsNumber];
        let current_integer = inputAsNumber;
        let  should_stop = false;
        let iteration_count   = 0
        while( !should_stop )
        {
            // avoid possible infinite loops while dev, limit is arbitrary
            if( iteration_count > 1000 ) {
                alert(`The iteration count for this run exceeded ${iteration_count}! Algorithm is stopped to avoid an infinite loop.`)
                should_stop = true
            }

            /*
             * 1 is the smallest valid value, we choose to stop here because running from 1 always loop.
             * 1 => 4 => 2 => 1 => 4
             */
            if( current_integer === 1 )
            {
                should_stop = true;
            }
            else
            {
                const next_integer = CollatzMath.syracuse(current_integer)
                if( next_integer === undefined ) {
                    log.error(`Syracuse returned an undefined result!`)
                    should_stop = true
                } else {
                    integer_suite.unshift(next_integer)
                }
                current_integer = next_integer
            }

            iteration_count++
        }

        log.message('algorithm finished')
        return integer_suite.reverse();
    }

}