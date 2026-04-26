import type { TArg, TRet } from "@li0ard/gost3413";
import { BLOCKSIZE, CK, FK, SBOX0, SBOX1, SBOX2, SBOX3 } from "./const.js";
import { feistel0, permuteFinalBlock, permuteInitialBlock } from "./utils.js";

export class SM4 {
    subkeys: Uint32Array;
    private b: Uint32Array;
    private r: Uint8Array;

    constructor(key: TArg<Uint8Array>) {
        this.subkeys = new Uint32Array(32);

        const b = new Uint32Array(4);
        permuteInitialBlock(b, key);
        b[0] ^= FK[0];
        b[1] ^= FK[1];
        b[2] ^= FK[2];
        b[3] ^= FK[3];
    
        for (let i = 0; i < 32; i++) {
            this.subkeys[i] = feistel0(b[0], b[1], b[2], b[3], CK[i]);
            [b[0], b[1], b[2], b[3]] = [b[1], b[2], b[3], this.subkeys[i]];
        }

        this.b = new Uint32Array(4);
        this.r = new Uint8Array(BLOCKSIZE);
    }

    private cryptBlock(
        data: TArg<Uint8Array>,
        decrypt: boolean
    ) {
        permuteInitialBlock(this.b, data);

        if(decrypt) {
            for(let i = 0; i < 8; i++) {
                const s = this.subkeys.subarray(31-4*i-3,31-4*i-3+4);
                let x = this.b[1] ^ this.b[2] ^ this.b[3] ^ s[3];
                this.b[0] = this.b[0] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
                x = this.b[0] ^ this.b[2] ^ this.b[3] ^ s[2];
                this.b[1] = this.b[1] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
                x = this.b[0] ^ this.b[1] ^ this.b[3] ^ s[1];
                this.b[2] = this.b[2] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
                x = this.b[1] ^ this.b[2] ^ this.b[0] ^ s[0];
                this.b[3] = this.b[3] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
            }
        } else {
            for (let i = 0; i < 8; i++) {
                const s = this.subkeys.subarray(4*i, 4*i+4);
                let x = this.b[1] ^ this.b[2] ^ this.b[3] ^ s[0];
                this.b[0] = this.b[0] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
                x = this.b[0] ^ this.b[2] ^ this.b[3] ^ s[1];
                this.b[1] = this.b[1] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
                x = this.b[0] ^ this.b[1] ^ this.b[3] ^ s[2];
                this.b[2] = this.b[2] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
                x = this.b[1] ^ this.b[2] ^ this.b[0] ^ s[3];
                this.b[3] = this.b[3] ^ SBOX0[x&0xff] ^ SBOX1[(x>>8)&0xff] ^ SBOX2[(x>>16)&0xff] ^ SBOX3[(x>>24)&0xff];
            }
        }

        [this.b[0], this.b[1], this.b[2], this.b[3]] = [this.b[3], this.b[2], this.b[1], this.b[0]];
        permuteFinalBlock(this.r, this.b);
    }

    encrypt(data: TArg<Uint8Array>): TRet<Uint8Array> {
        this.cryptBlock(data, false);
        return this.r as TRet<Uint8Array>;
    }

    decrypt(data: TArg<Uint8Array>): TRet<Uint8Array> {
        this.cryptBlock(data, true);
        return this.r as TRet<Uint8Array>;
    }
}

export { BLOCKSIZE } from "./const.js";
export * from "./modes/cbc.js";
export * from "./modes/ecb.js";
export * from "./modes/ofb.js";