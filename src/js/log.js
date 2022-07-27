
/**
 * A log class utility
 */
class Log {

    constructor(_prefix) {
        this.prefix = _prefix
    }

    /** Private */
    _format(text) {
        return `${this.prefix}${text}`
    }

    /** Print a message */
    message(text) {
        console.log(this._format(text))
    }

    /** Print an error */
    error(text) {
        console.error(this._format(text))
    }
}

const log = new Log(`[collatz-app] - `)
export default log;