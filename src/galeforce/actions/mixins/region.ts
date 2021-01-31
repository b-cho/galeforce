import { Region } from '../../../riot-api';
import { Constructor, Executable } from './executable';

/**
 * An interface containing method type signatures for any Action containing a `.region()` method.
 * @template TRegion The type of the region. Defaults to `Region`, but should be specified.
 */
export interface RegionChainable<TRegion extends Region = Region> {
    region?: <K extends RegionChainable<TRegion> & Executable>(this: K, region: TRegion) => Omit<K, 'region'>;
}

/**
 * A mixin for the `.region()` method.
 * @template TRegion The type of the region. Specified by the type of the `type` parameter.
 * @template TBase The type of the object inside.
 * @param type A dummy parameter to allow for type inference. Use by passing in `<T>{}` or
 * an expression of that form.
 * @param Base The target class.
 */
export function TakesRegion<TRegion extends Region, TBase extends Constructor>(type: TRegion, Base: TBase) {
    return class extends Base implements RegionChainable<TRegion> {
        /**
         * Modifies the **region** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided region matches one of the expected API regions.
         * @param region The region to update the calling Action object with.
         * @throws Will throw an error if an invalid region is provided or the provided
         * region fails the runtime type check.
         */
        public region<K extends RegionChainable<TRegion> & Executable>(this: K, region: TRegion): Omit<K, 'region'> {
            this.payload.region = region;
            delete this.region;
            return this;
        }
    };
}
