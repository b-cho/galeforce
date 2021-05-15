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
 */
export type Constructor = new (...args: any[]) => Executable;
