import { SM4, BLOCKSIZE } from "../index.js";
import { cbc_encrypt, cbc_decrypt } from "@li0ard/sp80038";
import type { TArg, TRet } from "@noble/ciphers/utils.js";

/**
 * Encrypt data using Cipher Block Chaining (CBC) mode
 * 
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 */
export const encryptCBC = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    iv: TArg<Uint8Array>
): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return cbc_encrypt(cipher.encrypt.bind(cipher), BLOCKSIZE, data, iv);
}

/**
 * Decrypt data using Cipher Block Chaining (CBC) mode
 * 
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 */
export const decryptCBC = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    iv: TArg<Uint8Array>
): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return cbc_decrypt(cipher.decrypt.bind(cipher), BLOCKSIZE, data, iv);
}