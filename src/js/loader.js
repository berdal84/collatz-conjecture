
import "../css/loader.css"

export class Loader {

    #overlayEl
    #messageEl

    constructor(){
        this.#overlayEl = document.getElementById("loading-overlay")
        this.#messageEl = document.getElementById("loading-message")
    }

    /**
     * Show the loader with an empty message
     */
    init(){
        this.show("")
    }

    /**
     * Show the loader with an optionnal message
     * @param {string} message 
     */
    show( message ){
        this.#overlayEl.style.opacity = 1;
        document.body.style.visibility = "visible"
        this.updateMessage(message)
    }

    /** Hide loader smoothly or not, depending on the duration
     * @param { number } delayInMs the delay of the transition
     * @param { number } durationInMs the duration of the transition
    */
    hide({durationInMs, delayInMs} ){

        durationInMs = durationInMs ?? 500
        delayInMs    = delayInMs ?? 0

        // prepare a smooth opacity transition
        this.#overlayEl.style.transitionProperty = "opacity";
        this.#overlayEl.style.transitionDelay    = `${delayInMs / 1000}s`;
        this.#overlayEl.style.transitionDuration = `${durationInMs / 1000}s`;
        this.#overlayEl.style.opacity = 0;

        // hide when finished
        setTimeout(() => { this.#overlayEl.style.visibility = "hidden" }, delayInMs + durationInMs)
    }

    /**
     * Update the message below the spinner
     * @param {string} message to display 
     */
    updateMessage( message ){
        this.#messageEl.innerText = message ?? "Loading ..."
    }
}
