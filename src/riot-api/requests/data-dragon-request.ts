/*
    The DataDragonRequest object is a class that contains the information for a single
    request to the Riot API server. It contains a method that can be called to return
    information relevant to that request.
*/

import Request from './request';

class DataDragonRequest extends Request {
    constructor(URLTemplate: string, version?: string) {
        super(Request.generateTemplateString(URLTemplate, { version }), {}, {});
    }
}

export default DataDragonRequest;
