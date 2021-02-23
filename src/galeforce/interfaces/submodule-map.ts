import { RiotAPIModule } from '../../riot-api';
import { Cache } from '../caches/cache';

interface SubmoduleMap {
    RiotAPI: RiotAPIModule;
    cache: Cache;
}

export default SubmoduleMap;
