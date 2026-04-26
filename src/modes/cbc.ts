import { SM4, BLOCKSIZE } from "../index.js";
import { type TArg, type TRet, xor } from "@li0ard/gost3413";

/**
 * Encrypts data using Cipher Block Chaining (CBC) mode
 * 
 * @param key Encryption key
 * @param data Data to be encrypted
 * @param iv Initialization vector
 */
export const encryptCBC = (key: TArg<Uint8Array>, data: TArg<Uint8Array>, iv: TArg<Uint8Array>): TRet<Uint8Array> => {
    if (data.length == 0 || data.length % BLOCKSIZE !== 0) throw new Error("Data not aligned");

    let buf = new Uint8Array(iv);
    const out = new Uint8Array(data.length);
    const cipher = new SM4(key);
    for(let i = 0; i < data.length; i+=BLOCKSIZE) {
        const blk = cipher.encrypt(xor(data.slice(i,i+BLOCKSIZE), buf));
        out.set(blk, i);
        buf = blk;
    }

    return out;
}

/**
 * Decrypts data using Cipher Block Chaining (CBC) mode
 * 
 * @param key Encryption key
 * @param data Data to be decrypted
 * @param iv Initialization vector
 */
export const decryptCBC = (key: TArg<Uint8Array>, data: TArg<Uint8Array>, iv: TArg<Uint8Array>): TRet<Uint8Array> => {
    if (data.length == 0 || data.length % BLOCKSIZE !== 0) throw new Error("Data not aligned");

    let buf = new Uint8Array(iv);
    const out = new Uint8Array(data.length);
    const cipher = new SM4(key);
    for(let i = 0; i < data.length; i+=BLOCKSIZE) {
        const blk = data.slice(i,i+BLOCKSIZE);
        out.set(xor(cipher.decrypt(blk), buf), i);
        buf = blk;
    }

    return out;
}