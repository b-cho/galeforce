import { RiotAPIModule } from '../../riot-api';
import RateLimiter from '../rate-limiters/rate-limiter';

interface SubmoduleMap {
    RiotAPI: RiotAPIModule;
    RateLimiter: RateLimiter;
}

export default SubmoduleMap;
