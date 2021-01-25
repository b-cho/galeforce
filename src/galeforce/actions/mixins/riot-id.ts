import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.gameName()` method
 * and `.tagLine()` method.
 */
export interface RiotIdChainable {
    gameName?: <K extends RiotIdChainable & Executable>(this: K, gameName: string) => Omit<K, 'gameName'>;
    tagLine?: <K extends RiotIdChainable & Executable>(this: K, tagLine: string) => Omit<K, 'tagLine'>;
}

/**
 * A mixin for the `.gameName()` and `.tagLine()` methods.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesRiotId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements RiotIdChainable {
        /**
         * Modifies the **gameName** associated with the Action object it is called from.
         * @param gameName The Riot ID name to update the calling Action object with.
         */
        public gameName<K extends RiotIdChainable & Executable>(this: K, gameName: string): Omit<K, 'gameName'> {
            this.payload.gameName = gameName;
            delete this.gameName;
            return this;
        }

        /**
         * Modifies the **tagLine** associated with the Action object it is called from.
         * @param tagLine The Riot ID tag to update the calling Action object with.
         */
        public tagLine<K extends RiotIdChainable & Executable>(this: K, tagLine: string): Omit<K, 'tagLine'> {
            this.payload.tagLine = tagLine;
            delete this.tagLine;
            return this;
        }
    };
}
