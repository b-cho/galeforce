import { RiotAPIModule } from '../../riot-api';
import { Cache } from '../caches/cache';

export interface SubmoduleMapInterface {
    RiotAPI: RiotAPIModule;
    cache: Cache;
}
