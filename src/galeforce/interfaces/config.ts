export interface ConfigInterface {
    'riot-api': {
        key: string;
    };
    'rate-limit': {
        type: 'bottleneck' | 'null';
        cache: {
            type: 'redis' | 'internal';
            uri?: string;
            'key-id': string;
        };
        options: {
            intervals: {
                [key: number]: number;
            };
            'max-concurrent'?: number;
            'min-time'?: number;
            'retry-after-429': boolean;
        };
    };
    debug: string[];
}
