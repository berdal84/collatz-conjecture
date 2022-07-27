
/**
 * A log class utility
 */
export class Log {

    static #prefix = `[collatz-app] - `

    /** Private */
    static #format(text) {
        return `${this.#prefix}${text}`
    }

    /** Print a message */
    static message(text) {
        console.log(this.#format(text))
    }

    /** Print an error */
    static error(text) {
        console.error(this.#format(text))
    }
}