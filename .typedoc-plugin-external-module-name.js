module.exports = function customMappingFunction(explicit, implicit, path, reflection, context) {
    const module = implicit.split('/')[0];
    const package = implicit.split('/')[1];
    // build the module name
    if(module === 'riot-api') return 'internal/riot-api';
    if(module === 'root') return 'Galeforce';
    else return `internal/${package}`;
}
