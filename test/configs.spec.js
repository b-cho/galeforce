const chai = require('chai');
const process = require('process');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;

process.env.RIOT_KEY = 'RIOT-API-KEY-2';
process.env.CACHE_TYPE = 'null';
process.env.REDIS_URL = '';

const { getConfig, mergeWithDefaultConfig } = require('../dist/galeforce/configs');

// Set fake environment variables

describe('/galeforce/configs', () => {
    it('should correctly generate config object from YAML without environment variables', () => {
        expect(mergeWithDefaultConfig(getConfig('./test/test-configs/1.yaml'))).to.deep.equal({
            'riot-api': {
                key: 'RIOT-API-KEY',
            },
            'rate-limit': {
                type: 'bottleneck',
                options: {
                    intervals: {
                        120: 0
                    },
                    'max-concurrent': 5000,
                    'min-time': 0,
                },
                cache: {
                    type: 'redis',
                    'key-id': 'galeforce',
                    uri: 'redis://127.0.0.1:6379',
                },
            },
            'debug': [],
        });
    });
    it('should correctly generate config object from YAML with environment variables', () => {
        expect(mergeWithDefaultConfig(getConfig('./test/test-configs/2.yaml'))).to.deep.equal({
            'riot-api': {
                key: 'RIOT-API-KEY-2',
            },
            'rate-limit': {
                type: 'bottleneck',
                options: {
                    intervals: {
                        120: 100,
                        1: 20,
                    },
                },
                cache: {
                    type: 'internal',
                    'key-id': 'riotapi-ratelimit',
                    uri: '',
                },
            },
            debug: ['*'],
        });
    });
    it('should error when trying to use an environment variable that does not exist', () => {
        expect(() => getConfig('./test/test-configs/5.yaml')).to.throw();
    });
});
