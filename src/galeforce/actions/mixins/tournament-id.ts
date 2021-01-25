import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.tournamentId()` method.
 */
export interface TournamentIdChainable {
    tournamentId?: <K extends TournamentIdChainable & Executable>(this: K, tournamentId: number) => Omit<K, 'tournamentId'>;
}

/**
 * A mixin for the `.tournamentId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesTournamentId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements TournamentIdChainable {
        /**
         * Modifies the **tournamentId** associated with the Action object it is called from.
         * @param tournamentId The tournament ID to update the calling Action object with.
         */
        public tournamentId<K extends TournamentIdChainable & Executable>(this: K, tournamentId: number): Omit<K, 'tournamentId'> {
            this.payload.tournamentId = tournamentId;
            delete this.tournamentId;
            return this;
        }
    };
}
