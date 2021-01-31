/*
    The RiotAPIRequest object is a class that contains the information for a single
    request to the Riot API server. It contains a method that can be called to return
    information relevant to that request.
*/

import Request from './request';

export default class RiotAPIRequest extends Request {
    constructor(key: string, URLTemplate: string, parameters: Record<string, unknown>, query: object, body: object) {
        super(Request.generateTemplateString(URLTemplate, parameters), { 'X-Riot-Token': key }, query, body);
    }
}
