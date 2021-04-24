const tsJest = require('ts-jest');
const path = require('path');

module.exports = {
    createTransformer(options) {
        const tsTransformer = tsJest.createTransformer();

        return {
            process(src, filename, config, opts) {
                let result = tsTransformer.process(src, filename, config, options);
                if(options.mappings) {
                    for(let key in options.mappings) {
                        const regex = new RegExp(key, 'g');
                        result = result.replace(regex, options.mappings[key]);
                    }
                }

                return result;
            },
        };
    },
};
