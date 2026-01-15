/**
 * Helper pour générer les headers X-App-* requis par le serveur.
 * usage: const headers = await generateAppHeaders(method, uri, body, APP_CLIENT_TOKEN, APP_CLIENT_SECRET_HEX)
 */
export function generateNonce(bytes = 24) {
    const arr = new Uint8Array(bytes);
    window.crypto.getRandomValues(arr);
    return Array.from(arr).map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

function hexToBytes(hex) {
    if (hex.length % 2 !== 0) hex = '0' + hex;
    const len = hex.length / 2;
    const out = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        out[i] = parseInt(hex.substr(i * 2, 2), 16);
    }
    return out;
}

function bufToHex(buffer) {
    const bytes = new Uint8Array(buffer);
    return Array.from(bytes).map(b => ('00' + b.toString(16)).slice(-2)).join('');
}

export async function generateAppHeaders(method, uri, body, appToken, appSecretHex) {
    const ts = Math.floor(Date.now() / 1000).toString();
    const nonce = generateNonce(24);
    const payload = (method || 'GET').toUpperCase() + '|' + uri + '|' + ts + '|' + nonce + '|' + (body || '');
    const keyBytes = hexToBytes(appSecretHex);
    const cryptoKey = await window.crypto.subtle.importKey(
        'raw',
        keyBytes.buffer,
        { name: 'HMAC', hash: 'SHA-256' },
        false,
        ['sign']
    );
    const sigBuf = await window.crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(payload));
    const signatureHex = bufToHex(sigBuf);
    return {
        'X-App-Token': appToken,
        'X-App-Timestamp': ts,
        'X-App-Nonce': nonce,
        'X-App-Signature': signatureHex
    };
}