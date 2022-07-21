
import log from './log.js';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class ChartController {

    constructor( id ) {

        if( !id ) {
            log.error('An id must be passed to the controller!');
        }
        this.id = id;
        this.chart = null;

        this.data = [];
        this.labels = [];

        this.config = {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Last run',
                    data: this.data,
                    fill: true,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
        };
    }

    init() {
        log.message('Initialising chart ...')
        const ctx = document.getElementById(this.id);
        this.chart = new Chart(ctx, this.config);
    }

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

        this.data.splice(0, this.data.length -1);
        this.data.push(...data);
        this.labels.splice(0, this.labels.length -1)

        this.data.forEach( (val, idx) => {
            this.labels.push(idx);
        })

        this.chart.update();

        log.message('Chart updated')
    }
}

class App {

    chartController = null;

    constructor() {
        log.message(`New App instance`);
    }

    start() {
        log.message(`App starting ...`);

        const runBtn = document.getElementById('run-btn');
        runBtn.addEventListener( 'click', () => {
            log.message(`Run button clicked`);
            this.runAlgorithm();
        });

        this.chartController = new ChartController(`chart`)
        this.chartController.init();

        log.message(`App started`);
    }

    runAlgorithm() {
        const data = [10, 5, 16, 8, 4, 2, 1, 4, 2, 1];
        this.chartController.update(data);
    }

    stop() {

    }

}
const app = new App();
export default app;