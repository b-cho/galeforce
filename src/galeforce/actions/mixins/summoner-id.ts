import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.summonerId()` method.
 */
export interface SummonerIdChainable {
    summonerId?: <K extends SummonerIdChainable & Executable>(this: K, summonerId: string) => Omit<K, 'summonerId'>;
}

/**
 * A mixin for the `.summonerId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesSummonerId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements SummonerIdChainable {
        /**
         * Modifies the **summonerId** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the summoner ID conforms to Riot specifications.
         * @param summonerId The summoner ID to update the calling Action object with.
         * @throws Will throw an error if an invalid `summonerId` is provided.
         */
        public summonerId<K extends SummonerIdChainable & Executable>(this: K, summonerId: string): Omit<K, 'summonerId'> {
            this.payload.summonerId = summonerId;
            this.summonerId = undefined;
            return this;
        }
    };
}
