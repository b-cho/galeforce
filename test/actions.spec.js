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
            league: require('./test-json/v4.league.league.json'),
            master: require('./test-json/v4.league.master.json'),
            grandmaster: require('./test-json/v4.league.grandmaster.json'),
            challenger: require('./test-json/v4.league.challenger.json'),
            diamondIV: require('./test-json/v4.league.diamond4.json'),
            masterExp: require('./test-json/v4.league-exp.json'),
        },
        match: {
            matchByMatchId: require('./test-json/v4.match.match.by-match.json'),
            timelineByMatchId: require('./test-json/v4.match.timeline.by-match.json'),
            matchlistByAccountId: require('./test-json/v4.match.matchlist.by-account.json'),
            matchesByTournament: require('./test-json/v4.match.matchlist.by-tournament.json'),
            matchlistFiltered: require('./test-json/v4.match.matchlist.by-account.filtered.json'),
        },
        championMastery: {
            bySummonerId: require('./test-json/v4.champion-mastery.by-summoner.json'),
            byChampionId: require('./test-json/v4.champion-mastery.by-summoner.by-champion.json'),
            score: require('./test-json/v4.champion-mastery.by-summoner.score.json'),
        },
        thirdPartyCode: {
            bySummonerId: require('./test-json/v4.third-party-code.json'),
        },
        status: require('./test-json/v4.lol-status.platform-data.json'),
        spectator: {
            active: require('./test-json/v4.spectator.active.json'),
            featured: require('./test-json/v4.spectator.featured.json'),
        }
    },
    v3: {
        champion: require('./test-json/v3.champion.champion-rotations.json'),
    },
    v1: {
        clash: {
            tournaments: {
                all: require('./test-json/v1.clash.tournaments.all.json'),
                byTournament: require('./test-json/v1.clash.tournaments.by-tournament.json'),
                byTeam: require('./test-json/v1.clash.tournaments.by-team.json'),
            },
            players: require('./test-json/v1.clash.players.json'),
            team: require('./test-json/v1.clash.teams.json'),
        }
    }
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
    .get('/lol/league/v4/masterleagues/by-queue/RANKED_SOLO_5x5')
        .reply(200, replyValues.v4.league.master)
    .get('/lol/league/v4/grandmasterleagues/by-queue/RANKED_SOLO_5x5')
        .reply(200, replyValues.v4.league.grandmaster)
    .get('/lol/league/v4/challengerleagues/by-queue/RANKED_SOLO_5x5')
        .reply(200, replyValues.v4.league.challenger)
    .get('/lol/league/v4/entries/RANKED_SOLO_5x5/DIAMOND/IV')
        .reply(200, replyValues.v4.league.diamondIV)
    .get('/lol/league-exp/v4/entries/RANKED_SOLO_5x5/MASTER/I')
        .reply(200, replyValues.v4.league.masterExp)
    .get('/lol/league/v4/leagues/df776d6f-4101-4817-a36d-689a4be85887')
        .reply(200, replyValues.v4.league.league)
    .get('/lol/match/v4/matches/3724412289')
        .reply(200, replyValues.v4.match.matchByMatchId)
    .get('/lol/match/v4/timelines/by-match/3724412289')
        .reply(200, replyValues.v4.match.timelineByMatchId)
    .get('/lol/match/v4/matchlists/by-account/xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4')
        .reply(200, replyValues.v4.match.matchlistByAccountId)
    .get('/lol/match/v4/matchlists/by-account/xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4')
    .query({ champion: 498, endIndex: 10 })
        .reply(200, replyValues.v4.match.matchlistFiltered)
    .get('/lol/match/v4/matches/by-tournament-code/1234/ids')
        .reply(200, replyValues.v4.match.matchesByTournament)
    .get('/lol/match/v4/matches/3724412289/by-tournament-code/1234')
        .reply(200, replyValues.v4.match.matchByMatchId)
    .get('/lol/champion-mastery/v4/champion-masteries/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v4.championMastery.bySummonerId)
    .get('/lol/champion-mastery/v4/champion-masteries/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w/by-champion/498')
        .reply(200, replyValues.v4.championMastery.byChampionId)
    .get('/lol/champion-mastery/v4/scores/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v4.championMastery.score)
    .get('/lol/platform/v4/third-party-code/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v4.thirdPartyCode.bySummonerId)
    .get('/lol/status/v4/platform-data')
        .reply(200, replyValues.v4.status)
    .get('/lol/platform/v3/champion-rotations')
        .reply(200, replyValues.v3.champion)
    .get('/lol/clash/v1/tournaments')
        .reply(200, replyValues.v1.clash.tournaments.all)
    .get('/lol/clash/v1/tournaments/2001')
        .reply(200, replyValues.v1.clash.tournaments.byTournament)
    .get('/lol/clash/v1/tournaments/by-team/971374dd-d9bd-4ff9-a06d-b21044ba0c92')
        .reply(200, replyValues.v1.clash.tournaments.byTeam)
    .get('/lol/clash/v1/players/by-summoner/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v1.clash.players)
    .get('/lol/clash/v1/teams/971374dd-d9bd-4ff9-a06d-b21044ba0c92')
        .reply(200, replyValues.v1.clash.team)
    .get('/lol/spectator/v4/active-games/by-summoner/W0UKG702c2bD7rwhOqZAn-pQ0ggk27_M0WMEVkPDodr-I-g')
        .reply(200, replyValues.v4.spectator.active)
    .get('/lol/spectator/v4/featured-games')
        .reply(200, replyValues.v4.spectator.featured)
    .get('/lol/summoner/v4/summoners/by-name/404')
        .reply(404)
    .get('/lol/summoner/v4/summoners/by-name/403')
        .reply(403)


describe('/galeforce/actions', () => {
    describe('Galeforce', () => {
        describe('.summoner()', () => {
            describe('.name()', () => {
                it('should return correct JSON for the /lol/summoner/v4/summoners/by-name Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).name('SSG Xayah').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid region', () => {
                    return expect(() => Galeforce.summoner().region('invalid region'))
                        .to.throw();
                });
                it('should throw when not provided a region', () => {
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
                it('should return correct JSON for the /lol/summoner/v4/summoners/by-account Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid accountId (length check)', () => {
                    return expect(() => Galeforce.summoner().accountId('X'.repeat(100)))
                        .to.throw('[galeforce]: accountId is invalid according to Riot specifications (length > 56).');
                });
            });
            describe('.summonerId()', () => {
                it('should return correct JSON for the /lol/summoner/v4/summoners Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid summonerId (length check)', () => {
                    return expect(() => Galeforce.summoner().summonerId('X'.repeat(100)))
                        .to.throw('[galeforce]: summonerId is invalid according to Riot specifications (length > 63).');
                });
            });
            describe('.puuid()', () => {
                it('should return correct JSON for the /lol/summoner/v4/summoners/by-puuid Riot API endpoint', () => {
                    return expect(Galeforce.summoner().region(Galeforce.regions.NORTH_AMERICA).puuid('jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g').exec())
                        .to.eventually.deep.equal(replyValues.v4.summoner);
                });
                it('should throw when provided an invalid puuid (length check)', () => {
                    return expect(() => Galeforce.summoner().puuid('X'.repeat(100)))
                        .to.throw('[galeforce]: puuid is invalid according to Riot specifications (length > 78).');
                });
            });
        });
        describe('.league', () => {
            describe('.entries()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /lol/league/v4/entries/by-summoner Riot API endpoint', () => {
                        return expect(Galeforce.league.entries().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v4.league.entriesBySummonerId);
                    });
                });
                describe('.queue().tier().division()', () => {
                    it('should return correct JSON for the /lol/league/v4/entries Riot API endpoint', () => {
                        return expect(Galeforce.league.entries().region(Galeforce.regions.NORTH_AMERICA).queue(Galeforce.queues.RANKED_SOLO).tier(Galeforce.tiers.DIAMOND).division(Galeforce.divisions.IV).exec())
                            .to.eventually.deep.equal(replyValues.v4.league.diamondIV);
                    });
                    it('should return correct JSON for the /lol/league-exp/v4/entries Riot API endpoint', () => {
                        return expect(Galeforce.league.entries().region(Galeforce.regions.NORTH_AMERICA).division(Galeforce.divisions.I).queue(Galeforce.queues.RANKED_SOLO).tier(Galeforce.tiers.MASTER).exec())
                            .to.eventually.deep.equal(replyValues.v4.league.masterExp);
                    });
                    it('should throw when provided an invalid queue', () => {
                        return expect(() => Galeforce.league.entries().queue('invalid queue'))
                            .to.throw('[galeforce]: Invalid queue type provided.');
                    });
                    it('should throw when provided an invalid tier', () => {
                        return expect(() => Galeforce.league.entries().tier('invalid tier'))
                            .to.throw('[galeforce]: Invalid ranked tier provided.');
                    });
                    it('should throw when provided an invalid division', () => {
                        return expect(() => Galeforce.league.entries().division('invalid division'))
                            .to.throw('[galeforce]: Invalid ranked division provided.');
                    });
                });
            });
            describe('.league()', () => {
                describe('.leagueId()', () => {
                    it('should return correct JSON for the /lol/league/v4/leagues/ Riot API endpoint', () => {
                        return expect(Galeforce.league.league().region(Galeforce.regions.NORTH_AMERICA).leagueId('df776d6f-4101-4817-a36d-689a4be85887').exec())
                            .to.eventually.deep.equal(replyValues.v4.league.league);
                    });
                });
                describe('.queue().tier()', () => {
                    it('should return correct JSON for the /lol/league/v4/challengerleagues/by-queue/ Riot API endpoint', () => {
                        return expect(Galeforce.league.league().region(Galeforce.regions.NORTH_AMERICA).queue(Galeforce.queues.RANKED_SOLO).tier(Galeforce.tiers.CHALLENGER).exec())
                            .to.eventually.deep.equal(replyValues.v4.league.challenger);
                    });
                    it('should return correct JSON for the /lol/league/v4/grandmasterleagues/by-queue/ Riot API endpoint', () => {
                        return expect(Galeforce.league.league().region(Galeforce.regions.NORTH_AMERICA).tier(Galeforce.tiers.GRANDMASTER).queue(Galeforce.queues.RANKED_SOLO).exec())
                            .to.eventually.deep.equal(replyValues.v4.league.grandmaster);
                    });
                    it('should return correct JSON for the /lol/league/v4/masterleagues/by-queue/ Riot API endpoint', () => {
                        return expect(Galeforce.league.league().queue(Galeforce.queues.RANKED_SOLO).tier(Galeforce.tiers.MASTER).region(Galeforce.regions.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v4.league.master);
                    });
                    it('should throw when provided an invalid tier', () => {
                        return expect(() => Galeforce.league.league().tier(Galeforce.tiers.DIAMOND))
                            .to.throw('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.');
                    });
                    it('should reject when .tier() is not chained with .queue()', () => {
                        return expect(Galeforce.league.league().region(Galeforce.regions.NORTH_AMERICA).queue(Galeforce.queues.RANKED_SOLO).exec())
                            .to.eventually.be.rejectedWith('[galeforce]: .queue() must be chained with .tier().')
                    })
                });
            });
        });
        describe('.mastery', () => {
            describe('.summoner()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /lol/champion-mastery/v4/champion-masteries/by-summoner Riot API endpoint', () => {
                        return expect(Galeforce.mastery.summoner().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v4.championMastery.bySummonerId);
                    });
                    describe('.championId()', () => {
                        it('should return correct JSON for the /lol/champion-mastery/v4/champion-masteries/by-summoner/{}/by-champion Riot API endpoint', () => {
                            return expect(Galeforce.mastery.summoner().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').championId(498).exec())
                                .to.eventually.deep.equal(replyValues.v4.championMastery.byChampionId);
                        });
                    });
                });
            });
            describe('.score()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /lol/champion-mastery/v4/scores/by-summoner/ Riot API endpoint', () => {
                        return expect(Galeforce.mastery.score().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v4.championMastery.score);
                    });
                });
            });
        });
        describe('.match', () => {
            describe('.match()', () => {
                describe('.matchId()', () => {
                    it('should return correct JSON for the /lol/match/v4/matches Riot API endpoint', () => {
                        return expect(Galeforce.match.match().region(Galeforce.regions.NORTH_AMERICA).matchId('3724412289').exec())
                            .to.eventually.deep.equal(replyValues.v4.match.matchByMatchId);
                    });
                    describe('.tournamentCode()', () => {
                        it('should return correct JSON for the /lol/match/v4/matches/{}/by-tournament-code Riot API endpoint', () => {
                            return expect(Galeforce.match.match().region(Galeforce.regions.NORTH_AMERICA).matchId('3724412289').tournamentCode('1234').exec())
                                .to.eventually.deep.equal(replyValues.v4.match.matchByMatchId);
                        });
                    });
                });
            });
            describe('.timeline()', () => {
                describe('.matchId()', () => {
                    it('should return correct JSON for the /lol/match/v4/timelines/by-match Riot API endpoint', () => {
                        return expect(Galeforce.match.timeline().region(Galeforce.regions.NORTH_AMERICA).matchId('3724412289').exec())
                            .to.eventually.deep.equal(replyValues.v4.match.timelineByMatchId);
                    });
                });
            });
            describe('.matchlist()', () => {
                describe('.accountId()', () => {
                    it('should return correct JSON for the /lol/match/v4/matchlists/by-account/ Riot API endpoint', () => {
                        return expect(Galeforce.match.matchlist().region(Galeforce.regions.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').exec())
                            .to.eventually.deep.equal(replyValues.v4.match.matchlistByAccountId);
                    });
                    describe('.query()', () => {
                        it('should return correct JSON for the /lol/match/v4/matchlists/by-account/ Riot API endpoint with query', () => {
                            return expect(Galeforce.match.matchlist().region(Galeforce.regions.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').query({ champion: 498, endIndex: 10 }).exec())
                                .to.eventually.deep.equal(replyValues.v4.match.matchlistFiltered);
                        });
                    })
                });
            });
            describe('.tournament()', () => {
                describe('.tournamentCode()', () => {
                    it('should return correct JSON for the /lol/match/v4/matches/by-tournament-code/{}/ids Riot API endpoint', () => {
                        return expect(Galeforce.match.tournament().region(Galeforce.regions.NORTH_AMERICA).tournamentCode('1234').exec())
                            .to.eventually.deep.equal(replyValues.v4.match.matchesByTournament);
                    });
                });
            });
        });
        describe('.platform', () => {
            describe('.thirdPartyCode()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /lol/platform/v4/third-party-code/by-summoner/ Riot API endpoint', () => {
                        return expect(Galeforce.platform.thirdPartyCode().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v4.thirdPartyCode.bySummonerId);
                    });
                });
            });
        });
        describe('.status', () => {
            describe('.platformData()', () => {
                it('should return correct JSON for the /lol/status/v4/platform-data Riot API endpoint', () => {
                    return expect(Galeforce.status.platformData().region(Galeforce.regions.NORTH_AMERICA).exec())
                        .to.eventually.deep.equal(replyValues.v4.status);
                });
            });
        });
        describe('.champion', () => {
            describe('.championRotations()', () => {
                it('should return correct JSON for the /lol/platform/v3/champion-rotations Riot API endpoint', () => {
                    return expect(Galeforce.platform.championRotations().region(Galeforce.regions.NORTH_AMERICA).exec())
                        .to.eventually.deep.equal(replyValues.v3.champion);
                });
            });
        });
        describe('.clash', () => {
            describe('.tournaments()', () => {
                describe('.all()', () => {
                    it('should return correct JSON for the /lol/clash/v1/tournaments Riot API endpoint', () => {
                        return expect(Galeforce.clash.tournament().all().region(Galeforce.regions.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v1.clash.tournaments.all);
                    });
                    it('should return correct JSON for the /lol/clash/v1/tournaments Riot API endpoint (reversed)', () => {
                        return expect(Galeforce.clash.tournament().region(Galeforce.regions.NORTH_AMERICA).all().exec())
                            .to.eventually.deep.equal(replyValues.v1.clash.tournaments.all);
                    });
                });
                describe('.tournamentId()', () => {
                    it('should return correct JSON for the /lol/clash/v1/tournaments/{} Riot API endpoint', () => {
                        return expect(Galeforce.clash.tournament().tournamentId(2001).region(Galeforce.regions.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v1.clash.tournaments.byTournament);
                    });
                });
                describe('.teamId()', () => {
                    it('should return correct JSON for the /lol/clash/v1/tournaments/by-team Riot API endpoint', () => {
                        return expect(Galeforce.clash.tournament().teamId('971374dd-d9bd-4ff9-a06d-b21044ba0c92').region(Galeforce.regions.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v1.clash.tournaments.byTeam);
                    });
                });
            });
            describe('.players()', () => {
                it('should return correct JSON for the /lol/clash/v1/players/by-summoner Riot API endpoint', () => {
                    return expect(Galeforce.clash.players().region(Galeforce.regions.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                        .to.eventually.deep.equal(replyValues.v1.clash.players);
                });
            })
            describe('.team()', () => {
                it('should return correct JSON for the /lol/clash/v1/teams Riot API endpoint', () => {
                    return expect(Galeforce.clash.team().region(Galeforce.regions.NORTH_AMERICA).teamId('971374dd-d9bd-4ff9-a06d-b21044ba0c92').exec())
                        .to.eventually.deep.equal(replyValues.v1.clash.team);
                });
            })
        });
        describe('.spectator', () => {
            describe('.active()', () => {
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /lol/spectator/v4/active-games/by-summoner Riot API endpoint', () => {
                        return expect(Galeforce.spectator.active().region(Galeforce.regions.NORTH_AMERICA).summonerId('W0UKG702c2bD7rwhOqZAn-pQ0ggk27_M0WMEVkPDodr-I-g').exec())
                            .to.eventually.deep.equal(replyValues.v4.spectator.active);
                    });
                });
            });
            describe('.featured()', () => {
                it('should return correct JSON for the /lol/spectator/v4/featured-games Riot API endpoint', () => {
                    return expect(Galeforce.spectator.featured().region(Galeforce.regions.NORTH_AMERICA).exec())
                        .to.eventually.deep.equal(replyValues.v4.spectator.featured);
                });
            });
        });
    });
});