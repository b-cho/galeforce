import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any `.ddragon` Action containing a `.assetId()` method.
 */
export interface DataDragonIdChainable {
    assetId?: <K extends DataDragonIdChainable & Executable>(this: K, assetId: string | number) => Omit<K, 'assetId'>;
}

/**
 * A mixin for the `.assetId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesDataDragonId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements DataDragonIdChainable {
        /**
         * Modifies the Data Dragon **assetId** associated with the Action object it is called from.
         * @param assetId The Data Dragon asset ID to update the calling Action object with.
         */
        public assetId<K extends DataDragonIdChainable & Executable>(this: K, assetId: string | number): Omit<K, 'assetId'> {
            this.payload.assetId = assetId;
            delete this.assetId;
            return this;
        }
    };
}
