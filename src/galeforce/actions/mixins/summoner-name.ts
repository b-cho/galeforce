import { Constructor, Executable } from "./executable";

/**
 * An interface containing method type signatures for any Action containing a `.name()` method.
 * @template R The return type of the `.exec()` Promise.
 */
export interface SummonerNameChainable {
    name?: <K extends SummonerNameChainable & Executable>(this: K, summonerName: string) => Omit<K, 'name'>;
}

/**
 * A mixin for the `.name()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesSummonerName<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements SummonerNameChainable {
        /**
         * Modifies the **summonerName** associated with the Action object it is called from.
         * @param summonerName The summoner name to update the calling Action object with.
         */
        public name<K extends SummonerNameChainable & Executable>(this: K, summonerName: string): Omit<K, 'name'> {
            this.payload.summonerName = summonerName;
            delete this.name;
            return this;
        }
    };
}