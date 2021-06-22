import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';

export default class GetDataDragonScoreboardArt extends Action<Buffer> {
    constructor(submodules: SubmoduleMap, icon: 'champion' | 'items' | 'minion' | 'score' | 'spells') {
        super(submodules);

        switch (icon) {
        case 'champion':
            this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.SCOREBOARD_ICONS_CHAMPION_ART;
            break;
        case 'items':
            this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.SCOREBOARD_ICONS_ITEMS_ART;
            break;
        case 'minion':
            this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.SCOREBOARD_ICONS_MINION_ART;
            break;
        case 'score':
            this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.SCOREBOARD_ICONS_SCORE_ART;
            break;
        case 'spells':
            this.payload.endpoint = ENDPOINTS.LOL_DATA_DRAGON.SCOREBOARD_ICONS_SPELLS_ART;
            break;
        default:
            throw new Error('[galeforce]: Invalid constructor parameter provided.');
        }

        this.payload.type = 'lol-ddragon-buffer';
        this.payload.method = 'GET';
    }
}
