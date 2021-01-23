const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TJS = require('typescript-json-schema');
const { resolve } = require('path');
const Ajv = require('ajv').default;

chai.use(chaiAsPromised);
const expect = chai.expect;

const program = TJS.getProgramFromFiles([resolve('./src/galeforce/interfaces/dto.ts')]);
const generator = TJS.buildGenerator(program, { required: true });

const ajv = new Ajv();

describe('/galeforce/interfaces', () => {
    describe('DTO verification (using JSON schema)', () => {
        describe('SummonerInterface', () => {
            it('should match with /lol/summoner/v4/summoners JSON data', () => {
                const schema = generator.getSchemaForSymbol('SummonerInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.summoner.by-name.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /lol/tft-summoner/v1/summoners JSON data', () => {
                const schema = generator.getSchemaForSymbol('SummonerInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.tft-summoner.by-name.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('MatchInterface', () => {
            it('should match with /lol/match/v4/matches JSON data', () => {
                const schema = generator.getSchemaForSymbol('MatchInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.match.match.by-match.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('MatchTimelineInterface', () => {
            it('should match with /lol/match/v4/timelines/by-match JSON data', () => {
                const schema = generator.getSchemaForSymbol('MatchTimelineInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.match.timeline.by-match.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('MatchlistInterface', () => {
            it('should match with /lol/match/v4/matchlists/by-account/ JSON data', () => {
                const schema = generator.getSchemaForSymbol('MatchlistInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.match.matchlist.by-account.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        })
        describe('LeagueEntryInterface', () => {
            it('should match with /lol/league/v4/entries/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueEntryInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.league.entries.by-summoner-id.json')[0]);
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /lol/league/v4/entries/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueEntryInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.tft-league.entries.by-summoner-id.json')[0]);
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LeagueListInterface', () => {
            it('should match with /lol/league/v4/challengerleagues/by-queue/{queue} JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueListInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.league.challenger.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /tft/league/v1/challenger JSON data', () => {
                const schema = generator.getSchemaForSymbol('LeagueListInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.tft-league.challenger.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ChampionMasteryInterface', () => {
            it('should match with /lol/champion-mastery/v4/champion-masteries/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('ChampionMasteryInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.champion-mastery.by-summoner.json')[0]);
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('PlatformDataInterface', () => {
            const schema = generator.getSchemaForSymbol('PlatformDataInterface');
            // Manually edit schema to match interface
            schema.definitions['StatusInterface'].properties['maintenance_status'].type = ['string', 'null'];
            schema.definitions['StatusInterface'].properties['maintenance_status'].enum.push(null);
            schema.definitions['StatusInterface'].properties['archive_at'].type = ['string', 'null'];
            schema.definitions['StatusInterface'].properties['updated_at'].type = ['string', 'null'];

            it('should match with /lol/status/v4/platform-data JSON data', () => {
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.lol-status.platform-data.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /lor/status/v1/platform-data JSON data', () => {
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.lor-status.platform-data.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /val/status/v1/platform-data JSON data', () => {
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.val-status.platform-data.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ChampionInfoInterface', () => {
            it('should match with /lol/platform/v3/champion-rotations JSON data', () => {
                const schema = generator.getSchemaForSymbol('ChampionInfoInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v3.champion.champion-rotations.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('PlayerInterface', () => {
            it('should match with /lol/clash/v1/players/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('PlayerInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.clash.players.json')[0]);
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TeamInterface', () => {
            it('should match with /lol/clash/v1/teams JSON data', () => {
                const schema = generator.getSchemaForSymbol('TeamInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.clash.teams.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TournamentInterface', () => {
            it('should match with /lol/clash/v1/tournaments JSON data', () => {
                const schema = generator.getSchemaForSymbol('TournamentInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.clash.tournaments.all.json')[0]);
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('CurrentGameInfoInterface', () => {
            it('should match with /lol/spectator/v4/active-games/by-summoner JSON data', () => {
                const schema = generator.getSchemaForSymbol('CurrentGameInfoInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.spectator.active.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('FeaturedGamesInterface', () => {
            it('should match with /lol/spectator/v4/featured-games JSON data', () => {
                const schema = generator.getSchemaForSymbol('FeaturedGamesInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.spectator.featured.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('AccountInterface', () => {
            it('should match with /riot/account/v1/accounts JSON data', () => {
                const schema = generator.getSchemaForSymbol('AccountInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.account.accounts.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ActiveShardInterface', () => {
            it('should match with /riot/account/v1/active-shards JSON data', () => {
                const schema = generator.getSchemaForSymbol('ActiveShardInterface');
                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.account.active-shards.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LobbyEventInterfaceWrapper', () => {
            it('should match with /lol/tournament/v4/lobby-events/by-code JSON data', () => {
                const schema = generator.getSchemaForSymbol('LobbyEventInterfaceWrapper');
                schema.definitions['LobbyEventInterface'].properties['summonerId'].type = ['string', 'null']; // Override schema type

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.tournament.lobby-events.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TournamentCodeInterface', () => {
            it('should match with /lol/tournament/v4/codes/{tournamentCode} JSON data', () => {
                const schema = generator.getSchemaForSymbol('TournamentCodeInterface');

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.tournament.codes.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LorMatchInterface', () => {
            it('should match with /lor/match/v1/matches/{matchId} JSON data', () => {
                const schema = generator.getSchemaForSymbol('LorMatchInterface');

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.lor-match.match.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('LorLeaderboardInterface', () => {
            it('should match with /lor/ranked/v1/leaderboards JSON data', () => {
                const schema = generator.getSchemaForSymbol('LorLeaderboardInterface');

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.lor-ranked.leaderboards.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('TFTMatchInterface', () => {
            it('should match with /tft/match/v1/matches/{matchId} JSON data', () => {
                const schema = generator.getSchemaForSymbol('TFTMatchInterface');

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.tft-match.match.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ValContentInterface', () => {
            it('should match with /val/content/v1/contents JSON data', () => {
                const schema = generator.getSchemaForSymbol('ValContentInterface');

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.val-content.contents.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
            it('should match with /val/content/v1/contents?locale JSON data', () => {
                const schema = generator.getSchemaForSymbol('ValContentInterface');

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.val-content.locale.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
        describe('ValLeaderboardInterface', () => {
            it('should match with /val/ranked/v1/leaderboards/by-act JSON data', () => {
                const schema = generator.getSchemaForSymbol('ValLeaderboardInterface');

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v1.val-ranked.leaderboards.json'));
                if(!valid) throw validate.errors;
                expect(valid).to.be.true;
            });
        });
    });
});