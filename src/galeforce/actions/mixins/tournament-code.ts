import { Constructor, Executable } from "./executable";

/**
 * An interface containing method type signatures for any Action containing a `.tournamentCode()` method.
 */
export interface TournamentCodeChainable {
    tournamentCode?: <K extends TournamentCodeChainable & Executable>(this: K, tournamentCode: string) => Omit<K, 'tournamentCode'>;
}

/**
 * A mixin for the `.tournamentCode()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesTournamentCode<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements TournamentCodeChainable {
        /**
         * Modifies the **tournamentCode** associated with the Action object it is called from.
         * @param tournamentCode The tournament code to update the calling Action object with.
         */
        public tournamentCode<K extends TournamentCodeChainable & Executable>(this: K, tournamentCode: string): Omit<K, 'tournamentCode'> {
            this.payload.tournamentCode = tournamentCode;
            delete this.tournamentCode;
            return this;
        }
    };
}