import { ShardGame } from '../../../riot-api';
import { Constructor, Executable, MixinResult } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.game()` method.
 */
export interface GameChainable {
    game?: <K extends GameChainable & Executable>(this: K, game: ShardGame) => Omit<K, 'game'>;
}

/**
 * A mixin for the `.game()` method.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesGame<TBase extends Constructor>(Base: TBase) {
    class MixinClass extends (Base as Constructor)<any> implements GameChainable {
        /**
         * Modifies the **game** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided Riot game matches one of the expected queues for the corresponding game.
         * @param game The Riot game to update the calling Action object with.
         * @throws Will throw an error if an invalid game is provided or the provided
         * game fails the runtime type check.
         */
        public game<K extends GameChainable & Executable>(this: K, game: ShardGame): Omit<K, 'game'> {
            this.payload.game = game;
            this.game = undefined;
            return this;
        }
    }

    return MixinClass as unknown as MixinResult<TBase, GameChainable>;
}
