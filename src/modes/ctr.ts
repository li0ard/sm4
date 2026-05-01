import { SM4, BLOCKSIZE } from "../index.js";
import { ctr as ctr_ } from "@li0ard/sp80038";
import type { TArg, TRet } from "@noble/ciphers/utils.js";

/**
 * Proceed data using Counter (CTR) mode
 * @param cipherClass Initialized cipher class
 * @param data Data to be encrypted/decrypted
 * @param iv Initialization vector
 */
export const ctr = (
    key: TArg<Uint8Array>,
    data: TArg<Uint8Array>,
    iv: TArg<Uint8Array>
): TRet<Uint8Array> => {
    const cipher = new SM4(key);
    return ctr_(cipher.encrypt.bind(cipher), BLOCKSIZE, data, iv);
}