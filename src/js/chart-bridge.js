import { Log } from './log'

import { Chart, registerables } from 'chart.js'; // import all registerables, TODO: pick only what is necessary
Chart.register(...registerables); 

const log = new Log("ChartBridge")

export class IChartBridge {
    /**
     * Initialize the bridge with a canvas id
     * @param {string} id the identifier of the canvas element to generate the chart in
     * @return { boolean } true if initialization succeed, false otherwise.
     */
    init( id ){}
    /**
     * Update the chart with a given array of integers
     * @param {Array<Number>} data is an array of integers
     */
    update( data ) {}

    /**
     * Reset the chart
     */
    reset(){}
}

/**
 * This class is a simple bridge between Chart.js and App class.
 * It simplify the insertion of an integer sequence into the library.
 * TODO: handle different type of library
 */
class ChartBridge_ChartJSImplem extends IChartBridge {

    /** @type {HTMLCanvasElement } */
    #canvas_id

    /** chartjs @type {HTMLElement } */
    #chart

    /** The data sent to the chart @type {Array<number> } */
    #data

    /** The labels for the x axis (iterations) @type {Array<string> } */
    #labels

    /** the chart configuration @type {Object} */
    #config

    /**
     * Initialize the instance
     * @param {string} canvas_id 
     * @returns 
     */
    init( canvas_id ) {
        log.message('Initialising chart ...')

        if( !canvas_id ) {
            log.error('An id must be passed to the controller!');
            return false;
        }
        this.#canvas_id = canvas_id;
        this.#chart = null;

        this.#data = [];
        this.#labels = [];

        this.#config = {
            type: 'line',
            scales: {
                y: {
                    ticks: {
                        stepSize: 1.0
                    }
                }
            },
            data: {
                labels: this.#labels,
                datasets: [{
                    label: 'Collatz suite',
                    data: this.#data,
                    fill: false,
                    borderColor: 'orange',
                    tension: 0
                }]
            },
        };

        const ctx = $(`#${this.#canvas_id}`);

        if( !ctx ) {
            log.error(`Unable to get the canvas ${this.#canvas_id}` );
            return false;
        }

        this.#chart = new Chart(ctx, this.#config);

        return true;
    }

    /**
     * Clear and update chart
     */
    reset() {
        this.#clear();
        this.#chart.update();
        log.message('Chart cleared')
    }

    /**
     * Clear the chart and its data
     */
    #clear() {
        this.#chart.clear();
        this.#data.splice(0, this.#data.length);
        this.#labels.splice(0, this.#labels.length);
        this.#config.data.datasets[0].label = '';
    }

    /**
     * Update the chart with some data
     * @param {Array<number>} data
     */
    update( data ) {
        log.message('Updating chart ...')
        if( !data ) 
        {
            log.error('data must be set!')
        }
        else if( !(data instanceof Array) ) 
        {
            log.error('data must be an Array!')
        }

        this.#clear();

        this.#data.push(...data);
        
        this.#data.forEach( (val, idx) => {
            this.#labels.push(`iteration ${idx}`);
        })

        if( this.#labels.length > 0 )
        {
            this.#labels[0] = 'Initial value';
        }

        this.#config.data.datasets[0].label = `Collatz suite for x=${this.#data[0]}`;

        this.#chart.update();

        log.message('Chart updated')
    }
}

export const ChartBridgeType = Object.freeze({
    CHARTJS: 'chartjs'
})

export class ChartBridge {
    /**
     * Create a new ChartBridge given an implementation type
     * @param {ChartBridgeType} type 
     * @return {IChartBridge} an implementation of the ChartBridgeInterface
     */
    static createInstance( type ) {
        switch( type ){
            case ChartBridgeType.CHARTJS:
                return new ChartBridge_ChartJSImplem();
            default:
                log.error(`Unexisting type. Check ChartBridgeType`)
                return undefined
        }
    }
}
