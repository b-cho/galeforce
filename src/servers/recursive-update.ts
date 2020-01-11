/*
    Recursively update users given an initial seed.
*/

import minimist from 'minimist';
import SightstoneModule, { getConfig } from '../sightstone';
import ConfigInterface from '../sightstone/interfaces/config';

const argv = minimist(process.argv.slice(2));
const config: ConfigInterface = getConfig(argv.config);

const Sightstone: SightstoneModule = new SightstoneModule(config);

Sightstone.init().then(() => {

});