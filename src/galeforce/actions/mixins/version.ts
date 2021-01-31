import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any `.ddragon Action containing a `.version()` method.
 */
export interface VersionChainable {
    version?: <K extends VersionChainable & Executable>(this: K, version: string) => Omit<K, 'version'>;
}

/**
 * A mixin for the `.version()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesVersion<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements VersionChainable {
        /**
         * Modifies the **version** (patch) associated with the Action object it is called from.
         * Tests the provided version against the following regex expressions:
         * - `/^([0-9]+)\.([0-9]+)\.([0-9]+)$/`
         * - `/^lolpatch_([0-9]+)\.([0-9]+)$/`
         *
         * If the input fails to match one of the above expressions, an error will be thrown.
         * @param version The version to update the calling Action object with.
         * @throws Will throw an error if the provided locale does not match any of the above regex expressions.
         */
        public version<K extends VersionChainable & Executable>(this: K, version: string): Omit<K, 'version'> {
            this.payload.version = version;
            delete this.version;
            return this;
        }
    };
}
