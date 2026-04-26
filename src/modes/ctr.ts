import { SM4, BLOCKSIZE } from "../index.js";
import { type TArg, type TRet, xor } from "@li0ard/gost3413";

const incrementCounterAt = (ctr: TArg<Uint8Array>, pos: number) => {
    let j = pos;
    while (j < ctr.length) if (++ctr[j++] != 0) break;
}

export const ctr = () => {
    
}