const chai = require('chai');
const redisMock = require('redis-mock');
const rewiremock = require('rewiremock/node');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;

rewiremock('redis').with(redisMock);
rewiremock(() => require('redis')).with(redisMock);
rewiremock.enable();

const RedisCache = require('../dist/galeforce/caches/redis').default;
const NullCache = require('../dist/galeforce/caches/null').default;
const JavascriptCache = require('../dist/galeforce/caches/javascript').default;

const MockJavascriptCache = new JavascriptCache();
const MockRedisCache = new RedisCache('redis://127.0.0.1:6379');
const MockNullCache = new NullCache();

rewiremock.disable();

describe('/galeforce/caches', () => {
    describe('Redis cache', () => {
        it('should properly initialize', () => {
            expect(MockRedisCache).to.have.property('client');
            expect(MockRedisCache).to.have.property('RLConfig');
        });
        it('should correctly set and get keys', () => MockRedisCache.set('a', '10').then(() => MockRedisCache.get('a').then((val) => {
            expect(val).to.equal('10');
        })));
        it('should correctly increment and get keys', () => MockRedisCache.incr('b').then(() => MockRedisCache.incr('b').then(() => MockRedisCache.get('b').then((val) => {
            expect(val).to.equal('2');
        }))));
        it('should correctly incr and expire keys', (done) => {
            MockRedisCache.incr('r').then(() => MockRedisCache.expire('r', 1).then(() => setTimeout(() => MockRedisCache.get('r').then((val) => {
                if (val === null) done();
                else done(new AssertionError('failed! Expected null but got', val));
            }), 1050)));
        });
        it('should correctly setex keys', (done) => {
            MockRedisCache.set('q', 'exp', 1).then(() => setTimeout(() => MockRedisCache.get('q').then((val) => {
                if (val === null) done();
                else done(new AssertionError('failed! Expected null but got', val));
            }), 1050));
        });
        it('should correctly set and flush keys', () => MockRedisCache.set('c', 'forever').then(() => MockRedisCache.flush().then(() => MockRedisCache.get('c').then((val) => {
            expect(val).to.equal(null);
        }))));
    });

    describe('JavaScript cache', () => {
        it('should properly initialize', () => {
            expect(MockJavascriptCache).to.have.property('client');
            expect(MockJavascriptCache).to.have.property('RLConfig');
        });
        it('should correctly set and get keys', () => MockJavascriptCache.set('a', '10').then(() => MockJavascriptCache.get('a').then((val) => {
            expect(val).to.equal('10');
        })));
        it('should correctly increment and get keys', () => MockJavascriptCache.incr('b').then(() => MockJavascriptCache.incr('b').then(() => MockJavascriptCache.get('b').then((val) => {
            expect(val).to.equal('2');
        }))));
        it('should correctly incr and expire keys', (done) => {
            MockJavascriptCache.incr('r').then(() => MockJavascriptCache.expire('r', 1).then(() => setTimeout(() => MockJavascriptCache.get('r').then((val) => {
                if (val === null) done();
                else done(new AssertionError('failed! Expected null but got', val));
            }), 1050)));
        });
        it('should correctly setex keys', (done) => {
            MockJavascriptCache.set('q', 'exp', 1).then(() => setTimeout(() => MockJavascriptCache.get('q').then((val) => {
                if (val === null) done();
                else done(new AssertionError('failed! Expected null but got', val));
            }), 1050));
        });
        it('should correctly set and flush keys', () => MockJavascriptCache.set('c', 'forever').then(() => MockJavascriptCache.flush().then(() => MockJavascriptCache.get('c').then((val) => {
            expect(val).to.equal(null);
        }))));
    });

    describe('Null cache', () => {
        it('should have .get() return null', () => {
            MockNullCache.set('a', 'test').then(() => {
                MockNullCache.get('a').then((val) => {
                    expect(val).to.equal(null);
                });
            });
        });
        it('should not throw on set', () => expect(MockNullCache.set('a', 'test')).to.be.fulfilled);
        it('should not throw on setex', () => expect(MockNullCache.set('a', 'test', 1)).to.be.fulfilled);
        it('should not throw on incr', () => expect(MockNullCache.incr('a')).to.be.fulfilled);
        it('should not throw on expire', () => expect(MockNullCache.expire('a', 1)).to.be.fulfilled);
        it('should not throw on flush', () => expect(MockNullCache.flush()).to.be.fulfilled);
    });
});
