import { Division } from '../../../riot-api';
import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.division()` method.
 */
export interface DivisionChainable {
    division?: <K extends DivisionChainable & Executable>(this: K, division: Division) => Omit<K, 'division'>;
}

/**
 * A mixin for the `.division()` method.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesDivision<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements DivisionChainable {
        /**
         * Modifies the **division** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided division matches one of the expected queues for the corresponding game.
         * @param division The division to update the calling Action object with.
         * @throws Will throw an error if an invalid division is provided or the provided
         * division fails the runtime type check.
         */
        public division<K extends DivisionChainable & Executable>(this: K, division: Division): Omit<K, 'division'> {
            this.payload.division = division;
            delete this.division;
            return this;
        }
    };
}
