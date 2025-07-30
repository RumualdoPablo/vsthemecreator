export { javascriptSample } from './javascript';
export { typescriptSample } from './typescript';
export { pythonSample } from './python';

export interface CodeSample {
    filename: string;
    code: string;
}

import { javascriptSample } from './javascript';
import { typescriptSample } from './typescript';
import { pythonSample } from './python';

export const codeSamples: Record<string, CodeSample> = {
    javascript: javascriptSample,
    typescript: typescriptSample,
    python: pythonSample,
}; 