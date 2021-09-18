import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any `.ddragon` Action containing a `.spell()` method.
 */
export interface SpellChainable {
    spell?: <K extends SpellChainable & Executable>(this: K, spell: string) => Omit<K, 'spell'>;
}

/**
 * A mixin for the `.spell()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesSpell<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements SpellChainable {
        /**
         * Modifies the **spell** associated with the Action object it is called from.
         * @param spell The spell name to update the calling Action object with.
         */
        public spell<K extends SpellChainable & Executable>(this: K, spell: string): Omit<K, 'spell'> {
            this.payload.spell = spell;
            this.spell = undefined;
            return this;
        }
    };
}
