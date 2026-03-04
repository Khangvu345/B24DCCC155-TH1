import { v4 as uuidv4 } from 'uuid';

/**
 * Tạo ID duy nhất (UUID v4)
 */
export function generateId(): string {
    return uuidv4();
}

/**
 * Lấy timestamp hiện tại dạng ISO string
 */
export function getCurrentTimestamp(): string {
    return new Date().toISOString();
}

/**
 * Format date sang dạng dd/MM/yyyy
 */
export function formatDate(isoString: string): string {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}
