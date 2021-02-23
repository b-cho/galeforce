import Request from './request';

export default class BufferRequest extends Request {
    constructor(URLTemplate: string, parameters: Record<string, unknown>, query: object, body: object) {
        super(Request.generateTemplateString(URLTemplate, parameters), body, {
            params: query,
            responseType: 'arraybuffer',
        });
    }
}
