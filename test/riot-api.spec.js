const chai = require('chai');
const nock = require('nock');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
const { expect } = chai;

const { RiotAPIModule } = require('../dist/riot-api');
const { ENDPOINTS, RiotRegion } = require('../dist/riot-api');

const testAccountReply = {'test': 'reply'};

const na1API = nock('https://na1.api.riotgames.com')
    .persist()
    .get('/riot/account/v1/accounts/by-puuid/test-puuid')
    .reply(200, testAccountReply);

const RiotAPI = new RiotAPIModule({ key: 'RIOT-API-KEY' });

describe('/riot-api', () => {
    it('should initialize correctly', () => {
        expect(RiotAPI.key).to.equal('RIOT-API-KEY');
    });
    describe('URL generation', () => {
        it('should generate correct RiotAPI.request URLs from template strings', () => {
            expect(RiotAPI.request(ENDPOINTS.ACCOUNT.PUUID, { region: RiotRegion.AMERICAS, puuid: 'test-puuid' }).targetURL)
                .to.equal('https://na1.api.riotgames.com/riot/account/v1/accounts/by-puuid/test-puuid');
        });
        it('should throw when a required parameter is missing', () => {
            expect(() => RiotAPI.request(ENDPOINTS.ACCOUNT.PUUID, { region: RiotRegion.AMERICAS }))
                .to.throw('[galeforce]: Action payload puuid is required but undefined.');
        });
    });
    describe('API calls', () => {
        it('should return correct JSON for the /riot/account/v1/accounts Riot API endpoint', () => expect(RiotAPI.request(ENDPOINTS.ACCOUNT.PUUID, { region: RiotRegion.AMERICAS, puuid: 'test-puuid' }).get())
            .to.eventually.have.property('data').to.deep.equal(testAccountReply));
    });
});
