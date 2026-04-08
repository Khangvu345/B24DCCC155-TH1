const arrayBufferToHex = (buffer: ArrayBuffer): string => {
	const bytes = new Uint8Array(buffer);
	return Array.from(bytes)
		.map((byte) => byte.toString(16).padStart(2, '0'))
		.join('');
};

export const sha256 = async (plainText: string): Promise<string> => {
	if (typeof window === 'undefined' || !window.crypto?.subtle) {
		return Promise.reject(new Error('Trinh duyet khong ho tro Web Crypto API'));
	}

	const encoder = new TextEncoder();
	const data = encoder.encode(plainText);
	const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
	return arrayBufferToHex(hashBuffer);
};
