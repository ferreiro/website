export class Error {
    constructor({
        message,
        status = 500,
    }) {
        this.message = message
        this.status = status
    }

    toJSON() {
        return {
            message: this.message,
            status: this.status,
        }
    }
}