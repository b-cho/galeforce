import { Action } from '../action';
import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.body()` method.
 * @template TBody The type of the request body. Defaults to `object`, but may be specified.
 */
export interface BodyChainable<TBody extends object = object> {
    body?: <K extends BodyChainable<TBody> & Executable>(this: K, body: TBody) => Omit<K, 'body'>;
}

/**
 * A mixin for the `.body()` method.
 * @template TBody The type of the request body. Defaults to `object`, but may be specified.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesBody<TBody extends object = object, TBase extends Constructor = typeof Action>(Base: TBase) {
    return class extends Base implements BodyChainable<TBody> {
        /**
         * Modifies the **body** associated with the Action object it is called from.
         * @param body The request body to update the calling Action object with.
         */
        public body<K extends BodyChainable<TBody> & Executable>(this: K, body: TBody): Omit<K, 'body'> {
            this.payload.body = body;
            delete this.body;
            return this;
        }
    };
}
