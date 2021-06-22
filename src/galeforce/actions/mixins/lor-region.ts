import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.lorRegion()` method.
 */
export interface LorRegionChainable {
    lorRegion?: <K extends LorRegionChainable & Executable>(this: K, lorRegion: string) => Omit<K, 'lorRegion'>;
}

/**
 * A mixin for the `.lorRegion()` method.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesLorRegion<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements LorRegionChainable {
        /**
         * Modifies the Legends of Runeterra in-game **lorRegion** associated with the Action object it is called from.
         * @param lorRegion The lorRegion to update the calling Action object with.
         */
        public lorRegion<K extends LorRegionChainable & Executable>(this: K, lorRegion: string): Omit<K, 'lorRegion'> {
            this.payload.lorRegion = lorRegion;
            this.lorRegion = undefined;
            return this;
        }
    };
}
