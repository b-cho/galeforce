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

const GaleforceModule = require('../dist');

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
    debug: ['*'],
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
        },
        tournament: {
            events: require('./test-json/v4.tournament.lobby-events.json'),
            codes: require('./test-json/v4.tournament.codes.json'),
        },
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
        },
        account: {
            account: require('./test-json/v1.account.accounts.json'),
            activeShard: require('./test-json/v1.account.active-shards.json'),
        },
        lorMatch: {
            match: require('./test-json/v1.lor-match.match.json'),
            matchlist: require('./test-json/v1.lor-match.matchlist.json'),
        },
        lorRanked: {
            leaderboards: require('./test-json/v1.lor-ranked.leaderboards.json'),
        },
        lorStatus: {
            platformData: require('./test-json/v1.lor-status.platform-data.json'),
        },
        tftLeague: {
            entriesBySummonerId: require('./test-json/v1.tft-league.entries.by-summoner-id.json'),
            league: require('./test-json/v1.tft-league.league.json'),
            master: require('./test-json/v1.tft-league.master.json'),
            grandmaster: require('./test-json/v1.tft-league.grandmaster.json'),
            challenger: require('./test-json/v1.tft-league.challenger.json'),
            diamondIV: require('./test-json/v1.tft-league.diamond4.json'),
        },
        tftMatch: {
            match: require('./test-json/v1.tft-match.match.json'),
            matchlist: require('./test-json/v1.tft-match.matchlist.json'),
        },
        tftSummoner: require('./test-json/v1.tft-summoner.by-name.json'),
        valContent: {
            all: require('./test-json/v1.val-content.contents.json'),
            locale: require('./test-json/v1.val-content.locale.json'),
        },
        valMatch: {
            match: require('./test-json/v1.val-match.match.json'),
            matchlist: require('./test-json/v1.val-match.matchlist.json'),
            recent: require('./test-json/v1.val-match.recent-matches.json'),
        },
        valRanked: {
            leaderboard: require('./test-json/v1.val-ranked.leaderboards.json'),
        },
        valStatus: {
            platformData: require('./test-json/v1.val-status.platform-data.json'),
        },
    },
    ddragon: {
        versions: require('./test-json/ddragon.versions.json'),
        languages: require('./test-json/ddragon.languages.json'),
        champion: {
            list: require('./test-json/ddragon.champion.list.json'),
            details: require('./test-json/ddragon.champion.details.json'),
        },
        item: require('./test-json/ddragon.item.list.json'),
        profileIcon: require('./test-json/ddragon.profile-icon.list.json'),
        region: require('./test-json/ddragon.region.json'),
        summonerSpells: require('./test-json/ddragon.summoner-spells.list.json'),
    }
};

const na1API = nock('https://na1.api.riotgames.com')
    .persist()
    .get('/lol/summoner/v4/summoners/by-name/SSG%20Xayah')
        .reply(200, replyValues.v4.summoner)
    .get('/lol/summoner/v4/summoners/by-name/404')
        .reply(404)
    .get('/lol/summoner/v4/summoners/by-name/403')
        .reply(403)
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
    .get('/lol/league/v4/entries/RANKED_SOLO_5x5/GOLD/IV?page=2')
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
    .get('/lol/match/v4/matchlists/by-account/accountId?champion=498&endIndex=10')
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
    .get('/lol/tournament/v4/lobby-events/by-code/1234')
        .reply(200, replyValues.v4.tournament.events)
    .post('/lol/tournament/v4/providers', {
        region: 'NA',
        url: 'https://example.com',
    })
        .reply(200, 1)
    .post('/lol/tournament/v4/tournaments', {
        providerId: 10,
        name: 'name',
    })
        .reply(200, 2)
    .post('/lol/tournament/v4/codes?tournamentId=1234', {
        allowedSummonerIds: ['a','b','c'],
        metadata: '',
        teamSize: 5,
        pickType: 'TOURNAMENT_DRAFT',
        mapType: 'SUMMONERS_RIFT',
        spectatorType: 'NONE',
    })
        .reply(200, ['a','b'])
    .put('/lol/tournament/v4/codes/1234', {
        allowedSummonerIds: ['a','b','c'],
        pickType: 'TOURNAMENT_DRAFT',
        mapType: 'SUMMONERS_RIFT',
        spectatorType: 'NONE',
    })
        .reply(200)
    .get('/lol/tournament/v4/codes/1234')
        .reply(200, replyValues.v4.tournament.codes)
    .get('/tft/league/v1/entries/by-summoner/fOD4gGvxJG-_Bfcj7tqmHxYKAmbtOqoZrMz-Dk0ayGXulb7x')
        .reply(200, replyValues.v1.tftLeague.entriesBySummonerId)
    .get('/tft/league/v1/challenger')
        .reply(200, replyValues.v1.tftLeague.challenger)
    .get('/tft/league/v1/grandmaster')
        .reply(200, replyValues.v1.tftLeague.grandmaster)
    .get('/tft/league/v1/master')
        .reply(200, replyValues.v1.tftLeague.master)
    .get('/tft/league/v1/entries/DIAMOND/IV')
        .reply(200, replyValues.v1.tftLeague.diamondIV)
    .get('/tft/league/v1/entries/GOLD/IV?page=3')
        .reply(200, replyValues.v1.tftLeague.diamondIV)
    .get('/tft/league/v1/leagues/560312d9-a701-411c-b63c-474fdf46ea52')
        .reply(200, replyValues.v1.tftLeague.league)
    .get('/tft/summoner/v1/summoners/by-name/SSG%20Xayah')
        .reply(200, replyValues.v1.tftSummoner)
    .get('/tft/summoner/v1/summoners/l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w')
        .reply(200, replyValues.v1.tftSummoner)
    .get('/tft/summoner/v1/summoners/by-account/xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4')
        .reply(200, replyValues.v1.tftSummoner)
    .get('/tft/summoner/v1/summoners/by-puuid/jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g')
        .reply(200, replyValues.v1.tftSummoner)

