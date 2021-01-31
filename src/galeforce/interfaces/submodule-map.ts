import { RiotAPIModule } from '../../riot-api';
import { Cache } from '../caches/cache';

export default interface SubmoduleMap {
    RiotAPI: RiotAPIModule;
    cache: Cache;
}
