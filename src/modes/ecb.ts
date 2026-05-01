import { SM4, BLOCKSIZE } from "../index.js";
import { ecb } from "@li0ard/sp80038";
import type { TArg, TRet } from "@noble/ciphers/utils.js";
/**
 * Encrypt data using Electronic Codebook (ECB) mode
 * 
 * @param key Encryption key
 * @param data Data to be encrypted
 */
export const encryptECB = (key: TArg<Uint8Array>, data: TArg<Uint8Array>): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return ecb(cipher.encrypt.bind(cipher), BLOCKSIZE, data);
}

/**
 * Decrypt data using Electronic Codebook (ECB) mode
 * 
 * @param key Encryption key
 * @param data Data to be decrypted
 */
export const decryptECB = (key: TArg<Uint8Array>, data: TArg<Uint8Array>): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return ecb(cipher.decrypt.bind(cipher), BLOCKSIZE, data);
}