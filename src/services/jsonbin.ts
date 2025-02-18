import { config } from 'dotenv';

config();

export class JSONBin {
  accessKey: string;
  masterKey: string;
  baseUrl: string;

  constructor(accessKey: string, masterKey: string) {
    this.accessKey = accessKey;
    this.masterKey = masterKey;
    this.baseUrl = 'https://api.jsonbin.io/v3';
  }

  async getBin(id: string) {
    const response = await fetch(`${this.baseUrl}/b/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': this.masterKey,
        'X-Access-Key': this.accessKey,
      },
    });
    return await response.json();
  }
  
  async createBin(data: any) {
    const response = await fetch(`${this.baseUrl}/b`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': this.masterKey,
        'X-Access-Key': this.accessKey,
      },
      body: JSON.stringify(data),
    });

    return await response.json();
  }
}

const JSONBIN_ACCESS_KEY = process.env.JSONBIN_ACCESS_KEY;
const JSONBIN_MASTER_KEY = process.env.JSONBIN_MASTER_KEY;

if (!JSONBIN_ACCESS_KEY || !JSONBIN_MASTER_KEY) {
  throw new Error(
    'JSONBIN_ACCESS_KEY or JSONBIN_MASTER_KEY env variable is not defined',
  );
}

export default new JSONBin(JSONBIN_ACCESS_KEY, JSONBIN_MASTER_KEY);
