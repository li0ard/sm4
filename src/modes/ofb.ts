import { SM4, BLOCKSIZE } from "../index.js";
import { ofb as ofb_, type TArg, type TRet } from "@li0ard/gost3413";

/**
 * Proceed data using the Output Feedback (OFB) mode
 * @param key Encryption key
 * @param data Data to be encrypted/decrypted
 * @param iv Initialization vector
 */
export const ofb = (key: TArg<Uint8Array>, data: TArg<Uint8Array>, iv: TArg<Uint8Array>): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return ofb_(cipher.encrypt.bind(cipher), BLOCKSIZE, data, iv);
}