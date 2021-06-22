import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.lorSet()` method.
 */
export interface LorSetChainable {
    lorSet?: <K extends LorSetChainable & Executable>(this: K, lorSet: number) => Omit<K, 'lorSet'>;
}

/**
 * A mixin for the `.lorSet()` method.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesLorSet<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements LorSetChainable {
        /**
         * Modifies the Legends of Runeterra **lorSet** associated with the Action object it is called from.
         * @param lorSet The Legends of Runeterra set to update the calling Action object with.
         */
        public lorSet<K extends LorSetChainable & Executable>(this: K, lorSet: number): Omit<K, 'lorSet'> {
            this.payload.lorSet = lorSet;
            this.lorSet = undefined;
            return this;
        }
    };
}
