

class Log {
    prefix = '[collatz-app]';
    message(text) {
        console.log(`${this.prefix} - ${text}`)
    }
}
const log = new Log();

export default log;