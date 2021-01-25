import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.championId()` method.
 */
export interface ChampionIdChainable {
    championId?: <K extends ChampionIdChainable & Executable>(this: K, championId: number) => Omit<K, 'championId'>;
}

/**
 * A mixin for the `.championId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesChampionId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements ChampionIdChainable {
        /**
         * Modifies the **championId** associated with the Action object it is called from.
         * @param championId The champion ID to update the calling Action object with.
         */
        public championId<K extends ChampionIdChainable & Executable>(this: K, championId: number): Omit<K, 'championId'> {
            this.payload.championId = championId;
            delete this.championId;
            return this;
        }
    };
}
