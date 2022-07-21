
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
            scales: {

            },
            data: {
                labels: this.labels,
                datasets: [{
                    label: 'Collatz suite for initial value',
                    data: this.data,
                    fill: false,
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

    reset() {
        this.clear();
        this.chart.update();
        log.message('Chart cleared')
    }

    clear() {
        this.chart.clear();
        this.data.splice(0, this.data.length -1);
        this.labels.splice(0, this.labels.length -1)
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

        this.clear();

        this.data.push(...data);
        
        this.data.forEach( (val, idx) => {
            this.labels.push(`iteration ${idx}`);
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

        const resetBtn = document.getElementById('reset-btn');
        const runBtn = document.getElementById('run-btn');
        const initInput = document.getElementById('init-input');

        runBtn.addEventListener( 'click', () => {
            log.message(`Run button clicked`);

            const initNum = Number(initInput.value);
            if( !Number.isInteger(initNum) && initNum !== 0     ) {
                // TODO: display a message to the user
                log.message('Initial number must be a non null integer!')
                return;
            }

            this.runAlgorithm( initNum );
        });

        resetBtn.addEventListener( 'click', () => {
            log.message(`Reset button clicked`);

            initInput.value = null;
            this.chartController.reset();
        });

        this.chartController = new ChartController(`chart`)
        this.chartController.init();

        log.message(`App started`);
    }

    runAlgorithm( init ) {
        const data = [init];
        let should_stop = false;
        while( !should_stop )
        {
            const curr = data[data.length-1]; 
            log.message(`Run algorithm for ${curr}`)
               
            if( curr % 2 === 0)
            {
                data.push(curr / 2);
            }
            else
            {
                data.push(curr * 3 + 1);
            }
            

            if( curr === 1 || curr === 0 ){
                should_stop = true;
            }
        }

        this.chartController.update(data);
    }

    stop() {

    }

}
const app = new App();
export default app;