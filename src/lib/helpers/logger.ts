import { writeFile, appendFile } from 'fs/promises';
import { join } from 'path';

const LOG_DIR = join(process.cwd(), 'logs');

export async function logToFile(filename: string, data: any) {
  try {
    const timestamp = new Date().toISOString();
    const logEntry = `\n[${timestamp}] ${JSON.stringify(data, null, 2)}`;

    const filepath = join(LOG_DIR, filename);
    await appendFile(filepath, logEntry, 'utf-8');
  } catch (error) {
    console.error('Failed to write log:', error);
  }
}

export async function debugLog(label: string, data: any) {
  if (process.env.NEXT_PUBLIC_DEBUG === 'true') {
    console.log(`[DEBUG] ${label}:`, data);
    await logToFile('debug.log', { label, data });
  }
}
