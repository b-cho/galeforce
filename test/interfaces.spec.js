const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const TJS = require('typescript-json-schema');
const { resolve } = require('path');
const Ajv = require('ajv').default;

chai.use(chaiAsPromised);
const expect = chai.expect;

const program = TJS.getProgramFromFiles([resolve('./src/sightstone/interfaces/dto.ts')]);
const generator = TJS.buildGenerator(program, { required: true });

const ajv = new Ajv();

describe('/sightstone/interfaces', () => {
    describe('SummonerInterface', () => {
        it('should match with /summoner/v4/summoners JSON data (using JSON schema)', () => {
            const schema = generator.getSchemaForSymbol('SummonerInterface');
            const validate = ajv.compile(schema);
            let valid = validate(require('./test-json/v4.summoner.by-name.json'));
            if(!valid) throw validate.errors;
            expect(valid).to.be.true;
        });
    });
    describe('MatchInterface', () => {
        it('should match with /match/v4/matches JSON data (using JSON schema)', () => {
            const schema = generator.getSchemaForSymbol('MatchInterface');
            const validate = ajv.compile(schema);
            let valid = validate(require('./test-json/v4.match.match.by-match.json'));
            if(!valid) throw validate.errors;
            expect(valid).to.be.true;
        });
    });
    describe('MatchTimelineInterface', () => {
        it('should match with /match/v4/timelines/by-match JSON data (using JSON schema)', () => {
            const schema = generator.getSchemaForSymbol('MatchTimelineInterface');
            const validate = ajv.compile(schema);
            let valid = validate(require('./test-json/v4.match.timeline.by-match.json'));
            if(!valid) throw validate.errors;
            expect(valid).to.be.true;
        });
    });
    describe('MatchlistInterface', () => {
        it('should match with /match/v4/matchlists/by-account/ JSON data (using JSON schema)', () => {
            const schema = generator.getSchemaForSymbol('MatchlistInterface');
            const validate = ajv.compile(schema);
            let valid = validate(require('./test-json/v4.match.matchlist.by-account.json'));
            if(!valid) throw validate.errors;
            expect(valid).to.be.true;
        });
    })
    describe('LeagueEntryInterface', () => {
        it('should match with /league/v4/entries/by-summoner JSON data (using JSON schema)', () => {
            const schema = generator.getSchemaForSymbol('LeagueEntryInterface');
            const validate = ajv.compile(schema);
            let valid = validate(require('./test-json/v4.league.entries.by-summoner-id.json')[0]);
            if(!valid) throw validate.errors;
            expect(valid).to.be.true;
        });
    });
    describe('ChampionMasteryInterface', () => {
        it('should match with /champion-mastery/v4/champion-masteries/by-summoner JSON data (using JSON schema)', () => {
            const schema = generator.getSchemaForSymbol('ChampionMasteryInterface');
            const validate = ajv.compile(schema);
            let valid = validate(require('./test-json/v4.champion-mastery.by-summoner.json')[0]);
            if(!valid) throw validate.errors;
            expect(valid).to.be.true;
        });
    });
});