/* const tsjPreset = require('ts-jest/presets/default-esm/jest-preset.js');
console.log(tsjPreset);
module.exports = {
    transformIgnorePatterns: [],
    extensionsToTreatAsEsm: [...tsjPreset.extensionsToTreatAsEsm,],
    transform: {
        ...tsjPreset.transform,
        "\\.(js|jsx|mjs|cjs)$": "babel-jest",
    },
};
 */
import tsjPreset from 'ts-jest/presets/js-with-ts-esm/jest-preset.js';

console.log(tsjPreset);

export default {
    transformIgnorePatterns: [],
    extensionsToTreatAsEsm: [...tsjPreset.extensionsToTreatAsEsm],
    transform: {
        "\\.(js|jsx|mjs|cjs)$": "babel-jest",
        ...tsjPreset.transform,
    },
};