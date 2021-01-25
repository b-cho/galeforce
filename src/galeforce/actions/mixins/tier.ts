import { Tier } from '../../../riot-api';
import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.tier()` method.
 */
export interface TierChainable {
    tier?: <K extends TierChainable & Executable>(this: K, tier: Tier) => Omit<K, 'tier'>;
}

/**
 * A mixin for the `.tier()` method.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesTier<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements TierChainable {
        /**
         * Modifies the **tier** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided tier matches one of the expected queues for the corresponding game.
         * @param tier The tier to update the calling Action object with.
         * @throws Will throw an error if an invalid tier is provided or the provided
         * tier fails the runtime type check.
         */
        public tier<K extends TierChainable & Executable>(this: K, tier: Tier): Omit<K, 'tier'> {
            this.payload.tier = tier;
            delete this.tier;
            return this;
        }
    };
}
