"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveDependencyConfigImplIosAsync = void 0;
const fast_glob_1 = __importDefault(require("fast-glob"));
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function resolveDependencyConfigImplIosAsync(packageRoot, reactNativeConfig) {
    if (reactNativeConfig === null) {
        // Skip autolinking for this package.
        return null;
    }
    const podspecPath = (await (0, fast_glob_1.default)('*.podspec', { cwd: packageRoot, absolute: true }))?.[0];
    if (!podspecPath) {
        return null;
    }
    const packageJson = JSON.parse(await promises_1.default.readFile(path_1.default.join(packageRoot, 'package.json'), 'utf8'));
    return {
        podspecPath,
        version: packageJson.version,
        configurations: reactNativeConfig?.configurations || [],
        scriptPhases: reactNativeConfig?.scriptPhases || [],
    };
}
exports.resolveDependencyConfigImplIosAsync = resolveDependencyConfigImplIosAsync;
//# sourceMappingURL=iosCompat.js.map