import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any `.ddragon Action containing a `.skin()` method.
 */
export interface SkinChainable {
    skin?: <K extends SkinChainable & Executable>(this: K, skin: number) => Omit<K, 'skin'>;
}

/**
 * A mixin for the `.skin()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesSkin<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements SkinChainable {
        /**
         * Modifies the **skin** associated with the Action object it is called from.
         * @param skin The skin ID to update the calling Action object with.
         */
        public skin<K extends SkinChainable & Executable>(this: K, skin: number): Omit<K, 'skin'> {
            this.payload.skin = skin;
            this.skin = undefined;
            return this;
        }
    };
}
