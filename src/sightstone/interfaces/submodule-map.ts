import RiotAPIModule from '../../riot-api';
import Cache from '../caches/cache';

export default interface SubmoduleMapInterface {
    RiotAPI: RiotAPIModule;
    cache: Cache;
}
