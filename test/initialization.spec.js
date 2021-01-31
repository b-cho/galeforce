const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const redisMock = require('redis-mock');
const rewiremock = require('rewiremock/node');
const process = require('process');

chai.use(chaiAsPromised);
const expect = chai.expect;

rewiremock('redis').with(redisMock);
rewiremock(() => require('redis')).with(redisMock);

rewiremock.enable();
const GaleforceModule = require('../dist');

process.env.RIOT_KEY = 'RIOT-API-KEY-2';
process.env.CACHE_TYPE = 'null';
process.env.REDIS_URL = '';

describe('/galeforce', () => {
    it('should initialize properly from config object (1)', () => {
        expect(() => new GaleforceModule({
            'riot-api': {
                key: 'RIOT-API-KEY',
            },
            'rate-limit': {
                prefix: 'riotapi-ratelimit-',
                intervals: {
                    120: 100,
                    1: 20,
                },
            },
        })).to.not.throw();
    });
    it('should initialize properly from config object (2)', () => {
        expect(() => new GaleforceModule({
            'riot-api': {
                key: 'RIOT-API-KEY',
            },
            cache: {
                type: 'null',
            },
            'rate-limit': {
                prefix: 'riotapi-ratelimit-',
                intervals: {
                    120: 100,
                    1: 20,
                },
            },
        })).to.not.throw();
    });
    it('should initialize properly from config object (3)', () => {
        expect(() => new GaleforceModule({
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
        })).to.not.throw();
    });
    it('should initialize properly from config file', () => {
        expect(() => new GaleforceModule('./test/test-configs/4.yaml')).to.not.throw();
    });
    it('should initialize properly from config file with environment variables', () => {
        expect(() => new GaleforceModule('./test/test-configs/2.yaml')).to.not.throw();
    });
    it('should error when passed an invalid config (1)', () => {
        expect(() => new GaleforceModule({
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
        })).to.throw();
    });
    it('should error when passed an invalid config (2)', () => {
        expect(() => new GaleforceModule({
            'riot-api': {
                key: 'RIOT-API-KEY',
            },
            cache: {
                type: 'redis',
                uri: 'redis://127.0.0.1:6379',
            },
            'rate-limit': {
                prefix: 'riotapi-ratelimit-',
            },
        })).to.throw();
    });
    it('should error when passed an invalid config (3)', () => {
        expect(() => new GaleforceModule({
            'riot-api': {
                key: 'RIOT-API-KEY',
            },
            cache: {
                type: 'redis',
            },
            'rate-limit': {
                prefix: 'riotapi-ratelimit-',
                intervals: {
                    120: 100,
                    1: 20,
                },
            },
        })).to.throw();
    });
    it('should have property region', () => {
        expect(new GaleforceModule({
            'riot-api': {
                key: 'RIOT-API-KEY',
            },
            'rate-limit': {
                prefix: 'riotapi-ratelimit-',
                intervals: {
                    120: 100,
                    1: 20,
                },
            },
        })).to.have.property('regions');
    })
});

rewiremock.disable();
