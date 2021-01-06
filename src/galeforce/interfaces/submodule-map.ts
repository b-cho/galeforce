import RiotAPIModule from '../../riot-api';
import Cache from '../caches/cache';

interface SubmoduleMapInterface {
    RiotAPI: RiotAPIModule;
    cache: Cache;
}

export default SubmoduleMapInterface;
