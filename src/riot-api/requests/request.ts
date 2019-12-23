/*
    The base request class is simply an abstract request class
    that needs to be implemented by other methods to be effective.
*/

import Bluebird from 'bluebird';

abstract class Request {
    targetURL: string;

    constructor(targetURL: string) {
        this.targetURL = targetURL;
    }

    abstract get(): Bluebird<any>;
}

export default Request;
