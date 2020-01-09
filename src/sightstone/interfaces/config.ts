interface ConfigInterface {
    system: {
        port: number;
    };
    'riot-api': {
        key: string;
        ddversion: string;
        query: number;
        servers: string[];
    };
    database: {
        type: string;
        uri: string;
    };
    cache: {
        type: string;
        uri: string;
    };
    'rate-limit': {
        prefix: string;
        intervals: {
            [key: number]: number;
        };
    };
}

export default ConfigInterface;
