const chai = require('chai');
const process = require('process');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

process.env.RIOT_KEY = 'RIOT-API-KEY-2';
process.env.CACHE_TYPE = 'null';
process.env.REDIS_URL = '';

const getConfig = require('../dist/sightstone/configs/default').default;

// Set fake environment variables

describe('/sightstone/configs', () => {
    it('should correctly generate config object without environment variables', () => {
        expect(getConfig('./test/test-config-1.yaml')).to.deep.equal({
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
    it('should correctly generate config object with environment variables', () => {
        expect(getConfig('./test/test-config-2.yaml')).to.deep.equal({
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
    it('should error when passed a deformed config', () => {
        expect(() => getConfig('./test/test-config-3.yaml')).to.throw();
    });
});