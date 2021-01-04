const chai = require('chai');
const redis = require('redis-mock');
const nock = require('nock');
const chaiAsPromised = require('chai-as-promised');
const TJS = require('typescript-json-schema');

chai.use(chaiAsPromised);
const expect = chai.expect;

const RedisCache = require('../dist/sightstone/caches/redis').default;
const client = redis.createClient();

const SightstoneModule = require('../dist').default;

const Sightstone = new SightstoneModule({
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
});

Sightstone['SubmoduleMap']['cache'] = new RedisCache('', {
    prefix: 'riotapi-ratelimit-',
    intervals: {
        1: 20,
    },
}, client);

// Set up nock
const replyValues = {
    v4: {
        summoner: {
            byName: require('./test-json/v4.summoner.by-name.json'),
        },
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
    },
};

const na1API = nock('https://na1.api.riotgames.com')
    .get('/lol/summoner/v4/summoners/by-name/SSG%20Xayah')
        .reply(200, replyValues.v4.summoner.byName)
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


describe('/sightstone/actions', () => {
    describe('Sightstone', () => {
        describe('.summoner', () => {
            describe('.name()', () => {
                it('should return correct JSON for the /summoner/v4/summoners/by-name Riot API endpoint', () => {
                    return expect(Sightstone.summoner.name(Sightstone.regions.NORTH_AMERICA, 'SSG Xayah').run())
                        .to.eventually.deep.equal(replyValues.v4.summoner.byName);
                });
                it('should throw when provided an invalid region', () => {
                    return expect(() => Sightstone.summoner.name('invalid region', 'SSG Xayah'))
                        .to.throw();
                });
                it('should reject with correct error message when receiving a 404 status code', () => {
                    return expect(Sightstone.summoner.name(Sightstone.regions.NORTH_AMERICA, '404').run())
                        .to.eventually.be.rejectedWith('[sightstone]: Summoner data fetch failed with status code 404');
                });
                it('should reject with correct error message when receiving a 403 status code', () => {
                    return expect(Sightstone.summoner.name(Sightstone.regions.NORTH_AMERICA, '403').run())
                        .to.eventually.be.rejectedWith('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                });
            });
        });
        describe('.league', () => {
            describe('.entries', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /league/v4/entries/by-summoner Riot API endpoint', () => {
                        return expect(Sightstone.league.entries.summonerId(Sightstone.regions.NORTH_AMERICA, 'l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').run())
                            .to.eventually.deep.equal(replyValues.v4.league.entriesBySummonerId);
                    });
                    it('should throw when provided an invalid region', () => {
                        return expect(() => Sightstone.league.entries.summonerId('invalid region', 'l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w'))
                            .to.throw();
                    });
                    it('should reject with correct error message when receiving a 404 status code', () => {
                        return expect(Sightstone.league.entries.summonerId(Sightstone.regions.NORTH_AMERICA, '404').run())
                            .to.eventually.be.rejectedWith('[sightstone]: LeagueEntries data fetch failed with status code 404');
                    });
                    it('should reject with correct error message when receiving a 403 status code', () => {
                        return expect(Sightstone.league.entries.summonerId(Sightstone.regions.NORTH_AMERICA, '403').run())
                            .to.eventually.be.rejectedWith('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                    });
                });
            });
        });
        describe('.mastery', () => {
            describe('.summonerId()', () => {
                it('should return correct JSON for the /champion-mastery/v4/champion-masteries/by-summoner Riot API endpoint', () => {
                    return expect(Sightstone.mastery.summonerId(Sightstone.regions.NORTH_AMERICA, 'l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').run())
                        .to.eventually.deep.equal(replyValues.v4.championMastery.bySummonerId);
                });
                it('should throw when provided an invalid region', () => {
                    return expect(() => Sightstone.mastery.summonerId('invalid region', 'l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w'))
                        .to.throw();
                });
                it('should reject with correct error message when receiving a 404 status code', () => {
                    return expect(Sightstone.mastery.summonerId(Sightstone.regions.NORTH_AMERICA, '404').run())
                        .to.eventually.be.rejectedWith('[sightstone]: ChampionMastery data fetch failed with status code 404');
                });
                it('should reject with correct error message when receiving a 403 status code', () => {
                    return expect(Sightstone.mastery.summonerId(Sightstone.regions.NORTH_AMERICA, '403').run())
                        .to.eventually.be.rejectedWith('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                });
            });
        });
        describe('.match', () => {
            describe('.matchId()', () => {
                it('should return correct JSON for the /match/v4/matches Riot API endpoint', () => {
                    return expect(Sightstone.match.matchId(Sightstone.regions.NORTH_AMERICA, '3724412289').run())
                        .to.eventually.deep.equal(replyValues.v4.match.matchByMatchId);
                });
                it('should throw when provided an invalid region', () => {
                    return expect(() => Sightstone.match.matchId('invalid region', '3724412289'))
                        .to.throw();
                });
                it('should reject with correct error message when receiving a 404 status code', () => {
                    return expect(Sightstone.match.matchId(Sightstone.regions.NORTH_AMERICA, '404').run())
                        .to.eventually.be.rejectedWith('[sightstone]: Match data fetch failed with status code 404');
                });
                it('should reject with correct error message when receiving a 403 status code', () => {
                    return expect(Sightstone.match.matchId(Sightstone.regions.NORTH_AMERICA, '403').run())
                        .to.eventually.be.rejectedWith('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                });
            });
            describe('.timeline', () => {
                describe('.matchId()', () => {
                    it('should return correct JSON for the /match/v4/timelines/by-match Riot API endpoint', () => {
                        return expect(Sightstone.match.timeline.matchId(Sightstone.regions.NORTH_AMERICA, '3724412289').run())
                            .to.eventually.deep.equal(replyValues.v4.match.timelineByMatchId);
                    });
                    it('should throw when provided an invalid region', () => {
                        return expect(() => Sightstone.match.timeline.matchId('invalid region', '3724412289'))
                            .to.throw();
                    });
                    it('should reject with correct error message when receiving a 404 status code', () => {
                        return expect(Sightstone.match.timeline.matchId(Sightstone.regions.NORTH_AMERICA, '404').run())
                            .to.eventually.be.rejectedWith('[sightstone]: MatchTimeline data fetch failed with status code 404');
                    });
                    it('should reject with correct error message when receiving a 403 status code', () => {
                        return expect(Sightstone.match.timeline.matchId(Sightstone.regions.NORTH_AMERICA, '403').run())
                            .to.eventually.be.rejectedWith('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                    });
                });
            });
            describe('.matchlist', () => {
                describe('.accountId()', () => {
                    it('should return correct JSON for the /match/v4/matchlists/by-account/ Riot API endpoint', () => {
                        return expect(Sightstone.match.matchlist.accountId(Sightstone.regions.NORTH_AMERICA, 'xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').run())
                            .to.eventually.deep.equal(replyValues.v4.match.matchlistByAccountId);
                    });
                    it('should throw when provided an invalid region', () => {
                        return expect(() => Sightstone.match.matchlist.accountId('invalid region', 'xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW'))
                            .to.throw();
                    });
                    it('should reject with correct error message when receiving a 404 status code', () => {
                        return expect(Sightstone.match.matchlist.accountId(Sightstone.regions.NORTH_AMERICA, '404').run())
                            .to.eventually.be.rejectedWith('[sightstone]: Matchlist data fetch failed with status code 404');
                    });
                    it('should reject with correct error message when receiving a 403 status code', () => {
                        return expect(Sightstone.match.matchlist.accountId(Sightstone.regions.NORTH_AMERICA, '403').run())
                            .to.eventually.be.rejectedWith('[sightstone]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                    });
                });
            });
        });
    });
});