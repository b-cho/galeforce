import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any `.ddragon` Action containing a `.champion()` method.
 */
export interface ChampionChainable {
    champion?: <K extends ChampionChainable & Executable>(this: K, champion: string) => Omit<K, 'champion'>;
}

/**
 * A mixin for the `.champion()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesChampion<TBase extends Constructor>(Base: TBase): TBase & ChampionChainable {
    return class extends Base implements ChampionChainable {
        /**
         * Modifies the **champion** associated with the Action object it is called from.
         * @param champion The champion name to update the calling Action object with.
         */
        public champion<K extends ChampionChainable & Executable>(this: K, champion: string): Omit<K, 'champion'> {
            this.payload.champion = champion;
            this.champion = undefined;
            return this;
        }
    };
}
