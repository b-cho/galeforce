import Action from '../action';
import { ENDPOINTS } from '../../../riot-api';
import SubmoduleMap from '../../interfaces/submodule-map';

export default class GetDataDragonScoreboardArt extends Action<Buffer> {
    constructor(submodules: SubmoduleMap, icon: 'champion' | 'items' | 'minion' | 'score' | 'spells') {
        super(submodules);
        if (icon === 'champion') this.payload.endpoint = ENDPOINTS.DATA_DRAGON.SCOREBOARD_ICONS_CHAMPION_ART;
        else if (icon === 'items') this.payload.endpoint = ENDPOINTS.DATA_DRAGON.SCOREBOARD_ICONS_ITEMS_ART;
        else if (icon === 'minion') this.payload.endpoint = ENDPOINTS.DATA_DRAGON.SCOREBOARD_ICONS_MINION_ART;
        else if (icon === 'score') this.payload.endpoint = ENDPOINTS.DATA_DRAGON.SCOREBOARD_ICONS_SCORE_ART;
        else if (icon === 'spells') this.payload.endpoint = ENDPOINTS.DATA_DRAGON.SCOREBOARD_ICONS_SPELLS_ART;
        else throw new Error('[galeforce]: Invalid constructor parameter provided.');

        this.payload.type = 'ddragon-buffer';
        this.payload.method = 'GET';
    }
}
