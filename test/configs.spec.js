const chai = require('chai');
const process = require('process');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

process.env.RIOT_KEY = 'RIOT-API-KEY-2';
process.env.CACHE_TYPE = 'null';
process.env.REDIS_URL = '';

const getConfig = require('../dist/galeforce/configs/default').getConfig;

// Set fake environment variables

describe('/galeforce/configs', () => {
    it('should correctly generate config object from YAML without environment variables', () => {
        expect(getConfig('./test/test-configs/1.yaml')).to.deep.equal({
            'riot-api': {
                key: 'RIOT-API-KEY',
            },
            cache: {
                type: 'redis',
                uri: 'redis://127.0.0.1:6379',
            },
            'rate-limit': {
                prefix: 'riotapi-ratelimit-',
                intervals: {
                    120: 100,
                    1: 20,
                },
            },
        });
    });
    it('should correctly generate config object from YAML with environment variables', () => {
        expect(getConfig('./test/test-configs/2.yaml')).to.deep.equal({
            'riot-api': {
                key: 'RIOT-API-KEY-2',
            },
            cache: {
                type: 'null',
                uri: '',
            },
            'rate-limit': {
                prefix: 'riotapi-ratelimit-',
                intervals: {
                    120: 100,
                    1: 20,
                },
            },
        });
    });
    it('should error when passed an invalid or incomplete YAML config', () => {
        expect(() => getConfig('./test/test-configs/3.yaml')).to.throw();
    });
    it('should error when trying to use an environment variable that does not exist', () => {
        expect(() => getConfig('./test/test-configs/5.yaml')).to.throw();
    });
});