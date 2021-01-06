const chai = require('chai');
const redisMock = require('redis-mock');
const nock = require('nock');
const rewiremock = require('rewiremock/node');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const expect = chai.expect;

rewiremock('redis').with(redisMock);
rewiremock(() => require('redis')).with(redisMock);
rewiremock.enable();

const GaleforceModule = require('../dist').default;
const { reject } = require('bluebird');

const Galeforce = new GaleforceModule({
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
            1: 2000,
        },
    },
});

rewiremock.disable();

// Set up nock
const replyValues = {
    v4: {
        summoner: require('./test-json/v4.summoner.by-name.json'),
        league: {
            entriesBySummonerId: require('./test-json/v4.league.entries.by-summoner-id.json'),
        },
        match: {
            matchByMatchId: require('./test-json/v4.match.match.by-match.json'),
            timelineByMatchId: require('./test-json/v4.match.timeline.by-match.json'),
            matchlistByAccountId: require('./test-json/v4.match.matchlist.by-account.json'),
        },
        championMastery: {
            bySummonerId: require('./test-json/v4.champion-mastery.by-summoner.json'),
        },
        thirdPartyCode: {
            bySummonerId: 'abc',
        },
    },
};

const na1API = nock('https://na1.api.riotgames.com')
    .persist()
    .get('/lol/summoner/v4/summoners/by-name/SSG%20Xayah')
        .reply(200, replyValues.v4.summoner)
    .get('/lol/summoner/v4/summoners/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v4.summoner)
    .get('/lol/summoner/v4/summoners/by-account/xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4')
        .reply(200, replyValues.v4.summoner)
    .get('/lol/summoner/v4/summoners/by-puuid/jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g')
        .reply(200, replyValues.v4.summoner)
    .get('/lol/league/v4/entries/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v4.league.entriesBySummonerId)
    .get('/lol/match/v4/matches/3724412289')
        .reply(200, replyValues.v4.match.matchByMatchId)
    .get('/lol/match/v4/timelines/by-match/3724412289')
        .reply(200, replyValues.v4.match.timelineByMatchId)
    .get('/lol/match/v4/matchlists/by-account/xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4')
        .reply(200, replyValues.v4.match.matchlistByAccountId)
    .get('/lol/champion-mastery/v4/champion-masteries/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v4.championMastery.bySummonerId)
    .get('/lol/platform/v4/third-party-code/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v4.thirdPartyCode.bySummonerId)

    .get('/lol/summoner/v4/summoners/by-name/404')
        .reply(404)
    .get('/lol/league/v4/entries/by-summoner/404')
        .reply(404)
    .get('/lol/match/v4/matches/404')
        .reply(404)
    .get('/lol/match/v4/timelines/by-match/404')
        .reply(404)
    .get('/lol/match/v4/matchlists/by-account/404')
        .reply(404)
    .get('/lol/champion-mastery/v4/champion-masteries/by-summoner/404')
        .reply(404)
    .get('/lol/platform/v4/third-party-code/by-summoner/404')
        .reply(404)

    .get('/lol/summoner/v4/summoners/by-name/403')
        .reply(403)
    .get('/lol/league/v4/entries/by-summoner/403')
        .reply(403)
    .get('/lol/match/v4/matches/403')
        .reply(403)
    .get('/lol/match/v4/timelines/by-match/403')
        .reply(403)
    .get('/lol/match/v4/matchlists/by-account/403')
        .reply(403)
    .get('/lol/champion-mastery/v4/champion-masteries/by-summoner/403')
        .reply(403)
    .get('/lol/platform/v4/third-party-code/by-summoner/403')
        .reply(403)


describe('/galeforce/actions', () => {
    describe('Galeforce', () => {
        describe('.summoner()', () => {
            describe('.name()', () => {
                it('should return correct JSON for the /summoner/v4/summoners/by-name Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).name('SSG Xayah').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid region', () => {
                    return expect(() => Galeforce.summoner().region('invalid region'))
                        .to.throw();
                });
                it('should return correct JSON for the /summoner/v4/summoners/by-name Riot API endpoint', () => {
                    return expect(Galeforce.summoner().name('SSG Xayah').exec())
                        .to.eventually.be.rejectedWith('[galeforce]: Action payload region or endpoint is required but undefined.');
                });
                it('should reject with correct error message when receiving a 404 status code', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).name('404').exec())
                        .to.eventually.be.rejectedWith('[galeforce]: Data fetch failed with status code 404');
                });
                it('should reject with correct error message when receiving a 403 status code', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).name('403').exec())
                        .to.eventually.be.rejectedWith('[galeforce]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                });
                it('should timeout when rate limit exceeded', () => new Promise((resolve, reject) => {

                
                    const GaleforceRL = new GaleforceModule('./test/test-configs/1.yaml');
                    let autoTimeout = setTimeout(resolve, 500);
                    GaleforceRL['SubmoduleMap']['cache'].setex('riotapi-ratelimit-120na1', 120, '4000').then(() => {
                        GaleforceRL.summoner().region(GaleforceRL.regions.NORTH_AMERICA).name('SSG Xayah').exec().then(() => {
                            clearTimeout(autoTimeout);
                            reject(new Error('Rate limiting failed!'));
                        });
                    });
                }));
            });
            describe('.accountId', () => {
                it('should return correct JSON for the /summoner/v4/summoners/by-account Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid accountId (length check)', () => {
                    return expect(() => Galeforce.summoner().accountId('X'.repeat(100)))
                        .to.throw();
                });
            });
            describe('.summonerId()', () => {
                it('should return correct JSON for the /summoner/v4/summoners Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid summonerId (length check)', () => {
                    return expect(() => Galeforce.summoner().summonerId('X'.repeat(100)))
                        .to.throw();
                });
            });
            describe('.puuid()', () => {
                it('should return correct JSON for the /summoner/v4/summoners/by-puuid Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).puuid('jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid puuid (length check)', () => {
                    return expect(() => Galeforce.summoner().puuid('X'.repeat(100)))
                        .to.throw();
                });
            });
        });
        describe('.league', () => {
            describe('.entries()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /league/v4/entries/by-summoner Riot API endpoint', () => {
                        return expect(Galeforce.league.entries().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v4.league.entriesBySummonerId);
                    });
                });
            });
        });
        describe('.mastery', () => {
            describe('.summoner()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /champion-mastery/v4/champion-masteries/by-summoner Riot API endpoint', () => {
                        return expect(Galeforce.mastery.summoner().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v4.championMastery.bySummonerId);
                    });
                });
            });
        });
        describe('.match', () => {
            describe('.match()', () => {
                describe('.matchId()', () => {
                    it('should return correct JSON for the /match/v4/matches Riot API endpoint', () => {
                        return expect(Galeforce.match.match().region(Galeforce.regions.NORTH_AMERICA).matchId('3724412289').exec())
                            .to.eventually.deep.equal(replyValues.v4.match.matchByMatchId);
                    });
                });
            })
            describe('.timeline()', () => {
                describe('.matchId()', () => {
                    it('should return correct JSON for the /match/v4/timelines/by-match Riot API endpoint', () => {
                        return expect(Galeforce.match.timeline().region(Galeforce.regions.NORTH_AMERICA).matchId('3724412289').exec())
                            .to.eventually.deep.equal(replyValues.v4.match.timelineByMatchId);
                    });
                });
            });
            describe('.matchlist()', () => {
                describe('.accountId()', () => {
                    it('should return correct JSON for the /match/v4/matchlists/by-account/ Riot API endpoint', () => {
                        return expect(Galeforce.match.matchlist().region(Galeforce.regions.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').exec())
                            .to.eventually.deep.equal(replyValues.v4.match.matchlistByAccountId);
                    });
                });
            });
        });
        describe('.platform', () => {
            describe('.thirdPartyCode()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /platform/v4/third-party-code/by-summoner/ Riot API endpoint', () => {
                        return expect(Galeforce.platform.thirdPartyCode().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.equal(replyValues.v4.thirdPartyCode.bySummonerId);
                    });
                });
            });
        });
    });
});