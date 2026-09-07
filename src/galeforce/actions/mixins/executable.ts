import Action from '../action';
import { Payload } from '../payload';

/**
 * A generic interface for an executable (i.e., an Action with a `payload` object
 * and `.exec()` function).
 */
export interface Executable {
    payload: Payload;
    exec: () => Promise<unknown>;
}

/**
 * The generic mixin constructor type.
 *
 * Note that this preserves the `TResult` type parameter of the underlying {@link Action}
 * so that composed mixins may still be extended as `class X extends BaseAction<DTO>`.
 * TypeScript 5.9 no longer infers this type parameter through nested mixins returning
 * anonymous classes, so each mixin asserts its return type explicitly (see {@link MixinResult}).
 */
export type Constructor = { new <TResult>(...args: any[]): Action<TResult> };

/**
 * The return type of a mixin, preserving both the `TResult` type parameter of the
 * underlying {@link Action} and the members contributed by the wrapped base class.
 *
 * @template TBase The type of the wrapped base class.
 * @template TChainable The interface contributed by the mixin.
 */
export type MixinResult<TBase extends Constructor, TChainable> = {
    new <TResult>(...args: any[]): Action<TResult> & TChainable & InstanceType<TBase>;
};
