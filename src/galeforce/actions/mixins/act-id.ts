import { Constructor, Executable } from "./executable";

/**
 * An interface containing method type signatures for any Action containing a `.actId()` method.
 */
export interface ActIdChainable {
    actId?: <K extends ActIdChainable & Executable>(this: K, actId: string) => Omit<K, 'actId'>;
}

/**
 * A mixin for the `.actId()` method.
 * @template TBase The type of the object inside. Inferred from the `Base` parameter.
 * @param Base The target class.
 */
export function TakesActId<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements ActIdChainable {
        /**
         * Modifies the **actId** associated with the Action object it is called from.
         * @param actId The act ID to update the calling Action object with.
         */
        public actId<K extends ActIdChainable & Executable>(this: K, actId: string): Omit<K, 'actId'> {
            this.payload.actId = actId;
            delete this.actId;
            return this;
        }
    };
}