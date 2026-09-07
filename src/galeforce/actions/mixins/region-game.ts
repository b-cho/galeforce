import { RegionGame } from '../../../riot-api';
import { Constructor, Executable, MixinResult } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.game()` method
 * that corresponds to the `account-v1` **active region** endpoint.
 */
export interface RegionGameChainable {
    game?: <K extends RegionGameChainable & Executable>(this: K, game: RegionGame) => Omit<K, 'game'>;
}

/**
 * A mixin for the `.game()` method on the `account-v1` **active region** endpoint.
 *
 * Note that this endpoint accepts a different set of games (`lol`, `tft`) than the
 * **active shard** endpoint (`val`, `lor`), so it uses {@link RegionGame} rather than `Game`.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesRegionGame<TBase extends Constructor>(Base: TBase) {
    class MixinClass extends (Base as Constructor)<any> implements RegionGameChainable {
        /**
         * Modifies the **game** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided Riot game is valid for the active region endpoint.
         * @param game The Riot game to update the calling Action object with.
         * @throws Will throw an error if an invalid game is provided or the provided
         * game fails the runtime type check.
         */
        public game<K extends RegionGameChainable & Executable>(this: K, game: RegionGame): Omit<K, 'game'> {
            this.payload.regionGame = game;
            this.game = undefined;
            return this;
        }
    }

    return MixinClass as unknown as MixinResult<TBase, RegionGameChainable>;
}
