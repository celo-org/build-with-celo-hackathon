"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./enhancers/index");
function expandAliases(props) {
    const propNames = Object.keys(props);
    const newProps = new Map();
    propNames.forEach(propName => {
        const propValue = props[propName];
        const aliases = index_1.propAliases[propName] || [propName];
        if (process.env.NODE_ENV !== 'production') {
            const validator = index_1.propValidators[propName];
            if (validator) {
                const result = validator(propValue);
                if (result) {
                    throw new Error(`📦 ui-box: ${result}`);
                }
            }
        }
        aliases.forEach(alias => {
            newProps.set(alias, propValue);
        });
    });
    return newProps;
}
exports.default = expandAliases;
