interface ConfigInterface {
    system: {
        port: number;
    };
    'riot-api': {
        key: string;
        query: number;
        servers: string[];
    };
    'database': {
        type: string;
        uri: string;
    };
}

export default ConfigInterface;
