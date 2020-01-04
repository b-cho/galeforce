import RiotAPIModule from '../../riot-api';
import DatabaseInternal from '../databases/database';
import Cache from '../caches/cache';

interface SubmoduleMapInterface {
    RiotAPI: RiotAPIModule;
    database: DatabaseInternal;
    cache: Cache;
}

export default SubmoduleMapInterface;
