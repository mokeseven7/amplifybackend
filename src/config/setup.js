import { join } from 'path';
import { config } from 'dotenv';


export const setup = async (debug = false) => {
    const ENV_FILE = join(__dirname, '..', '..', '.env');
    config({ path: ENV_FILE, debug });
}

