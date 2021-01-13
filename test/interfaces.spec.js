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
            it('should match with /lol/status/v4/platform-data JSON data', () => {
                const schema = generator.getSchemaForSymbol('PlatformDataInterface');
                // Manually edit schema to match interface
                schema.definitions['StatusInterface'].properties['maintenance_status'].type = ['string', 'null'];
                schema.definitions['StatusInterface'].properties['maintenance_status'].enum.push(null);
                schema.definitions['StatusInterface'].properties['archive_at'].type = ['string', 'null'];
                schema.definitions['StatusInterface'].properties['updated_at'].type = ['string', 'null'];

                const validate = ajv.compile(schema);
                let valid = validate(require('./test-json/v4.lol-status.platform-data.json'));
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
    });
});