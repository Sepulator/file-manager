import { homedir } from 'os';

import { parseArgsUsername } from './parsedArgs.js';

export const config = { currentDir: homedir(), username: parseArgsUsername() };
