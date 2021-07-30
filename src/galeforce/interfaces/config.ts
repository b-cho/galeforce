export interface ConfigInterface {
    'riot-api': {
        key?: string;
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
            'max-concurrent': number | null;
            'min-time': number;
            'retry-count-after-429': number;
        };
    };
    debug: string[];
}
