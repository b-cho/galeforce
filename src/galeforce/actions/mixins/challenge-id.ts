import { Constructor, Executable, MixinResult } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.challengeId()` method.
 */
export interface ChallengeIdChainable {
    challengeId?: <K extends ChallengeIdChainable & Executable>(this: K, challengeId: number) => Omit<K, 'challengeId'>;
}

/**
 * A mixin for the `.challengeId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesChallengeId<TBase extends Constructor>(Base: TBase) {
    class MixinClass extends (Base as Constructor)<any> implements ChallengeIdChainable {
        /**
         * Modifies the **challengeId** associated with the Action object it is called from.
         * @param challengeId The challenge ID to update the calling Action object with.
         */
        public challengeId<K extends ChallengeIdChainable & Executable>(this: K, challengeId: number): Omit<K, 'challengeId'> {
            this.payload.challengeId = challengeId;
            this.challengeId = undefined;
            return this;
        }
    }

    return MixinClass as unknown as MixinResult<TBase, ChallengeIdChainable>;
}
