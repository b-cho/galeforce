import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any `.ddragon` Action containing a `.assetPath()` method.
 */
export interface AssetPathChainable {
    assetPath?: <K extends AssetPathChainable & Executable>(this: K, assetPath: string) => Omit<K, 'assetPath'>;
}

/**
 * A mixin for the `.assetPath()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesAssetPath<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements AssetPathChainable {
        /**
         * Modifies the Data Dragon **assetPath** associated with the Action object it is called from.
         * @param assetPath The Data Dragon asset path to update the calling Action object with.
         */
        public assetPath<K extends AssetPathChainable & Executable>(this: K, assetPath: string): Omit<K, 'assetPath'> {
            this.payload.assetPath = assetPath;
            this.assetPath = undefined;
            return this;
        }
    };
}
