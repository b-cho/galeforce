import { ConfigInterface } from "../interfaces/config";

export const defaultConfig: ConfigInterface = {
    'riot-api': {
        key: '',
    },
    'rate-limit': {
        type: 'bottleneck',
        cache: {
            type: 'internal',
            'key-id': 'galeforce',
        },
        options: {
            intervals: {},
        },
    },
    debug: [],
}