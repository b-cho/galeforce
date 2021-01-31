import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.teamId()` method.
 */
export interface TeamIdChainable {
    teamId?: <K extends TeamIdChainable & Executable>(this: K, teamId: string) => Omit<K, 'teamId'>;
}

/**
 * A mixin for the `.teamId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesTeamId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements TeamIdChainable {
        /**
         * Modifies the **teamId** associated with the Action object it is called from.
         * @param teamId The team ID to update the calling Action object with.
         */
        public teamId<K extends TeamIdChainable & Executable>(this: K, teamId: string): Omit<K, 'teamId'> {
            this.payload.teamId = teamId;
            this.teamId = undefined;
            return this;
        }
    };
}
