const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const SightstoneModule = require('../dist').default;

describe('/sightstone', () => {
    it('should initialize properly', () => {
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