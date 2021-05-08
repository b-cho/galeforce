import { Region } from "../../riot-api";
import { ConfigInterface } from "../interfaces/config";

export default abstract class RateLimiter {
    public readonly config: ConfigInterface['rate-limit'];

    constructor(config: ConfigInterface['rate-limit']) {
        this.config = config;
    }

    public abstract schedule<T>(request: () => Promise<T>, region?: Region): Promise<T>;
}