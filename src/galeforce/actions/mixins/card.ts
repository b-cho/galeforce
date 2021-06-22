import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.card()` method.
 */
export interface CardChainable {
    card?: <K extends CardChainable & Executable>(this: K, card: string) => Omit<K, 'card'>;
}

/**
 * A mixin for the `.card()` method.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesCard<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements CardChainable {
        /**
         * Modifies the Legends of Runeterra **card** associated with the Action object it is called from.
         * @param card The card ID to update the calling Action object with.
         */
        public card<K extends CardChainable & Executable>(this: K, card: string): Omit<K, 'card'> {
            this.payload.card = card;
            this.card = undefined;
            return this;
        }
    };
}
