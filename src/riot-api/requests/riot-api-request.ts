/*
    The RiotAPIRequest object is a class that contains the information for a single
    request to the Riot API server. It contains a method that can be called to return
    information relevant to that request.
*/

import Request from './request';

class RiotAPIRequest extends Request {
    constructor(URLTemplate: string, parameters: { [key: string]: unknown }, key: string, query: object, body: object) {
        super(Request.generateTemplateString(URLTemplate, parameters), { 'X-Riot-Token': key }, query, body);
    }
}

export default RiotAPIRequest;
