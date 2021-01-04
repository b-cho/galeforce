const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const redisMock = require('redis-mock');
const rewiremock = require('rewiremock/node');

chai.use(chaiAsPromised);
const expect = chai.expect;

rewiremock('redis').with(redisMock);
rewiremock(() => require('redis')).with(redisMock);

rewiremock.enable();
const SightstoneModule = require('../dist').default;

describe('/sightstone', () => {
    it('should initialize properly from config object (1)', () => {
        expect(() => new SightstoneModule({
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
        expect(() => new SightstoneModule({
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
        expect(() => new SightstoneModule({
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
        expect(() => new SightstoneModule('./test/test-configs/4.yaml')).to.not.throw();
    });
    it('should error when passed an invalid config (1)', () => {
        expect(() => new SightstoneModule({
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
        expect(() => new SightstoneModule({
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
        expect(() => new SightstoneModule({
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
        expect(new SightstoneModule({
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
