import { Log } from './log'

import { Chart, registerables } from 'chart.js'; // import all registerables, TODO: pick only what is necessary
Chart.register(...registerables); 

export class ChartController {

    constructor( id ) {

        if( !id ) {
            Log.error('An id must be passed to the controller!');
        }
        this.id = id;
        this.chart = null;

        this.data = [];
        this.labels = [];

        this.config = {
            type: 'line',
            scales: {
                y: {
                    ticks: {
                        stepSize: 1.0
                    }
                }
            },
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Collatz suite',
                    data: this.data,
                    fill: false,
                    borderColor: 'orange',
                    tension: 0
                }]
            },
        };
    }

    init() {
        Log.message('Initialising chart ...')
        const ctx = document.getElementById(this.id);
        this.chart = new Chart(ctx, this.config);
    }

    reset() {
        this.clear();
        this.chart.update();
        Log.message('Chart cleared')
    }

    clear() {
        this.chart.clear();
        this.data.splice(0, this.data.length);
        this.labels.splice(0, this.labels.length);
        this.config.data.datasets[0].label = '';
    }

    update( data ) {
        Log.message('Updating chart ...')
        if( !data ) 
        {
            Log.error('data must be set!')
        }
        else if( !(data instanceof Array) ) 
        {
            Log.error('data must be an Array!')
        }

        this.clear();

        this.data.push(...data);
        
        this.data.forEach( (val, idx) => {
            this.labels.push(`iteration ${idx}`);
        })

        if( this.labels.length > 0 )
        {
            this.labels[0] = 'Initial value';
        }

        this.config.data.datasets[0].label = `Collatz suite for x=${this.data[0]}`;

        this.chart.update();

        Log.message('Chart updated')
    }
}
