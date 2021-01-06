const chai = require('chai');
const redisMock = require('redis-mock');
const rewiremock = require('rewiremock/node');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;


rewiremock('redis').with(redisMock);
rewiremock(() => require('redis')).with(redisMock);
rewiremock.enable();

const RedisCache = require('../dist/sightstone/caches/redis').default;
const NullCache = require('../dist/sightstone/caches/null').default;

const MockRedisCache = new RedisCache('redis://127.0.0.1:6379');
const MockNullCache = new NullCache();

rewiremock.disable();

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
        it('should correctly incr and expire keys', (done) => {
            MockRedisCache.incr('r').then(() => {
                return MockRedisCache.expire('r', 1).then(() => {
                    return setTimeout(() => {
                        return MockRedisCache.get('r').then((val) => {
                            if(val === null) done();
                            else done(new AssertionError('failed! Expected null but got', val));
                        });
                    }, 1050);
                });
            });
        });
        it('should correctly setex keys', (done) => {
            MockRedisCache.setex('q', 1, 'exp').then(() => {
                return setTimeout(() => {
                    return MockRedisCache.get('q').then((val) => {
                        if(val === null) done();
                        else done(new AssertionError('failed! Expected null but got', val));
                    });
                }, 1050);
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
        it('should not throw on set', () => {
            return expect(MockNullCache.set('a','test')).to.be.fulfilled;
        });
        it('should not throw on setex', () => {
            return expect(MockNullCache.setex('a',1,'test')).to.be.fulfilled;
        });
        it('should not throw on incr', () => {
            return expect(MockNullCache.setex('a')).to.be.fulfilled;
        });
        it('should not throw on expire', () => {
            return expect(MockNullCache.setex('a', 1)).to.be.fulfilled;
        });
        it('should not throw on flush', () => {
            return expect(MockNullCache.flush()).to.be.fulfilled;
        });
    });
});