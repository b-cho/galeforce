import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.puuid()` method.
 */
export interface PUUIDChainable {
    puuid?: <K extends PUUIDChainable & Executable>(this: K, puuid: string) => Omit<K, 'puuid'>;
}

/**
 * A mixin for the `.puuid()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesPUUID<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements PUUIDChainable {
        /**
         * Modifies the **puuid** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided PUUID conforms to Riot specifications.
         * @param puuid The PUUID to update the calling Action object with.
         * @throws Will throw an error if an invalid region is provided or the provided
         * `region` fails the runtime type check.
         */
        public puuid<K extends PUUIDChainable & Executable>(this: K, puuid: string): Omit<K, 'puuid'> {
            this.payload.puuid = puuid;
            delete this.puuid;
            return this;
        }
    };
}
