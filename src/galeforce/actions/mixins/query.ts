import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.query()` method.
 * @template TQuery The type of the request query. Defaults to `object`, but should be specified.
 */
export interface QueryChainable<TQuery extends object = object> {
    query?: <K extends QueryChainable<TQuery> & Executable>(this: K, query: TQuery) => Omit<K, 'query'>;
}

/**
 * A mixin for the `.query()` method.
 * @template TQuery The type of the request query. Specified by the type of the `type` parameter.
 * @template TBase The type of the object inside.
 * @param type A dummy parameter to allow for type inference. Use by passing in `<T>{}` or
 * an expression of that form.
 * @param Base The target class.
 */
export function TakesQuery<TQuery extends object, TBase extends Constructor>(type: TQuery, Base: TBase) {
    return class extends Base implements QueryChainable<TQuery> {
        /**
         * Modifies the **query** associated with the Action object it is called from.
         * @param query The request query to update the calling Action object with.
         */
        public query<K extends QueryChainable<TQuery> & Executable>(this: K, query: TQuery): Omit<K, 'query'> {
            this.payload.query = query;
            this.query = undefined;
            return this;
        }
    };
}