const americasAPI = nock('https://americas.api.riotgames.com')
    .get('/riot/account/v1/accounts/by-puuid/jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g')
        .reply(200, replyValues.v1.account.account)
    .get('/riot/account/v1/accounts/by-riot-id/SSG%20Xayah/NA1')
        .reply(200, replyValues.v1.account.account)
    .get('/riot/account/v1/active-shards/by-game/val/by-puuid/jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g')
        .reply(200, replyValues.v1.account.activeShard)
    .get('/lor/match/v1/matches/by-puuid/jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g/ids')
        .reply(200, replyValues.v1.lorMatch.matchlist)
    .get('/lor/match/v1/matches/99e64d40-b729-419a-843f-14f750675d13')
        .reply(200, replyValues.v1.lorMatch.match)
    .get('/lor/ranked/v1/leaderboards')
        .reply(200, replyValues.v1.lorRanked.leaderboards)
    .get('/lor/status/v1/platform-data')
        .reply(200, replyValues.v1.lorStatus.platformData)
    .get('/tft/match/v1/matches/by-puuid/E5oZTZY5yXPsNAAz-tI2G5ImSD19NLnmw7ApUGxGArns2L2XZmjptRpAWR5PfFiNHp4cv4__Oljing/ids')
        .reply(200, replyValues.v1.tftMatch.matchlist)
    .get('/tft/match/v1/matches/by-puuid/puuid/ids?count=5')
        .reply(200, replyValues.v1.tftMatch.matchlist)
    .get('/tft/match/v1/matches/NA1_3701236130')
        .reply(200, replyValues.v1.tftMatch.match)

const naAPI = nock('https://na.api.riotgames.com')
    .get('/val/content/v1/contents')
        .reply(200, replyValues.v1.valContent.all)
    .get('/val/content/v1/contents?locale=ja-JP')
        .reply(200, replyValues.v1.valContent.locale)
    .get('/val/match/v1/matches/1234')
        .reply(200, replyValues.v1.valMatch.match)
    .get('/val/match/v1/matchlists/by-puuid/puuid')
        .reply(200, replyValues.v1.valMatch.matchlist)
    .get('/val/match/v1/recent-matches/by-queue/competitive')
        .reply(200, replyValues.v1.valMatch.recent)
    .get('/val/ranked/v1/leaderboards/by-act/97b6e739-44cc-ffa7-49ad-398ba502ceb0')
        .reply(200, replyValues.v1.valRanked.leaderboard)
    .get('/val/ranked/v1/leaderboards/by-act/actId?size=10&startIndex=5')
        .reply(200, replyValues.v1.valRanked.leaderboard)
    .get('/val/status/v1/platform-data')
        .reply(200, replyValues.v1.valStatus.platformData)

const dataDragonAPI = nock('https://ddragon.leagueoflegends.com')
    .get('/cdn/dragontail-11.2.1.tgz')
        .reply(200, '11.2.1')
    .get('/cdn/dragontail-10.10.5.zip')
        .reply(200, '10.10.5')
    .get('/cdn/languages.json')
        .reply(200, replyValues.ddragon.languages)
    .get('/api/versions.json')
        .reply(200, replyValues.ddragon.versions)
    .get('/realms/na.json')
        .reply(200, replyValues.ddragon.region)
    .get('/cdn/11.2.1/data/en_US/champion.json')
        .reply(200, replyValues.ddragon.champion.list)
    .get('/cdn/11.2.1/data/en_US/champion/Xayah.json')
        .reply(200, replyValues.ddragon.champion.details)
    .get('/cdn/11.2.1/data/en_US/item.json')
        .reply(200, replyValues.ddragon.item)
    .get('/cdn/11.2.1/data/en_US/summoner.json')
        .reply(200, replyValues.ddragon.summonerSpells)
    .get('/cdn/11.2.1/data/en_US/profileicon.json')
        .reply(200, replyValues.ddragon.profileIcon)
    .get('/cdn/img/champion/loading/Xayah_0.jpg')
        .reply(200, 'loading')
    .get('/cdn/img/champion/splash/Xayah_0.jpg')
        .reply(200, 'splash')
    .get('/cdn/11.2.1/img/champion/Xayah.png')
        .reply(200, 'championIcon')
    .get('/cdn/11.2.1/img/passive/XayahPassive.png')
        .reply(200, 'passive')
    .get('/cdn/11.2.1/img/spell/XayahR.png')
        .reply(200, 'spell')
    .get('/cdn/11.2.1/img/item/6671.png')
        .reply(200, 'item')
    .get('/cdn/11.2.1/img/profileicon/3560.png')
        .reply(200, 'summonerIcon')
    .get('/cdn/11.2.1/img/map/map11.png')
        .reply(200, 'minimap')
    .get('/cdn/11.2.1/img/sprite/spell0.png')
        .reply(200, 'sprites')
    .get('/cdn/5.5.1/img/ui/champion.png')
        .reply(200, 'scoreboardChampion')
    .get('/cdn/5.5.1/img/ui/items.png')
        .reply(200, 'scoreboardChampion')
    .get('/cdn/5.5.1/img/ui/minion.png')
        .reply(200, 'scoreboardChampion')
    .get('/cdn/5.5.1/img/ui/score.png')
        .reply(200, 'scoreboardChampion')
    .get('/cdn/5.5.1/img/ui/spells.png')
        .reply(200, 'scoreboardChampion')

    

