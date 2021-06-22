import Action from '../../action';
import { ENDPOINTS } from '../../../../riot-api';
import SubmoduleMap from '../../../interfaces/submodule-map';
import {
    TakesLocale, TakesLorSet, TakesVersion, TakesCard,
} from '../../mixins';

const BaseAction = TakesVersion(
    TakesLocale(
        TakesLorSet(
            TakesCard(
                Action,
            ),
        ),
    ),
);

export default class GetLorDataDragonSetCardArt extends BaseAction<Buffer> {
    constructor(submodules: SubmoduleMap, type: 'card' | 'full' | 'alt' | 'alt-full') {
        super(submodules);

        switch (type) {
        case 'card':
            this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.SET_CARD_ART;
            break;
        case 'full':
            this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.SET_CARD_ART_FULL;
            break;
        case 'alt':
            this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.SET_CARD_ART_ALT;
            break;
        case 'alt-full':
            this.payload.endpoint = ENDPOINTS.LOR_DATA_DRAGON.SET_CARD_ART_ALT_FULL;
            break;
        default:
            throw new Error('[galeforce]: Invalid constructor parameter provided.');
        }

        this.payload.type = 'lor-ddragon-buffer';
        this.payload.method = 'GET';
    }
}
