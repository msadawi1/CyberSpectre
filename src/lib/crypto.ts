/**
 * Encoding & cryptographic helpers used by the Tools page.
 */

export function caesar(text: string, shift: number): string {
  return text.replace(/[a-zA-Z]/g, (c) => {
    const base = c <= 'Z' ? 65 : 97;
    return String.fromCharCode(((c.charCodeAt(0) - base + shift + 26) % 26) + base);
  });
}

export function rot13(text: string): string {
  return caesar(text, 13);
}

export function base64Encode(text: string): string {
  return btoa(unescape(encodeURIComponent(text)));
}

export function base64Decode(text: string): string {
  return decodeURIComponent(escape(atob(text.trim())));
}

export function hexEncode(text: string): string {
  return Array.from(text)
    .map((c) => c.charCodeAt(0).toString(16).padStart(2, '0'))
    .join(' ');
}

export function hexDecode(text: string): string {
  const cleaned = text.replace(/\s+/g, '').replace(/^0x/i, '');
  if (!/^[0-9a-fA-F]+$/.test(cleaned) || cleaned.length % 2 !== 0) {
    throw new Error('invalid hex');
  }
  return cleaned
    .match(/.{2}/g)!
    .map((b) => String.fromCharCode(parseInt(b, 16)))
    .join('');
}

export function binaryEncode(text: string): string {
  return Array.from(text)
    .map((c) => c.charCodeAt(0).toString(2).padStart(8, '0'))
    .join(' ');
}

export function binaryDecode(text: string): string {
  const cleaned = text.replace(/\s+/g, '');
  if (!/^[01]+$/.test(cleaned) || cleaned.length % 8 !== 0) {
    throw new Error('invalid binary');
  }
  return cleaned
    .match(/.{8}/g)!
    .map((b) => String.fromCharCode(parseInt(b, 2)))
    .join('');
}

export function reverseText(text: string): string {
  return Array.from(text).reverse().join('');
}

export async function sha256(text: string): Promise<string> {
  const buf = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function caesarBruteforce(text: string): string {
  return Array.from({ length: 25 }, (_, i) => {
    const shift = i + 1;
    return `[${shift.toString().padStart(2, '0')}] ${caesar(text, shift)}`;
  }).join('\n');
}
