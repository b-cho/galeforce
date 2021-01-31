export interface ConfigInterface {
    'riot-api': {
        key: string;
    };
    cache?: {
        type: string;
        uri?: string;
    };
    'rate-limit'?: {
        prefix: string;
        intervals: {
            [key: number]: number;
        };
    };
    debug?: string[];
}
