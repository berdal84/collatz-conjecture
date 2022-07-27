
import "./loading-screen.css"

export class LoadingScreen extends HTMLElement {

    #messageEl

    constructor(){
        super() // HTMLElement
    }

    connectedCallback(){

        // create inner html
        const spinner = document.createElement("div")
        spinner.id    = "loading-spinner"
        spinner.setAttribute("class", "spinner-border text-info")
        spinner.setAttribute("role", "status")
        this.appendChild( spinner )
        
        const message = document.createElement("p")
        message.id    = "loading-message"
        this.appendChild(message)
        this.#messageEl = message

        this.setAttribute("transition-delay", 500)
        this.setAttribute("transition-duration",  500)
        this.setAttribute("show", true)
        this.setAttribute("message", "Loading ...")
    }

    attributeChangedCallback( name, oldValue, newValue ) {

        switch( name ){
            case "show":
                if ( newValue === "true" ) {
                    this.style.opacity = 1;
                    document.body.style.visibility = "visible"
                } else {
                    // prepare a smooth opacity transition
                    this.style.opacity = 0;
                    this.style.transitionProperty = "opacity";

                    const delay    = this.getAttribute("transition-delay")
                    const duration = this.getAttribute("transition-duration")

                    this.style.transitionDelay    = `${delay/1000}s`;
                    this.style.transitionDuration = `${duration/1000}s`;
                    
                    // hide when finished
                    setTimeout(() => { this.style.visibility = "hidden" }, delay + duration)
                }
                break;

            case "message":
                this.#messageEl.innerText = newValue
        }
    }

    static createInstance( id ){
        const loading = document.createElement("loading-screen")
        if( id ) loading.id = id
        document.body.insertBefore( loading, document.body.childNodes[0])
        return loading
    }

    static get observedAttributes() {
        return ['message', 'show'];
    }
}

// Define the new element
customElements.define('loading-screen', LoadingScreen)