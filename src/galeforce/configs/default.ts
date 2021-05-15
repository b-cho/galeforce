import { ConfigInterface } from '../interfaces/config';

const defaultConfig: ConfigInterface = {
    'riot-api': {
        key: '',
    },
    'rate-limit': {
        type: 'bottleneck',
        cache: {
            type: 'internal',
            'key-id': 'galeforce',
            uri: undefined,
        },
        options: {
            intervals: {},
            'max-concurrent': null,
            'min-time': 0,
            'retry-count-after-429': 3,
        },
    },
    debug: [],
};

export default defaultConfig;