describe('/galeforce/actions', () => {
    describe('Galeforce', () => {
        describe('.lol', () => {
            describe('.summoner()', () => {
                describe('.name()', () => {
                    it('should return correct JSON for the /lol/summoner/v4/summoners/by-name Riot API endpoint', () => {
                        return expect(Galeforce.lol.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).name('SSG Xayah').exec())
                            .to.eventually.deep.equal(replyValues.v4.summoner);
                    });
                    it('should throw when provided an invalid region', () => {
                        return expect(() => Galeforce.lol.summoner().region(Galeforce.regions.riot.AMERICAS))
                            .to.throw('[galeforce]: Invalid /lol region provided.');
                    });
                    it('should throw when not provided a region', () => {
                        return expect(Galeforce.lol.summoner().name('SSG Xayah').exec())
                            .to.eventually.be.rejectedWith('[galeforce]: Action payload region is required but undefined.');
                    });
                    it('should reject with correct error message when receiving a 404 status code', () => {
                        return expect(Galeforce.lol.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).name('404').exec())
                            .to.eventually.be.rejectedWith('[galeforce]: Data fetch failed with status code 404');
                    });
                    it('should reject with correct error message when receiving a 403 status code', () => {
                        return expect(Galeforce.lol.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).name('403').exec())
                            .to.eventually.be.rejectedWith('[galeforce]: The provided Riot API key is invalid or has expired. Please verify its authenticity. (sc-403)');
                    });
                    it('should timeout when rate limit exceeded', () => new Promise((resolve, reject) => {
                        const GaleforceRL = new GaleforceModule('./test/test-configs/1.yaml');
                        let autoTimeout = setTimeout(resolve, 500);
                        GaleforceRL['submodules']['cache'].setex('riotapi-ratelimit-120na1', 120, '4000').then(() => {
                            GaleforceRL.lol.summoner().region(GaleforceRL.regions.lol.NORTH_AMERICA).name('SSG Xayah').exec().then(() => {
                                clearTimeout(autoTimeout);
                                reject(new Error('Rate limiting failed!'));
                            });
                        });
                    }));
                });
                describe('.accountId', () => {
                    it('should return correct JSON for the /lol/summoner/v4/summoners/by-account Riot API endpoint', () => {
                        return expect(Galeforce.lol.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').exec())
                            .to.eventually.deep.equal(replyValues.v4.summoner);
                    });
                    it('should throw when provided an invalid accountId (length check)', () => {
                        return expect(() => Galeforce.lol.summoner().accountId('X'.repeat(100)))
                            .to.throw('[galeforce]: accountId is invalid according to Riot specifications (length > 56).');
                    });
                    it('should throw when provided an invalid accountId (type check)', () => {
                        return expect(() => Galeforce.lol.summoner().accountId(5))
                            .to.throw('[galeforce]: accountId must be a string.');
                    });
                });
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /lol/summoner/v4/summoners Riot API endpoint', () => {
                        return expect(Galeforce.lol.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v4.summoner);
                    });
                    it('should throw when provided an invalid summonerId (length check)', () => {
                        return expect(() => Galeforce.lol.summoner().summonerId('X'.repeat(100)))
                            .to.throw('[galeforce]: summonerId is invalid according to Riot specifications (length > 63).');
                    });
                });
                describe('.puuid()', () => {
                    it('should return correct JSON for the /lol/summoner/v4/summoners/by-puuid Riot API endpoint', () => {
                        return expect(Galeforce.lol.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).puuid('jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g').exec())
                            .to.eventually.deep.equal(replyValues.v4.summoner);
                    });
                    it('should throw when provided an invalid puuid (length check)', () => {
                        return expect(() => Galeforce.lol.summoner().puuid('X'.repeat(100)))
                            .to.throw('[galeforce]: puuid is invalid according to Riot specifications (length > 78).');
                    });
                });
                it('should throw when not provided enough parameters to specify endpoint', () => {
                    return expect(Galeforce.lol.summoner().exec())
                        .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                });
            });
            describe('.league', () => {
                describe('.entries()', () => {
                    describe('.summonerId()', () => {
                        it('should return correct JSON for the /lol/league/v4/entries/by-summoner Riot API endpoint', () => {
                            return expect(Galeforce.lol.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                                .to.eventually.deep.equal(replyValues.v4.league.entriesBySummonerId);
                        });
                    });
                    describe('.queue().tier().division()', () => {
                        it('should return correct JSON for the /lol/league/v4/entries Riot API endpoint', () => {
                            return expect(Galeforce.lol.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).queue(Galeforce.queues.lol.RANKED_SOLO).tier(Galeforce.tiers.DIAMOND).division(Galeforce.divisions.IV).exec())
                                .to.eventually.deep.equal(replyValues.v4.league.diamondIV);
                        });
                        it('should return correct JSON for the /lol/league-exp/v4/entries Riot API endpoint', () => {
                            return expect(Galeforce.lol.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).division(Galeforce.divisions.I).queue(Galeforce.queues.lol.RANKED_SOLO).tier(Galeforce.tiers.MASTER).exec())
                                .to.eventually.deep.equal(replyValues.v4.league.masterExp);
                        });
                        it('should return correct JSON for the /lol/league/v4/entries Riot API endpoint with query', () => {
                            return expect(Galeforce.lol.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).queue(Galeforce.queues.lol.RANKED_SOLO).tier(Galeforce.tiers.GOLD).division(Galeforce.divisions.IV).query({page: 2}).exec())
                                .to.eventually.deep.equal(replyValues.v4.league.diamondIV);
                        });
                        it('should throw when provided an invalid queue', () => {
                            return expect(() => Galeforce.lol.league.entries().queue('invalid queue'))
                                .to.throw('[galeforce]: Invalid /lol queue type provided.');
                        });
                        it('should throw when provided an invalid tier', () => {
                            return expect(() => Galeforce.lol.league.entries().tier('invalid tier'))
                                .to.throw('[galeforce]: Invalid ranked tier provided.');
                        });
                        it('should throw when provided an invalid division', () => {
                            return expect(() => Galeforce.lol.league.entries().division('invalid division'))
                                .to.throw('[galeforce]: Invalid ranked division provided.');
                        });
                    });
                    it('should throw when not provided enough parameters to specify endpoint', () => {
                        return expect(Galeforce.lol.league.entries().exec())
                            .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                    });
                });
                describe('.league()', () => {
                    describe('.leagueId()', () => {
                        it('should return correct JSON for the /lol/league/v4/leagues/ Riot API endpoint', () => {
                            return expect(Galeforce.lol.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).leagueId('df776d6f-4101-4817-a36d-689a4be85887').exec())
                                .to.eventually.deep.equal(replyValues.v4.league.league);
                        });
                    });
                    describe('.queue().tier()', () => {
                        it('should return correct JSON for the /lol/league/v4/challengerleagues/by-queue/ Riot API endpoint', () => {
                            return expect(Galeforce.lol.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).queue(Galeforce.queues.lol.RANKED_SOLO).tier(Galeforce.tiers.CHALLENGER).exec())
                                .to.eventually.deep.equal(replyValues.v4.league.challenger);
                        });
                        it('should return correct JSON for the /lol/league/v4/grandmasterleagues/by-queue/ Riot API endpoint', () => {
                            return expect(Galeforce.lol.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).tier(Galeforce.tiers.GRANDMASTER).queue(Galeforce.queues.lol.RANKED_SOLO).exec())
                                .to.eventually.deep.equal(replyValues.v4.league.grandmaster);
                        });
                        it('should return correct JSON for the /lol/league/v4/masterleagues/by-queue/ Riot API endpoint', () => {
                            return expect(Galeforce.lol.league.league().queue(Galeforce.queues.lol.RANKED_SOLO).tier(Galeforce.tiers.MASTER).region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                                .to.eventually.deep.equal(replyValues.v4.league.master);
                        });
                        it('should throw when provided an invalid tier', () => {
                            return expect(Galeforce.lol.league.league().tier(Galeforce.tiers.DIAMOND).exec())
                                .to.eventually.be.rejectedWith('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.');
                        });
                        it('should reject when .tier() is not chained with .queue()', () => {
                            return expect(Galeforce.lol.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).queue(Galeforce.queues.lol.RANKED_SOLO).exec())
                                .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                        });
                    });
                    it('should throw when not provided enough parameters to specify endpoint', () => {
                        return expect(Galeforce.lol.league.league().exec())
                            .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                    });
                });
            });
            describe('.mastery', () => {
                describe('.summoner()', () => {
                    describe('.summonerId()', () => {
                        it('should return correct JSON for the /lol/champion-mastery/v4/champion-masteries/by-summoner Riot API endpoint', () => {
                            return expect(Galeforce.lol.mastery.list().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                                .to.eventually.deep.equal(replyValues.v4.championMastery.bySummonerId);
                        });
                        describe('.championId()', () => {
                            it('should return correct JSON for the /lol/champion-mastery/v4/champion-masteries/by-summoner/{}/by-champion Riot API endpoint', () => {
                                return expect(Galeforce.lol.mastery.champion().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').championId(498).exec())
                                    .to.eventually.deep.equal(replyValues.v4.championMastery.byChampionId);
                            });
                        });
                    });
                });
                describe('.score()', () => {
                    describe('.summonerId()', () => {
                        it('should return correct JSON for the /lol/champion-mastery/v4/scores/by-summoner/ Riot API endpoint', () => {
                            return expect(Galeforce.lol.mastery.score().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                                .to.eventually.deep.equal(replyValues.v4.championMastery.score);
                        });
                    });
                });
            });
            describe('.match', () => {
                describe('.match()', () => {
                    describe('.matchId()', () => {
                        it('should return correct JSON for the /lol/match/v4/matches Riot API endpoint', () => {
                            return expect(Galeforce.lol.match.match().region(Galeforce.regions.lol.NORTH_AMERICA).matchId('3724412289').exec())
                                .to.eventually.deep.equal(replyValues.v4.match.matchByMatchId);
                        });
                        describe('.tournamentCode()', () => {
                            it('should return correct JSON for the /lol/match/v4/matches/{}/by-tournament-code Riot API endpoint', () => {
                                return expect(Galeforce.lol.match.match().region(Galeforce.regions.lol.NORTH_AMERICA).matchId('3724412289').tournamentCode('1234').exec())
                                    .to.eventually.deep.equal(replyValues.v4.match.matchByMatchId);
                            });
                        });
                    });
                });
                describe('.timeline()', () => {
                    describe('.matchId()', () => {
                        it('should return correct JSON for the /lol/match/v4/timelines/by-match Riot API endpoint', () => {
                            return expect(Galeforce.lol.match.timeline().region(Galeforce.regions.lol.NORTH_AMERICA).matchId('3724412289').exec())
                                .to.eventually.deep.equal(replyValues.v4.match.timelineByMatchId);
                        });
                    });
                });
                describe('.list()', () => {
                    describe('.accountId()', () => {
                        it('should return correct JSON for the /lol/match/v4/matchlists/by-account/ Riot API endpoint', () => {
                            return expect(Galeforce.lol.match.list().region(Galeforce.regions.lol.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').exec())
                                .to.eventually.deep.equal(replyValues.v4.match.matchlistByAccountId);
                        });
                        describe('.query()', () => {
                            it('should return correct JSON for the /lol/match/v4/matchlists/by-account/ Riot API endpoint with query', () => {
                                return expect(Galeforce.lol.match.list().region(Galeforce.regions.lol.NORTH_AMERICA).accountId('accountId').query({ champion: 498, endIndex: 10 }).exec())
                                    .to.eventually.deep.equal(replyValues.v4.match.matchlistFiltered);
                            });
                        })
                    });
                });
                describe('.tournament()', () => {
                    describe('.tournamentCode()', () => {
                        it('should return correct JSON for the /lol/match/v4/matches/by-tournament-code/{}/ids Riot API endpoint', () => {
                            return expect(Galeforce.lol.match.tournament().region(Galeforce.regions.lol.NORTH_AMERICA).tournamentCode('1234').exec())
                                .to.eventually.deep.equal(replyValues.v4.match.matchesByTournament);
                        });
                    });
                });
            });
            describe('.platform', () => {
                describe('.thirdPartyCode()', () => {
                    describe('.summonerId()', () => {
                        it('should return correct JSON for the /lol/platform/v4/third-party-code/by-summoner/ Riot API endpoint', () => {
                            return expect(Galeforce.lol.platform.thirdPartyCode().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                                .to.eventually.deep.equal(replyValues.v4.thirdPartyCode.bySummonerId);
                        });
                    });
                });
            });
            describe('.status', () => {
                describe('.platformData()', () => {
                    it('should return correct JSON for the /lol/status/v4/platform-data Riot API endpoint', () => {
                        return expect(Galeforce.lol.status().region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v4.status);
                    });
                });
            });
            describe('.champion', () => {
                describe('.championRotations()', () => {
                    it('should return correct JSON for the /lol/platform/v3/champion-rotations Riot API endpoint', () => {
                        return expect(Galeforce.lol.platform.championRotations().region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v3.champion);
                    });
                });
            });
            describe('.clash', () => {
                describe('.upcoming()', () => {
                    it('should return correct JSON for the /lol/clash/v1/tournaments Riot API endpoint', () => {
                        return expect(Galeforce.lol.clash.upcoming().region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v1.clash.tournaments.all);
                    });
                    it('should return correct JSON for the /lol/clash/v1/tournaments Riot API endpoint (reversed)', () => {
                        return expect(Galeforce.lol.clash.upcoming().region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v1.clash.tournaments.all);
                    });
                });
                describe('.tournaments()', () => {
                    describe('.tournamentId()', () => {
                        it('should return correct JSON for the /lol/clash/v1/tournaments/{} Riot API endpoint', () => {
                            return expect(Galeforce.lol.clash.tournament().tournamentId(2001).region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                                .to.eventually.deep.equal(replyValues.v1.clash.tournaments.byTournament);
                        });
                    });
                    describe('.teamId()', () => {
                        it('should return correct JSON for the /lol/clash/v1/tournaments/by-team Riot API endpoint', () => {
                            return expect(Galeforce.lol.clash.tournament().teamId('971374dd-d9bd-4ff9-a06d-b21044ba0c92').region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                                .to.eventually.deep.equal(replyValues.v1.clash.tournaments.byTeam);
                        });
                    });
                    it('should throw when not provided enough parameters to specify endpoint', () => {
                        return expect(Galeforce.lol.clash.tournament().exec())
                            .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                    });
                });
                describe('.players()', () => {
                    describe('.summonerId()', () => {
                        it('should return correct JSON for the /lol/clash/v1/players/by-summoner Riot API endpoint', () => {
                            return expect(Galeforce.lol.clash.players().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                                .to.eventually.deep.equal(replyValues.v1.clash.players);
                        });
                    });
                })
                describe('.team()', () => {
                    describe('.teamId()', () => {
                        it('should return correct JSON for the /lol/clash/v1/teams Riot API endpoint', () => {
                            return expect(Galeforce.lol.clash.team().region(Galeforce.regions.lol.NORTH_AMERICA).teamId('971374dd-d9bd-4ff9-a06d-b21044ba0c92').exec())
                                .to.eventually.deep.equal(replyValues.v1.clash.team);
                        });
                    });
                })
            });
            describe('.spectator', () => {
                describe('.active()', () => {
                    describe('.summonerId()', () => {
                        it('should return correct JSON for the /lol/spectator/v4/active-games/by-summoner Riot API endpoint', () => {
                            return expect(Galeforce.lol.spectator.active().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('W0UKG702c2bD7rwhOqZAn-pQ0ggk27_M0WMEVkPDodr-I-g').exec())
                                .to.eventually.deep.equal(replyValues.v4.spectator.active);
                        });
                    });
                });
                describe('.featured()', () => {
                    it('should return correct JSON for the /lol/spectator/v4/featured-games Riot API endpoint', () => {
                        return expect(Galeforce.lol.spectator.featured().region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                            .to.eventually.deep.equal(replyValues.v4.spectator.featured);
                    });
                });
            });
            describe('.tournament', () => {
                describe('.code()', () => {
                    describe('.create()', () => {
                        it('should return correct JSON for the /lol/tournament/v4/codes Riot API endpoint', () => {
                            return expect(Galeforce.lol.tournament.code.create().region(Galeforce.regions.lol.NORTH_AMERICA).body({
                                allowedSummonerIds: ['a','b','c'],
                                metadata: '',
                                teamSize: 5,
                                pickType: 'TOURNAMENT_DRAFT',
                                mapType: 'SUMMONERS_RIFT',
                                spectatorType: 'NONE',
                            }).query({tournamentId: 1234}).exec())
                                .to.eventually.deep.equal(['a','b']);
                        });
                        it('should reject when not provided a query with a tournamentId parameter', () => {
                            return expect(Galeforce.lol.tournament.code.create().region(Galeforce.regions.lol.NORTH_AMERICA).body({
                                allowedSummonerIds: ['a','b','c'],
                                metadata: '',
                                teamSize: 5,
                                pickType: 'TOURNAMENT_DRAFT',
                                mapType: 'SUMMONERS_RIFT',
                                spectatorType: 'NONE',
                            }).exec())
                                .to.eventually.be.rejectedWith('[galeforce]: POST to /lol/tournament/v4/codes requires a query with a tournamentId parameter.');
                        });
                        it('should reject when not provided a request body', () => {
                            return expect(Galeforce.lol.tournament.code.create().region(Galeforce.regions.lol.NORTH_AMERICA).query({tournamentId: 1234}).exec())
                                .to.eventually.be.rejectedWith('[galeforce]: Action payload body is required but undefined.');
                        });
                    });
                    describe('.update()', () => {
                        it('should return correct JSON for the /lol/tournament/v4/codes/{tournamentCode} Riot API endpoint', () => {
                            return expect(Galeforce.lol.tournament.code.update().region(Galeforce.regions.lol.NORTH_AMERICA).tournamentCode('1234').body({
                                allowedSummonerIds: ['a','b','c'],
                                pickType: 'TOURNAMENT_DRAFT',
                                mapType: 'SUMMONERS_RIFT',
                                spectatorType: 'NONE',
                            }).exec())
                                .to.eventually.deep.equal('');
                        });
                        it('should reject when not provided a request body', () => {
                            return expect(Galeforce.lol.tournament.code.update().region(Galeforce.regions.lol.NORTH_AMERICA).tournamentCode('1234').exec())
                                .to.eventually.be.rejectedWith('[galeforce]: Action payload body is required but undefined.');
                        });
                    });
                    describe('.get()', () => {
                        it('should return correct JSON for the /lol/tournament/v4/codes/{tournamentCode} Riot API endpoint', () => {
                            return expect(Galeforce.lol.tournament.code.get().region(Galeforce.regions.lol.NORTH_AMERICA).tournamentCode('1234').exec())
                                .to.eventually.deep.equal(replyValues.v4.tournament.codes);
                        });
                    });
                });
                describe('.event()', () => {
                    describe('.tournamentCode()', () => {
                        it('should return correct JSON for the /lol/tournament/v4/lobby-events/by-code Riot API endpoint', () => {
                            return expect(Galeforce.lol.tournament.event().region(Galeforce.regions.lol.NORTH_AMERICA).tournamentCode('1234').exec())
                                .to.eventually.deep.equal(replyValues.v4.tournament.events);
                        });
                    });
                });
                describe('.provider()', () => {
                    it('should return correct JSON for the /lol/tournament/v4/providers Riot API endpoint', () => {
                        return expect(Galeforce.lol.tournament.provider().region(Galeforce.regions.lol.NORTH_AMERICA).body({
                            region: 'NA',
                            url: 'https://example.com',
                        }).exec())
                            .to.eventually.deep.equal(1);
                    });
                });
                describe('.tournament()', () => {
                    it('should return correct JSON for the /lol/tournament/v4/tournaments Riot API endpoint', () => {
                        return expect(Galeforce.lol.tournament.tournament().region(Galeforce.regions.lol.NORTH_AMERICA).body({
                            providerId: 10,
                            name: 'name',
                        }).exec())
                            .to.eventually.deep.equal(2);
                    });
                });
            });
        });
        describe('.riot', () => {
            describe('.account', () => {
                describe('.account()', () => {
                    describe('.puuid()', () => {
                        it('should return correct JSON for the /riot/account/v1/accounts/by-puuid/ Riot API endpoint', () => {
                            return expect(Galeforce.riot.account.account().region(Galeforce.regions.riot.AMERICAS).puuid('jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g').exec())
                                .to.eventually.deep.equal(replyValues.v1.account.account);
                        });
                        it('should throw when provided an invalid region', () => {
                            return expect(() => Galeforce.riot.account.account().region(Galeforce.regions.lol.NORTH_AMERICA))
                                .to.throw('[galeforce]: Invalid /riot region provided.')
                        });
                    });
                    describe('.gameName().tagLine()', () => {
                        it('should return correct JSON for the /riot/account/v1/accounts/by-riot-id/ Riot API endpoint', () => {
                            return expect(Galeforce.riot.account.account().region(Galeforce.regions.riot.AMERICAS).gameName('SSG Xayah').tagLine('NA1').exec())
                                .to.eventually.deep.equal(replyValues.v1.account.account);
                        });
                        it('should reject when .gameName() is not chained with .tagLine()', () => {
                            return expect(Galeforce.riot.account.account().region(Galeforce.regions.riot.AMERICAS).gameName(Galeforce.games.VALORANT).exec())
                                .to.eventually.be.rejectedWith('[galeforce]: .gameName() must be chained with .tagLine().')
                        });
                    });
                    it('should throw when not provided enough parameters to specify endpoint', () => {
                        return expect(Galeforce.riot.account.account().exec())
                                .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                    });
                });
                describe('.activeShard()', () => {
                    it('should return correct JSON for the /riot/account/v1/active-shards Riot API endpoint', () => {
                        return expect(Galeforce.riot.account.activeShard().region(Galeforce.regions.riot.AMERICAS).game(Galeforce.games.VALORANT).puuid('jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g').exec())
                            .to.eventually.deep.equal(replyValues.v1.account.activeShard);
                    });
                    it('should throw when provided an invalid game', () => {
                        return expect(() => Galeforce.riot.account.activeShard().game('invalid game'))
                            .to.throw('[galeforce]: Invalid game provided.');
                    });
                });
            });
        });
        describe('.lor', () => {
            describe('.match', () => {
                describe('.match()', () => {
                    describe('.matchId()', () => {
                        it('should return correct JSON for the /lor/match/v1/matches endpoint', () => {
                            return expect(Galeforce.lor.match.match().region(Galeforce.regions.riot.AMERICAS).matchId('99e64d40-b729-419a-843f-14f750675d13').exec())
                                .to.eventually.deep.equal(replyValues.v1.lorMatch.match);
                        });
                    });
                });
                describe('.list()', () => {
                    describe('.puuid()', () => {
                        it('should return correct JSON for the /lor/match/v1/matches/by-puuid/{puuid}/ids endpoint', () => {
                            return expect(Galeforce.lor.match.list().region(Galeforce.regions.riot.AMERICAS).puuid('jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g').exec())
                                .to.eventually.deep.equal(replyValues.v1.lorMatch.matchlist);
                        });
                    });
                });
            });
            describe('.ranked', () => {
                describe('.leaderboard()', () => {
                    it('should return correct JSON for the /lor/ranked/v1/leaderboards endpoint', () => {
                        return expect(Galeforce.lor.ranked.leaderboard().region(Galeforce.regions.riot.AMERICAS).exec())
                            .to.eventually.deep.equal(replyValues.v1.lorRanked.leaderboards);
                    });
                });
            });
            describe('.status', () => {
                describe('.platformData()', () => {
                    it('should return correct JSON for the /lor/status/v1/platform-data endpoint', () => {
                        return expect(Galeforce.lor.status().region(Galeforce.regions.riot.AMERICAS).exec())
                            .to.eventually.deep.equal(replyValues.v1.lorStatus.platformData);
                    });
                });
            });
        });
        describe('.tft', () => {
            describe('.league', () => {
                describe('.entries()', () => {
                    describe('.summonerId()', () => {
                        it('should return correct JSON for the /lol/league/v4/entries/by-summoner Riot API endpoint', () => {
                            return expect(Galeforce.tft.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('fOD4gGvxJG-_Bfcj7tqmHxYKAmbtOqoZrMz-Dk0ayGXulb7x').exec())
                                .to.eventually.deep.equal(replyValues.v1.tftLeague.entriesBySummonerId);
                        });
                    });
                    describe('.tier().division()', () => {
                        it('should return correct JSON for the /lol/league/v4/entries Riot API endpoint', () => {
                            return expect(Galeforce.tft.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).tier(Galeforce.tiers.DIAMOND).division(Galeforce.divisions.IV).exec())
                                .to.eventually.deep.equal(replyValues.v1.tftLeague.diamondIV);
                        });
                        it('should return correct JSON for the /lol/league/v4/entries Riot API endpoint with query', () => {
                            return expect(Galeforce.tft.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).tier(Galeforce.tiers.GOLD).division(Galeforce.divisions.IV).query({page: 3}).exec())
                                .to.eventually.deep.equal(replyValues.v1.tftLeague.diamondIV);
                        });
                        it('should throw when provided an invalid tier', () => {
                            return expect(() => Galeforce.tft.league.entries().tier('invalid tier'))
                                .to.throw('[galeforce]: Invalid ranked tier provided.');
                        });
                        it('should throw when provided an apex tier', () => {
                            return expect(Galeforce.tft.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).tier(Galeforce.tiers.MASTER).exec())
                                .to.eventually.be.rejectedWith('[galeforce]: /tft/league/v1/entries does not currently support the apex tiers.');
                        });
                        it('should throw when provided an invalid division', () => {
                            return expect(() => Galeforce.tft.league.entries().region(Galeforce.regions.lol.NORTH_AMERICA).division('invalid division'))
                                .to.throw('[galeforce]: Invalid ranked division provided.');
                        });
                    });
                    it('should throw when not provided enough parameters to specify endpoint', () => {
                        return expect(Galeforce.tft.league.entries().exec())
                            .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                    });
                });
                describe('.league()', () => {
                    describe('.leagueId()', () => {
                        it('should return correct JSON for the /tft/league/v1/leagues Riot API endpoint', () => {
                            return expect(Galeforce.tft.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).leagueId('560312d9-a701-411c-b63c-474fdf46ea52').exec())
                                .to.eventually.deep.equal(replyValues.v1.tftLeague.league);
                        });
                    });
                    describe('.queue().tier()', () => {
                        it('should return correct JSON for the /tft/league/v1/challenger Riot API endpoint', () => {
                            return expect(Galeforce.tft.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).tier(Galeforce.tiers.CHALLENGER).exec())
                                .to.eventually.deep.equal(replyValues.v1.tftLeague.challenger);
                        });
                        it('should return correct JSON for the /tft/league/v1/grandmaster Riot API endpoint', () => {
                            return expect(Galeforce.tft.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).tier(Galeforce.tiers.GRANDMASTER).exec())
                                .to.eventually.deep.equal(replyValues.v1.tftLeague.grandmaster);
                        });
                        it('should return correct JSON for the /tft/league/v1/master Riot API endpoint', () => {
                            return expect(Galeforce.tft.league.league().tier(Galeforce.tiers.MASTER).region(Galeforce.regions.lol.NORTH_AMERICA).exec())
                                .to.eventually.deep.equal(replyValues.v1.tftLeague.master);
                        });
                        it('should throw when provided an invalid tier', () => {
                            return expect(Galeforce.tft.league.league().region(Galeforce.regions.lol.NORTH_AMERICA).tier(Galeforce.tiers.DIAMOND).exec())
                                .to.eventually.be.rejectedWith('[galeforce]: .tier() must be CHALLENGER, GRANDMASTER, or MASTER.');
                        });
                    });
                    it('should throw when not provided enough parameters to specify endpoint', () => {
                        return expect(Galeforce.tft.league.league().exec())
                            .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                    });
                });
            });
            describe('.match', () => {
                describe('.match()', () => {
                    describe('.matchId()', () => {
                        it('should return correct JSON for the /tft/match/v1/matches endpoint', () => {
                            return expect(Galeforce.tft.match.match().region(Galeforce.regions.riot.AMERICAS).matchId('NA1_3701236130').exec())
                                .to.eventually.deep.equal(replyValues.v1.tftMatch.match);
                        });
                    });
                });
                describe('.list()', () => {
                    describe('.puuid()', () => {
                        it('should return correct JSON for the /tft/match/v1/matches/by-puuid/{puuid}/ids endpoint', () => {
                            return expect(Galeforce.tft.match.list().region(Galeforce.regions.riot.AMERICAS).puuid('E5oZTZY5yXPsNAAz-tI2G5ImSD19NLnmw7ApUGxGArns2L2XZmjptRpAWR5PfFiNHp4cv4__Oljing').exec())
                                .to.eventually.deep.equal(replyValues.v1.tftMatch.matchlist);
                        });
                        it('should return correct JSON for the /tft/match/v1/matches/by-puuid/{puuid}/ids endpoint with query', () => {
                            return expect(Galeforce.tft.match.list().region(Galeforce.regions.riot.AMERICAS).puuid('puuid').query({count: 5}).exec())
                                .to.eventually.deep.equal(replyValues.v1.tftMatch.matchlist);
                        });
                    });
                });
            });
            describe('.summoner()', () => {
                describe('.name()', () => {
                    it('should return correct JSON for the /tft/summoner/v1/summoners/by-name Riot API endpoint', () => {
                        return expect(Galeforce.tft.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).name('SSG Xayah').exec())
                            .to.eventually.deep.equal(replyValues.v1.tftSummoner);
                    });
                });
                describe('.accountId', () => {
                    it('should return correct JSON for the /tft/summoner/v1/summoners/by-account Riot API endpoint', () => {
                        return expect(Galeforce.tft.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).accountId('xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4').exec())
                            .to.eventually.deep.equal(replyValues.v1.tftSummoner);
                    });
                });
                describe('.summonerId()', () => {
                    it('should return correct JSON for the /tft/summoner/v1/summoners Riot API endpoint', () => {
                        return expect(Galeforce.tft.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).summonerId('l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w').exec())
                            .to.eventually.deep.equal(replyValues.v1.tftSummoner);
                    });
                });
                describe('.puuid()', () => {
                    it('should return correct JSON for the /tft/summoner/v1/summoners/by-puuid Riot API endpoint', () => {
                        return expect(Galeforce.tft.summoner().region(Galeforce.regions.lol.NORTH_AMERICA).puuid('jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g').exec())
                            .to.eventually.deep.equal(replyValues.v1.tftSummoner);
                    });
                });
                it('should throw when not provided enough parameters to specify endpoint', () => {
                    return expect(Galeforce.tft.summoner().exec())
                        .to.eventually.be.rejectedWith('[galeforce]: Not enough parameters provided to select API endpoint.')
                });
            });
        });
        describe('.val', () => {
            describe('.content()', () => {
                it('should return correct JSON for the /val/content/v1/contents Riot API endpoint', () => {
                    return expect(Galeforce.val.content().region(Galeforce.regions.val.NORTH_AMERICA).exec())
                        .to.eventually.deep.equal(replyValues.v1.valContent.all);
                });
                describe('.query()', () => {
                    it('should return correct JSON for the /val/content/v1/contents?locale Riot API endpoint', () => {
                        return expect(Galeforce.val.content().region(Galeforce.regions.val.NORTH_AMERICA).query({locale: 'ja-JP'}).exec())
                            .to.eventually.deep.equal(replyValues.v1.valContent.locale);
                    });
                });
            });
            describe('.match', () => {
                describe('.match()', () => {
                    it('should return correct JSON for the /val/match/v1/matches Riot API endpoint', () => {
                        return expect(Galeforce.val.match.match().region(Galeforce.regions.val.NORTH_AMERICA).matchId('1234').exec())
                            .to.eventually.deep.equal(replyValues.v1.valMatch.match);
                    });
                });
                describe('.list()', () => {
                    it('should return correct JSON for the /val/match/v1/matches Riot API endpoint', () => {
                        return expect(Galeforce.val.match.list().region(Galeforce.regions.val.NORTH_AMERICA).puuid('puuid').exec())
                            .to.eventually.deep.equal(replyValues.v1.valMatch.matchlist);
                    });
                });
                describe('.recent()', () => {
                    it('should return correct JSON for the /val/match/v1/matches Riot API endpoint', () => {
                        return expect(Galeforce.val.match.recent().region(Galeforce.regions.val.NORTH_AMERICA).queue(Galeforce.queues.val.COMPETITIVE).exec())
                            .to.eventually.deep.equal(replyValues.v1.valMatch.recent);
                    });
                    it('should throw when provided an invalid queue type', () => {
                        return expect(() => Galeforce.val.match.recent().region(Galeforce.regions.val.NORTH_AMERICA).queue(Galeforce.queues.lol.RANKED_SOLO))
                            .to.throw('[galeforce]: Invalid /val queue type provided.');
                    });
                });
            });
            describe('.ranked', () => {
                describe('.leaderboard()', () => {
                    it('should return correct JSON for the /val/ranked/v1/leaderboards/by-act Riot API endpoint', () => {
                        return expect(Galeforce.val.ranked.leaderboard().region(Galeforce.regions.val.NORTH_AMERICA).actId('97b6e739-44cc-ffa7-49ad-398ba502ceb0').exec())
                            .to.eventually.deep.equal(replyValues.v1.valRanked.leaderboard);
                    });
                    describe('.query()', () => {
                        it('should return correct JSON for the /val/ranked/v1/leaderboards/by-act Riot API endpoint with query', () => {
                            return expect(Galeforce.val.ranked.leaderboard().region(Galeforce.regions.val.NORTH_AMERICA).actId('actId').query({size: 10, startIndex: 5}).exec())
                                .to.eventually.deep.equal(replyValues.v1.valRanked.leaderboard);
                        });
                    });
                });
            });
            describe('.status()', () => {
                it('should return correct JSON for the /val/status/v1/platform-data Riot API endpoint', () => {
                    return expect(Galeforce.val.status().region(Galeforce.regions.val.NORTH_AMERICA).exec())
                        .to.eventually.deep.equal(replyValues.v1.valStatus.platformData);
                });
                it('should throw when provided an invalid region', () => {
                    return expect(() => Galeforce.val.status().region(Galeforce.regions.lol.NORTH_AMERICA))
                        .to.throw('[galeforce]: Invalid /val region provided.');
                });
            });
        });
    });
    describe('.ddragon', () => {
        describe('.tail()', () => {
            it('should pull JSON from the appropriate Data Dragon URL', () => {
                return expect(Galeforce.ddragon.tail().version('11.2.1').exec())
                    .to.eventually.be.a('string');
            });
            it('should pull JSON from the appropriate Data Dragon URL', () => {
                return expect(Galeforce.ddragon.tail().version('10.10.5').exec())
                    .to.eventually.be.a('string');
            });
        });
        describe('.versions()', () => {
            it('should pull JSON from the appropriate Data Dragon URL', () => {
                return expect(Galeforce.ddragon.versions().exec())
                    .to.eventually.be.a('Array');
            });
        });
        describe('.realm()', () => {
            describe('.region()', () => {
                it('should pull JSON from the appropriate Data Dragon URL', () => {
                    return expect(Galeforce.ddragon.realm().region(Galeforce.regions.ddragon.NORTH_AMERICA).exec())
                        .to.eventually.have.property('n');
                });
                it('should throw when provided an invalid region', () => {
                    return expect(() => Galeforce.ddragon.realm().region(Galeforce.regions.lol.NORTH_AMERICA))
                        .to.throw('[galeforce]: Invalid Data Dragon region provided.');
                });
            });
        });
        describe('.languages()', () => {
            it('should pull JSON from the appropriate Data Dragon URL', () => {
                return expect(Galeforce.ddragon.languages().exec())
                    .to.eventually.be.a('Array');
            });
        });
        describe('.champion', () => {
            describe('.list()', () => {
                describe('.version().locale()', () => {
                    it('should pull JSON from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.champion.list().version('11.2.1').locale('en_US').exec())
                            .to.eventually.have.property('data');
                    });
                    it('should throw when provided an invalid version (not string)', () => {
                        return expect(() => Galeforce.ddragon.champion.list().version(100))
                            .to.throw('[galeforce]: version must be a string.');
                    });
                    it('should throw when provided an invalid version (fails regex check)', () => {
                        return expect(() => Galeforce.ddragon.champion.list().version('1.4.5.a'))
                            .to.throw('[galeforce]: Invalid version provided (failed regex check).');
                    });
                    it('should throw when provided an invalid locale (not string)', () => {
                        return expect(() => Galeforce.ddragon.champion.list().locale(100))
                            .to.throw('[galeforce]: locale must be a string.');
                    });
                    it('should throw when provided an invalid locale (fails regex check)', () => {
                        return expect(() => Galeforce.ddragon.champion.list().locale('abc_US'))
                            .to.throw('[galeforce]: Invalid locale provided (failed regex check).');
                    });
                });
            });
            describe('.details()', () => {
                describe('.version().locale().champion()', () => {
                    it('should pull JSON from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.champion.details().version('11.2.1').locale('en_US').champion('Xayah').exec())
                            .to.eventually.have.property('data');
                    });
                });
            });
            describe('.art', () => {
                describe('.splash()', () => {
                    describe('.champion().skin()', () => {
                        it('should pull image from the appropriate Data Dragon URL', () => {
                            return expect(Galeforce.ddragon.champion.art.splash().champion('Xayah').skin(0).exec())
                                .to.eventually.be.a('string');
                        });
                    });
                });
                describe('.loading()', () => {
                    describe('.champion().skin()', () => {
                        it('should pull image from the appropriate Data Dragon URL', () => {
                            return expect(Galeforce.ddragon.champion.art.loading().champion('Xayah').skin(0).exec())
                                .to.eventually.be.a('string');
                        });
                    });
                });
                describe('.icon()', () => {
                    describe('.version().champion()', () => {
                        it('should pull image from the appropriate Data Dragon URL', () => {
                            return expect(Galeforce.ddragon.champion.art.icon().version('11.2.1').champion('Xayah').exec())
                                .to.eventually.be.a('string');
                        });
                    });
                });
                describe('.passive()', () => {
                    describe('.version().spell()', () => {
                        it('should pull image from the appropriate Data Dragon URL', () => {
                            return expect(Galeforce.ddragon.champion.art.passive().version('11.2.1').spell('XayahPassive').exec())
                                .to.eventually.be.a('string');
                        });
                    });
                });
            });
        });
        describe('.spell', () => {
            describe('.art()', () => {
                describe('.version().spell()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.spell.art().version('11.2.1').spell('XayahR').exec())
                            .to.eventually.be.a('string');
                    });
                });
            });
        });
        describe('.item', () => {
            describe('.list()', () => {
                describe('.version().locale()', () => {
                    it('should pull JSON from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.item.list().version('11.2.1').locale('en_US').exec())
                            .to.eventually.have.property('data');
                    });
                });
            });
            describe('.art()', () => {
                describe('.version().assetId()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.item.art().version('11.2.1').assetId(6671).exec())
                            .to.eventually.be.a('string');
                    });
                });
            });
        });
        describe('.summonerSpell', () => {
            describe('.list()', () => {
                describe('.version().locale()', () => {
                    it('should pull JSON from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.summonerSpell.list().version('11.2.1').locale('en_US').exec())
                            .to.eventually.have.property('data');
                    });
                });
            });
        });
        describe('.item', () => {
            describe('.list()', () => {
                describe('.version().locale()', () => {
                    it('should pull JSON from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.profileIcon.list().version('11.2.1').locale('en_US').exec())
                            .to.eventually.have.property('data');
                    });
                });
            });
            describe('.art()', () => {
                describe('.version().assetId()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.profileIcon.art().version('11.2.1').assetId(3560).exec())
                            .to.eventually.be.a('string');
                    });
                });
            });
        });
        describe('.minimap', () => {
            describe('.art()', () => {
                describe('.version().assetId()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.minimap.art().version('11.2.1').assetId(11).exec())
                            .to.eventually.be.a('string');
                    });
                });
            });
        });
        describe('.sprite', () => {
            describe('.art()', () => {
                describe('.version().assetId()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.sprite.art().version('11.2.1').assetId(0).exec())
                            .to.eventually.be.a('string');
                    });
                });
            });
        });
        describe('.scoreboard', () => {
            describe('.art', () => {
                describe('.champion()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.scoreboard.art.champion().exec())
                            .to.eventually.be.a('string');
                    });
                });
                describe('.items()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.scoreboard.art.items().exec())
                            .to.eventually.be.a('string');
                    });
                });
                describe('.minion()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.scoreboard.art.minion().exec())
                            .to.eventually.be.a('string');
                    });
                });
                describe('.score()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.scoreboard.art.score().exec())
                            .to.eventually.be.a('string');
                    });
                });
                describe('.spells()', () => {
                    it('should pull image from the appropriate Data Dragon URL', () => {
                        return expect(Galeforce.ddragon.scoreboard.art.spells().exec())
                            .to.eventually.be.a('string');
                    });
                });
            });
        });
    });
});