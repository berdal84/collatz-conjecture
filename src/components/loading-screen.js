
import { Log } from "../js/log"
import "./loading-screen.css"

const log = new Log("LoadingScreen")

const TRANSITION_DURATION_DEFAULT = 500
const ELEMENT_ID_DEFAULT          = "loader"

export class LoadingScreen extends HTMLElement {

    static #instance

    constructor(){
        super() // HTMLElement
    }

    connectedCallback(){

        log.message(`connected`)

        // add spinner
        const spinner = $('<div id="loading-spinner" class="spinner-border text-info" role="status"></div>')

        // add message
        const message = $('<p id="loading-message" ></p>')

        $(this)
            .append( spinner )
            .append( message )
            .attr("transitionDuration", TRANSITION_DURATION_DEFAULT)
            .attr("show", true)
            .attr("message", "Loading ...")
            .css("pointerEvents", "none")
    }

    attributeChangedCallback( name, oldValue, newValue ) {
        log.message(`attribute changed: "${name}" is "${newValue}", was "${oldValue}" `)
        switch( name ){
            case "show":
                if ( newValue === "true" ) {

                    $(this)
                        .show()

                    $(document.body)
                        .fadeIn( $(this).attr("transitionDuration") )

                } else {
                    $(this)
                        .fadeOut( {
                            duration: $(this).attr("transitionDuration"),
                            complete: () => $(this).remove()
                        })
                    LoadingScreen.#instance = null
                }
                break;

            case "message":
                $(this)
                    .children("p")
                    .text(newValue)
        }
    }

    message( newValue ) {
        if( !newValue ) return $(this).attr("message")
        $(this).attr("message", newValue)
    }

    show() {
        $(this).attr("show", "true")
    }

    hide() {
        $(this).attr("show", "false")
    }

    static createInstance( { id, transitionDuration } ) {

        if ( LoadingScreen.#instance ) {
            log.error("An instance already exists, returning it")
            return LoadingScreen.#instance
        }

        log.message("create new instance")
        const el = document.createElement("loading-screen")
        el.id = id ?? ELEMENT_ID_DEFAULT
        $(el).attr("transitionDuration",  transitionDuration ?? TRANSITION_DURATION_DEFAULT)

        $("body").prepend(el)

        return LoadingScreen.#instance = el
    }

    static get observedAttributes() {
        return ['message', 'show'];
    }
}

// Define the new element
customElements.define('loading-screen', LoadingScreen)