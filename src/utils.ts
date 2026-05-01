import type { TArg } from "@noble/ciphers/utils.js";
import { SBOX } from "./const.js";

const rl = (word: number, shift: number): number => (word << shift) | ((word >>> (32 - shift)) >>> 0);
const l0 = (b: number): number => (b ^ rl(b, 13) ^ rl(b, 23)) >>> 0;
const p = (a: number): number => (
    (SBOX[(a >>> 24) & 0xff] << 24) ^
    (SBOX[(a >>> 16) & 0xff] << 16) ^
    (SBOX[(a >>> 8) & 0xff] << 8) ^
    SBOX[a & 0xff]
) >>> 0;
export const feistel0 = (x0: number, x1: number, x2: number, x3: number, rk: number): number =>
    (x0 ^ l0(p((x1 ^ x2 ^ x3 ^ rk) >>> 0))) >>> 0;

export const permuteInitialBlock = (b: TArg<Uint32Array>, block: TArg<Uint8Array>) => {
    for (let i = 0; i < 4; i++) b[i] = ((block[i * 4] << 24) |
        (block[i * 4 + 1] << 16) |
        (block[i * 4 + 2] << 8) |
        block[i * 4 + 3]) >>> 0;
}

export const permuteFinalBlock = (b: TArg<Uint8Array>, block: TArg<Uint32Array>) => {
    for (let i = 0; i < 4; i++) {
        b[i * 4] = (block[i] >>> 24) & 0xff;
        b[i * 4 + 1] = (block[i] >>> 16) & 0xff;
        b[i * 4 + 2] = (block[i] >>> 8) & 0xff;
        b[i * 4 + 3] = block[i] & 0xff;
    }
}

export const gcmBlockAddOne = (a: TArg<Uint8Array>) => {
    for (let i = 0; i < 4; i++) {
        const t = a[15 - i] + 1;
        a[15 - i] = t & 0xff;
        if (t <= 0xff) return;
    }
}