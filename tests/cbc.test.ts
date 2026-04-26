import { describe, test, expect } from "bun:test"
import { decryptCBC, encryptCBC } from "../src"

const key = Uint8Array.fromHex("0123456789ABCDEFFEDCBA9876543210");
const iv = Uint8Array.fromHex("000102030405060708090A0B0C0D0E0F");
const plaintext = Uint8Array.fromHex("AAAAAAAABBBBBBBBCCCCCCCCDDDDDDDDEEEEEEEEFFFFFFFFAAAAAAAABBBBBBBB");
const encrypted = Uint8Array.fromHex("78EBB11CC40B0A48312AAEB2040244CB4CB7016951909226979B0D15DC6A8F6D");

const key2 = Uint8Array.fromHex("FEDCBA98765432100123456789ABCDEF");
const encrypted2 = Uint8Array.fromHex("0D3A6DDC2D21C698857215587B7BB59A91F2C147911A4144665E1FA1D40BAE38");

describe("CBC", () => {
    test("Encryption", () => expect(encryptCBC(key, plaintext, iv)).toStrictEqual(encrypted));
    test("Decryption", () => expect(decryptCBC(key, encrypted, iv)).toStrictEqual(plaintext));

    test("Encryption #2", () => expect(encryptCBC(key2, plaintext, iv)).toStrictEqual(encrypted2));
    test("Decryption #2", () => expect(decryptCBC(key2, encrypted2, iv)).toStrictEqual(plaintext));
});