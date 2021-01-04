const chai = require('chai');
const redis = require('redis-mock');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

const RedisCache = require('../dist/sightstone/caches/redis').default;
const NullCache = require('../dist/sightstone/caches/null').default;

const client = redis.createClient();
const MockRedisCache = new RedisCache('', {}, client);
const MockNullCache = new NullCache();

describe('/sightstone/caches', () => {
    describe('Redis cache', () => {
        it('should properly initialize', () => {
            expect(MockRedisCache).to.have.property('client');
            expect(MockRedisCache).to.have.property('RLConfig');
        });
        it('should correctly set and get keys', () => {
            return MockRedisCache.set('a', '10').then(() => {
                return MockRedisCache.get('a').then((val) => {
                    expect(val).to.equal('10');
                });
            });
        });
        it('should correctly increment and get keys', () => {
            return MockRedisCache.incr('b').then(() => {
                return MockRedisCache.get('b').then((val) => {
                    expect(val).to.equal('1');
                });
            });
        });
        it('should correctly set and expire keys', (done) => {
            MockRedisCache.set('b', 'exp').then(() => {
                return MockRedisCache.expire('b', 1).then(() => {
                    return setTimeout(() => {
                        return MockRedisCache.get('b').then((val) => {
                            if(val === null) done();
                            else done(new AssertionError('failed! Expected null but got', val));
                        });
                    }, 1050);
                });
            });
        });
        it('should correctly set and flush keys', () => {
            return MockRedisCache.set('c', 'forever').then(() => {
                return MockRedisCache.flush().then(() => {
                    return MockRedisCache.get('c').then((val) => {
                        expect(val).to.equal(null);
                    })
                })
            })
        })
    });

    describe('Null cache', () => {
        it('should have .get() return null', () => {
            MockNullCache.set('a','test').then(() => {
                MockNullCache.get('a').then((val) => {
                    expect(val).to.equal(null);
                });
            });
        });
    });
});