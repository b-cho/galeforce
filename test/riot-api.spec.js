const chai = require('chai');
const nock = require('nock');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;

const { RiotAPIModule } = require('../dist/riot-api');
const { ENDPOINTS, LeagueRegion } = require('../dist/riot-api');

const v4SummonerByNameReply = {
    id: 'l3ZbR4AKKKK47w170ZOqcu7kmSV2qb38RV7zK_4n1GucI0w',
    accountId: 'xG5uPpEaSFc8LvOmi4wIumQZHbTlI6WJqECcgsW-_qu_BG4',
    puuid: 'jkxCVExyvEawqoKz-BfIgcvOyT4z8YbYmRSISvxObtrq-JAfX8mCJ4OpEvQ_b9aHJRLZ-NNIfhHr8g',
    name: 'SSG Xayah',
    profileIconId: 4851,
    revisionDate: 1609317629000,
    summonerLevel: 138,
};

const na1API = nock('https://na1.api.riotgames.com')
    .persist()
    .get('/lol/summoner/v4/summoners/by-name/SSG%20Xayah')
    .reply(200, v4SummonerByNameReply);

const RiotAPI = new RiotAPIModule({ key: 'RIOT-API-KEY' });

describe('/riot-api', () => {
    it('should initialize correctly', () => {
        expect(RiotAPI.key).to.equal('RIOT-API-KEY');
    });
    describe('URL generation', () => {
        it('should generate correct RiotAPI.request URLs from template strings', () => {
            expect(RiotAPI.request(ENDPOINTS.SUMMONER.SUMMONER_NAME, { region: LeagueRegion.NORTH_AMERICA, summonerName: 'TEST' }).targetURL)
                .to.equal('https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/TEST');
        });
        it('should throw when a required parameter is missing', () => {
            expect(() => RiotAPI.request(ENDPOINTS.SUMMONER.SUMMONER_NAME, { region: LeagueRegion.NORTH_AMERICA }))
                .to.throw('[galeforce]: Action payload summonerName is required but undefined.');
        });
    });
    describe('API calls', () => {
        it('should return correct JSON for the /summoner/v4/summoners/by-name Riot API endpoint', () => expect(RiotAPI.request(ENDPOINTS.SUMMONER.SUMMONER_NAME, { region: LeagueRegion.NORTH_AMERICA, summonerName: 'SSG Xayah' }).get())
            .to.eventually.have.property('data').to.deep.equal(v4SummonerByNameReply));
    });
});
