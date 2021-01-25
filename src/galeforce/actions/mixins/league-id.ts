import { Constructor, Executable } from "./executable";

/**
 * An interface containing method type signatures for any Action containing a `.tournamentCode()` method.
 */
export interface LeagueIdChainable {
    leagueId?: <K extends LeagueIdChainable & Executable>(this: K, leagueId: string) => Omit<K, 'leagueId'>;
}

/**
 * A mixin for the `.tournamentCode()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesLeagueId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements LeagueIdChainable {
        /**
         * Modifies the **leagueId** associated with the Action object it is called from.
         * @param leagueId The league ID to update the calling Action object with.
         */
        public leagueId<K extends LeagueIdChainable & Executable>(this: K, leagueId: string): Omit<K, 'leagueId'> {
            this.payload.leagueId = leagueId;
            delete this.leagueId;
            return this;
        }
    };
}