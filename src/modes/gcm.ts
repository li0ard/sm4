import { SM4, BLOCKSIZE } from "../index.js";
import { concatBytes, equalBytes, type TArg, type TRet } from "@noble/ciphers/utils.js";
import { deriveCounter, galoisCtr, gcmAuth } from "./gcm.utils.js";
import { gcmBlockAddOne } from "../utils.js";

/**
 * Encrypt data using Galois/Counter (GCM) Mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param nonce Nonce (12 or 16 bytes)
 * @param aad Data to be authenticated
 */
export const encryptGCM = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    nonce: TArg<Uint8Array>,
    aad: TArg<Uint8Array>
): TRet<Uint8Array> => {
    if(nonce.length > 16) throw new Error("Invalid nonce");
    const cipher = new SM4(key);
    const encrypter = cipher.encrypt.bind(cipher);

    const h = encrypter(new Uint8Array(BLOCKSIZE));
    const counter = new Uint8Array(BLOCKSIZE);
    deriveCounter(h, counter, nonce);
    
    const tag_mask = galoisCtr(encrypter, new Uint8Array(BLOCKSIZE), counter);
    gcmBlockAddOne(counter)

    const out = galoisCtr(encrypter, data, counter);
    const tag = gcmAuth(h, tag_mask, out, aad);
    
    return concatBytes(out, tag);
}

/**
 * Decrypt data using Galois/Counter (GCM) Mode
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param nonce Nonce (12 or 16 bytes)
 * @param aad Data to be authenticated
 */
export const decryptGCM = (
    key: TArg<Uint8Array>,
    ciphertext: TArg<Uint8Array>,
    nonce: TArg<Uint8Array>,
    aad: TArg<Uint8Array>
): TRet<Uint8Array> => {
    if(nonce.length > 16) throw new Error("Invalid nonce: Need 12/16");
    if(ciphertext.length < 16 || ciphertext.length > ((0x100000000 - 2) * 16 + 16))
        throw new Error("Invalid ciphertext length");

    const cipher = new SM4(key);
    const encrypter = cipher.encrypt.bind(cipher);

    const h = encrypter(new Uint8Array(BLOCKSIZE));
    const counter = new Uint8Array(BLOCKSIZE);
    deriveCounter(h, counter, nonce);
    
    const tag_mask = galoisCtr(encrypter, new Uint8Array(BLOCKSIZE), counter);
    gcmBlockAddOne(counter)

    const tag_ct = ciphertext.slice(-16);
    const ct = ciphertext.slice(0,-16);
    const tag_expected = gcmAuth(h, tag_mask, ct, aad);
    if(!equalBytes(tag_ct, tag_expected))
        throw new Error("Invalid tag");

    const out = galoisCtr(encrypter, ct, counter);
    
    return out;
}