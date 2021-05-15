import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any `.ddragon Action containing a `.locale()` method.
 */
export interface LocaleChainable {
    locale?: <K extends LocaleChainable & Executable>(this: K, locale: string) => Omit<K, 'locale'>;
}

/**
 * A mixin for the `.locale()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesLocale<TBase extends Constructor>(Base: TBase): TBase & LocaleChainable {
    return class extends Base implements LocaleChainable {
        /**
         * Modifies the **locale** (language) associated with the Action object it is called from.
         * The regex `/^[a-z]{2}_[A-Z]{2}$/` will be run against the provided input to ensure that
         * a valid locale format is provided.
         * @param locale The locale to update the calling Action object with.
         * @throws Will throw an error if the provided locale does not match the above regex expression.
         */
        public locale<K extends LocaleChainable & Executable>(this: K, locale: string): Omit<K, 'locale'> {
            this.payload.locale = locale;
            this.locale = undefined;
            return this;
        }
    };
}
