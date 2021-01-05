/*
    The RiotAPIRequest object is a class that contains the information for a single
    request to the Riot API server. It contains a method that can be called to return
    information relevant to that request.
*/

import Request from './request';

class RiotAPIRequest extends Request {
    constructor(URLTemplate: string, parameters: { [key: string]: unknown }, key: string) {
        super(Request.generateTemplateString(URLTemplate, parameters), { 'X-Riot-Token': key });
    }
}

export default RiotAPIRequest;
