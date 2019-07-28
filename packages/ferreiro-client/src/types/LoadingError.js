import {Error} from './Error'

export class LoadingError extends Error {
    constructor({
        message = 'Error loading message from API',
        status = 500
    } = {}) {
        super({message, status})
    }
}