
/**
 * A log class utility
 */
export class Log {

    #prefix = ""

    constructor( prefix ) {
        if( prefix !== undefined)
            this.#prefix = `[${prefix}] - `
    }

    /** Private */
    #format(text) {
        return `${this.#prefix}${text}`
    }

    /** Print a message */
    message(text) {
        console.log(this.#format(text))
    }

    /** Print an error */
    error(text) {
        console.error(this.#format(text))
    }
}