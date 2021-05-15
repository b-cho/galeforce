import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.accountId()` method.
 */
export interface AccountIdChainable {
    accountId?: <K extends AccountIdChainable & Executable>(this: K, accountId: string) => Omit<K, 'accountId'>;
}

/**
 * A mixin for the `.accountId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesAccountId<TBase extends Constructor>(Base: TBase): TBase & AccountIdChainable {
    return class extends Base implements AccountIdChainable {
        /**
         * Modifies the **accountId** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided account ID conforms to Riot specifications.
         * @param accountId The accountId to update the calling Action object with.
         * @throws Will throw an error if an invalid accountId or the provided
         * `region` fails the runtime type check.
         */
        public accountId<K extends AccountIdChainable & Executable>(this: K, accountId: string): Omit<K, 'accountId'> {
            this.payload.accountId = accountId;
            this.accountId = undefined;
            return this;
        }
    };
}
