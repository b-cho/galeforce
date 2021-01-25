import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.matchId()` method.
 */
export interface MatchIdChainable {
    matchId?: <K extends MatchIdChainable & Executable>(this: K, matchId: number | string) => Omit<K, 'matchId'>;
}

/**
 * A mixin for the `.matchId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesMatchId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements MatchIdChainable {
        /**
         * Modifies the **matchId** associated with the Action object it is called from.
         * @param matchId The match ID to update the calling Action object with.
         */
        public matchId<K extends MatchIdChainable & Executable>(this: K, matchId: number | string): Omit<K, 'matchId'> {
            this.payload.matchId = matchId;
            delete this.matchId;
            return this;
        }
    };
}
