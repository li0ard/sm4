import { SM4, BLOCKSIZE } from "../index.js";
import { cfb_encrypt, cfb_decrypt } from "@li0ard/sp80038";
import type { TArg, TRet } from "@noble/ciphers/utils.js";

/**
 * Encrypt data using Cipher Feedback (CFB) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 * @param s Segment size (in bytes, eg. `CFB-8` => `s = 1`)
 */
export const encryptCFB = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    iv: TArg<Uint8Array>,
    s?: number
): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return cfb_encrypt(cipher.encrypt.bind(cipher), BLOCKSIZE, data, iv, s);
}

/**
 * Decrypt data using Cipher Feedback (CFB) mode
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 * @param s Segment size (in bytes, eg. `CFB-8` => `s = 1`)
 */
export const decryptCFB = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    iv: TArg<Uint8Array>,
    s?: number
): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return cfb_decrypt(cipher.encrypt.bind(cipher), BLOCKSIZE, data, iv, s);
}