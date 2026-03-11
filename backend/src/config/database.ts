import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

/**
 * Đọc dữ liệu từ file JSON trong thư mục src/data/
 */
export function readJsonFile<T>(filename: string): T[] {
    const filePath = path.join(DATA_DIR, filename);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData) as T[];
}

/**
 * Ghi dữ liệu vào file JSON trong thư mục src/data/
 */
export function writeJsonFile<T>(filename: string, data: T[]): void {
    const filePath = path.join(DATA_DIR, filename);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}
