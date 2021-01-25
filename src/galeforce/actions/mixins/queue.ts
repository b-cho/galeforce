import { Queue } from "../../../riot-api";
import { Action } from "../action";
import { Constructor, Executable } from "./executable";

/**
 * An interface containing method type signatures for any Action containing a `.queue()` method.
 * @template TQueue The type of the queue. Defaults to `Queue`, but should be specified.
 */
export interface QueueChainable<TQueue extends Queue = Queue> {
    queue?: <K extends QueueChainable<TQueue> & Executable>(this: K, region: TQueue) => Omit<K, 'queue'>;
}

/**
 * A mixin for the `.queue()` method.
 * @template TQueue The type of the queue. Defaults to `Queue`, but should be specified.
 * @template TBase The type of the object inside. Defaults to `typeof Action`.
 * @param Base The target class.
 */
export function TakesQueue<TQueue extends Queue = Queue, TBase extends Constructor = typeof Action>(Base: TBase) {
    return class extends Base implements QueueChainable<TQueue> {
        /**
         * Modifies the **queue** associated with the Action object it is called from.
         * Note that associated runtime type checks are performed to ensure that
         * the provided queue matches one of the expected queues for the corresponding game.
         * @param queue The queue to update the calling Action object with.
         * @throws Will throw an error if an invalid queue is provided or the provided
         * queue fails the runtime type check.
         */
        public queue<K extends QueueChainable<TQueue> & Executable>(this: K, queue: TQueue): Omit<K, 'queue'> {
            this.payload.queue = queue;
            delete this.queue;
            return this;
        }
    };
}